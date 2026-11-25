// Describe Your Ex in One Word — entry: "Unsubscribed"
// One word, no punctuation tricks: the ex as a newsletter you finally
// cancelled. Instantly readable, and the joke lands with the word itself.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const entry = "Unsubscribed";

// Self-checking gate: the sealed scorer only accepts UTF-8 text of
// 1-111 characters, not only whitespace, and the judge weighs a single
// word. Fail loudly before writing anything if the entry breaks that.
function gate(text: string): void {
  const fail = (why: string): never => {
    console.error(`gate failed: ${why}`);
    process.exit(1);
  };
  if (text.length < 1 || text.length > 111) fail(`length ${text.length} outside 1-111`);
  if (text.trim().length === 0) fail("entry is only whitespace");
  if (text.includes("\n") || text.includes("\r")) fail("entry must be a single line");
  if (/\s/.test(text)) fail("entry must be exactly one word");
}

gate(entry);

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
console.log(entry);
