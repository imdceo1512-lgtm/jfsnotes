# Curriculum map

Db2 LUW DBA V3 — Fresh Course · Release 3.0.0 · Primary reference: Db2 LUW 12.1 · 68 lessons

The curriculum moves from host and instance fundamentals through routine administration, recovery, performance, availability, and senior operational design. Every lesson includes topic-specific commands, known errors and fixes, a diagram, a lab, and references.

## Phase A — Host, Linux, and operational readiness

- **A-01 — Host, Server, and Virtualization Context for Db2:** Relate host resources and failure domains to Db2 workload and service behavior.
- **A-02 — Linux Identity, Filesystems, Permissions, and Services:** Diagnose the identity and path permissions under which Db2 instance processes run.
- **A-03 — Linux CPU, Memory, and Process Diagnosis:** Read trends in scheduling, paging, process state, and resource limits without blaming a single high number.
- **A-04 — Linux Storage, Filesystems, and I/O Diagnosis:** Trace database paths to mounts/devices and separate capacity, inode, and latency incidents.
- **A-05 — Linux Networking, DNS, Ports, and Time:** Trace the client-to-server path and verify name resolution, routing, listener, firewall, and clock assumptions.

## Phase B — Db2 LUW foundations and architecture

- **B-01 — Db2 LUW Architecture: Instances, Databases, Members, and Agents:** Map Db2 logical boundaries and the process path from client request to database work.
- **B-02 — Installation, Instance Creation, Profiles, and Service Lifecycle:** Identify the active installation, create/manage instances, load the right environment, and start/stop services safely.
- **B-03 — Database Creation, Activation, Connections, and Configuration Scope:** Create a controlled database, connect to the correct alias, and distinguish configuration scope and effective values.
- **B-04 — CLP, Command Files, Terminators, and Safe Workflows:** Use Db2 CLP predictably in interactive sessions and scripts, preserving return codes and target identity.
- **B-05 — Db2 Agents, EDUs, Memory Areas, and Work Units:** Relate connections and transactions to agent work, engine threads, memory consumption, and saturation.
- **B-06 — Db2 Topology: Standalone, DPF, and pureScale:** Identify database topology and learn how topology changes command scope, failure domains, and recovery operations.

## Phase C — SQL, catalog, objects, storage, and utilities

- **C-01 — SQL and Transaction Fundamentals for DBAs:** Use controlled SQL to inspect and change data while understanding transaction boundaries, isolation, and error recovery.
- **C-02 — Schemas, Tables, Indexes, Constraints, and Dependencies:** Create and inspect Db2 objects while preserving keys, dependency order, and application contracts.
- **C-03 — Db2 Catalogs and Administrative Interfaces:** Choose metadata and monitoring interfaces for inventory, state, and activity questions.
- **C-04 — Tablespaces, Storage Groups, Containers, and AUTORESIZE:** Map database objects to storage, understand growth boundaries, and diagnose capacity problems.
- **C-05 — Data Movement: LOAD, IMPORT, EXPORT, and INGEST:** Select a transfer utility by volume, logging, constraint behavior, restartability, and recovery obligations.
- **C-06 — Statistics, RUNSTATS, REORGCHK, and REORG Operations:** Refresh optimizer evidence and decide when physical reorganization is justified.
- **C-07 — Integrity, Dependencies, and Safe Object Maintenance:** Resolve integrity pending and invalid-object conditions with controlled validation and dependency-aware checks.

## Phase D — Security and connectivity

- **D-01 — Authentication Architecture and Operating-System Boundaries:** Trace identity from client credentials through the server authentication plug-in and host account/group resolution.
- **D-02 — Authorities, Privileges, Roles, Groups, and Effective Access:** Grant the smallest practical access set and verify effective rights across direct grants, roles, groups, and ownership.
- **D-03 — Client Catalogs, Drivers, Aliases, and Remote Connections:** Build and test a remote connection path from client catalog entries through DNS and service port to the database.
- **D-04 — TLS, Certificates, Keystores, and Native Encryption:** Configure encrypted client/server transport and maintain certificate trust as an operational dependency.
- **D-05 — Security Auditing, Row and Column Controls, and Sensitive Data:** Apply auditable policies and data restrictions with evidence that matches the organization’s control objectives.
- **D-06 — Security and Connectivity Failures: Diagnose by Layer:** Resolve authorization, catalog, DNS, port, TLS, and identity failures using the error token and connection path.

## Phase E — Monitoring, diagnostics, and incident evidence

- **E-01 — Incident Scope, Timeline, Baseline, and Evidence Quality:** Build a reliable incident record that ties impact, time, hypotheses, and evidence to the right Db2 environment.
- **E-02 — db2diag.log, Notification Logs, and Diagnostic Signatures:** Read Db2 diagnostic records by time, severity, process, member, and message tokens.
- **E-03 — db2pd, Snapshots, and Monitor Table Functions:** Choose current-state tools and monitor functions for application, workload, database, and utility questions.
- **E-04 — Connections, Applications, Agents, Transactions, and Long-Running Work:** Find the application that owns work, distinguish idle from executing activity, and identify transaction age and waits.
- **E-05 — Event Monitors and Workload Evidence:** Capture historical activity, locking, or statement evidence with an explicit data and overhead budget.
- **E-06 — Db2 and OS Observability, Metrics, and Operational Reporting:** Combine database counters with host resource signals and define dashboards with units, scope, freshness, and thresholds.

## Phase F — Logging, backup, restore, and recovery

- **F-01 — Db2 Logging and Recoverability:** Read the log lifecycle, recoverability switches, active-log sizing, archive destinations, and the path from committed changes to recoverable data.
- **F-02 — Recovery Objectives and Backup Design:** Turn business recovery goals into image, log, retention, capacity, security, and rehearsal decisions.
- **F-03 — Backup Types and Command Selection:** Choose offline/online, full, incremental, delta, tablespace, or snapshot approaches using their distinct recovery costs.
- **F-04 — Run, Monitor, Catalog, and Verify Backups:** Follow a backup from command submission through utility completion, history, image inspection, and a separate restore drill.
- **F-05 — Full Restore and Redirected Restore:** Restore a selected full image to a controlled target and relocate containers when the original paths are unavailable.
- **F-06 — Incremental and Delta Restore Chains:** Restore cumulative and noncumulative image chains in order and resolve automatic chain discovery failures safely.
- **F-07 — Rollforward and Point-in-Time Recovery:** Apply logs to end-of-logs or a chosen recovery time, and make the terminal completion decision deliberately.
- **F-08 — Tablespace Backup and Recovery:** Recover a damaged or offline tablespace while preserving whole-database consistency and object dependencies.
- **F-09 — Recovery Failure Drills and Runbooks:** Use state, image, log, and data evidence to resolve recovery faults without improvising destructive commands.

## Phase G — High availability, disaster recovery, and replication

- **G-01 — HA/DR Architecture and Failure Domains:** Choose complementary availability controls by mapping failures to service impact, RPO, and RTO.
- **G-02 — HADR Architecture, Roles, States, and Synchronization Modes:** Read HADR role/state, log shipping and replay position, synchronization guarantees, and takeover readiness.
- **G-03 — HADR Setup, Planned Takeover, Failover, and Reintegration:** Prepare an HADR pair, prove planned role switching, and define the separate forced-failover and old-primary recovery paths.
- **G-04 — HADR Delay and State Troubleshooting:** Diagnose transport, log shipping, and replay delays without making a takeover decision from one status field.
- **G-05 — Q Replication and SQL Replication Operations:** Monitor capture/apply latency and exceptions, and reconcile target data after replication disruptions.
- **G-06 — DPF and pureScale Operational Models:** Recognize distributed partition and shared-data cluster topology and apply the right command scope.

## Phase H — SQL performance, concurrency, and maintenance

- **H-01 — Performance Method: Baseline, Workload, and Bottleneck Isolation:** Use repeatable workload evidence to distinguish database, host, storage, concurrency, and client bottlenecks.
- **H-02 — SQL Compilation, Access Plans, EXPLAIN, and db2exfmt:** Capture and read the optimizer access plan to locate scans, joins, sorts, estimates, and costly operators.
- **H-03 — Statistics, Cardinality, Parameter Markers, and Optimizer Decisions:** Diagnose estimate errors, skew, and parameter-sensitive plans using targeted statistics and controlled compilation.
- **H-04 — Index and Query Design:** Design indexes from filtering, joining, ordering, and write workload evidence, then measure their read and write costs.
- **H-05 — Locks, Deadlocks, Isolation, and Transaction Design:** Diagnose lock waits and deadlocks, then shorten or reorder transactions without weakening required consistency.
- **H-06 — Bufferpools, Sort, Package Cache, and Memory Pressure:** Use bufferpool, sort, package-cache, and host signals to identify memory pressure before resizing heaps.
- **H-07 — Workload Management, I/O, and Maintenance Tuning:** Use workload classes and service metrics to isolate noisy neighbors, utility contention, and persistent I/O limits.

## Phase I — Change, upgrades, migration, and architecture

- **I-01 — Production Change Design and Control:** Turn a Db2 change request into a bounded, reversible, verifiable implementation plan.
- **I-02 — Fix Packs and Software Maintenance:** Plan Db2 copy maintenance with instance, cluster, application, add-on, and rollback constraints explicit.
- **I-03 — Db2 Upgrade Planning and Execution:** Prepare and upgrade a supported Db2 instance/database with precheck, compatibility, HADR, and post-upgrade gates.
- **I-04 — Cross-Platform Migration and Data Portability:** Select backup/restore or logical movement based on platform family, Db2 level, data types, and application dependencies.
- **I-05 — Federation, Wrappers, Servers, User Mappings, and Nicknames:** Query remote data through Db2 Federation while checking pushdown, credentials, transaction boundaries, and network cost.
- **I-06 — Capacity Planning and Reference Architecture:** Forecast database and host demand from observed growth, workload peaks, and recovery/availability requirements.

## Phase J — Automation, observability, and operational excellence

- **J-01 — Bash and ksh for Db2 Operations:** Write shell commands that preserve arguments, return codes, safe paths, and the Db2 instance environment.
- **J-02 — Shell DBA Runbooks and Collectors:** Build a read-only collector with an allowlisted target, timeout, private output, and structured timestamps.
- **J-03 — Python DBA Automation: Subprocess, CLI, and Structured Results:** Invoke approved Db2 tools with argument arrays, timeouts, structured results, and safe secret handling.
- **J-04 — Testable and Idempotent Administrative Automation:** Design repeatable runbooks that converge on intended state, handle partial failure, and stop on unknown results.
- **J-05 — Scheduling, Alerting, Dashboards, and Operational Reporting:** Schedule Db2 jobs with missed-run handling and build actionable alerts tied to service objectives.
- **J-06 — Fleet Automation and Runbook Integration:** Coordinate multi-instance operations with inventory, concurrency limits, canaries, independent status, and ticket evidence.

## Phase K — Senior DBA scenarios and capstone

- **K-01 — Incident Practicum: Log Full, Locks, Storage, and Connectivity:** Resolve four competing incident signals with read-only evidence, safe tests, and service-level proof.
- **K-02 — Recovery Practicum: Full, Incremental, Point-in-Time, and Tablespace:** Select an exact image chain and practice recovery-state handling under wrong-target and missing-log traps.
- **K-03 — Availability and Change Practicum: HADR, Upgrade, and Rollback:** Choose a safe path across a planned outage, a primary-site failure, and a forward-only software upgrade.
- **K-04 — Enterprise DBA Capstone: Architecture, Recovery, Security, and Operations:** Design and defend an evidence-based Db2 service from deployment through incident recovery and ongoing operations.
