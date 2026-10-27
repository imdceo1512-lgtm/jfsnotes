# Glossary

| Term | Meaning in this course |
|---|---|
| Activation | Bringing a database online in an instance so it can serve connections. |
| Agent | Db2 worker that services a request; not identical to an application connection. |
| Alias | Local database directory name used by a client to refer to a database. |
| Archive log | A completed transaction log retained for recovery or standby use. |
| Authority | Database- or instance-level administrative capability, such as DBADM or SYSADM. |
| Bufferpool | Memory area that caches table and index pages. |
| Catalog | Db2 system metadata describing databases, objects, privileges, and dependencies. |
| CF (cluster caching facility) | pureScale component coordinating shared cache and locking across members. |
| CLP | Db2 command line processor; it parses commands, options, and statement terminators. |
| Container | Storage allocation assigned to a table space; its form depends on storage management. |
| Data partition | One unit of data placement in a partitioned database (DPF). |
| DBADM | Database administration authority. In Db2 12.1 it no longer implies DATAACCESS or ACCESSCTRL by default. |
| DB2INSTANCE | Environment variable selecting the Db2 instance profile/context. |
| DPF | Database partitioning feature; data and workload are distributed across database partitions. |
| EDU | Engine dispatchable unit, a Db2 process or thread performing work. |
| Event monitor | Facility that records selected database activities to a chosen target. |
| FODC | First occurrence data capture; diagnostic data collected to investigate a problem. |
| HADR | High availability disaster recovery; log-based primary/standby replication for Db2 databases. |
| High water mark | Highest used storage point; lowering it may require a separate reclamation operation. |
| Incremental backup | Backup containing changes since the most recent successful full backup. |
| Delta backup | Backup containing changes since the most recent successful full, incremental, or delta backup. |
| Instance | Db2 engine environment that owns configuration and can manage multiple databases. |
| LBAC | Label based access control; access is governed by security labels. |
| LSN/log position | Position in a transaction log stream used to describe send, receive, replay, or recovery progress. |
| Nickname | Local federated object describing a remote table or view. |
| Package | Bound form of application SQL statements and access plans. |
| Peer state | HADR state in which primary and standby are synchronized under the configured mode. |
| Point-in-time recovery | Recovery that stops at a chosen timestamp/log point rather than the latest available log. |
| pureScale | Db2 clustered architecture with members, cluster caching facilities, and shared storage. |
| Rebind | Recreate a package so Db2 can resolve dependencies and generate sections/plans. |
| Reclaim extents | Return eligible unused extents to the table space; it does not recluster data. |
| Redirected restore | Restore operation that changes storage path/container mapping before completion. |
| Reintegrate | Bring a former HADR primary back as standby when Db2 can safely synchronize it. |
| Rollforward | Apply transaction logs after restore to reach a consistent recovery point. |
| RPO | Recovery point objective: acceptable data loss measured in time or transactions. |
| RTO | Recovery time objective: acceptable service recovery time including validation and routing. |
| RUNSTATS | Utility that collects table/index statistics used by the optimizer. |
| SQLCODE / SQLSTATE | Numeric and standardized status values returned for SQL/Db2 outcomes. |
| Tablespace | Logical storage layer containing table and index objects. |
| TLS | Transport layer security for protecting client/server network communication. |
| Unit of work | A transaction's work between commit/rollback boundaries. |
| User mapping | Federated mapping from a local authorization identity to remote credentials/options. |
| Wrapper | Federated component that communicates with a class of remote data sources. |
| WLM | Db2 workload management facilities for grouping, prioritizing, and controlling work. |

Use the IBM reference linked in each lesson for release-specific definitions and behavior.
