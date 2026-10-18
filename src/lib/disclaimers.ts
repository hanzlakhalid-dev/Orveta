/**
 * Which tools carry an on-page notice, and what it says (Stage 2.4).
 *
 * Tools that handle money, tax, legal or compliance topics, or that give a
 * "quick check" people might over-trust, show a short note that links to the
 * full Disclaimer page. Pure formatters and converters (JSON, SQL, case, etc.)
 * have no notice.
 */

export type DisclaimerKind = "financial" | "tax" | "legal" | "security" | "estimate";

export const disclaimerNotices: Record<DisclaimerKind, { text: string; anchor: string }> = {
  financial: {
    text: "Estimates only — not financial advice. Real-world results will differ, so check important numbers before you rely on them.",
    anchor: "financial",
  },
  tax: {
    text: "Estimate only — not tax advice. Tax rules vary and change, so check with a qualified tax professional.",
    anchor: "tax",
  },
  legal: {
    text: "A starting-point draft, not legal advice. Orveta isn't a law firm — have a qualified lawyer review it before you rely on it.",
    anchor: "legal",
  },
  security: {
    text: "A quick check, not a guarantee of security, accessibility or compliance. Test changes before you rely on them.",
    anchor: "security",
  },
  estimate: {
    text: "An illustrative estimate based on what you enter — not a guarantee of results.",
    anchor: "estimates",
  },
};

export const toolDisclaimerKind: Record<string, DisclaimerKind> = {
  // Tax
  "tax-deduction-estimator": "tax",
  // Money and business-finance calculators
  "invoice-builder": "financial",
  "rate-calculator": "financial",
  "ecommerce-margin": "financial",
  "lease-calculator": "financial",
  "mrr-retention": "financial",
  "cap-table-simulator": "financial",
  "equipment-lease-vs-buy": "financial",
  "debt-payoff-planner": "financial",
  "home-seller-proceeds": "financial",
  "pricing-margin-matrix": "financial",
  "downtime-cost-estimator": "financial",
  // Legal and compliance drafts
  "nda-builder": "legal",
  "privacy-policy-generator": "legal",
  "retention-schedule-builder": "legal",
  "contractor-classifier": "legal",
  "password-policy-builder": "legal",
  // Security, accessibility and technical checks
  "password-strength-evaluator": "security",
  "csp-generator": "security",
  "spf-dkim-validator": "security",
  "wcag-checker": "security",
  // Marketing estimators
  "ad-campaign-engine": "estimate",
  "quality-score-estimator": "estimate",
  "influencer-rate-calculator": "estimate",
};
