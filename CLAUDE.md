# vinkolsbygdegard.se — Agent Instructions

## Task Tracking

Always update grit task status as work progresses:
- `grit tasks update <id> --status=in_progress` before writing any code
- `grit tasks close <id>` after pushing

Never leave tasks in `open` or `in_progress` after the work is committed and pushed.

## Visual Artifacts

Frame names: `desktop/<page>` and `mobile/<page>`. No iteration prefixes (before/after/etc) — git history is the record.

Pages: home, evenemang, historik, styrelsen, medlem, hyra, kontakt, karta, kyrka, typografi
