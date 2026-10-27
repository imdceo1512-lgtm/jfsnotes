# Reference validation

**Checked:** 2026-10-27
**Reference baseline:** IBM Db2 LUW 12.1 documentation. Current pages may change with later fix packs.

The authoring pass consulted IBM documentation for release-sensitive behavior. The links below support the major branches; they do not imply that every command was executed or every local fix-pack option was independently tested.

| Subject | Checked point | Primary reference |
|---|---|---|
| Db2 12.1 authority defaults | DBADM no longer implies DATAACCESS or ACCESSCTRL by default. | [Changed functionality in Db2 12.1](https://www.ibm.com/docs/en/db2/12.1.x?topic=121-changed-functionality), [DBADM authority](https://www.ibm.com/docs/en/db2/12.1.x?topic=authorities-database-administration-authority-dbadm) |
| Table REORG | CLASSIC, INPLACE FULL, INPLACE CLEANUP OVERFLOWS, and RECLAIM EXTENTS differ in access, clustering, reclaim, and eligibility. | [REORG TABLE](https://www.ibm.com/docs/en/db2/12.1.x?topic=commands-reorg-table), [Choosing a table REORG method](https://www.ibm.com/docs/en/db2/12.1.x?topic=reorganization-choosing-table-method), [REORGCHK](https://www.ibm.com/docs/en/db2/12.1.x?topic=commands-reorgchk) |
| Incremental restore | Automatic and manual chains have separate restore procedures; manual order and abort handling matter. | [Restoring from incremental backup images](https://www.ibm.com/docs/en/db2/12.1.x?topic=recovery-restoring-from-incremental-backup-images), [RESTORE DATABASE](https://www.ibm.com/docs/en/db2/12.1.x?topic=commands-restore-database) |
| HADR failover | Forced takeover requires old-primary fencing and a data-loss decision; reintegration and failback are later operations. | [Performing HADR failover](https://www.ibm.com/docs/en/db2/12.1.x?topic=outage-performing-hadr-failover-operation), [TAKEOVER HADR](https://www.ibm.com/docs/en/db2/12.1.x?topic=commands-takeover-hadr), [HADR configuration](https://www.ibm.com/docs/en/db2/12.1.x?topic=hadr-database-configuration) |
| Incident SQL codes | SQL0911N distinguishes deadlock/lock-timeout outcomes by reason code; SQL0289N reports allocation failure for a table space/container path. | [Lock and deadlock event monitoring](https://www.ibm.com/docs/en/db2/12.1.x?topic=events-lock-deadlock-event-monitoring), [System-managed space](https://www.ibm.com/docs/en/db2/12.1.0?topic=management-system-managed-space) |
| Fix-pack update | Existing-copy updates have platform/topology-specific methods; update one copy and check affected instances. | [Fix-pack installation methods](https://www.ibm.com/docs/en/db2/12.1.x?topic=environments-fix-pack-installation-methods), [installFixPack](https://www.ibm.com/docs/en/db2/12.1.x?topic=commands-installfixpack-update-installed-db2-database-products) |
| Federation | Wrapper, server, user mapping, nickname, and pushdown analysis are distinct setup/diagnosis stages. | [Configuring access to Db2 data sources](https://www.ibm.com/docs/en/db2/12.1.x?topic=wrapper-configuring-access-db2-data-sources), [Federated pushdown analysis](https://www.ibm.com/docs/en/db2/12.1.x?topic=phases-federated-database-pushdown-analysis) |
| Monitoring | Monitor functions, db2pd, event monitors, and OS samples have different scopes and lifecycles. | [Monitoring interfaces](https://www.ibm.com/docs/en/db2/12.1.x?topic=monitoring-interfaces-database), [MON routines](https://www.ibm.com/docs/en/db2/12.1.x?topic=functions-monitor-mon-routines), [Creating event monitors](https://www.ibm.com/docs/en/db2/12.1.0?topic=monitors-creating-event) |
| TLS and encryption | TLS protects network transport; native database encryption and encrypted backup have separate setup/key requirements. | [Configure TLS](https://www.ibm.com/docs/en/db2/12.1?topic=ctcsc-configure-tls-db2-server), [Native encryption](https://www.ibm.com/docs/en/db2/12.1.x?topic=rest-db2-native-encryption), [Encrypted backups](https://www.ibm.com/docs/en/db2/12.1.x?topic=encryption-encrypted-backups) |
| Python subprocess | Argument arrays, explicit return status, and timeouts are preferred over shell-string construction for bounded CLI calls. | [Python subprocess documentation](https://docs.python.org/3/library/subprocess.html) |

## Command and lab status

- Every generated procedure is labelled **NOT YET EXECUTED**.
- There is no Db2 CLI, server, disposable database, or HADR/DPF/pureScale lab in this workspace.
- Command examples are teaching templates. Before operational use, validate exact syntax, authority, fix pack, platform, topology, and local change controls.
- No output, SQLCODE, SQLSTATE, timing, or recovery result is represented as lab evidence.
- References were selected from primary vendor documentation. Recheck them when the target fix pack and product topology are known.
