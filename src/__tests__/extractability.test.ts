import { test } from "bun:test";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { assertSeam } from "@bounded-systems/seam-check";

const SRC = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// policy is policy-as-data: a zero-import leaf of pure table lookups (tool ×
// state × role allowlists). The harness proves it imports nothing external and
// holds no ambient authority — decisions are deterministic, not I/O.
test("@bounded-systems/policy upholds its seam claim (zero-dependency leaf)", () => {
  assertSeam({
    root: SRC,
    prod: [],
    test: ["@bounded-systems/policy", "@bounded-systems/seam-check"],
  });
});
