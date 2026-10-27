# Command and SQL index

Commands are for synthetic lab names. Each lesson states execution identity, target, required authority, expected result, independent verification, and stop boundary. All are **not yet executed** here.

## A-01 Host, server, virtualization, capacity, and failure domains

- `lscpu; numactl --hardware` — Guest CPU and NUMA inventory ([lesson](./A/A-01.md#5-do-the-work))
- `mpstat -P ALL 1 5` — Linux CPU sample ([lesson](./A/A-01.md#5-do-the-work))

## A-02 Linux identity, filesystems, permissions, limits, and services

- `id db2inst1; getent passwd db2inst1; getent group db2iadm1` — Identity resolution ([lesson](./A/A-02.md#5-do-the-work))
- `namei -l /db2data/SAMPLE; getfacl -p /db2data/SAMPLE` — Path traversal and modes ([lesson](./A/A-02.md#5-do-the-work))

## A-03 CPU, memory, process, paging, and Db2 EDU diagnosis

- `vmstat 1 5` — OS scheduler and paging sample ([lesson](./A/A-03.md#5-do-the-work))
- `db2pd -db SAMPLE -edus` — Db2 EDU view ([lesson](./A/A-03.md#5-do-the-work))

## A-04 Storage, filesystems, multipath, capacity, and I/O diagnosis

- `df -hP /db2data; df -iP /db2data; lsblk -f` — Capacity and inode check ([lesson](./A/A-04.md#5-do-the-work))
- `iostat -xz 1 5` — Device latency sample ([lesson](./A/A-04.md#5-do-the-work))

## A-05 Networking, DNS, ports, firewalls, time, and client/server evidence

- `getent ahosts db2host.example.net` — DNS resolution ([lesson](./A/A-05.md#5-do-the-work))
- `ss -ltnp; nc -vz db2host.example.net 50000` — Listener and TCP probe ([lesson](./A/A-05.md#5-do-the-work))
- `timedatectl status` — Clock and certificate window ([lesson](./A/A-05.md#5-do-the-work))

## H-01 Baselines, workload measurement, service objectives, and bottleneck isolation

- `SELECT member, total_cpu_time, total_app_rqsts, rows_read, rows_returned FROM TABLE(mon_get_database(-2)) AS d` — Capture interval database metrics ([lesson](./H/H-01.md#5-do-the-work))
- `db2batch -d SAMPLE -f /secure/lab/queries.sql -r /secure/lab/run.out` — Measure representative statement ([lesson](./H/H-01.md#5-do-the-work))

## H-02 Compilation, access plans, EXPLAIN tables, db2exfmt, and plan interpretation

- `EXPLAIN PLAN FOR SELECT order_id, total FROM APP.ORDERS WHERE customer_id = 7012;` — Capture a dynamic plan ([lesson](./H/H-02.md#5-do-the-work))
- `db2exfmt -d SAMPLE -1 -o /tmp/orders.plan -w -1` — Format latest explain instance ([lesson](./H/H-02.md#5-do-the-work))

## H-03 Statistics, cardinality, skew, parameter markers, optimizer choices, and rebind

- `RUNSTATS ON TABLE APP.ORDERS WITH DISTRIBUTION ON COLUMNS (REGION, STATUS) AND DETAILED INDEXES ALL` — Collect skew-aware statistics ([lesson](./H/H-03.md#5-do-the-work))
- `REBIND PACKAGE APP.ORDERQ REOPT ONCE` — Rebind a specific static package ([lesson](./H/H-03.md#5-do-the-work))

## H-04 Index and query design, read/write costs, and measured plan changes

- `CREATE INDEX APP.IX_ORDERS_REGION_DATE ON APP.ORDERS (region, created_at DESC) INCLUDE (order_id, total);` — Candidate composite index ([lesson](./H/H-04.md#5-do-the-work))
- `SELECT order_id, total FROM APP.ORDERS WHERE created_at >= TIMESTAMP('2026-10-01-00.00.00') AND created_at < TIMESTAMP('2026-11-01-00.00.00')` — Sargable date predicate ([lesson](./H/H-04.md#5-do-the-work))

## H-05 Locks, deadlocks, isolation, transaction design, and safe intervention

- `db2pd -db SAMPLE -wlocks -transactions; SELECT agent_id, lock_name, lock_wait_start_time FROM TABLE(mon_get_appl_lockwait(NULL,-2)) AS w` — Inspect current wait graph ([lesson](./H/H-05.md#5-do-the-work))
- `UPDATE DATABASE CONFIGURATION FOR SAMPLE USING LOCKTIMEOUT 30` — Set bounded lock wait timeout in lab ([lesson](./H/H-05.md#5-do-the-work))

## H-06 Bufferpools, sort, package cache, memory pressure, and competing consumers

- `db2pd -db SAMPLE -memsets; db2pd -db SAMPLE -bufferpools` — Inspect memory sets ([lesson](./H/H-06.md#5-do-the-work))
- `UPDATE DATABASE CONFIGURATION FOR SAMPLE USING sortheap 4096` — Change one lab consumer ([lesson](./H/H-06.md#5-do-the-work))

## H-07 Workload management, I/O, utility contention, and maintenance tuning

- `CREATE SERVICE CLASS REPORTS_SC; CREATE WORKLOAD REPORTS_WL SESSION_USER ('REPORTS') SERVICE CLASS REPORTS_SC` — Create workload mapping example ([lesson](./H/H-07.md#5-do-the-work))
- `iostat -xz 1 5; LIST UTILITIES SHOW DETAIL` — Measure device and utility impact ([lesson](./H/H-07.md#5-do-the-work))

## G-01 HA versus DR versus backup, failure domains, and service restoration objectives

- `db2pd -db SAMPLE -hadr; db2pd -db SAMPLE -members; db2 list history backup all for SAMPLE` — Topology evidence inventory ([lesson](./G/G-01.md#5-do-the-work))
- `RPO = incident time minus latest recoverable commit
RTO = detect + decide + recover + validate + route` — Failure objective worksheet ([lesson](./G/G-01.md#5-do-the-work))

## G-02 HADR roles, states, synchronization modes, queues, and guarantees

- `db2pd -db SAMPLE -hadr; SELECT hadr_role, hadr_state, hadr_syncmode, log_gap, standby_log_receive_queue_size, standby_log_replay_queue_size FROM TABLE(mon_get_hadr(NULL)) AS h` — Observe HADR roles and queues ([lesson](./G/G-02.md#5-do-the-work))
- `START HADR ON DB SAMPLE AS STANDBY; START HADR ON DB SAMPLE AS PRIMARY` — Start HADR in correct order ([lesson](./G/G-02.md#5-do-the-work))

## G-03 HADR setup, planned takeover, forced takeover gates, reintegration, and failback

- `TAKEOVER HADR ON DB SAMPLE` — Planned takeover ([lesson](./G/G-03.md#5-do-the-work))
- `TAKEOVER HADR ON DB SAMPLE BY FORCE` — Forced takeover after fencing ([lesson](./G/G-03.md#5-do-the-work))
- `START HADR ON DB SAMPLE AS STANDBY` — Old primary reintegration ([lesson](./G/G-03.md#5-do-the-work))

## G-04 HADR delay, log transport/replay diagnosis, and safe remediation

- `db2pd -db SAMPLE -hadr; sleep 10; db2pd -db SAMPLE -hadr` — HADR queue and state sample ([lesson](./G/G-04.md#5-do-the-work))
- `SELECT hadr_role, hadr_state, hadr_syncmode, log_gap, standby_log_receive_queue_size, standby_log_replay_queue_size FROM TABLE(mon_get_hadr(NULL)) AS h` — HADR monitor query ([lesson](./G/G-04.md#5-do-the-work))

## G-05 Q Replication and SQL Replication operations; keep CDC as a distinct product track

- `ASNCLP SESSION SET TO Q REPLICATION; SET SERVER CAPTURE TO DB SAMPLE; SET CAPTURE SCHEMA SOURCE ASN1; START QSUB SUBNAME ORDERS_QSUB;` — Start Q subscription from ASNCLP ([lesson](./G/G-05.md#5-do-the-work))
- `ASNCLP SESSION SET TO SQL REPLICATION; SET SERVER CAPTURE TO DB SAMPLE; SET CAPTURE SCHEMA ASN1;` — SQL Replication start/monitor boundary ([lesson](./G/G-05.md#5-do-the-work))
- `CDC Replication: stop mirroring for selected subscription, flag table for refresh, run product Start Refresh, then restart mirroring` — CDC subscription monitoring and refresh ([lesson](./G/G-05.md#5-do-the-work))

## G-06 Separate DPF and pureScale architecture, command scope, failures, and labs

- `cat $HOME/sqllib/db2nodes.cfg; db2_all "hostname; db2pd -inst"` — DPF partition inventory ([lesson](./G/G-06.md#5-do-the-work))
- `db2pd -db SAMPLE -rebal; SELECT * FROM TABLE(mon_get_rebalance_status(NULL,-2)) AS r` — DPF rebalance/redistribution monitoring ([lesson](./G/G-06.md#5-do-the-work))
- `db2instance -list` — pureScale cluster inventory ([lesson](./G/G-06.md#5-do-the-work))
- `db2pd -db SAMPLE -members; db2diag -H 1d` — pureScale member failure behavior ([lesson](./G/G-06.md#5-do-the-work))

## F-01 Circular/archive logging, log paths, sizing, log chains, and log-full diagnosis

- `db2 get db cfg for SAMPLE show detail; db2pd -db SAMPLE -logs` — Inspect current log configuration ([lesson](./F/F-01.md#5-do-the-work))
- `db2 update db cfg for SAMPLE using logarchmeth1 DISK:/db2archive/SAMPLE` — Configure a lab archive destination ([lesson](./F/F-01.md#5-do-the-work))
- `db2pd -db SAMPLE -transactions; db2 "select application_handle, uow_start_time, uow_log_space_used from table(mon_get_unit_of_work(null,-2)) as u"` — Diagnose a full active log ([lesson](./F/F-01.md#5-do-the-work))

## F-02 RPO/RTO, backup design, retention, capacity, encryption, and restore rehearsal

- `LIST HISTORY BACKUP ALL FOR SAMPLE` — Inspect backup history ([lesson](./F/F-02.md#5-do-the-work))
- `RPO_actual = incident_time - latest_recoverable_commit_time
RTO_actual = infrastructure + restore + rollforward + validation + routing` — RPO/RTO calculation example ([lesson](./F/F-02.md#5-do-the-work))

## F-03 Backup types and command selection: offline, online, full, incremental, delta, database, tablespace, LOAD copy, snapshot, and vendor media

- `BACKUP DATABASE SAMPLE TO /db2backup/offline COMPRESS` — Offline full database ([lesson](./F/F-03.md#5-do-the-work))
- `BACKUP DATABASE SAMPLE ONLINE TO /db2backup/online INCLUDE LOGS COMPRESS` — Online full with logs ([lesson](./F/F-03.md#5-do-the-work))
- `BACKUP DATABASE SAMPLE ONLINE INCREMENTAL TO /db2backup/inc; BACKUP DATABASE SAMPLE ONLINE INCREMENTAL DELTA TO /db2backup/delta` — Cumulative incremental and delta ([lesson](./F/F-03.md#5-do-the-work))
- `BACKUP DATABASE SAMPLE TABLESPACE (USERSPACE1) ONLINE TO /db2backup/ts` — Tablespace image ([lesson](./F/F-03.md#5-do-the-work))
- `LOAD FROM /tmp/items.del OF DEL INSERT INTO APP.ITEMS COPY YES TO /db2backup/loadcopy MESSAGES /tmp/items.load.msg` — LOAD copy path ([lesson](./F/F-03.md#5-do-the-work))
- `BACKUP DATABASE SAMPLE USE TSM OPEN 2 SESSIONS; BACKUP DATABASE SAMPLE USE SNAPSHOT` — Snapshot or vendor media ([lesson](./F/F-03.md#5-do-the-work))

## F-04 Backup execution, progress, history, image verification, and failure handling

- `LIST UTILITIES SHOW DETAIL; LIST HISTORY BACKUP ALL FOR SAMPLE` — Monitor backup utility ([lesson](./F/F-04.md#5-do-the-work))
- `db2ckbkp -h /db2backup/online/SAMPLE.0.db2inst1.DBPART000.20261027103000.001` — Inspect Db2 image header ([lesson](./F/F-04.md#5-do-the-work))

## F-05 Full and redirected restore, alternate targets, path changes, and post-restore validation

- `RESTORE DATABASE SAMPLE FROM /db2backup/offline TAKEN AT 20261027103000 INTO QA1` — Full alternate restore from image ([lesson](./F/F-05.md#5-do-the-work))
- `RESTORE DATABASE SAMPLE FROM /db2backup/offline TAKEN AT 20261027103000 INTO QA1 REDIRECT; SET STOGROUP PATHS FOR SG_HOT ON '/db2new/fast'; RESTORE DATABASE QA1 CONTINUE` — Redirected restore sequence ([lesson](./F/F-05.md#5-do-the-work))
- `ROLLFORWARD DATABASE QA1 TO END OF LOGS AND STOP OVERFLOW LOG PATH (/db2archive/SAMPLE)` — Roll forward and open restored database ([lesson](./F/F-05.md#5-do-the-work))

## F-06 Automatic/manual incremental and delta restore chains

- `RESTORE DATABASE SAMPLE INCREMENTAL AUTOMATIC TAKEN AT 20261027120000 FROM /db2backup/inc INTO QA2` — Automatic cumulative incremental restore ([lesson](./F/F-06.md#5-do-the-work))
- `RESTORE DATABASE SAMPLE INCREMENTAL TAKEN AT 20261027120000 FROM /db2backup/inc; RESTORE DATABASE SAMPLE INCREMENTAL TAKEN AT 20261027080000 FROM /db2backup/full; RESTORE DATABASE SAMPLE INCREMENTAL TAKEN AT 20261027100000 FROM /db2backup/inc` — Manual incremental sequence guide ([lesson](./F/F-06.md#5-do-the-work))

## F-07 Rollforward, end-of-logs, point-in-time recovery, STOP/COMPLETE decisions, and missing logs

- `ROLLFORWARD DATABASE QA1 QUERY STATUS` — Inspect rollforward boundary ([lesson](./F/F-07.md#5-do-the-work))
- `ROLLFORWARD DATABASE QA1 TO END OF LOGS OVERFLOW LOG PATH (/db2archive/SAMPLE); ROLLFORWARD DATABASE QA1 STOP` — Recover to end of available logs ([lesson](./F/F-07.md#5-do-the-work))
- `ROLLFORWARD DATABASE QA1 TO 2026-10-27-10.30.00.000000 AND STOP OVERFLOW LOG PATH (/db2archive/SAMPLE)` — Point-in-time recovery ([lesson](./F/F-07.md#5-do-the-work))

## F-08 Tablespace backup and recovery, online/offline behavior, and consistency checks

- `BACKUP DATABASE SAMPLE TABLESPACE (USERSPACE1) ONLINE TO /db2backup/ts1 INCLUDE LOGS` — Back up one online tablespace ([lesson](./F/F-08.md#5-do-the-work))
- `RESTORE DATABASE SAMPLE TABLESPACE (USERSPACE1) FROM /db2backup/ts1 TAKEN AT 20261027103000; ROLLFORWARD DATABASE SAMPLE TO END OF LOGS AND STOP TABLESPACE (USERSPACE1)` — Restore and roll forward tablespace ([lesson](./F/F-08.md#5-do-the-work))

## F-09 Recovery failure drills, decision trees, legal next steps, evidence, and measured RTO

- `db2ckbkp -h /db2backup/candidate.001; db2ckrst -d SAMPLE -t 20261027120000` — Check restore prerequisites ([lesson](./F/F-09.md#5-do-the-work))
- `db2 list utilities show detail; db2 rollforward db QA1 query status; db2 list tablespaces show detail` — Capture restore/rollforward state ([lesson](./F/F-09.md#5-do-the-work))

## D-01 Authentication, operating-system identity, providers, and security plugins

- `db2 get dbm cfg | grep -i -E "authentication|srvcon_auth|group_plugin|server_plugin"; db2set -all` — Inspect server auth settings ([lesson](./D/D-01.md#5-do-the-work))
- `VALUES CURRENT SERVER, CURRENT USER, SESSION_USER;` — Verify authenticated identity ([lesson](./D/D-01.md#5-do-the-work))

## D-02 Authorities, privileges, roles, groups, ownership, and effective access

- `GRANT SELECT ON TABLE APP.ORDERS TO ROLE REPORT_READER;` — Grant scoped read privilege ([lesson](./D/D-02.md#5-do-the-work))
- `GRANT DBADM ON DATABASE TO USER DBA_OPS WITHOUT DATAACCESS WITHOUT ACCESSCTRL;` — Explicit Db2 12.1 DBADM choice ([lesson](./D/D-02.md#5-do-the-work))

## D-03 Client catalogs, aliases, drivers, connection configuration, and reroute

- `CATALOG TCPIP NODE LABNODE REMOTE db2host.example.net SERVER 50000; CATALOG DATABASE SAMPLE AS LABDB AT NODE LABNODE AUTHENTICATION SERVER` — Catalog a test TCP node/database ([lesson](./D/D-03.md#5-do-the-work))
- `db2cli validate -dsn LABDB -connect` — Validate CLI driver ([lesson](./D/D-03.md#5-do-the-work))

## D-04 TLS, certificates, keystores, native database encryption, and backup encryption

- `db2 update dbm cfg using SSL_SVR_KEYDB /secure/keystore/server.p12; db2 update dbm cfg using SSL_SVR_STASH /secure/keystore/server.sth; db2 update dbm cfg using SSL_SVCENAME 25001; db2set DB2COMM=SSL,TCPIP; db2stop; db2start` — Enable server TLS listener ([lesson](./D/D-04.md#5-do-the-work))
- `BACKUP DATABASE SAMPLE ENCRYPT TO /db2backup/enc` — Create encrypted backup ([lesson](./D/D-04.md#5-do-the-work))

## D-05 Auditing, RCAC, masks, LBAC, and sensitive-data controls

- `CREATE AUDIT POLICY APP_AUDIT CATEGORIES EXECUTE STATUS BOTH, CONTEXT STATUS BOTH ERROR TYPE NORMAL; AUDIT DATABASE USING POLICY APP_AUDIT; COMMIT;` — Apply an audit policy ([lesson](./D/D-05.md#5-do-the-work))
- `CREATE PERMISSION APP.REGION_ROWS ON APP.CUSTOMER FOR ROWS WHERE REGION = SESSION_USER ENFORCED FOR ALL ACCESS ENABLE; ALTER TABLE APP.CUSTOMER ACTIVATE ROW ACCESS CONTROL;` — Row and column policy pattern ([lesson](./D/D-05.md#5-do-the-work))
- `SELECT A.grantee, B.secpolicyname, C.seclabelname FROM syscat.securitylabelaccess A JOIN syscat.securitypolicies B ON A.secpolicyid=B.secpolicyid JOIN syscat.securitylabels C ON A.seclabelid=C.seclabelid` — LBAC label verification ([lesson](./D/D-05.md#5-do-the-work))

## D-06 Layer-by-layer security and connectivity failure diagnosis

- `Resolve-DnsName db2host.example.net; Test-NetConnection db2host.example.net -Port 50000` — Client endpoint resolution and route ([lesson](./D/D-06.md#5-do-the-work))
- `db2pd -db SAMPLE -connections; db2pd -db SAMPLE -applications` — Server log evidence ([lesson](./D/D-06.md#5-do-the-work))

## E-01 Incident scope, timeline, baseline, and evidence quality

- `Get-Date -Format o; hostname; whoami; db2level; db2 get instance` — Incident context bundle ([lesson](./E/E-01.md#5-do-the-work))
- `db2pd -db SAMPLE -applications; db2pd -db SAMPLE -transactions` — Bounded baseline sample ([lesson](./E/E-01.md#5-do-the-work))

## E-02 db2diag.log, notification logs, diagnostic signatures, and FODC

- `db2diag -g "LEVEL: Severe" -H 2d` — Filter recent severe records ([lesson](./E/E-02.md#5-do-the-work))
- `db2support /secure/case/CASE-2026-001 -d SAMPLE -c` — Support data collection ([lesson](./E/E-02.md#5-do-the-work))

## E-03 db2pd, monitor table functions, and snapshots

- `db2pd -db SAMPLE -applications -transactions` — Local engine snapshot ([lesson](./E/E-03.md#5-do-the-work))
- `SELECT application_handle, client_applname, client_hostname FROM TABLE(mon_get_connection(NULL,-2)) AS c` — SQL monitor sample ([lesson](./E/E-03.md#5-do-the-work))

## E-04 Connections, applications, agents, transactions, and long-running work

- `db2pd -db SAMPLE -applications -transactions; db2 list applications show detail` — Find applications and transactions ([lesson](./E/E-04.md#5-do-the-work))
- `FORCE APPLICATION (12345)` — Force one approved handle ([lesson](./E/E-04.md#5-do-the-work))

## E-05 Event-monitor families, targets, lifecycle, storage, and interpretation

- `CREATE EVENT MONITOR LOCKLAB FOR LOCKING WRITE TO TABLE; SET EVENT MONITOR LOCKLAB STATE 1;` — Create a lock event monitor ([lesson](./E/E-05.md#5-do-the-work))
- `CREATE EVENT MONITOR STMTLAB FOR STATEMENTS WRITE TO FILE '/db2diag/evmon'; SET EVENT MONITOR STMTLAB STATE 1;` — Create statement event monitor to file ([lesson](./E/E-05.md#5-do-the-work))

## E-06 Db2/OS observability, metric definitions, alerts, and operational reporting

- `sar -u 1 5; sar -r 1 5; sar -d 1 5` — Host interval telemetry ([lesson](./E/E-06.md#5-do-the-work))
- `SELECT member, total_log_used, total_log_available FROM TABLE(mon_get_transaction_log(-2)) AS l` — Db2 log metric query ([lesson](./E/E-06.md#5-do-the-work))

## C-01 SQL, transactions, isolation, SQLCODE, and SQLSTATE fundamentals

- `UPDATE APP.INVENTORY SET quantity = quantity - 2 WHERE sku = 70021 AND quantity >= 2; SELECT sku, quantity FROM APP.INVENTORY WHERE sku = 70021;` — Bounded change with verification ([lesson](./C/C-01.md#5-do-the-work))
- `SAVEPOINT before_edit ON ROLLBACK RETAIN CURSORS; ROLLBACK TO SAVEPOINT before_edit` — Transaction checkpoint ([lesson](./C/C-01.md#5-do-the-work))

## C-02 Schemas, tables, data types, indexes, constraints, and dependencies

- `CREATE TABLE APP.ORDER_LINE (order_id BIGINT NOT NULL, line_no SMALLINT NOT NULL, sku INTEGER NOT NULL, quantity DECIMAL(9,2) NOT NULL CHECK (quantity > 0), PRIMARY KEY (order_id, line_no));` — Create a keyed object ([lesson](./C/C-02.md#5-do-the-work))
- `CREATE INDEX APP.IX_ORDER_LINE_SKU ON APP.ORDER_LINE (sku, order_id);
SELECT tabschema, tabname, type FROM syscat.tables WHERE tabschema = 'APP' ORDER BY tabname;` — Index and dependency capture ([lesson](./C/C-02.md#5-do-the-work))

## C-03 Db2 catalogs, administrative views, monitor functions, and snapshots

- `SELECT tabschema, tabname, type, create_time FROM syscat.tables WHERE tabschema = 'APP' ORDER BY tabname;` — Object inventory ([lesson](./C/C-03.md#5-do-the-work))
- `SELECT application_handle, client_hostname, client_applname FROM TABLE(mon_get_connection(NULL,-2)) AS c` — Live connection sample ([lesson](./C/C-03.md#5-do-the-work))

## C-04 Tablespaces, storage groups, containers, AUTORESIZE, and space reclamation

- `SELECT tbsp_name, tbsp_type, tbsp_state, tbsp_utilization_percent FROM TABLE(mon_get_tablespace(NULL,-2)) AS t` — Table-space monitor ([lesson](./C/C-04.md#5-do-the-work))
- `ALTER TABLESPACE APPDATA AUTORESIZE YES INCREASESIZE 256 M MAXSIZE 40 G` — Bounded automatic growth ([lesson](./C/C-04.md#5-do-the-work))

## C-05 EXPORT, IMPORT, LOAD, INGEST, db2move, and db2look

- `EXPORT TO /tmp/items.del OF DEL MESSAGES /tmp/items.exp.msg SELECT item_id, description FROM APP.ITEMS WHERE active = 1` — Delimited export ([lesson](./C/C-05.md#5-do-the-work))
- `IMPORT FROM /tmp/items.del OF DEL COMMITCOUNT 500 INSERT INTO APP.ITEMS_STG` — Transactional import ([lesson](./C/C-05.md#5-do-the-work))
- `LOAD FROM /tmp/items.del OF DEL INSERT INTO APP.ITEMS_STG COPY YES TO /db2backup/loadcopy MESSAGES /tmp/items.load.msg` — Bulk LOAD with copy ([lesson](./C/C-05.md#5-do-the-work))
- `INGEST FROM FILE /tmp/items.del FORMAT DELIMITED RESTART NEW 'items-load-20261027' INSERT INTO APP.ITEMS_STG;` — Restartable INGEST ([lesson](./C/C-05.md#5-do-the-work))
- `db2move SAMPLE EXPORT -sn APP; db2look -d SAMPLE -e -z APP -o /tmp/app.ddl` — Schema movement and DDL capture ([lesson](./C/C-05.md#5-do-the-work))

## C-06 RUNSTATS, REORGCHK, table REORG, index REORG, types, phases, and monitoring

- `RUNSTATS ON TABLE APP.ORDERS WITH DISTRIBUTION ON COLUMNS (STATUS, REGION) AND DETAILED INDEXES ALL` — Statistics by workload-relevant columns ([lesson](./C/C-06.md#5-do-the-work))
- `REORGCHK CURRENT STATISTICS ON TABLE APP.ORDERS` — Evaluate reorganization evidence ([lesson](./C/C-06.md#5-do-the-work))
- `REORG TABLE APP.ORDERS CLASSIC` — CLASSIC offline table reorganization ([lesson](./C/C-06.md#5-do-the-work))
- `REORG TABLE APP.ORDERS INPLACE FULL ALLOW WRITE ACCESS` — INPLACE FULL online table REORG ([lesson](./C/C-06.md#5-do-the-work))
- `REORG TABLE APP.ORDERS INPLACE CLEANUP OVERFLOWS; REORG TABLE APP.CUBE_FACT RECLAIM EXTENTS` — INPLACE cleanup and extent reclamation ([lesson](./C/C-06.md#5-do-the-work))
- `REORG INDEXES ALL FOR TABLE APP.ORDERS ALLOW WRITE ACCESS; REORG INDEXES ALL FOR TABLE APP.ORDERS ALLOW WRITE ACCESS CLEANUP PAGES` — Index rebuild and cleanup choices ([lesson](./C/C-06.md#5-do-the-work))

## C-07 Integrity, pending states, exception tables, dependencies, and package maintenance

- `SELECT tabschema, tabname, status, access_mode FROM syscat.tables WHERE tabschema = 'APP' AND tabname = 'ORDER_LINE'` — Check table status ([lesson](./C/C-07.md#5-do-the-work))
- `SET INTEGRITY FOR APP.ORDER_LINE IMMEDIATE CHECKED` — Revalidate after data repair ([lesson](./C/C-07.md#5-do-the-work))

## B-01 Instances, databases, members, agents, and Db2 request path

- `db2level; db2 get instance; db2 list database directory` — Release and instance identity ([lesson](./B/B-01.md#5-do-the-work))
- `db2pd -db SAMPLE -applications` — Request-path activity ([lesson](./B/B-01.md#5-do-the-work))

## B-02 Installation copies, licensing, instance creation, profiles, and service lifecycle

- `db2ls; db2ilist` — Copy inventory ([lesson](./B/B-02.md#5-do-the-work))
- `/opt/ibm/db2/V12.1/instance/db2icrt -a server -u db2fenc1 db2inst1` — Create a lab instance ([lesson](./B/B-02.md#5-do-the-work))

## B-03 Database creation, activation, connections, and configuration scope

- `db2 create database SAMPLE automatic storage yes using codeset UTF-8 territory US` — Create isolated sample ([lesson](./B/B-03.md#5-do-the-work))
- `db2 get dbm cfg show detail; db2 get db cfg for SAMPLE show detail; db2set -all` — Inspect effective scope ([lesson](./B/B-03.md#5-do-the-work))

## B-04 CLP, SQL boundaries, command files, terminators, quoting, and safe workflows

- `db2 -td@ -vf setup.sql` — Alternate terminator script ([lesson](./B/B-04.md#5-do-the-work))
- `db2 connect to SAMPLE; db2 "values current server, current user"; db2 connect reset` — Safe read-only interactive session ([lesson](./B/B-04.md#5-do-the-work))

## B-05 Agents, EDUs, units of work, and Db2 memory areas

- `db2pd -db SAMPLE -edus; db2pd -db SAMPLE -memsets` — EDU and memory inventory ([lesson](./B/B-05.md#5-do-the-work))
- `db2 "select application_handle, uow_start_time, uow_log_space_used from table(mon_get_unit_of_work(null,-2)) as u"` — Long UOW inspection ([lesson](./B/B-05.md#5-do-the-work))

## B-06 Standalone, DPF, and pureScale architectures and operational boundaries

- `cat $HOME/sqllib/db2nodes.cfg; db2_all "hostname"` — DPF topology inventory ([lesson](./B/B-06.md#5-do-the-work))
- `db2instance -list; db2pd -db SAMPLE -members` — pureScale member status ([lesson](./B/B-06.md#5-do-the-work))
- `db2pd -inst; db2 list db directory` — Standalone boundary ([lesson](./B/B-06.md#5-do-the-work))

## I-02 Fix packs, software maintenance, install copies, and topology sequencing

- `db2level; db2ls; db2licm -l` — Inventory code ([lesson](./I/I-02.md#5-do-the-work))
- `./installFixPack -b /opt/ibm/db2/V12.1` — Illustrative update ([lesson](./I/I-02.md#5-do-the-work))

## I-03 Db2 upgrade planning, prechecks, execution, application tests, and fallback limits

- `db2ckupgrade SAMPLE -l /db2upgrade/readiness.log` — Readiness check ([lesson](./I/I-03.md#5-do-the-work))
- `db2 UPGRADE DATABASE SAMPLE` — Approved upgrade ([lesson](./I/I-03.md#5-do-the-work))

## I-04 Cross-platform migration, compatibility, logical movement, and reconciliation

- `db2look -d SRCDB -e -a -l -x -o /migration/srcdb.sql` — Capture source definition ([lesson](./I/I-04.md#5-do-the-work))
- `db2 export to /migration/sample.del of del select CUSTOMER_ID, STATUS from APP.CUSTOMER where CUSTOMER_ID between 1 and 1000` — Bounded export example ([lesson](./I/I-04.md#5-do-the-work))

## I-05 Federation, wrappers, servers, user mappings, nicknames, and pushdown diagnosis

- `SELECT servername, wrappername FROM syscat.servers; SELECT nickname, remote_schema, remote_table FROM syscat.nicknames` — Inventory server/nickname ([lesson](./I/I-05.md#5-do-the-work))
- `EXPLAIN PLAN FOR SELECT CUSTOMER_ID FROM APP.REMOTE_CUSTOMER WHERE CUSTOMER_ID = 42` — Explain nickname query ([lesson](./I/I-05.md#5-do-the-work))

## J-01 Bash and ksh for Db2: quoting, environment, exit codes, signals, and secrets

- `set -euo pipefail; export DB2INSTANCE=db2inst1; . ~db2inst1/sqllib/db2profile; printf "instance=%s\n" "$DB2INSTANCE"; db2level` — Assert environment and code ([lesson](./J/J-01.md#5-do-the-work))
- `db2 -tvf /opt/dbatools/health.sql` — Run reviewed SQL file ([lesson](./J/J-01.md#5-do-the-work))

## J-02 Safe shell runbooks and bounded evidence collectors

- `TARGET="$1"; case "$TARGET" in SAMPLE_QA) ;; *) exit 64;; esac; timeout 15 db2 connect to "$TARGET"; rc=$?; timeout 15 db2pd -db "$TARGET" -alldbs; pd_rc=$?; exit $((rc || pd_rc))` — Bounded collector sketch ([lesson](./J/J-02.md#5-do-the-work))
- `db2_all "hostname"` — DPF bounded host check ([lesson](./J/J-02.md#5-do-the-work))

## J-03 Python automation: subprocesses, drivers/CLI, timeouts, parsing, and secrets

- `python3 -c "import subprocess; p=subprocess.run(["db2","-x","select current server from sysibm.sysdummy1"],capture_output=True,text=True,timeout=20,check=False); print(p.stdout); raise SystemExit(p.returncode)"` — Bounded subprocess example ([lesson](./J/J-03.md#5-do-the-work))
- `cursor.execute("SELECT COUNT(*) FROM APP.TEST_TABLE WHERE STATUS = ?", (status,))` — Parameterized driver query ([lesson](./J/J-03.md#5-do-the-work))

## J-04 Testable, idempotent administrative automation and ambiguous timeouts

- `db2 list utilities show detail; db2 list history backup all for SAMPLE` — Inspect before backup retry ([lesson](./J/J-04.md#5-do-the-work))
- `db2 get db cfg for SAMPLE` — Inspect desired configuration ([lesson](./J/J-04.md#5-do-the-work))

## J-05 Scheduling, alerting, dashboards, credentials, retries, and operational reports

- `db2 -x "SELECT CURRENT TIMESTAMP, MEMBER, TOTAL_APP_COMMITS FROM TABLE(MON_GET_DATABASE(-2)) AS M"` — Scheduled monitor sample ([lesson](./J/J-05.md#5-do-the-work))
- `test -r ~db2inst1/sqllib/db2profile && printf "profile readable\n"; db2level` — Credential-free environment check ([lesson](./J/J-05.md#5-do-the-work))

## J-06 Fleet automation, canaries, concurrency limits, per-target results, and rollback

- `db2_all "hostname; db2level"` — Preflight host inventory ([lesson](./J/J-06.md#5-do-the-work))
- `xargs -r -n 1 -P 2 /opt/dbatools/preflight_one_target.sh < targets.txt` — Bounded parallel preflight sketch ([lesson](./J/J-06.md#5-do-the-work))

## K-01 Incident practicum: log full, locks, storage, and connectivity

- `db2pd -db SAMPLE -logs; db2 get db cfg for SAMPLE` — Inspect log state ([lesson](./K/K-01.md#5-do-the-work))
- `db2pd -db SAMPLE -wlocks -transactions` — Inspect lock waits ([lesson](./K/K-01.md#5-do-the-work))
- `df -hP /db2log /db2archive; nc -vz dbhost.example.net 50000` — Filesystem and client-port check ([lesson](./K/K-01.md#5-do-the-work))
- `db2 list tablespaces show detail; df -hP /db2data` — Check data-space and mount capacity ([lesson](./K/K-01.md#5-do-the-work))

## K-02 Recovery practicum: full, incremental, point-in-time, and tablespace recovery

- `RESTORE DATABASE SAMPLE FROM /db2backup TAKEN AT 20261027100000 INTO QA1 NEWLOGPATH /db2log/QA1 REDIRECT WITHOUT ROLLING FORWARD` — Full isolated restore template ([lesson](./K/K-02.md#5-do-the-work))
- `RESTORE DATABASE SAMPLE INCREMENTAL AUTOMATIC FROM /db2backup TAKEN AT 20261027120000 INTO QA1` — Automatic incremental restore template ([lesson](./K/K-02.md#5-do-the-work))
- `RESTORE DATABASE SAMPLE INCREMENTAL TAKEN AT 20261027120000; RESTORE DATABASE SAMPLE INCREMENTAL TAKEN AT 20261027080000; RESTORE DATABASE SAMPLE INCREMENTAL TAKEN AT 20261027100000; RESTORE DATABASE SAMPLE INCREMENTAL TAKEN AT 20261027120000` — Manual incremental sequence ([lesson](./K/K-02.md#5-do-the-work))
- `ROLLFORWARD DATABASE QA1 TO 2026-10-27-10.15.00.000000 AND STOP OVERFLOW LOG PATH (/db2archive/SAMPLE)` — PIT rollforward template ([lesson](./K/K-02.md#5-do-the-work))
- `LIST TABLESPACES SHOW DETAIL` — Tablespace state check ([lesson](./K/K-02.md#5-do-the-work))

## K-03 Availability/change practicum: HADR, upgrade, failover, and rollback decisions

- `db2pd -db PROD -hadr` — Compare HADR endpoints ([lesson](./K/K-03.md#5-do-the-work))
- `TAKEOVER HADR ON DB PROD` — Planned takeover template ([lesson](./K/K-03.md#5-do-the-work))
- `TAKEOVER HADR ON DB PROD BY FORCE` — Forced takeover emergency template ([lesson](./K/K-03.md#5-do-the-work))
- `db2ckupgrade PROD -l /db2upgrade/PROD.log` — Upgrade readiness gate ([lesson](./K/K-03.md#5-do-the-work))

## K-04 Enterprise capstone: architecture, security, recovery, performance, and operations

- `db2pd -db PROD -hadr; db2 get db cfg for PROD` — Check HADR endpoints ([lesson](./K/K-04.md#5-do-the-work))
- `db2 list history backup all for PROD; db2ckbkp -h /db2backup/PROD.0.db2inst1.DBPART000.20261027100000.001` — Check backup evidence ([lesson](./K/K-04.md#5-do-the-work))

## I-01 Production change design, blast radius, stop criteria, rollback, and acceptance

- `db2 get dbm cfg; db2 get db cfg for SAMPLE; db2pd -db SAMPLE -alldbs` — Capture baseline ([lesson](./I/I-01.md#5-do-the-work))
- `db2 update db cfg for SAMPLE using LOCKTIMEOUT 30` — Illustrative scoped change ([lesson](./I/I-01.md#5-do-the-work))

## I-06 Capacity planning and reference architectures with recovery/failover headroom

- `SELECT MEMBER, TOTAL_APP_COMMITS, TOTAL_APP_RQSTS, TOTAL_CPU_TIME FROM TABLE(MON_GET_DATABASE(-2)) AS M` — Member workload counters ([lesson](./I/I-06.md#5-do-the-work))
- `df -hP /db2data /db2log /db2archive; df -iP /db2data /db2log /db2archive` — Capacity snapshot ([lesson](./I/I-06.md#5-do-the-work))
