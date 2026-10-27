# Db2 LUW DBA V3 — Fresh Course

**Release:** 3.0.0
**Date:** 2026-10-27
**Primary reference:** IBM Db2 LUW 12.1

This is a fresh, self-contained training release for Db2 LUW database administrators. It covers host preparation, Db2 architecture, SQL and storage, access control, diagnosis, backup and recovery, high availability, performance, upgrades, automation, and senior DBA scenarios.

## Course contents

- **68 lessons** across phases A–K.
- **At least three worked examples per lesson** (208 total), with commands, prerequisites, and expected interpretation.
- **At least three lesson-specific failure cases per lesson**, each with likely cause, corrective action, and verification step.
- A hands-on lab, answer key, cleanup guidance, review question, and IBM or platform references in every lesson.
- Inline diagrams in every lesson, including decision flows and architecture maps; the course home includes the course-level architecture.
- Offline-capable HTML navigation, lesson search, print / Save PDF, and per-lesson HTML download.

## Browse the course

- [Open the course home](index.html) for the searchable phase list and course architecture.
- [Browse lessons by phase](modules/README.md) in Git folder view.
- [Open the lesson browser](modules/index.html) when served as a static site.
- [Read the curriculum map](CURRICULUM_MAP.md).

Lesson links are relative, so navigation works from the repository root and from the `modules/` directory. The repository browser renders the Markdown directory pages; the HTML course pages render when served by a static-site host such as GitHub Pages.

## Version and environment

Db2 LUW 12.1 is the primary command and documentation baseline. A lesson states Db2 11.5 compatibility only where checked. Linux/UNIX host examples assume Bash and common tools; some optional commands require packages such as `sysstat` or `netcat`. Replace sample database names, schemas, paths, hostnames, user IDs, image names, and timestamps with values from the target lab. A token such as `/db2backup/IMAGE_FILE` is a file-name placeholder, not an existing backup.

Commands were statically reviewed against IBM documentation and the relevant platform manuals. This workspace has no Db2 client/server, so the examples have not been executed against a live Db2 instance. Follow the authority and object prerequisites in each lesson, and rehearse changes in an isolated lab.

## Learning path

- **Phase A — Host, Linux, and operational readiness:** 5 lessons.
- **Phase B — Db2 LUW foundations and architecture:** 6 lessons.
- **Phase C — SQL, catalog, objects, storage, and utilities:** 7 lessons.
- **Phase D — Security and connectivity:** 6 lessons.
- **Phase E — Monitoring, diagnostics, and incident evidence:** 6 lessons.
- **Phase F — Logging, backup, restore, and recovery:** 9 lessons.
- **Phase G — High availability, disaster recovery, and replication:** 6 lessons.
- **Phase H — SQL performance, concurrency, and maintenance:** 7 lessons.
- **Phase I — Change, upgrades, migration, and architecture:** 6 lessons.
- **Phase J — Automation, observability, and operational excellence:** 6 lessons.
- **Phase K — Senior DBA scenarios and capstone:** 4 lessons.

## Release contents

The course release contains the course home, lesson HTML, curriculum map, and release note. Build source, audit logs, and work-in-progress material are excluded. The prebuilt ZIP is kept locally and ignored by Git.


## Git repository files

The repository includes `.gitattributes` for consistent text line endings, `.gitignore` for local/generated files, and `.nojekyll` for static hosting. The prebuilt ZIP remains available locally but is excluded from Git; use the repository host’s archive or release feature when you need a downloadable package.
