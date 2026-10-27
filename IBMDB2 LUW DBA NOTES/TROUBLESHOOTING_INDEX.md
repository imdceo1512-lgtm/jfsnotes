# Troubleshooting index

## A-01 Host, server, virtualization, capacity, and failure domains

- **Db2 latency rises while guest CPU appears idle.** — vCPU descheduling or contention on an oversubscribed host.; evidence: mpstat steal, hypervisor CPU ready, and Db2 per-EDU deltas.. [Safe response](./A/A-01.md#7-diagnose-problems)
- **Failover host is nominally large but runs out of headroom.** — Capacity counted from installed size instead of usable post-failure capacity.; evidence: Peak CPU/memory demand plus all-active and failover topology.. [Safe response](./A/A-01.md#7-diagnose-problems)

## A-02 Linux identity, filesystems, permissions, limits, and services

- **A Db2 path returns permission denied despite write permission on the leaf.** — A parent directory lacks execute/traverse permission or an ACL mask removes rights.; evidence: id, namei -l, getfacl, mount flags, and process UID.. [Safe response](./A/A-02.md#7-diagnose-problems)
- **Service starts manually but not after reboot.** — Service manager does not load the interactive instance profile or starts before a required mount.; evidence: systemd unit, journal, environment/profile, dependency ordering, and account lookup.. [Safe response](./A/A-02.md#7-diagnose-problems)

## A-03 CPU, memory, process, paging, and Db2 EDU diagnosis

- **Load average is high but CPU idle and iowait is elevated.** — Tasks are blocked on I/O or locks, not runnable CPU demand.; evidence: vmstat blocked queue, iostat latency, `db2pd -wlocks`, and `-applications`.. [Safe response](./A/A-03.md#7-diagnose-problems)
- **Db2 process is killed or host swaps during a busy period.** — Host/cgroup limit or concurrent memory consumers exceed headroom.; evidence: kernel journal OOM records, cgroup memory.events, Db2 memory sets, and process RSS.. [Safe response](./A/A-03.md#7-diagnose-problems)

## A-04 Storage, filesystems, multipath, capacity, and I/O diagnosis

- **Archive creation fails although `df -h` reports free space.** — Inode exhaustion or unusable mount/permission, rather than block capacity.; evidence: `df -i`, archive destination permissions, mount events, and db2diag archive message.. [Safe response](./A/A-04.md#7-diagnose-problems)
- **Filesystem remains full after a large file is removed.** — A process still holds a deleted file open.; evidence: `lsof +L1`, process FD list, and filesystem usage.. [Safe response](./A/A-04.md#7-diagnose-problems)

## A-05 Networking, DNS, ports, firewalls, time, and client/server evidence

- **TCP connection is refused immediately.** — No listener on the port or service not started/bound.; evidence: server `ss -ltnp`, service mapping, Db2 instance status and db2diag startup record.. [Safe response](./A/A-05.md#7-diagnose-problems)
- **TLS client rejects a valid server certificate.** — Trust store/name mismatch or clock skew.; evidence: client trust chain, certificate SAN/expiry, system time, client driver and TLS trace.. [Safe response](./A/A-05.md#7-diagnose-problems)

## H-01 Baselines, workload measurement, service objectives, and bottleneck isolation

- **Query timing improves only in first run.** — Cache warm-up or compilation excluded from later/first run inconsistently.; evidence: cache/warmup state, repeated trials, concurrency and statement cache.. [Safe response](./H/H-01.md#7-diagnose-problems)
- **Host CPU looks low but app latency high.** — Work blocked outside CPU service time.; evidence: wait categories, lock/log/network/client timing, queue delay and storage latency.. [Safe response](./H/H-01.md#7-diagnose-problems)

## H-02 Compilation, access plans, EXPLAIN tables, db2exfmt, and plan interpretation

- **EXPLAIN fails because explain tables are absent.** — Explain objects were not created for this identity/database.; evidence: current schema, SYSCAT.EXPLAIN tables and SQLSTATE.. [Safe response](./H/H-02.md#7-diagnose-problems)
- **Formatted plan is for a different statement or parameter value.** — Matching by “latest plan” alone is ambiguous or plan was captured under different context.; evidence: QUERYNO/QUERYTAG, statement text, package section and explain timestamp.. [Safe response](./H/H-02.md#7-diagnose-problems)

## H-03 Statistics, cardinality, skew, parameter markers, optimizer choices, and rebind

- **RUNSTATS completes but plan still estimates uniformly.** — Relevant skew/correlation not captured or query form prevents estimate use.; evidence: column group/distribution stats, statistics profile, EXPLAIN and predicate correlation.. [Safe response](./H/H-03.md#7-diagnose-problems)
- **REBIND improves one bind but regresses others.** — Parameter-sensitive predicates and one plan no longer suit all values.; evidence: REOPT choice, bind distribution, execution latency and package cache observations.. [Safe response](./H/H-03.md#7-diagnose-problems)

## H-04 Index and query design, read/write costs, and measured plan changes

- **Index added but query still scans table.** — Non-sargable expression/type mismatch or optimizer cost says scan cheaper.; evidence: EXPLAIN predicate matching, data types, statistics, leading key and selectivity.. [Safe response](./H/H-04.md#7-diagnose-problems)
- **Read query improves while batch writes slow down.** — Additional index maintenance cost outweighs read gain.; evidence: insert/update latency, log bytes, index pages, reorg and CPU.. [Safe response](./H/H-04.md#7-diagnose-problems)

## H-05 Locks, deadlocks, isolation, transaction design, and safe intervention

- **SQL0911N reason code reports deadlock victim.** — Opposite lock acquisition order creates cycle.; evidence: lock event, participants, statement order and transaction boundary.. [Safe response](./H/H-05.md#7-diagnose-problems)
- **Timeout count increases after raising LOCKTIMEOUT.** — Longer wait retains more queued work and memory/agents.; evidence: wait queue length, arrival rate, blocker duration and service latency.. [Safe response](./H/H-05.md#7-diagnose-problems)

## H-06 Bufferpools, sort, package cache, memory pressure, and competing consumers

- **Bufferpool hit ratio improves but end-to-end latency worsens.** — Larger pool uses memory needed by other components or misses are not bottleneck.; evidence: physical reads, CPU, page cleaner, memory-set pressure, paging and query p95.. [Safe response](./H/H-06.md#7-diagnose-problems)
- **Sort memory increase causes paging or OOM.** — Per-activity allocation multiplied by concurrency beyond host budget.; evidence: concurrent sorts, sort heap, database memory, cgroup usage and OOM logs.. [Safe response](./H/H-06.md#7-diagnose-problems)

## H-07 Workload management, I/O, utility contention, and maintenance tuning

- **All work lands in default service subclass.** — Classifier does not match real application identity/connection attributes.; evidence: client attributes, workload definition, priority/sequence and `MON_GET_WORKLOAD`.. [Safe response](./H/H-07.md#7-diagnose-problems)
- **Utility slows but user latency remains high.** — Storage saturation or utility competing for shared device.; evidence: device latency, queue depth, utility progress/phase and tablespace path.. [Safe response](./H/H-07.md#7-diagnose-problems)

## G-01 HA versus DR versus backup, failure domains, and service restoration objectives

- **HADR peer is healthy but both sites lose service during network/storage outage.** — Failure domains were assumed independent but share critical dependencies.; evidence: dependency map, common network/fabric/DNS and backup copy location.. [Safe response](./G/G-01.md#7-diagnose-problems)
- **DR test passes database takeover but app remains down.** — Database role recovery was mistaken for full service restoration.; evidence: DNS/VIP/client reroute, certificates, secrets, firewall, pools and external service state.. [Safe response](./G/G-01.md#7-diagnose-problems)

## G-02 HADR roles, states, synchronization modes, queues, and guarantees

- **Standby remains in REMOTE_CATCHUP.** — Standby is behind and transport or replay cannot catch up to generation rate.; evidence: send/receive/replay positions, archive fetch, network throughput and log generation.. [Safe response](./G/G-02.md#7-diagnose-problems)
- **HADR mode or peer window cannot be configured as requested.** — Mode/peer-window combination unsupported or parameters not loaded until START HADR.; evidence: DB CFG, mode compatibility and `db2pd -hadr` actual state.. [Safe response](./G/G-02.md#7-diagnose-problems)

## G-03 HADR setup, planned takeover, forced takeover gates, reintegration, and failback

- **Both sites appear to accept writes after forced takeover.** — Old primary was not fully disabled or fault monitor restarted it.; evidence: cluster manager, host fencing, HADR role on each host and application routes.. [Safe response](./G/G-03.md#7-diagnose-problems)
- **Old primary cannot reintegrate.** — Log streams diverged; automatic reintegration impossible.; evidence: db2diag consistency/LSN messages and new-primary log chain.. [Safe response](./G/G-03.md#7-diagnose-problems)

## G-04 HADR delay, log transport/replay diagnosis, and safe remediation

- **Standby receive queue stalls at capacity.** — Replay is stalled or log spool reached configured limit.; evidence: HADR flags, spool percentage/limit, standby log path free space and replay progress.. [Safe response](./G/G-04.md#7-diagnose-problems)
- **HADR disconnects intermittently while both hosts appear healthy.** — Network interruption, timeout too low or path changes.; evidence: TCP retransmits/latency, heartbeat timeout, firewall/NAT idle behavior and Db2 diagnostics.. [Safe response](./G/G-04.md#7-diagnose-problems)
- **Operator proposes forced takeover because replay lag increased.** — Queue interpreted as permission to fail over; takeover has RPO and split-brain risk.; evidence: sync mode, last received/replayed log, exact state and primary health/fencing.. [Safe response](./G/G-04.md#7-diagnose-problems)

## G-05 Q Replication and SQL Replication operations; keep CDC as a distinct product track

- **Q Capture is running but Q Apply lag grows.** — Queue bottleneck, Apply error/target constraint or target workload contention.; evidence: Q Capture log position, send/receive queue depth, Apply status/errors and target locks.. [Safe response](./G/G-05.md#7-diagnose-problems)
- **SQL Replication CD tables grow without pruning.** — Apply not advancing/prune set missing or subscription stopped.; evidence: Apply prune position, subscriptions, Capture status and CD table volume.. [Safe response](./G/G-05.md#7-diagnose-problems)
- **CDC target diverges after bulk operation.** — Bulk change was not mirrored or refresh was skipped.; evidence: subscription state, refresh/mirror point, event logs and source/target reconciliation.. [Safe response](./G/G-05.md#7-diagnose-problems)

## G-06 Separate DPF and pureScale architecture, command scope, failures, and labs

- **DPF query or utility is slow only on one partition.** — Uneven data placement or one host/storage bottleneck.; evidence: per-partition CPU/I/O, data skew, distribution map, FCM and utility state.. [Safe response](./G/G-06.md#7-diagnose-problems)
- **pureScale member restarts in restart light and does not serve work.** — Member is recovering elsewhere to release locks/restore consistency; restart-light instance does not accept new transactions.; evidence: db2instance output, member recovery state, home host and CF health.. [Safe response](./G/G-06.md#7-diagnose-problems)

## F-01 Circular/archive logging, log paths, sizing, log chains, and log-full diagnosis

- **SQL0964C and ADM1823E names an application handle.** — Large/long unit of work pins active log range.; evidence: transaction log metrics, UOW start/log use, member notification logs and rollback state.. [Safe response](./F/F-01.md#7-diagnose-problems)
- **Archive log path stops receiving files.** — Destination full, inaccessible, misconfigured or failing external vendor/API.; evidence: archive method, permissions, free blocks/inodes, archive utility logs and db2diag.. [Safe response](./F/F-01.md#7-diagnose-problems)

## F-02 RPO/RTO, backup design, retention, capacity, encryption, and restore rehearsal

- **Backup meets daily schedule but restore exceeds RTO.** — Policy optimized for backup completion, not recovery throughput/validation.; evidence: image sizes, restore bandwidth, log replay rate, key service and app startup timeline.. [Safe response](./F/F-02.md#7-diagnose-problems)
- **Retained images exist but needed log chain is missing.** — Retention pruned required base/log or copies are not independent.; evidence: history records, archive inventory, chain IDs and missing sequence list.. [Safe response](./F/F-02.md#7-diagnose-problems)

## F-03 Backup types and command selection: offline, online, full, incremental, delta, database, tablespace, LOAD copy, snapshot, and vendor media

- **Online backup is refused or cannot include required logs.** — Database is not recoverable or required log retrieval is unavailable.; evidence: archive mode, archive destination, utility messages and log chain.. [Safe response](./F/F-03.md#7-diagnose-problems)
- **Delta image exists but automatic restore chain fails.** — Delta restores require intervening successful backups; chain item pruned/misidentified.; evidence: LIST HISTORY, base/full timestamp, last-successful backup and missing image inventory.. [Safe response](./F/F-03.md#7-diagnose-problems)
- **Snapshot restore fails using normal REDIRECT options.** — Snapshot uses ACS/vendor path and excludes many RESTORE combinations.; evidence: image type/header, backup media API and restore restrictions.. [Safe response](./F/F-03.md#7-diagnose-problems)

## F-04 Backup execution, progress, history, image verification, and failure handling

- **Backup utility fails with destination I/O or full-media error.** — Filesystem/media manager capacity, permission or connection failure.; evidence: LIST UTILITIES, Db2 messages, mount/inodes, vendor session and target quota.. [Safe response](./F/F-04.md#7-diagnose-problems)
- **`db2ckbkp -h` passes but restore fails.** — Header check is structural and does not exercise restore engine/key/recovery path.; evidence: all image pieces, platform/version, encryption key, target capacity and restore diagnostics.. [Safe response](./F/F-04.md#7-diagnose-problems)

## F-05 Full and redirected restore, alternate targets, path changes, and post-restore validation

- **SQL1117N indicates rollforward pending.** — Image was online/recoverable and restore is awaiting log application.; evidence: restore message, log chain, current rollforward query and archived log retrieval.. [Safe response](./F/F-05.md#7-diagnose-problems)
- **Redirected restore reports container/path error or SQL2563W.** — A container mapping is missing, inaccessible or too small for restored data.; evidence: script path mapping, table-space sizes, storage groups, device/directory container type and db2diag.. [Safe response](./F/F-05.md#7-diagnose-problems)
- **Restore overwrites wrong database alias.** — Unsafe alias/REPLACE EXISTING option or target variable error.; evidence: command echo, catalog directory, database path and ticket target.. [Safe response](./F/F-05.md#7-diagnose-problems)

## F-06 Automatic/manual incremental and delta restore chains

- **Automatic incremental restore cannot build chain.** — Image/history dependency absent or incompatible chain.; evidence: db2ckrst output, history entries, image timestamps and missing storage objects.. [Safe response](./F/F-06.md#7-diagnose-problems)
- **Manual restore leaves target in inconsistent pending state.** — Wrong image sequence, target/base reversed or one intermediate missing.; evidence: per-command restore messages, image types/order and restore-pending state.. [Safe response](./F/F-06.md#7-diagnose-problems)

## F-07 Rollforward, end-of-logs, point-in-time recovery, STOP/COMPLETE decisions, and missing logs

- **SQL4970N or missing log sequence during rollforward.** — Archive retrieval failed, wrong chain/path, corrupt log or endpoint beyond available logs.; evidence: query status, expected next log, chain ID, archive catalog/retrieval and filename checksum.. [Safe response](./F/F-07.md#7-diagnose-problems)
- **Database opens but includes unwanted late transactions.** — PIT chosen after the bad commit or clock/timezone mismatch.; evidence: chosen timestamp, timezone conversion, PIT status and transaction commit time.. [Safe response](./F/F-07.md#7-diagnose-problems)

## F-08 Tablespace backup and recovery, online/offline behavior, and consistency checks

- **One tablespace remains restore-pending after restore.** — Data image incomplete, container too small or rollforward not completed.; evidence: tablespace state, restore messages, container capacity and missing log range.. [Safe response](./F/F-08.md#7-diagnose-problems)
- **Table-space PIT yields invalid referential business state.** — Related objects were recovered to different points.; evidence: cross-table constraints, related tablespaces and commit point alignment.. [Safe response](./F/F-08.md#7-diagnose-problems)

## F-09 Recovery failure drills, decision trees, legal next steps, evidence, and measured RTO

- **Candidate backup image is corrupt or incomplete.** — Storage/transfer corruption, missing stripe or wrong image object.; evidence: db2ckbkp, all media pieces, transfer checksum and second-copy inventory.. [Safe response](./F/F-09.md#7-diagnose-problems)
- **Required log unavailable and target cannot roll forward.** — Log pruned, archive outage or recovery metadata mismatch.; evidence: query status next log, archive system search, retention/key and archive failover.. [Safe response](./F/F-09.md#7-diagnose-problems)
- **Restore command rejects platform/version combination.** — Unsupported cross-platform restore family or release path.; evidence: image header level, server OS/architecture, fix pack and IBM compatibility docs.. [Safe response](./F/F-09.md#7-diagnose-problems)

## D-01 Authentication, operating-system identity, providers, and security plugins

- **SQL30082N authentication failure after directory maintenance.** — Group/user case mapping, directory outage, credential rotation mismatch, or plugin load issue.; evidence: client/server time, plugin logs, identity lookup, provider availability and sanitized db2diag.. [Safe response](./D/D-01.md#7-diagnose-problems)
- **User authenticates on one member but not another.** — Directory/cache/provider or case mapping differs by node.; evidence: NSS/LDAP lookup and plugin/config values on each host/member.. [Safe response](./D/D-01.md#7-diagnose-problems)

## D-02 Authorities, privileges, roles, groups, ownership, and effective access

- **DBA can manage objects but cannot query protected table.** — DBADM no longer automatically includes DATAACCESS in Db2 12.1.; evidence: 12.1 grant semantics, DBADM/DATAACCESS catalogs, RCAC/LBAC policy and session identity.. [Safe response](./D/D-02.md#7-diagnose-problems)
- **Dynamic query succeeds but static package fails authorization.** — Static SQL privilege checking follows package binding rules; group grants may differ.; evidence: package owner/bind options, group memberships at bind/runtime and effective privilege.. [Safe response](./D/D-02.md#7-diagnose-problems)

## D-03 Client catalogs, aliases, drivers, connection configuration, and reroute

- **SQL1013N for an alias used by the application.** — Alias is absent in that user’s client catalog or app uses another config file.; evidence: effective process user, DB2INSTANCE/client profile and database directory listing.. [Safe response](./D/D-03.md#7-diagnose-problems)
- **Failover reconnect works but transaction is duplicated.** — Driver/pool retries connection without business-level outcome check.; evidence: application idempotency key, commit outcome and client retry log.. [Safe response](./D/D-03.md#7-diagnose-problems)

## D-04 TLS, certificates, keystores, native database encryption, and backup encryption

- **Db2 will not start after SSL config change.** — Unreadable keystore/stash, invalid label or conflicting listener ports.; evidence: db2diag, keydb/stash paths, owner permissions, label, SSL_SVCENAME/SVCENAME and port binding.. [Safe response](./D/D-04.md#7-diagnose-problems)
- **Encrypted image cannot be restored on DR host.** — Recovery environment lacks correct key or key service/identity.; evidence: master key label, keystore type, key-manager reachability, image header and audit trail.. [Safe response](./D/D-04.md#7-diagnose-problems)
- **TLS validation fails after certificate rotation.** — Missing CA chain, mismatched hostname, expired cert or downlevel client.; evidence: client trust chain, SAN, time, driver TLS support and server label.. [Safe response](./D/D-04.md#7-diagnose-problems)

## D-05 Auditing, RCAC, masks, LBAC, and sensitive-data controls

- **Users see zero rows after activating row access control.** — Filter expression or identity mapping excludes all rows; activation may have occurred before a valid permission.; evidence: policy expression, session identity/group/role, commit state and per-role expected data.. [Safe response](./D/D-05.md#7-diagnose-problems)
- **Audit is configured but no records are available.** — Policy was not associated/committed, event category did not cover action or archive was not run.; evidence: SYSCAT.AUDITUSE, policy scope/status, commit, event category, db2audit logs and retention destination.. [Safe response](./D/D-05.md#7-diagnose-problems)
- **Sensitive result differs between application and DBA query.** — Data-centric filters apply to all access and identities differ.; evidence: SESSION_USER, RCAC expression, LBAC credentials, package identity and client role.. [Safe response](./D/D-05.md#7-diagnose-problems)

## D-06 Layer-by-layer security and connectivity failure diagnosis

- **SQL30081N transport error.** — Port blocked/unbound, endpoint stale, network reset, or TLS listener mismatch.; evidence: client protocol reason, DNS answer, TCP probe, listener, firewall and paired db2diag.. [Safe response](./D/D-06.md#7-diagnose-problems)
- **Connection succeeds but query returns no protected rows.** — Authorization/data filter is active, or connected database differs.; evidence: CURRENT SERVER/USER, role, RCAC/LBAC and audit controls.. [Safe response](./D/D-06.md#7-diagnose-problems)

## E-01 Incident scope, timeline, baseline, and evidence quality

- **Different teams report events in an impossible order.** — Host/client clock drift or local timezone conversion.; evidence: NTP status, timezone, log timestamp fields and collector clock.. [Safe response](./E/E-01.md#7-diagnose-problems)
- **Evidence bundle contains credentials or customer rows.** — Unfiltered trace/export or shell history included secrets.; evidence: Search filenames/output for tokens, authorization IDs and data values.. [Safe response](./E/E-01.md#7-diagnose-problems)

## E-02 db2diag.log, notification logs, diagnostic signatures, and FODC

- **db2diag.log appears incomplete after a long incident.** — Rotation removed logs outside configured span or evidence is in another instance path.; evidence: diagsize, rotated file names, DIAGPATH and FODC directory timestamps.. [Safe response](./E/E-02.md#7-diagnose-problems)
- **FODC collection consumes unexpected disk or contains sensitive material.** — Capture scope is wider than incident need or retained trace includes values.; evidence: collector status, destination size, file list and access controls.. [Safe response](./E/E-02.md#7-diagnose-problems)

## E-03 db2pd, monitor table functions, and snapshots

- **db2pd says database is not active on local member.** — Wrong host/member or database not active in local scope.; evidence: local catalog, active member list, command host and `db2instance -list`.. [Safe response](./E/E-03.md#7-diagnose-problems)
- **Monitor SQL returns an authorization error.** — Query identity lacks required monitor privilege or view access.; evidence: connected ID, monitor authority, function scope and SQLSTATE.. [Safe response](./E/E-03.md#7-diagnose-problems)

## E-04 Connections, applications, agents, transactions, and long-running work

- **`FORCE APPLICATION` returns but lock waits remain.** — Forced unit is rolling back or a different blocker remains.; evidence: rollback state, other blocker handles, lock tree and transaction age.. [Safe response](./E/E-04.md#7-diagnose-problems)
- **Aged transaction belongs to a connection pool and app denies ownership.** — Missing client attribution or leaked connection/work unit.; evidence: client metadata, app deployment/host, connection pool and request correlation ID.. [Safe response](./E/E-04.md#7-diagnose-problems)

## E-05 Event-monitor families, targets, lifecycle, storage, and interpretation

- **Event tables are empty although the event monitor is active.** — Monitor exists but capture was not enabled at required scope or event threshold was not met.; evidence: SYSCAT.EVENTMONITORS, SET EVENT MONITOR state, workload/database capture parameters, target/member.. [Safe response](./E/E-05.md#7-diagnose-problems)
- **Event monitor stops or misses events as disk fills.** — Output target full or storage growth unbounded.; evidence: file/table-space capacity, PCTDEACTIVATE/target status, overflow records.. [Safe response](./E/E-05.md#7-diagnose-problems)

## E-06 Db2/OS observability, metric definitions, alerts, and operational reporting

- **Dashboard appears normal but Db2 is slow.** — Telemetry gap or aggregation hid a hot member/tail latency.; evidence: scrape freshness, exporter errors, member labels and app latency source.. [Safe response](./E/E-06.md#7-diagnose-problems)
- **Alert storms on a counter reset after restart.** — Counter reset interpreted as a negative/huge rate.; evidence: process restart, counter monotonicity and scrape timestamps.. [Safe response](./E/E-06.md#7-diagnose-problems)

## C-01 SQL, transactions, isolation, SQLCODE, and SQLSTATE fundamentals

- **SQL0911N after a statement.** — Statement was selected as a deadlock victim or timed out waiting for a lock.; evidence: SQLSTATE, reason code/token, deadlock/timeout event, transaction age and blocker.. [Safe response](./C/C-01.md#7-diagnose-problems)
- **SQL0803N unique-key violation on insert.** — Duplicate key or application retry repeated a successful insert.; evidence: SQLCODE/SQLSTATE, constraint/index name, key values and existing row.. [Safe response](./C/C-01.md#7-diagnose-problems)

## C-02 Schemas, tables, data types, indexes, constraints, and dependencies

- **Application insert fails after adding NOT NULL column.** — Existing rows or insert statements do not provide a legal value.; evidence: SQLCODE/STATE, deploy order, default/generated behavior and application binds.. [Safe response](./C/C-02.md#7-diagnose-problems)
- **New index does not appear in chosen plan.** — Stale/missing stats, incompatible expression/type, or cost favors another access path.; evidence: statistics timestamp/cardinality, predicates/types and EXPLAIN output.. [Safe response](./C/C-02.md#7-diagnose-problems)

## C-03 Db2 catalogs, administrative views, monitor functions, and snapshots

- **Monitor query returns no rows while users report active sessions.** — Connected to wrong database/member or monitor function scope/privilege mismatch.; evidence: connection alias, monitor privilege, member scope and server identity.. [Safe response](./C/C-03.md#7-diagnose-problems)
- **Counter increased but team calls it a rate.** — Cumulative counter interpreted without a time interval.; evidence: two timestamped samples, database/member resets, metric definition.. [Safe response](./C/C-03.md#7-diagnose-problems)

## C-04 Tablespaces, storage groups, containers, AUTORESIZE, and space reclamation

- **SQL0289N reports no space available.** — Logical maximum, filesystem block/inode exhaustion or container path permission.; evidence: table-space state/utilization, max size, container and `df -h`/`df -i`.. [Safe response](./C/C-04.md#7-diagnose-problems)
- **Db2 frees extents but OS usage does not drop.** — Space is available inside container but not released from container/filesystem.; evidence: table-space HWM, container size, storage type and MON_GET_EXTENT_MOVEMENT_STATUS.. [Safe response](./C/C-04.md#7-diagnose-problems)

## C-05 EXPORT, IMPORT, LOAD, INGEST, db2move, and db2look

- **LOAD ends but target is read access only or load pending.** — Failed/interrupted LOAD or recovery-copy/logging condition.; evidence: LOAD messages/status, `ADMIN_GET_TAB_INFO`, utility history and recovery log config.. [Safe response](./C/C-05.md#7-diagnose-problems)
- **EXPORT/IMPORT totals differ or data is truncated.** — Format/encoding/column order loss or warning rows excluded from db2move list.; evidence: message files, code page/file modifiers, hidden columns, delimiters and key-level reconciliation.. [Safe response](./C/C-05.md#7-diagnose-problems)
- **INGEST retry duplicates or refuses restart.** — New restart identity used instead of CONTINUE, or original job already committed rows.; evidence: restart name state, target key counts and original job message.. [Safe response](./C/C-05.md#7-diagnose-problems)

## C-06 RUNSTATS, REORGCHK, table REORG, index REORG, types, phases, and monitoring

- **INPLACE REORG is paused/aborted or cannot resume.** — State file deleted/corrupt or table state/LSN changed; resume options may differ.; evidence: table reorg status, db2pd, diagnostic log, `.OLR` file existence and table life LSN.. [Safe response](./C/C-06.md#7-diagnose-problems)
- **Classic REORG runs out of temp/log space or blocks users at replacement.** — Shadow copy/log capacity inadequate or replacement access boundary not scheduled.; evidence: phase, temporary tablespace, log utilization, active scanners and application waits.. [Safe response](./C/C-06.md#7-diagnose-problems)
- **RECLAIM EXTENTS is rejected or no OS space appears free.** — Unsupported table type or internal reclaimed extents remain inside a container.; evidence: table organization, error reason, high-water, container type, filesystem size.. [Safe response](./C/C-06.md#7-diagnose-problems)
- **Index cleanup has no db2pd progress entry.** — Monitoring is documented not to show CLEANUP ONLY operation as running.; evidence: utility return/message, selected cleanup option and index page state.. [Safe response](./C/C-06.md#7-diagnose-problems)

## C-07 Integrity, pending states, exception tables, dependencies, and package maintenance

- **SQL0668N rejects access after ALTER TABLE.** — A pending state requires a documented utility or SET INTEGRITY completion step.; evidence: reason code, table state, db2diag and exact ALTER action.. [Safe response](./C/C-07.md#7-diagnose-problems)
- **Static package fails after object change while dynamic SQL works.** — Dependent package invalidated or its static section needs rebind.; evidence: package validity, dependency catalog, bind options and SQLCODE.. [Safe response](./C/C-07.md#7-diagnose-problems)

## B-01 Instances, databases, members, agents, and Db2 request path

- **`db2 connect` reaches an unexpected database.** — Wrong client copy/profile or alias resolves to a different endpoint.; evidence: db2level, `db2 get instance`, node/database directory and server identity.. [Safe response](./B/B-01.md#7-diagnose-problems)
- **Application is active but returns slowly.** — Request path is blocked downstream of listener/agent.; evidence: application handle, EDU state, package/statement, wait category and data/log path.. [Safe response](./B/B-01.md#7-diagnose-problems)

## B-02 Installation copies, licensing, instance creation, profiles, and service lifecycle

- **Installer returns success but `db2ilist` is empty.** — Binary installation completed but instance creation was not part of that method.; evidence: install logs, chosen installation method, instance inventory and owner/group setup.. [Safe response](./B/B-02.md#7-diagnose-problems)
- **Instance starts manually but not at boot.** — Service unit lacks environment or starts before data/log mounts.; evidence: service registration, owner profile, mount dependencies, journal/system log.. [Safe response](./B/B-02.md#7-diagnose-problems)

## B-03 Database creation, activation, connections, and configuration scope

- **GET DB CFG shows new value, but behavior does not change.** — Parameter is deferred until reactivation or requires instance restart.; evidence: current/delayed values, database activation, all connections, and parameter docs.. [Safe response](./B/B-03.md#7-diagnose-problems)
- **A setting differs across members or appears not to persist.** — Wrong scope or per-member behavior not included in the change plan.; evidence: member-aware config output, command scope, registry profile and start environment.. [Safe response](./B/B-03.md#7-diagnose-problems)

## B-04 CLP, SQL boundaries, command files, terminators, quoting, and safe workflows

- **SQL file is split inside a procedure or trigger.** — Default semicolon terminator conflicts with SQL compound body.; evidence: CLP echo, file terminators, and parser error line.. [Safe response](./B/B-04.md#7-diagnose-problems)
- **Script reports failure but later statements still execute.** — Command-file continuation semantics or shell pipeline discarded exit status.; evidence: CLP options, wrapper status handling and final object state.. [Safe response](./B/B-04.md#7-diagnose-problems)

## B-05 Agents, EDUs, units of work, and Db2 memory areas

- **A connection limit alert fires but CPU and active work remain low.** — Many idle persistent sessions rather than executing agent saturation.; evidence: agent pool state, connection concentration, app status, and workload classes.. [Safe response](./B/B-05.md#7-diagnose-problems)
- **Host begins swapping after a memory parameter increase.** — Database allocation exceeded safe physical/container headroom.; evidence: Db2 memory set growth, Linux reclaim/swap, cgroup limit and workload concurrency.. [Safe response](./B/B-05.md#7-diagnose-problems)

## B-06 Standalone, DPF, and pureScale architectures and operational boundaries

- **Command succeeds on one node but database remains inconsistent across a DPF target.** — Command was run at the wrong scope or one partition did not participate.; evidence: db2nodes.cfg, per-partition utility/status output, and catalog partition role.. [Safe response](./B/B-06.md#7-diagnose-problems)
- **pureScale member failure is mistaken for a partition failure.** — DPF and pureScale concepts were conflated.; evidence: `db2instance -list`, CF and cluster manager health, member recovery state.. [Safe response](./B/B-06.md#7-diagnose-problems)

## I-02 Fix packs, software maintenance, install copies, and topology sequencing

- **Instance will not start** — wrong copy, incomplete instance update, or missing OS prerequisite; evidence: installer logs, db2level, environment path, instance-update status, db2diag. [Safe response](./I/I-02.md#7-diagnose-problems)
- **Connections fail after update** — database upgrade omitted or incompatible client/runtime; evidence: SQLCODE, database upgrade state, db2diag, client/server levels. [Safe response](./I/I-02.md#7-diagnose-problems)

## I-03 Db2 upgrade planning, prechecks, execution, application tests, and fallback limits

- **Upgrade stops on a blocker** — unsupported object/path or unmet prerequisite; evidence: readiness log, SQLCODE, db2diag, object state, disk and log capacity. [Safe response](./I/I-03.md#7-diagnose-problems)
- **Database opens but one app regresses** — invalidated package or changed compatibility/optimizer behavior; evidence: package validity, driver, explain plan, SQL errors, transaction results. [Safe response](./I/I-03.md#7-diagnose-problems)

## I-04 Cross-platform migration, compatibility, logical movement, and reconciliation

- **Target rejects physical image** — cross-platform path unsupported; evidence: image header, OS/architecture, release, codeset, and restore message. [Safe response](./I/I-04.md#7-diagnose-problems)
- **Counts match but behavior differs** — logical migration omitted behavior-bearing objects; evidence: constraints, identity values, grants, routines, triggers, code page, and app transactions. [Safe response](./I/I-04.md#7-diagnose-problems)

## I-05 Federation, wrappers, servers, user mappings, nicknames, and pushdown diagnosis

- **Remote connection timeout** — DNS, firewall, TLS, mapping, remote outage, or timeout mismatch; evidence: SQLCODE/SQLSTATE, db2diag, masked options, network/TLS and source logs. [Safe response](./I/I-05.md#7-diagnose-problems)
- **Large remote scan** — predicate not pushed or statistics/type mismatch; evidence: explain output, remote SQL, nickname statistics, rows transferred, source plan. [Safe response](./I/I-05.md#7-diagnose-problems)

## J-01 Bash and ksh for Db2: quoting, environment, exit codes, signals, and secrets

- **Wrong instance reached** — scheduler loaded different environment; evidence: DB2INSTANCE, PATH, DB2DIR, profile, and db2level. [Safe response](./J/J-01.md#7-diagnose-problems)
- **Pipeline hides Db2 error** — only last pipeline status was checked; evidence: pipeline status and pipefail behavior. [Safe response](./J/J-01.md#7-diagnose-problems)

## J-02 Safe shell runbooks and bounded evidence collectors

- **Collector reports success with missing host** — pipeline/loop discarded partial failure; evidence: expected host list, per-host status, timeout, and aggregate exit status. [Safe response](./J/J-02.md#7-diagnose-problems)
- **Collector hangs or fills disk** — unbounded command or retry; evidence: process tree, timeout, output size, utility state, filesystem. [Safe response](./J/J-02.md#7-diagnose-problems)

## J-03 Python automation: subprocesses, drivers/CLI, timeouts, parsing, and secrets

- **Timeout leaves action ambiguous** — client lost response after server accepted action; evidence: timeout location, child PID, Db2 utility/activity status, target postcondition. [Safe response](./J/J-03.md#7-diagnose-problems)
- **Parser accepts malformed output** — stdout treated as success proof; evidence: encoding, truncation, stderr, exit code, required fields. [Safe response](./J/J-03.md#7-diagnose-problems)

## J-04 Testable, idempotent administrative automation and ambiguous timeouts

- **Duplicate administrative action** — retry ignored prior completed operation; evidence: run ID, utility history/status, lock owner, current state. [Safe response](./J/J-04.md#7-diagnose-problems)
- **Stale lock blocks future work** — process ended while server action may still run; evidence: lock owner PID/host/start time, lease, active Db2 operation. [Safe response](./J/J-04.md#7-diagnose-problems)

## J-05 Scheduling, alerting, dashboards, credentials, retries, and operational reports

- **Job fails after credential rotation** — dependent service was not updated; evidence: secret version, expiry, auth method, scheduler logs, Db2 auth evidence. [Safe response](./J/J-05.md#7-diagnose-problems)
- **Dashboard looks healthy with stale data** — collector failure retained previous green state; evidence: sample timestamp, collector status, row/member coverage. [Safe response](./J/J-05.md#7-diagnose-problems)
- **Retries overload Db2** — immediate unbounded retry amplifies outage; evidence: retry count, interval, connection load, page history. [Safe response](./J/J-05.md#7-diagnose-problems)

## J-06 Fleet automation, canaries, concurrency limits, per-target results, and rollback

- **Failed host is hidden** — parallel runner returned aggregate or last status only; evidence: expected host list, per-target exit, canary, result ledger. [Safe response](./J/J-06.md#7-diagnose-problems)
- **Rollout overloads storage** — parallelism ignored shared resource budget; evidence: active operations, I/O queue, member skew, schedule overlap. [Safe response](./J/J-06.md#7-diagnose-problems)

## K-01 Incident practicum: log full, locks, storage, and connectivity

- **SQL0964C continues after capacity change** — long transaction or archive failure still blocks reuse; evidence: active transaction, log config, archive destination, db2diag. [Safe response](./K/K-01.md#7-diagnose-problems)
- **Connectivity returns but commits fail** — TCP reachability mistaken for transaction readiness; evidence: route, TLS/auth, database, log/lock state, retries. [Safe response](./K/K-01.md#7-diagnose-problems)
- **SQL0911N or repeated lock victim in the incident report** — deadlock cycle or lock timeout causes rollback/retry load that may look like log pressure; evidence: SQLCODE/SQLSTATE, reason code, deadlock event, lock chain, UOW age, and app retry ID. [Safe response](./K/K-01.md#7-diagnose-problems)
- **SQL0289N or table-space extension failure** — table space or container cannot allocate required extent; evidence: table-space state, container path, AUTORESIZE/max size, filesystem blocks/inodes, and db2diag. [Safe response](./K/K-01.md#7-diagnose-problems)

## K-02 Recovery practicum: full, incremental, point-in-time, and tablespace recovery

- **Missing image/log in chain** — incomplete transfer, wrong chain, or archive unavailable; evidence: history/header, expected next log, checksum, key, chain ID. [Safe response](./K/K-02.md#7-diagnose-problems)
- **Recovered tablespace conflicts with related object** — related spaces restored to different points; evidence: space states, dependency map, commit timestamp, app validation. [Safe response](./K/K-02.md#7-diagnose-problems)
- **Encrypted image cannot be opened because key material is unavailable** — key escrow/credential or provider configuration is missing; evidence: image header, encryption options, key-manager audit, key label/version, and restore diagnostics. [Safe response](./K/K-02.md#7-diagnose-problems)
- **Wrong image or alias selected** — ambiguous filename or cross-member image selection; evidence: image header, database/member identity, timestamp, history, and target alias. [Safe response](./K/K-02.md#7-diagnose-problems)

## K-03 Availability/change practicum: HADR, upgrade, failover, and rollback decisions

- **Standby disconnected or replay lagging** — transport failure or replay bottleneck; evidence: HADR state, send/receive/replay position, db2diag, network and archive. [Safe response](./K/K-03.md#7-diagnose-problems)
- **Former primary may still accept writes** — dual-writer risk or stale route; evidence: old host state, fencing, route, storage lease and cluster control. [Safe response](./K/K-03.md#7-diagnose-problems)
- **HADR transition or upgrade gate is blocked** — upgrade in progress, unsupported sequence, or standby outside takeover-eligible state; evidence: HADR role/state, utility/upgrade status, log positions, db2diag, and fix-pack matrix. [Safe response](./K/K-03.md#7-diagnose-problems)

## K-04 Enterprise capstone: architecture, security, recovery, performance, and operations

- **Takeover succeeded but clients fail** — database role changed but route/trust dependency did not; evidence: role, fencing, DNS/load balancer, TLS trust, credentials, firewall, retries. [Safe response](./K/K-04.md#7-diagnose-problems)
- **Bad data propagated to standby** — HA confused with independent corruption recovery; evidence: replication mode/lag, transaction timeline, backup and PIT test. [Safe response](./K/K-04.md#7-diagnose-problems)

## I-01 Production change design, blast radius, stop criteria, rollback, and acceptance

- **Accepted change but no service effect** — wrong scope or deferred activation; evidence: target scope, effective value, activation, member, and app telemetry. [Safe response](./I/I-01.md#7-diagnose-problems)
- **Rollback restores value but not service** — consequences were not fully reversible; evidence: timeline, utilities, retries, route changes, and data effects. [Safe response](./I/I-01.md#7-diagnose-problems)

## I-06 Capacity planning and reference architectures with recovery/failover headroom

- **Normal load fits, failover saturates** — capacity modeled only for normal state; evidence: per-node demand, skew, replay, client routing, and app metrics. [Safe response](./I/I-06.md#7-diagnose-problems)
- **Space exists but restore misses RTO** — volume capacity mistaken for recovery throughput; evidence: image size, media/network throughput, logs, and restore time. [Safe response](./I/I-06.md#7-diagnose-problems)
