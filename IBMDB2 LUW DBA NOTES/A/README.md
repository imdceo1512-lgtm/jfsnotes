# A — Host, Linux, and operational readiness

- [A-01 Host, server, virtualization, capacity, and failure domains](A-01.md) — Use host evidence to decide whether a Db2 symptom is local, shared, or caused by an undersized virtual resource. A VM dashboard is not a substitute for guest and Db2 measurements.
- [A-02 Linux identity, filesystems, permissions, limits, and services](A-02.md) — Use this lesson to make a bounded DBA decision about user, group and supplementary-group resolution, instance owner and profile environment, directory traversal, ACL, umask and mount ownership. The key is to identify the failing layer and scope before changing state.
- [A-03 CPU, memory, process, paging, and Db2 EDU diagnosis](A-03.md) — Use this lesson to make a bounded DBA decision about runnable versus blocked processes, load average versus CPU saturation, user/system/steal/iowait. The key is to identify the failing layer and scope before changing state.
- [A-04 Storage, filesystems, multipath, capacity, and I/O diagnosis](A-04.md) — Use this lesson to make a bounded DBA decision about device-to-filesystem-to-Db2 path, block and inode capacity, deleted-open-file space. The key is to identify the failing layer and scope before changing state.
- [A-05 Networking, DNS, ports, firewalls, time, and client/server evidence](A-05.md) — Use this lesson to make a bounded DBA decision about forward and reverse DNS, routes, interfaces, firewall and NAT, Db2 listener and service-name/port mapping. The key is to identify the failing layer and scope before changing state.

[Course index](../README.md) · [Curriculum map](../CURRICULUM_MAP.md)
