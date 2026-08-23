---
name: Resend sender verification
description: Resend requires a verified custom sending domain for reliable delivery to arbitrary recipients.
---

The email sender must use an address on a domain verified in Resend; consumer mailbox domains such as Gmail are rejected as unverified sender domains.

**Why:** Resend returned a provider validation error when a Gmail address was configured as the `from` sender.

**How to apply:** Keep the sender in environment configuration and require the project owner to verify their domain in Resend before enabling real lead submissions.