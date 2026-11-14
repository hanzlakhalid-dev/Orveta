export type DataCategoryKey =
  | "account_info"
  | "email"
  | "ip_address"
  | "payment_logs"
  | "support_tickets"
  | "marketing_consent"
  | "analytics_events"
  | "employee_records";

export interface DataCategoryDefault {
  key: DataCategoryKey;
  label: string;
  suggestedRetention: string;
  legalBasisHint: string;
}

export const dataCategoryDefaults: DataCategoryDefault[] = [
  {
    key: "account_info",
    label: "Account information (name, address)",
    suggestedRetention: "Duration of account + 3 years",
    legalBasisHint: "Contract performance",
  },
  {
    key: "email",
    label: "Email addresses",
    suggestedRetention: "Duration of account + 1 year",
    legalBasisHint: "Contract performance / consent",
  },
  {
    key: "ip_address",
    label: "IP addresses / device logs",
    suggestedRetention: "90 days",
    legalBasisHint: "Legitimate interest (security)",
  },
  {
    key: "payment_logs",
    label: "Payment transaction logs",
    suggestedRetention: "7 years",
    legalBasisHint: "Legal obligation (tax/accounting)",
  },
  {
    key: "support_tickets",
    label: "Customer support tickets",
    suggestedRetention: "2 years after resolution",
    legalBasisHint: "Legitimate interest",
  },
  {
    key: "marketing_consent",
    label: "Marketing consent records",
    suggestedRetention: "Duration of consent + 3 years",
    legalBasisHint: "Consent",
  },
  {
    key: "analytics_events",
    label: "Analytics / usage events",
    suggestedRetention: "14 months",
    legalBasisHint: "Legitimate interest",
  },
  {
    key: "employee_records",
    label: "Employee/HR records",
    suggestedRetention: "7 years after employment ends",
    legalBasisHint: "Legal obligation",
  },
];

export interface RetentionRow {
  key: DataCategoryKey;
  label: string;
  retention: string;
  legalBasis: string;
  deletionMethod: string;
}

export function newRetentionRow(defaults: DataCategoryDefault): RetentionRow {
  return {
    key: defaults.key,
    label: defaults.label,
    retention: defaults.suggestedRetention,
    legalBasis: defaults.legalBasisHint,
    deletionMethod: "Automated deletion / anonymization",
  };
}

export function buildRetentionScheduleText(companyName: string, rows: RetentionRow[]): string {
  const name = companyName.trim() || "[Company Name]";
  const header = `${name} — Data Retention Schedule`;
  const gap = 2;
  const widthOf = (heading: string, values: string[]) => Math.max(heading.length, ...values.map((v) => v.length)) + gap;
  const colWidths = {
    category: widthOf("Data Category", rows.map((r) => r.label)),
    retention: widthOf("Retention Period", rows.map((r) => r.retention)),
    basis: widthOf("Legal Basis", rows.map((r) => r.legalBasis)),
  };

  const pad = (str: string, width: number) => str.padEnd(width);

  const lines: string[] = [header, "", pad("Data Category", colWidths.category) + pad("Retention Period", colWidths.retention) + pad("Legal Basis", colWidths.basis) + "Deletion Method"];
  const longestMethod = Math.max("Deletion Method".length, ...rows.map((r) => r.deletionMethod.length));
  lines.push("-".repeat(colWidths.category + colWidths.retention + colWidths.basis + longestMethod));

  for (const row of rows) {
    lines.push(
      pad(row.label, colWidths.category) +
        pad(row.retention, colWidths.retention) +
        pad(row.legalBasis, colWidths.basis) +
        row.deletionMethod
    );
  }

  lines.push("");
  lines.push(
    "--- This is a generic starting-point template, not legal advice. Actual retention periods should reflect your specific legal obligations, jurisdiction, and data processing agreements — have a lawyer or privacy officer review before adopting. ---"
  );

  return lines.join("\n");
}
