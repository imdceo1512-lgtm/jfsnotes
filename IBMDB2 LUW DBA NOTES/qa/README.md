# QA and release evidence

This folder contains course-authoring evidence, not learner chapters.

## Status

- Curriculum scope: 68 lessons, IDs A-01 through K-04, mapped to the supplied master prompt and available V4 microtopic audit.
- Baseline: Db2 LUW 12.1.0, Linux x86-64, single member, disposable lab assumed. Exact fix pack is unknown.
- Procedure status: every procedure is marked **NOT YET EXECUTED**. This workspace has no Db2 CLI or disposable Db2 server.
- Review: the authoring agent performed the role-perspective review in [role-review-matrix.md](./role-review-matrix.md). No independent human or IBM SME reviewed this package.
- Reference research: release-sensitive topics were checked against linked IBM 12.1 documentation; see [reference-validation.md](./reference-validation.md).
- Static checks: Markdown structure and links, HTML counterparts, and local HTML assets pass; see [release-validation.md](./release-validation.md). The validated package is copied to the requested T: destination; screenshot-based browser inspection and Db2 lab execution remain outstanding.

## Evidence files

- [Topic Depth Matrix](./topic-depth-matrix.md): one row per lesson with branches, commands, verification, diagnosis, diagram, lab, assessment, and references.
- [Microtopic coverage ledger](./coverage-ledger.md): leaf scopes linked to lesson sections.
- [Role review matrix](./role-review-matrix.md)
- [Reference validation](./reference-validation.md)
- [Release validation](./release-validation.md)
- [Build source](./build_course.mjs) and authored lesson data: lessons.mjs, lessons_ijk.mjs, lesson_overrides.mjs.

## Release limitation

This is an authored course package with static and generated-HTML checks. It is **not production runbook certification**: command execution, exact installed fix-pack validation, disposable recovery drills, screenshot-based browser review, and external independent review remain outstanding. The T: destination copy is recorded in [release-validation.md](./release-validation.md).
