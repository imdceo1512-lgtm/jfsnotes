# Curriculum map — 68 lesson route

Primary baseline is Db2 LUW 12.1.0 on Linux x86-64 with a disposable single-member database. Progress from host operations to incident leadership. DPF and pureScale are treated as distinct topology branches where their commands or failure modes differ.

| Domain | Scope | Lessons | Index |
|---|---|---:|---|
| A | Host, Linux, and operational readiness | 5 | [Open domain](./A/README.md) |
| B | Db2 LUW foundations and architecture | 6 | [Open domain](./B/README.md) |
| C | SQL, catalogs, objects, storage, and utilities | 7 | [Open domain](./C/README.md) |
| D | Security and connectivity | 6 | [Open domain](./D/README.md) |
| E | Monitoring, diagnostics, and incident evidence | 6 | [Open domain](./E/README.md) |
| F | Logging, backup, restore, and recovery | 9 | [Open domain](./F/README.md) |
| G | HA/DR, replication, and topology operations | 6 | [Open domain](./G/README.md) |
| H | SQL performance, concurrency, and maintenance | 7 | [Open domain](./H/README.md) |
| I | Change, upgrades, migration, and architecture | 6 | [Open domain](./I/README.md) |
| J | Automation and operational engineering | 6 | [Open domain](./J/README.md) |
| K | Senior DBA scenarios and capstone | 4 | [Open domain](./K/README.md) |

## Lesson sequence

- [A-01 — Host, server, virtualization, capacity, and failure domains](./A/A-01.md)
- [A-02 — Linux identity, filesystems, permissions, limits, and services](./A/A-02.md)
- [A-03 — CPU, memory, process, paging, and Db2 EDU diagnosis](./A/A-03.md)
- [A-04 — Storage, filesystems, multipath, capacity, and I/O diagnosis](./A/A-04.md)
- [A-05 — Networking, DNS, ports, firewalls, time, and client/server evidence](./A/A-05.md)
- [H-01 — Baselines, workload measurement, service objectives, and bottleneck isolation](./H/H-01.md)
- [H-02 — Compilation, access plans, EXPLAIN tables, db2exfmt, and plan interpretation](./H/H-02.md)
- [H-03 — Statistics, cardinality, skew, parameter markers, optimizer choices, and rebind](./H/H-03.md)
- [H-04 — Index and query design, read/write costs, and measured plan changes](./H/H-04.md)
- [H-05 — Locks, deadlocks, isolation, transaction design, and safe intervention](./H/H-05.md)
- [H-06 — Bufferpools, sort, package cache, memory pressure, and competing consumers](./H/H-06.md)
- [H-07 — Workload management, I/O, utility contention, and maintenance tuning](./H/H-07.md)
- [G-01 — HA versus DR versus backup, failure domains, and service restoration objectives](./G/G-01.md)
- [G-02 — HADR roles, states, synchronization modes, queues, and guarantees](./G/G-02.md)
- [G-03 — HADR setup, planned takeover, forced takeover gates, reintegration, and failback](./G/G-03.md)
- [G-04 — HADR delay, log transport/replay diagnosis, and safe remediation](./G/G-04.md)
- [G-05 — Q Replication and SQL Replication operations; keep CDC as a distinct product track](./G/G-05.md)
- [G-06 — Separate DPF and pureScale architecture, command scope, failures, and labs](./G/G-06.md)
- [F-01 — Circular/archive logging, log paths, sizing, log chains, and log-full diagnosis](./F/F-01.md)
- [F-02 — RPO/RTO, backup design, retention, capacity, encryption, and restore rehearsal](./F/F-02.md)
- [F-03 — Backup types and command selection: offline, online, full, incremental, delta, database, tablespace, LOAD copy, snapshot, and vendor media](./F/F-03.md)
- [F-04 — Backup execution, progress, history, image verification, and failure handling](./F/F-04.md)
- [F-05 — Full and redirected restore, alternate targets, path changes, and post-restore validation](./F/F-05.md)
- [F-06 — Automatic/manual incremental and delta restore chains](./F/F-06.md)
- [F-07 — Rollforward, end-of-logs, point-in-time recovery, STOP/COMPLETE decisions, and missing logs](./F/F-07.md)
- [F-08 — Tablespace backup and recovery, online/offline behavior, and consistency checks](./F/F-08.md)
- [F-09 — Recovery failure drills, decision trees, legal next steps, evidence, and measured RTO](./F/F-09.md)
- [D-01 — Authentication, operating-system identity, providers, and security plugins](./D/D-01.md)
- [D-02 — Authorities, privileges, roles, groups, ownership, and effective access](./D/D-02.md)
- [D-03 — Client catalogs, aliases, drivers, connection configuration, and reroute](./D/D-03.md)
- [D-04 — TLS, certificates, keystores, native database encryption, and backup encryption](./D/D-04.md)
- [D-05 — Auditing, RCAC, masks, LBAC, and sensitive-data controls](./D/D-05.md)
- [D-06 — Layer-by-layer security and connectivity failure diagnosis](./D/D-06.md)
- [E-01 — Incident scope, timeline, baseline, and evidence quality](./E/E-01.md)
- [E-02 — db2diag.log, notification logs, diagnostic signatures, and FODC](./E/E-02.md)
- [E-03 — db2pd, monitor table functions, and snapshots](./E/E-03.md)
- [E-04 — Connections, applications, agents, transactions, and long-running work](./E/E-04.md)
- [E-05 — Event-monitor families, targets, lifecycle, storage, and interpretation](./E/E-05.md)
- [E-06 — Db2/OS observability, metric definitions, alerts, and operational reporting](./E/E-06.md)
- [C-01 — SQL, transactions, isolation, SQLCODE, and SQLSTATE fundamentals](./C/C-01.md)
- [C-02 — Schemas, tables, data types, indexes, constraints, and dependencies](./C/C-02.md)
- [C-03 — Db2 catalogs, administrative views, monitor functions, and snapshots](./C/C-03.md)
- [C-04 — Tablespaces, storage groups, containers, AUTORESIZE, and space reclamation](./C/C-04.md)
- [C-05 — EXPORT, IMPORT, LOAD, INGEST, db2move, and db2look](./C/C-05.md)
- [C-06 — RUNSTATS, REORGCHK, table REORG, index REORG, types, phases, and monitoring](./C/C-06.md)
- [C-07 — Integrity, pending states, exception tables, dependencies, and package maintenance](./C/C-07.md)
- [B-01 — Instances, databases, members, agents, and Db2 request path](./B/B-01.md)
- [B-02 — Installation copies, licensing, instance creation, profiles, and service lifecycle](./B/B-02.md)
- [B-03 — Database creation, activation, connections, and configuration scope](./B/B-03.md)
- [B-04 — CLP, SQL boundaries, command files, terminators, quoting, and safe workflows](./B/B-04.md)
- [B-05 — Agents, EDUs, units of work, and Db2 memory areas](./B/B-05.md)
- [B-06 — Standalone, DPF, and pureScale architectures and operational boundaries](./B/B-06.md)
- [I-02 — Fix packs, software maintenance, install copies, and topology sequencing](./I/I-02.md)
- [I-03 — Db2 upgrade planning, prechecks, execution, application tests, and fallback limits](./I/I-03.md)
- [I-04 — Cross-platform migration, compatibility, logical movement, and reconciliation](./I/I-04.md)
- [I-05 — Federation, wrappers, servers, user mappings, nicknames, and pushdown diagnosis](./I/I-05.md)
- [J-01 — Bash and ksh for Db2: quoting, environment, exit codes, signals, and secrets](./J/J-01.md)
- [J-02 — Safe shell runbooks and bounded evidence collectors](./J/J-02.md)
- [J-03 — Python automation: subprocesses, drivers/CLI, timeouts, parsing, and secrets](./J/J-03.md)
- [J-04 — Testable, idempotent administrative automation and ambiguous timeouts](./J/J-04.md)
- [J-05 — Scheduling, alerting, dashboards, credentials, retries, and operational reports](./J/J-05.md)
- [J-06 — Fleet automation, canaries, concurrency limits, per-target results, and rollback](./J/J-06.md)
- [K-01 — Incident practicum: log full, locks, storage, and connectivity](./K/K-01.md)
- [K-02 — Recovery practicum: full, incremental, point-in-time, and tablespace recovery](./K/K-02.md)
- [K-03 — Availability/change practicum: HADR, upgrade, failover, and rollback decisions](./K/K-03.md)
- [K-04 — Enterprise capstone: architecture, security, recovery, performance, and operations](./K/K-04.md)
- [I-01 — Production change design, blast radius, stop criteria, rollback, and acceptance](./I/I-01.md)
- [I-06 — Capacity planning and reference architectures with recovery/failover headroom](./I/I-06.md)

See [coverage ledger](./qa/coverage-ledger.md) and [Topic Depth Matrix](./qa/topic-depth-matrix.md).
