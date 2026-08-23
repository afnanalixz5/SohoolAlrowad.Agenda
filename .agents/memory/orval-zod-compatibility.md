---
name: Orval and Zod compatibility
description: OpenAPI formats can make the installed Zod v3 project fail after Orval code generation.
---

Avoid OpenAPI `format: email` and `type: integer` in schemas that Orval generates as Zod validators while the workspace uses Zod v3; Orval emits Zod 4-only helpers for those constructs.

**Why:** Code generation succeeded but the following library typecheck failed on unavailable `zod.email()` and `zod.int()` methods.

**How to apply:** Model those fields as plain strings or numbers in the spec, then enforce email and integer constraints in the route layer until the workspace upgrades its Zod runtime.