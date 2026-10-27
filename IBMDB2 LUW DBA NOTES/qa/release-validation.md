# Release validation record

**Build date:** 2026-10-27
**Package:** Db2 LUW DBA Course, 12.1 baseline
**Build command:** node qa/build_course.mjs
**Static command:** node qa/validate_course.mjs

**Package state:** Authored, statically validated, archived/copied to the requested T: destination, and pushed to the GitHub feature branch below. Visual browser review and Db2 lab execution remain outstanding, so this is not production runbook certification.

## Checks

| Check | Result | Evidence |
|---|---|---|
| Lesson IDs | Pass | 68 unique IDs across A-01 through K-04. |
| Topic Depth Matrix | Pass | 68 unique lesson rows. |
| Coverage ledger | Pass | 68 unique entries linking scope to lesson sections. |
| Lesson structure | Pass | Required sections, procedure status/fields, and one Mermaid diagram per lesson. |
| Relative Markdown links | Pass | Local Markdown links and heading anchors resolve. |
| HTML counterparts and local assets | Pass | Every Markdown file has an HTML counterpart; local HTML links and assets resolve. |
| Code fences / diagram source | Pass | Static structure check only; one Mermaid source diagram per lesson. |
| Visual browser inspection | Not performed | The in-app browser rejected `file://` access under its protocol policy; no browser screenshot review is claimed. |
| Release-sensitive research | Consulted | IBM Db2 12.1 sources listed in reference-validation.md. |
| Procedure execution | Not performed | No Db2 CLI/server or disposable Db2 lab is installed in the available environment. |
| T: archive and deployment | Pass | Prior course files archived at `T:\Notes\IBMDB2 LUW DBA NOTES\archives\Db2_LUW_DBA_V3_PreReplacement_2026-10-27.zip` (77 entries); validated package copied to the exact target with 68 Markdown and 68 HTML lesson pages. |
| GitHub publish | Pass | Pushed to [`codex/db2-luw-dba-course-12.1`](https://github.com/imdceo1512-lgtm/notes/tree/codex/db2-luw-dba-course-12.1/IBMDB2%20LUW%20DBA%20NOTES); package commit `7ead79e`. `main` was not changed. |

## Limitations

All procedure cards are explicitly **NOT YET EXECUTED**. The course does not claim lab evidence, tested recovery durations, actual command output, or fix-pack-specific execution results. Confirm exact syntax, grants, topology, and prerequisites against the target system before operational use. The generated HTML received static link/asset checks but not screenshot-based layout review.
