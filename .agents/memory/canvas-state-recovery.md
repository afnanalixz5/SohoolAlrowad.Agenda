---
name: Canvas frame recovery
description: A selected mockup frame can be absent from getCanvasState and may need restoration as a new live iframe.
---

When the canvas selection references a mockup but getCanvasState reports zero shapes, treat the board as empty and restore the preview as a new iframe rather than assuming the selected frame can be updated.

**Why:** The selected frame remained visible in conversation context while the canvas state callback returned no shapes.

**How to apply:** Use a fresh deterministic shape ID, create it in building state, update it live with the preview URL and suggestions, then present the artifact.