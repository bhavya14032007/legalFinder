/**
 * In-Memory LRU/TTL Cache Service
 * Provides sub-millisecond response times for repeated queries,
 * saves LLM token budget, and dramatically improves API efficiency.
 */
class CacheService {
  constructor(defaultTTLSeconds = 300) {
    this.cache = new Map();
    this.defaultTTL = defaultTTLSeconds * 1000;
    this.stats = {
      hits: 0,
      misses: 0,
      sets: 0
    };
  }

  /**
   * Generates a normalized cache key
   * @param {string} prefix 
   * @param {any} params 
   * @returns {string}
   */
  generateKey(prefix, params) {
    const serialized = typeof params === "string" ? params.toLowerCase().trim() : JSON.stringify(params);
    return `${prefix}:${serialized}`;
  }

  /**
   * Retrieves an item from cache if not expired
   * @param {string} key 
   * @returns {any|null}
   */
  get(key) {
    const item = this.cache.get(key);
    if (!item) {
      this.stats.misses++;
      return null;
    }

    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      this.stats.misses++;
      return null;
    }

    this.stats.hits++;
    // Re-insert to maintain LRU ordering
    this.cache.delete(key);
    this.cache.set(key, item);
    return item.value;
  }

  /**
   * Stores an item with a TTL in milliseconds
   * @param {string} key 
   * @param {any} value 
   * @param {number} [ttlSeconds] 
   */
  set(key, value, ttlSeconds) {
    const ttl = (ttlSeconds ? ttlSeconds * 1000 : this.defaultTTL);
    
    // Evict oldest if cache exceeds 1,000 entries
    if (this.cache.size >= 1000) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey) this.cache.delete(oldestKey);
    }

    this.cache.set(key, {
      value,
      expiry: Date.now() + ttl,
      createdAt: Date.now()
    });
    this.stats.sets++;
  }

  /**
   * Clears entire cache or keys matching a prefix
   * @param {string} [prefix] 
   */
  clear(prefix) {
    if (!prefix) {
      this.cache.clear();
      return;
    }
    for (const key of this.cache.keys()) {
      if (key.startsWith(prefix)) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Returns cache metrics and hit rates
   */
  getStats() {
    const totalRequests = this.stats.hits + this.stats.misses;
    const hitRate = totalRequests > 0 ? ((this.stats.hits / totalRequests) * 100).toFixed(2) + "%" : "0%";
    return {
      size: this.cache.size,
      hits: this.stats.hits,
      misses: this.stats.misses,
      sets: this.stats.sets,
      hitRate
    };
  }
}

export const cacheService = new CacheService(300); // 5-minute default TTL
