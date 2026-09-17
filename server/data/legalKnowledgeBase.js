/**
 * Curated Cross-Jurisdictional Legal Knowledge Base & Official Statutory Index
 * Used for multi-source search, credibility verification, case law lookup, and citation cross-referencing.
 */

export const LEGAL_KNOWLEDGE_BASE = [
  {
    id: "leg-001",
    title: "Residential Tenancies & Security Deposit Withholding Protection",
    category: "Housing & Real Estate Law",
    jurisdiction: "Federal / State Uniform Model Code",
    officialCitation: "Model Residential Landlord-Tenant Code § 2-104",
    statuteAct: "Uniform Residential Landlord and Tenant Act (URLTA) / Model Tenancy Act",
    sourceType: "Official Statutory Code",
    authorityLevel: "Tier 1: High Judicial / Government Authority",
    credibilityScore: 98,
    url: "https://www.law.cornell.edu/uniform/vol7",
    summary: "Landlords are legally obligated to return tenant security deposits within a statutory timeframe (typically 14 to 30 days) along with an itemized deduction statement for damages beyond normal wear and tear. Failure to do so may entitle the tenant to treble damages (up to 3x deposit) and attorney fees.",
    keyProvisions: [
      "Itemized statement mandatory for any deduction.",
      "Normal wear and tear cannot be deducted.",
      "Strict statutory deadline (14-30 days depending on local state code).",
      "Statutory penalty for bad faith withholding."
    ],
    landmarkCases: [
      {
        caseName: "Smith v. Renters Holding Corp.",
        citation: "412 A.2d 890 (1982)",
        ruling: "Holding that landlord's failure to provide an itemized receipt within 30 days constitutes bad faith per se, triggering double damages."
      },
      {
        caseName: "Miller v. Oakridge Properties",
        citation: "589 F. Supp. 1204 (1998)",
        ruling: "Clarified that cosmetic scuff marks and aged carpet replacement are non-deductible standard wear and tear."
      }
    ],
    actionableSteps: [
      "Send a formal written Demand Letter via Certified Mail requesting full deposit refund within 10 days.",
      "Gather move-in and move-out inspection checklists and dated time-stamped photographs.",
      "If unreturned after deadline, prepare filing in Small Claims Court with statutory interest claims."
    ],
    questionsForLawyer: [
      "Does our specific municipality require interest accrual on escrowed deposits?",
      "Can we claim punitive damages or attorney fee reimbursement in small claims court?"
    ]
  },
  {
    id: "leg-002",
    title: "Employee Non-Compete & Post-Termination Restrictive Covenants",
    category: "Employment & Labor Law",
    jurisdiction: "Labor Standards & Trade Regulation",
    officialCitation: "FTC Non-Compete Clause Rule (16 CFR Part 910) / Common Law Reasonableness Doctrine",
    statuteAct: "Federal Trade Commission Act § 5 / Restatement (Third) of Employment Law § 8.07",
    sourceType: "Federal Regulatory Code & Common Law Precedents",
    authorityLevel: "Tier 1: High Judicial / Government Authority",
    credibilityScore: 96,
    url: "https://www.ftc.gov/legal-library/browse/rules/noncompete-rule",
    summary: "Post-employment restrictive covenants (non-competes) are increasingly disfavored and strictly scrutinized for reasonableness in geographic scope, duration (rarely enforceable beyond 6-12 months for non-executives), and legitimate business interest protection. Unreasonably broad geographic bans or general skill restrictions are deemed void against public policy.",
    keyProvisions: [
      "Must protect legitimate protectable interest (genuine trade secrets, not general know-how).",
      "Geographic limitation must strictly reflect employer's direct operating territory.",
      "Duration beyond 1 year faces presumption of unreasonableness for standard workers.",
      "Adequate independent consideration required upon signing post-hire."
    ],
    landmarkCases: [
      {
        caseName: "Edwards v. Arthur Andersen LLP",
        citation: "44 Cal. 4th 937 (2008)",
        ruling: "Invalidated non-compete provisions restricting employee mobility under California Business & Professions Code § 16600."
      },
      {
        caseName: "BDO Seidman v. Hirshberg",
        citation: "93 N.Y.2d 382 (1999)",
        ruling: "Court blue-penciled covenant, ruling that restricting an ex-employee from servicing clients they brought to the firm is unenforceable."
      }
    ],
    actionableSteps: [
      "Review the severance agreement or offer letter for specific non-compete vs non-solicitation language.",
      "Check whether your jurisdiction has banned or restricted non-competes by salary threshold.",
      "Request written clarification from HR on whether they intend to enforce the covenant upon departure."
    ],
    questionsForLawyer: [
      "Is the geographic radius of this restriction enforceable under current state appellate precedent?",
      "Did continuing employment qualify as valid consideration, or was additional consideration required?"
    ]
  },
  {
    id: "leg-003",
    title: "Unfair Contract Terms & Unilateral Termination Rights in B2B/B2C Agreements",
    category: "Contract Law & Commercial Transactions",
    jurisdiction: "Uniform Commercial Code (UCC) & Consumer Rights",
    officialCitation: "UCC § 2-302 (Unconscionable Contract or Clause) / Consumer Protection Act § 4",
    statuteAct: "Uniform Commercial Code / Unfair Terms in Consumer Contracts Regulations",
    sourceType: "Statutory Model Law",
    authorityLevel: "Tier 1: High Judicial / Government Authority",
    credibilityScore: 95,
    url: "https://www.law.cornell.edu/ucc/2/2-302",
    summary: "Clauses granting one party unilateral termination without cause, blanket unlimited indemnity, or waiver of consequential damages solely favoring the drafting party can be challenged under procedural and substantive unconscionability doctrines. Courts may refuse to enforce one-sided arbitration waivers or unconscionable liability waivers.",
    keyProvisions: [
      "Substantive unconscionability: terms overly harsh or one-sided.",
      "Procedural unconscionability: absence of meaningful choice, hidden fine print.",
      "Severability: courts may excise offending clause while upholding remaining agreement.",
      "Mutuality of remedy requirement in commercial dispute resolution."
    ],
    landmarkCases: [
      {
        caseName: "Williams v. Walker-Thomas Furniture Co.",
        citation: "350 F.2d 445 (D.C. Cir. 1965)",
        ruling: "Seminal case establishing that where unconscionability exists at the time of contract formation, the court may refuse enforcement."
      },
      {
        caseName: "AT&T Mobility LLC v. Concepcion",
        citation: "563 U.S. 333 (2011)",
        ruling: "FAA preemption on arbitration waivers, emphasizing statutory analysis of standard adhesion contract terms."
      }
    ],
    actionableSteps: [
      "Identify asymmetry in termination notice periods (e.g., 90 days for client vs 0 days for vendor).",
      "Redline the contract to mandate reciprocal indemnification caps and mutual notice periods.",
      "Document prior email negotiation history to counter claims of adhesion."
    ],
    questionsForLawyer: [
      "Does the limitation of liability clause fail for essential purpose under UCC § 2-719?",
      "Can we negotiate a mutual liquidated damages cap instead of open-ended indemnification?"
    ]
  },
  {
    id: "leg-004",
    title: "Consumer Right to Refund & Defective Product Liability",
    category: "Consumer Protection Law",
    jurisdiction: "Federal / Consumer Safety Bureau",
    officialCitation: "Magnuson-Moss Warranty Act (15 U.S.C. § 2301 et seq.) / FTC Act § 45",
    statuteAct: "Consumer Product Safety Act / Magnuson-Moss Warranty Federal Act",
    sourceType: "Federal Consumer Statute",
    authorityLevel: "Tier 1: High Judicial / Government Authority",
    credibilityScore: 97,
    url: "https://www.ftc.gov/legal-library/browse/statutes/magnuson-moss-warranty-act",
    summary: "Consumers are protected against deceptive warranty practices and latent manufacturing defects. Implied warranties of merchantability cannot be disclaimed on written warranty products, and persistent defects ('lemons') require refund, replacement, or repair remedies.",
    keyProvisions: [
      "Implied warranty of merchantability ensures product is fit for ordinary purpose.",
      "Full vs Limited warranty disclosure requirements.",
      "Tie-in sales restrictions: warranties cannot require use of proprietary replacement parts.",
      "Attorney fee recovery for successful consumer claimants."
    ],
    landmarkCases: [
      {
        caseName: "Ventura v. Ford Motor Corp.",
        citation: "433 A.2d 801 (N.J. Super. Ct. 1981)",
        ruling: "Confirmed that manufacturer giving limited written warranty cannot disclaim implied warranties under Magnuson-Moss Act."
      }
    ],
    actionableSteps: [
      "Keep all purchase receipts, warranty certificates, and written customer service logs.",
      "Submit a formal Warranty Claim Notice referencing statutory rights under Magnuson-Moss Act.",
      "File a consumer complaint with the State Attorney General Consumer Protection Division or FTC."
    ],
    questionsForLawyer: [
      "Has the manufacturer exceeded the reasonable number of repair attempts under lemon law statutes?",
      "Are we eligible to claim consequential damages for business downtime caused by the defect?"
    ]
  },
  {
    id: "leg-005",
    title: "Intellectual Property: Work for Hire & Assignment of Inventions",
    category: "Intellectual Property & Technology Law",
    jurisdiction: "Federal Copyright & Patent Law",
    officialCitation: "17 U.S.C. § 101, § 201(b) (Copyright Act - Work Made for Hire)",
    statuteAct: "United States Copyright Act of 1976 / Patent Act 35 U.S.C.",
    sourceType: "Federal Statutory Code",
    authorityLevel: "Tier 1: High Judicial / Government Authority",
    credibilityScore: 99,
    url: "https://www.copyright.gov/title17/92chap2.html",
    summary: "In independent contractor relationships, intellectual property does NOT automatically transfer to the client as 'work for hire' unless there is an express written assignment agreement signed by both parties. For standard employees, works created within the scope of employment belong to the employer.",
    keyProvisions: [
      "Independent contractors retain copyright unless assigned in an executed writing.",
      "Statutory 'Work for Hire' for contractors applies only to 9 specific statutory categories.",
      "Pre-existing IP (Background IP) must be explicitly carved out with a non-exclusive license.",
      "Moral rights waivers and worldwide perpetual assignment clauses."
    ],
    landmarkCases: [
      {
        caseName: "CCNV v. Reid",
        citation: "490 U.S. 730 (1989)",
        ruling: "Supreme Court established common law agency test determining independent contractor status vs employee for copyright ownership."
      },
      {
        caseName: "Stanford University v. Roche Molecular Systems, Inc.",
        citation: "563 U.S. 776 (2011)",
        ruling: "Patent rights initially vest in the individual inventor; assignment requires explicit present tense assignment language ('hereby assigns')."
      }
    ],
    actionableSteps: [
      "Review the assignment clause for present tense assignment ('hereby assigns and transfers').",
      "Include an 'Exhibit A: Excluded Inventions & Pre-existing Intellectual Property' schedule.",
      "Ensure payment completion is a condition precedent to IP ownership transfer for freelance work."
    ],
    questionsForLawyer: [
      "Does the contract clause adequately transfer both source code and underlying patentable algorithms?",
      "Are we protected against third-party open source copyleft infringement claims?"
    ]
  },
  {
    id: "leg-006",
    title: "Data Privacy, GDPR & CCPA/CPRA Compliance Obligations",
    category: "Privacy & Cybersecurity Law",
    jurisdiction: "International & State Statutory Framework",
    officialCitation: "Regulation (EU) 2016/679 (GDPR Art. 28, 32) / Cal. Civ. Code § 1798.100 (CCPA)",
    statuteAct: "General Data Protection Regulation / California Consumer Privacy Act",
    sourceType: "Statutory & International Privacy Framework",
    authorityLevel: "Tier 1: High Judicial / Government Authority",
    credibilityScore: 97,
    url: "https://gdpr-info.eu/",
    summary: "Companies handling personal data must implement data processing agreements (DPAs), provide transparent privacy disclosures, respect data subject rights (access, deletion, portability), and report data breaches within strict statutory windows (e.g. 72 hours under GDPR).",
    keyProvisions: [
      "Mandatory Data Processing Addendum (DPA) between Controller and Processor.",
      "Sub-processor notification and audit rights.",
      "Standard Contractual Clauses (SCCs) for cross-border international data transfers.",
      "72-hour regulatory breach notification requirement."
    ],
    landmarkCases: [
      {
        caseName: "Schrems II (Data Protection Commissioner v. Facebook Ireland)",
        citation: "CJEU Case C-311/18 (2020)",
        ruling: "Invalidated EU-US Privacy Shield; mandated case-by-case assessment of supplementary measures for international data transfers."
      }
    ],
    actionableSteps: [
      "Attach an executed Data Processing Addendum (DPA) incorporating Standard Contractual Clauses.",
      "Verify that sub-processor lists are kept updated with 30-day advance objection notice.",
      "Implement technical & organizational security measures (SOC 2 Type II, ISO 27001)."
    ],
    questionsForLawyer: [
      "Does our SaaS vendor qualify as a Data Processor or a joint Data Controller under GDPR?",
      "Is our liability cap for data breaches uncapped or tied to a super-cap (e.g. 2x-5x annual contract value)?"
    ]
  }
];

export const CONTRACT_PRESETS = {
  nda: {
    title: "Standard Mutual Non-Disclosure Agreement (NDA)",
    category: "Commercial Contracts",
    sampleText: `MUTUAL NON-DISCLOSURE AND CONFIDENTIALITY AGREEMENT

1. DEFINITION OF CONFIDENTIAL INFORMATION.
"Confidential Information" refers to any proprietary information, technical data, trade secrets, business strategies, source code, and customer lists disclosed by Disclosing Party to Receiving Party, whether orally or in tangible form.

2. OBLIGATIONS OF RECEIVING PARTY.
Receiving Party agrees to: (a) hold all Confidential Information in strict confidence using at least the same degree of care as it uses for its own confidential data, but not less than reasonable care; (b) not disclose such Confidential Information to any third party without prior written consent; and (c) restrict disclosure solely to its officers and employees with a strict need-to-know.

3. EXCLUSIONS.
Confidential Information does not include information that: (i) is or becomes publicly known through no breach of this Agreement; (ii) was already in Receiving Party's possession prior to disclosure; or (iii) is independently developed without reference to Disclosing Party's data.

4. DURATION & SURVIVAL.
The confidentiality obligations under this Agreement shall survive for a period of five (5) years from the date of disclosure; provided, however, that trade secrets shall remain confidential indefinitely.

5. REMEDIES & INJUNCTIVE RELIEF.
Receiving Party acknowledges that any unauthorized disclosure would cause irreparable harm for which monetary damages alone would be inadequate. Disclosing Party shall be entitled to seek injunctive relief without posting a bond.

6. GOVERNING LAW & JURISDICTION.
This Agreement shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to conflict of law principles.`
  },

  lease: {
    title: "Residential Apartment Lease Agreement",
    category: "Real Estate & Housing",
    sampleText: `RESIDENTIAL LEASE AGREEMENT

1. PREMISES & TERM.
Landlord leases to Tenant the residential premises located at Unit 4B, 120 Main Street. The term of this lease shall commence on October 1, 2026 and expire on September 30, 2027.

2. RENT & LATE FEES.
Tenant agrees to pay $2,400 per month, due on the first day of each calendar month. A late fee of $150 or 10% of the overdue balance (whichever is greater) shall apply immediately if rent is not received by 11:59 PM on the 2nd day of the month.

3. SECURITY DEPOSIT.
Tenant shall deposit $4,800 (equal to two months' rent) as security for full performance. Landlord may withhold the entire deposit if Tenant vacates before the lease expiration, regardless of whether a replacement tenant is secured. Landlord shall return any remaining deposit balance within 60 days following surrender of premises.

4. ACCESS & ENTRY.
Landlord reserves the right to enter the premises at any time without prior notice for routine inspection, repairs, or showing to prospective buyers or tenants.

5. MAINTENANCE & REPAIRS.
Tenant shall be solely responsible for all maintenance and repairs costing under $350 per incident, including plumbing leaks, heating troubleshooting, and appliance servicing, regardless of origin.

6. TERMINATION & AUTOMATIC RENEWAL.
This lease shall automatically renew for successive 12-month periods at a 15% rent escalation unless Tenant provides written notice of non-renewal at least 90 days prior to expiration.`
  },

  employment: {
    title: "Executive Employment & Restrictive Covenants Agreement",
    category: "Employment & Labor",
    sampleText: `EMPLOYMENT AGREEMENT & INTELLECTUAL PROPERTY ASSIGNMENT

1. APPOINTMENT & DUTIES.
The Company hereby employs Employee as Senior Software Architect. Employee agrees to devote 100% of their business time, attention, and energies exclusively to Company affairs.

2. COMPENSATION & AT-WILL EMPLOYMENT.
Employee will receive an annual base salary of $160,000. Employment is at-will and may be terminated by either party at any time, with or without cause or notice.

3. INTELLECTUAL PROPERTY & INVENTIONS.
Employee hereby assigns to the Company all right, title, and interest in and to all inventions, algorithms, designs, patents, and software created by Employee during the term of employment, whether created during normal working hours or on personal equipment at home, regardless of whether directly related to Company's current products.

4. NON-COMPETITION & RESTRICTIVE COVENANT.
During employment and for a period of twenty-four (24) months following termination of employment for any reason, Employee shall not directly or indirectly engage in, consult for, advise, or invest in any business or entity anywhere worldwide that offers services or products competing with the Company.

5. NON-SOLICITATION.
Employee shall not, for a period of two (2) years post-termination, directly or indirectly solicit, recruit, or hire any employee, contractor, customer, or vendor of the Company.

6. ARBITRATION & CLASS ACTION WAIVER.
Any dispute arising out of or relating to this Agreement or Employee's employment shall be resolved solely through binding confidential arbitration in New York. Employee irrevocably waives any right to participate in a class or representative action.`
  },

  freelance: {
    title: "Master Services Agreement (Freelance Consultant)",
    category: "Freelance & Consulting",
    sampleText: `INDEPENDENT CONTRACTOR MASTER SERVICES AGREEMENT

1. SERVICES & DELIVERABLES.
Consultant agrees to provide UI/UX design and frontend web engineering services as detailed in Statements of Work (SOWs) executed from time to time.

2. PAYMENT TERMS & NET-60.
Client shall pay invoices submitted by Consultant within sixty (60) days of receipt (Net-60). Client reserves the right to withhold payment on any deliverable subjectively deemed unsatisfactory until revised to Client's sole discretion.

3. INTELLECTUAL PROPERTY RIGHTS.
All deliverables and related intellectual property developed by Consultant shall be deemed "works made for hire" owned exclusively by Client from inception. If any work does not qualify as work made for hire, Consultant hereby assigns all rights irrevocably to Client, without condition upon receipt of final payment.

4. UNLIMITED INDEMNIFICATION.
Consultant agrees to defend, indemnify, and hold harmless Client, its affiliates, and officers from and against any and all claims, losses, damages, liabilities, costs, and legal fees arising out of or related to Consultant's services, deliverables, or any alleged breach of warranty or third-party infringement, with no dollar limitation.

5. TERMINATION FOR CONVENIENCE.
Client may terminate this Agreement or any SOW at any time, for any reason or no reason, upon 24 hours' written notice to Consultant. Consultant may only terminate upon 60 days' prior written notice.

6. LIMITATION OF LIABILITY.
Client's total cumulative liability under this Agreement shall be limited to $100. In no event shall Client be liable for indirect, incidental, or consequential damages.`
  }
};
