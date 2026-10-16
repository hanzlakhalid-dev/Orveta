/**
 * Search-result wording (Stage 1.4).
 *
 * These are the titles and meta descriptions used for Google results and link
 * previews (Open Graph / Twitter). They are deliberately shorter than the text
 * shown on the pages themselves, which is NOT changed by anything in this file.
 * Titles omit the " | Orveta" suffix (the layout adds it). A tool or article with
 * no entry here falls back to its normal name/description.
 */

export interface SeoCopy {
  /** Shorter search title; omit to keep the tool name. */
  title?: string;
  description: string;
}

export const toolSeoCopy: Record<string, SeoCopy> = {
  "ooo-generator": {
    description: "Write a polished out-of-office email for vacation, sick leave, parental leave or conferences, in a tone that fits your workplace.",
  },
  "invoice-builder": {
    description: "Build a professional invoice or receipt with line items, tax and discounts, then download it as a ready-to-send PDF. Free, no sign-up.",
  },
  "rate-calculator": {
    description: "Turn your income goal, expenses and billable hours into the hourly and day rate you need, then into a project quote for your proposal.",
  },
  "meeting-cost-ticker": {
    description: "Enter attendees and average hourly wage, start the ticker, and watch a live estimate of what your meeting is costing.",
  },
  "serp-simulator": {
    description: "Preview how your title and description may look in Google results on desktop and mobile, with length warnings and a simulated AI Overview.",
  },
  "ecommerce-margin": {
    description: "Enter product, shipping and fee costs against your price to see gross margin plus the break-even and target-profit CPA and ROAS.",
  },
  "ad-campaign-engine": {
    description: "Enter spend, impressions, click-through and conversion rates to see CPM, CPC, CPA, revenue, ROAS and ROI update live.",
  },
  "utm-builder": {
    description: "Build correctly tagged UTM campaign links from source, medium, campaign, term and content, and save them in a list in your browser.",
  },
  "password-policy-builder": {
    title: "SOC 2 / ISO 27001 Password Policy Builder",
    description: "Pick SOC 2, ISO 27001, HIPAA, PCI DSS, GDPR or NIST 800-63B and get a combined password policy draft to copy or download.",
  },
  "privacy-policy-generator": {
    description: "Answer a few questions about your site to get a baseline privacy policy draft, a starting point to adapt and have reviewed.",
  },
  "password-strength-evaluator": {
    description: "Check a password's strength with an entropy-based score, a color meter, a checklist of what's missing, and a strong-password generator.",
  },
  "json-formatter": {
    description: "Paste messy or broken JSON to validate it, find syntax errors by line and column, and explore a collapsible tree. Copy formatted or minified.",
  },
  "wcag-checker": {
    description: "Check text and background colors for the WCAG contrast ratio, with AA and AAA pass/fail results for your font size and weight.",
  },
  "layout-playground": {
    description: "Switch between Flexbox and Grid, tweak direction, alignment, gap and items with live controls, and copy the CSS that builds the layout.",
  },
  "svg-to-data-uri": {
    description: "Drop in an SVG to get a base64 or URL-encoded data URI, a CSS background-image snippet and an HTML img tag, with live preview.",
  },
  "lease-calculator": {
    title: "Commercial Lease Rent Roll & Sq Ft Calculator",
    description: "Enter square footage, base rent, NNN expenses and annual escalations to see true monthly cost and a year-by-year rent roll.",
  },
  "mrr-retention": {
    description: "Enter starting, new, expansion, contraction and churned MRR to calculate net revenue retention, gross revenue retention and churn.",
  },
  "cap-table-simulator": {
    description: "Model SAFEs, convertible notes and priced rounds to see how founder ownership dilutes round by round, including the option pool.",
  },
  "tax-deduction-estimator": {
    title: "Freelance Tax Deduction & Mileage Estimator",
    description: "Log business trips and expenses for an estimated deduction, with mileage priced by trip date and meals limited to 50%. An estimate only.",
  },
  "equipment-lease-vs-buy": {
    description: "Compare the net present value of buying versus leasing equipment, including the depreciation tax shield and after-tax lease payments.",
  },
  "debt-payoff-planner": {
    description: "Enter your debts to compare snowball and avalanche payoff timelines side by side, with total interest and months to debt-free.",
  },
  "home-seller-proceeds": {
    description: "Enter sale price, mortgage payoff, commission, transfer tax and fees to estimate your net proceeds and closing costs before you sell.",
  },
  "nda-builder": {
    title: "Mutual Non-Disclosure Agreement (NDA) Builder",
    description: "Choose mutual or one-way, term and jurisdiction to get a plain-text baseline NDA draft to adapt. A starting point, not legal advice.",
  },
  "saml-jwt-decoder": {
    title: "SAML 2.0 / OAuth Payload Decoder & Inspector",
    description: "Paste a JWT or base64 SAML assertion to decode it in your browser into readable JSON or XML, with human-readable exp and iat times.",
  },
  "retention-schedule-builder": {
    description: "Pick the personal data you collect to build a data retention schedule with suggested periods. A starting point, not legal advice.",
  },
  "csp-generator": {
    description: "Check off allowed script, style, image and frame sources to build a Content-Security-Policy header, with warnings for risky settings.",
  },
  "contractor-classifier": {
    title: "Contractor vs. Employee Classification Evaluator",
    description: "Work through IRS-style behavioral, financial and relationship factors for a misclassification risk score. A starting point, not legal advice.",
  },
  "downtime-cost-estimator": {
    description: "Enter hourly transactions, order value and idled staff costs to estimate what an outage cost in total and per minute.",
  },
  "brand-name-search": {
    description: "Enter a brand name to get phonetic variants, lookalike spellings and wildcard terms to check against trademark databases.",
  },
  "pricing-margin-matrix": {
    description: "Enter cost of goods, target margin, ad cost target and payment fees to get the retail price that hits your margin after all costs.",
  },
  "safe-zone-visualizer": {
    title: "Social Video Ad Safe Zone Visualizer",
    description: "Preview vertical video against approximate TikTok, Reels and Shorts safe zones, plus a combined zone that clears all three.",
  },
  "quality-score-estimator": {
    title: "Google Ads Quality Score & Cost Estimator",
    description: "Rate expected CTR, ad relevance and landing page experience for an estimated Quality Score and its likely effect on CPC.",
  },
  "influencer-rate-calculator": {
    title: "Influencer Sponsorship Rate Calculator",
    description: "Enter platform, followers, engagement, niche and deliverables for an illustrative sponsorship rate, with package and usage-rights add-ons.",
  },
  "sitemap-builder": {
    description: "Paste a list of URLs to build a valid sitemap.xml, with priority and changefreq set by URL depth, editable per entry.",
  },
  "spf-dkim-validator": {
    description: "Paste an SPF or DKIM record to check its syntax, including the 10-lookup SPF limit, missing tags and invalid DKIM keys.",
  },
  "url-stripper": {
    description: "Paste a cluttered link to detect and remove tracking parameters like UTM tags, fbclid and gclid while keeping the ones you need.",
  },
  "curl-converter": {
    description: "Paste a cURL command to convert it into JavaScript fetch, Axios or Python requests code, with headers, body and basic auth carried over.",
  },
  "sql-formatter": {
    description: "Reformat messy single-line SQL into clean, multi-line queries with uppercase keywords, or collapse it back to one line.",
  },
  "yaml-json-converter": {
    description: "Convert YAML to indented JSON or JSON to readable YAML, with nested mappings, sequences and common scalar types handled.",
  },
  "aspect-ratio-calculator": {
    description: "Enter a width and height to get the simplified aspect ratio, its decimal value, the CSS aspect-ratio property and a padding-top fallback.",
  },
  "git-command-builder": {
    description: "Pick a scenario like undoing a commit, renaming a branch or squashing history, fill in the blanks, and copy the Git command.",
  },
  "docker-compose-formatter": {
    description: "Check a docker-compose.yml for deprecated version keys, tabs, bad indentation and services missing image or build, plus a cleaned copy.",
  },
  "regex-log-extractor": {
    description: "Paste log lines, write a regex with named groups, and get a table of matches you can export as CSV or JSON.",
  },
  "text-diff-checker": {
    description: "Compare two texts and see differences highlighted at line, word or character level, with counts of what was added and removed.",
  },
  "podcast-file-size-estimator": {
    description: "Estimate your episode's final file size from duration, channels and export settings, for MP3, AAC or WAV, plus download bandwidth.",
  },
  "csv-duplicate-cleaner": {
    description: "Choose which CSV columns define a duplicate, preview the rows that will be removed, then download or copy the cleaned file.",
  },
  "stream-bitrate-matrix": {
    description: "Pick Twitch or YouTube, resolution and frame rate to get recommended OBS bitrate, keyframe, rate control and profile settings.",
  },
  "case-converter": {
    description: "Turn any title into a URL slug, camelCase, PascalCase, snake_case, CONSTANT_CASE, Title Case and Sentence case, each with a copy button.",
  },
  "pdf-metadata-extractor": {
    description: "Drop in a PDF to see its page count, page size in points and inches, orientation and color spaces, read in your browser.",
  },
  "heading-hierarchy-auditor": {
    description: "Paste HTML to see every H1-H6 in order, with skipped levels, empty headings and missing or duplicate H1s flagged.",
  },
};

/** Shorter search/link-preview titles for blog articles (headline on the page is unchanged). */
export const blogSeoTitles: Record<string, string> = {
  "debt-snowball-vs-avalanche": "Debt Snowball vs. Avalanche: Which Saves More?",
  "safe-notes-explained": "SAFE Notes Explained: Valuation Cap and Discount",
  "irs-mileage-rate-2026": "2026 IRS Mileage Rate: Mid-Year Change Explained",
  "wcag-contrast-ratio-explained": "WCAG Contrast Ratios Explained: Why 4.5:1",
  "google-search-snippet-truncation": "Why Google Rewrites Your Meta Description",
};
