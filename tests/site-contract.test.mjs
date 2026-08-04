import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = join(root, "src/pages/index.astro");
const builtPath = join(root, "dist/index.html");
const runtimes = [
  "Node.js",
  "Python",
  "Ruby",
  "Bash",
  "Go",
  "Dart",
  "Erlang",
  "Elixir",
  "Java",
  "Gleam",
  "Rust",
  "browser automation",
];

function verifyPage(document, label) {
  assert.match(document, /twelve runtimes/i, `${label} must advertise the shipped runtime count`);
  assert.doesNotMatch(document, /ten runtimes/i, `${label} contains the stale runtime count`);
  for (const runtime of runtimes) {
    assert.ok(document.includes(runtime), `${label} omits the ${runtime} runtime`);
  }

  assert.match(
    document,
    /<link\s+rel=["']canonical["']\s+href=["']https:\/\/scintilla-run\.github\.io\/["']\s*\/?>/i,
    `${label} must publish one canonical HTTPS URL`,
  );
  assert.match(
    document,
    /<meta\s+name=["']referrer["']\s+content=["']no-referrer["']\s*\/?>/i,
    `${label} must not leak navigation referrers`,
  );
  assert.doesNotMatch(document, /http:\/\//i, `${label} contains a cleartext remote URL`);
  assert.doesNotMatch(document, /<script\b/i, `${label} must remain JavaScript-free`);

  const policy = /<meta\s+http-equiv=["']Content-Security-Policy["']\s+content=["']([^"']+)["']/i.exec(
    document,
  )?.[1];
  assert.ok(policy, `${label} has no in-document Content Security Policy`);
  for (const directive of [
    "default-src 'none'",
    "base-uri 'none'",
    "form-action 'none'",
    "object-src 'none'",
    "frame-src 'none'",
    "script-src 'none'",
    "connect-src 'none'",
    "worker-src 'none'",
  ]) {
    assert.ok(policy.includes(directive), `${label} CSP omits ${directive}`);
  }
  assert.doesNotMatch(policy, /unsafe-eval|unsafe-hashes|\*/i, `${label} CSP is unexpectedly permissive`);
}

test("source page is factual, static, and fail closed", () => {
  verifyPage(readFileSync(sourcePath, "utf8"), "source page");
});

test("built page preserves the source contract when dist exists", () => {
  if (!existsSync(builtPath)) {
    return;
  }
  verifyPage(readFileSync(builtPath, "utf8"), "built page");
});
