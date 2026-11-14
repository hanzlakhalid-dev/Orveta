export interface ParsedCurl {
  method: string;
  url: string;
  headers: [string, string][];
  body: string | null;
  auth: { user: string; pass: string } | null;
  /** curl options that were recognised or skipped but not converted into the output code. */
  ignored: string[];
}

export type ConvertTarget = "fetch" | "axios" | "python";

/** Tokenizes a shell-style command line, respecting single/double quotes and backslash escapes. */
function tokenizeShellLike(input: string): string[] {
  const tokens: string[] = [];
  let i = 0;
  const n = input.length;

  while (i < n) {
    while (i < n && /\s/.test(input[i])) i++;
    if (i >= n) break;

    let token = "";
    let sawAnyChar = false;
    while (i < n && !/\s/.test(input[i])) {
      sawAnyChar = true;
      const ch = input[i];
      if (ch === "'") {
        i++;
        while (i < n && input[i] !== "'") {
          token += input[i];
          i++;
        }
        i++; // skip closing quote
      } else if (ch === '"') {
        i++;
        while (i < n && input[i] !== '"') {
          if (input[i] === "\\" && i + 1 < n && '"\\$`'.includes(input[i + 1])) {
            token += input[i + 1];
            i += 2;
          } else {
            token += input[i];
            i++;
          }
        }
        i++;
      } else if (ch === "\\" && i + 1 < n) {
        token += input[i + 1];
        i += 2;
      } else {
        token += ch;
        i++;
      }
    }
    if (sawAnyChar) tokens.push(token);
  }

  return tokens;
}

const NO_VALUE_FLAGS = new Set([
  "-G", "--get",
  "-k", "--insecure",
  "--compressed",
  "-s", "--silent",
  "-L", "--location",
  "-v", "--verbose",
  "-i", "--include",
  "-#", "--progress-bar",
  "-f", "--fail",
  "-N", "--no-buffer",
]);

/** Options that take a value but have no equivalent in the generated code. Their value must not be mistaken for the URL. */
const VALUE_FLAGS = new Set([
  "-o", "--output", "-m", "--max-time", "--connect-timeout", "-x", "--proxy", "--proxy-user", "-U",
  "--retry", "--retry-delay", "--retry-max-time", "--max-redirs", "-w", "--write-out",
  "-T", "--upload-file", "--cacert", "-E", "--cert", "--key", "-K", "--config", "--resolve",
  "--interface", "-r", "--range", "-C", "--continue-at", "--limit-rate", "-F", "--form", "--form-string",
  "-c", "--cookie-jar", "-D", "--dump-header", "--oauth2-bearer", "-y", "--speed-time", "-Y", "--speed-limit",
]);

/** Options that don't change the request, so they are skipped without a note. */
const COSMETIC_FLAGS = new Set([
  "-s", "--silent", "-v", "--verbose", "-#", "--progress-bar", "-N", "--no-buffer",
  "--compressed", "-i", "--include", "-f", "--fail",
]);

function urlEncodeLikeCurl(value: string): string {
  return encodeURIComponent(value).replace(/[!'()*]/g, (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase());
}

/** Applies curl's --data-urlencode rules to name=content, =content or content (name@file is left as typed). */
function dataUrlencode(part: string): string {
  const eq = part.indexOf("=");
  if (eq === -1) return urlEncodeLikeCurl(part);
  if (eq === 0) return urlEncodeLikeCurl(part.slice(1));
  return part.slice(0, eq) + "=" + urlEncodeLikeCurl(part.slice(eq + 1));
}

function looksLikeAddress(token: string): boolean {
  return /^[a-z][a-z0-9+.-]*:\/\//i.test(token) || /^(localhost|\d{1,3}(\.\d{1,3}){3}|[\w-]+(\.[\w-]+)+)(:\d+)?([/?#].*)?$/i.test(token);
}

/** Parses a curl command string into method, URL, headers, body, and basic auth. Returns null if no URL is found. */
export function parseCurl(raw: string): ParsedCurl | null {
  const cleaned = raw.trim().replace(/\\\r?\n/g, " ");
  if (!cleaned) return null;

  const tokens = tokenizeShellLike(cleaned);
  if (tokens.length === 0) return null;

  let i = tokens[0] === "curl" ? 1 : 0;

  let explicitUrl = "";
  const positionals: string[] = [];
  const ignored: string[] = [];
  const note = (flag: string) => {
    if (!ignored.includes(flag)) ignored.push(flag);
  };
  let isHead = false;
  let method: string | null = null;
  const headers: [string, string][] = [];
  const dataParts: string[] = [];
  let auth: { user: string; pass: string } | null = null;
  let useGet = false;
  let jsonFlag = false;

  while (i < tokens.length) {
    const t = tokens[i];

    if (t === "-X" || t === "--request") {
      method = tokens[i + 1] ?? method;
      i += 2;
      continue;
    }
    if (t === "-H" || t === "--header") {
      const raw = tokens[i + 1] ?? "";
      const idx = raw.indexOf(":");
      if (idx > -1) headers.push([raw.slice(0, idx).trim(), raw.slice(idx + 1).trim()]);
      i += 2;
      continue;
    }
    if (t === "-d" || t === "--data" || t === "--data-raw" || t === "--data-binary" || t === "--data-ascii") {
      dataParts.push(tokens[i + 1] ?? "");
      i += 2;
      continue;
    }
    if (t === "--data-urlencode") {
      dataParts.push(dataUrlencode(tokens[i + 1] ?? ""));
      i += 2;
      continue;
    }
    if (t === "--json") {
      dataParts.push(tokens[i + 1] ?? "");
      jsonFlag = true;
      i += 2;
      continue;
    }
    if (t === "-I" || t === "--head") {
      isHead = true;
      i += 1;
      continue;
    }
    if (t === "-u" || t === "--user") {
      const val = tokens[i + 1] ?? "";
      const idx = val.indexOf(":");
      auth = idx > -1 ? { user: val.slice(0, idx), pass: val.slice(idx + 1) } : { user: val, pass: "" };
      i += 2;
      continue;
    }
    if (t === "-b" || t === "--cookie") {
      headers.push(["Cookie", tokens[i + 1] ?? ""]);
      i += 2;
      continue;
    }
    if (t === "-A" || t === "--user-agent") {
      headers.push(["User-Agent", tokens[i + 1] ?? ""]);
      i += 2;
      continue;
    }
    if (t === "-e" || t === "--referer") {
      headers.push(["Referer", tokens[i + 1] ?? ""]);
      i += 2;
      continue;
    }
    if (t === "--url") {
      explicitUrl = tokens[i + 1] ?? explicitUrl;
      i += 2;
      continue;
    }
    if (t === "-G" || t === "--get") {
      useGet = true;
      i += 1;
      continue;
    }
    if (NO_VALUE_FLAGS.has(t)) {
      if (!COSMETIC_FLAGS.has(t)) note(t);
      i += 1;
      continue;
    }
    if (VALUE_FLAGS.has(t)) {
      note(t);
      i += 2;
      continue;
    }
    if (t.startsWith("-") && t.length > 1) {
      // Unrecognised option: skip only the option itself and report it. If it takes a value, the
      // address is still found below because we pick the token that looks like a URL.
      note(t);
      i += 1;
      continue;
    }

    positionals.push(t);
    i += 1;
  }

  let url =
    explicitUrl ||
    positionals.find((p) => /^[a-z][a-z0-9+.-]*:\/\//i.test(p)) ||
    positionals.find(looksLikeAddress) ||
    positionals[0] ||
    "";

  if (!url) return null;

  if (jsonFlag) {
    if (!hasHeader(headers, "content-type")) headers.push(["Content-Type", "application/json"]);
    if (!hasHeader(headers, "accept")) headers.push(["Accept", "application/json"]);
  }

  let body: string | null = dataParts.length > 0 ? dataParts.join("&") : null;

  if (useGet && body) {
    const sep = url.includes("?") ? "&" : "?";
    url = url + sep + body;
    body = null;
  }

  const finalMethod = (method ?? (isHead ? "HEAD" : body ? "POST" : "GET")).toUpperCase();

  return { method: finalMethod, url, headers, body, auth, ignored };
}

function hasHeader(headers: [string, string][], name: string): boolean {
  const lower = name.toLowerCase();
  return headers.some(([key]) => key.toLowerCase() === lower);
}

function base64Encode(str: string): string {
  if (typeof btoa === "function") return btoa(str);
  if (typeof Buffer !== "undefined") return Buffer.from(str, "utf-8").toString("base64");
  return str;
}

export function toFetch(parsed: ParsedCurl): string {
  const headerEntries: [string, string][] = [...parsed.headers];
  if (parsed.body && !hasHeader(headerEntries, "content-type")) {
    headerEntries.push(["Content-Type", "application/x-www-form-urlencoded"]);
  }
  if (parsed.auth) {
    headerEntries.push(["Authorization", `Basic ${base64Encode(`${parsed.auth.user}:${parsed.auth.pass}`)}`]);
  }

  const lines: string[] = [];
  lines.push(`fetch(${JSON.stringify(parsed.url)}, {`);
  lines.push(`  method: ${JSON.stringify(parsed.method)},`);
  if (headerEntries.length > 0) {
    lines.push(`  headers: {`);
    for (const [key, value] of headerEntries) {
      lines.push(`    ${JSON.stringify(key)}: ${JSON.stringify(value)},`);
    }
    lines.push(`  },`);
  }
  if (parsed.body) {
    lines.push(`  body: ${JSON.stringify(parsed.body)},`);
  }
  lines.push(`});`);

  return lines.join("\n");
}

export function toAxios(parsed: ParsedCurl): string {
  const headerEntries: [string, string][] = [...parsed.headers];
  if (parsed.body && !hasHeader(headerEntries, "content-type")) {
    headerEntries.push(["Content-Type", "application/x-www-form-urlencoded"]);
  }

  const lines: string[] = [];
  lines.push(`axios({`);
  lines.push(`  method: ${JSON.stringify(parsed.method.toLowerCase())},`);
  lines.push(`  url: ${JSON.stringify(parsed.url)},`);
  if (headerEntries.length > 0) {
    lines.push(`  headers: {`);
    for (const [key, value] of headerEntries) {
      lines.push(`    ${JSON.stringify(key)}: ${JSON.stringify(value)},`);
    }
    lines.push(`  },`);
  }
  if (parsed.body) {
    lines.push(`  data: ${JSON.stringify(parsed.body)},`);
  }
  if (parsed.auth) {
    lines.push(`  auth: {`);
    lines.push(`    username: ${JSON.stringify(parsed.auth.user)},`);
    lines.push(`    password: ${JSON.stringify(parsed.auth.pass)},`);
    lines.push(`  },`);
  }
  lines.push(`});`);

  return lines.join("\n");
}

function pyStr(value: string): string {
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

export function toPython(parsed: ParsedCurl): string {
  const headerEntries: [string, string][] = [...parsed.headers];
  if (parsed.body && !hasHeader(headerEntries, "content-type")) {
    headerEntries.push(["Content-Type", "application/x-www-form-urlencoded"]);
  }

  const args: string[] = [pyStr(parsed.url)];
  if (headerEntries.length > 0) {
    const headerLines = headerEntries.map(([key, value]) => `        ${pyStr(key)}: ${pyStr(value)},`).join("\n");
    args.push(`    headers={\n${headerLines}\n    }`);
  }
  if (parsed.body) {
    args.push(`    data=${pyStr(parsed.body)}`);
  }
  if (parsed.auth) {
    args.push(`    auth=(${pyStr(parsed.auth.user)}, ${pyStr(parsed.auth.pass)})`);
  }

  const methodFn = parsed.method.toLowerCase();
  const lines = ["import requests", "", `response = requests.${methodFn}(`];
  args.forEach((arg, idx) => {
    lines.push(idx === 0 ? `    ${arg},` : `${arg},`);
  });
  lines.push(")");
  lines.push("", "print(response.status_code)", "print(response.text)");

  return lines.join("\n");
}

export function convert(parsed: ParsedCurl, target: ConvertTarget): string {
  if (target === "fetch") return toFetch(parsed);
  if (target === "axios") return toAxios(parsed);
  return toPython(parsed);
}

export const sampleCurl = `curl -X POST https://api.example.com/v1/orders \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer sk_live_51H8x" \\
  -d '{"item_id": "sku_1029", "quantity": 2}'`;
