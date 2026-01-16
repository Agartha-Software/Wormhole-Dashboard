import type { InspectInfo } from "./rust_bindings/InspectInfo";
import type { RedundancyStatus } from "./rust_bindings/RedundancyStatus";
import type { Network } from "./types";

export const DEMO: boolean = true; //loads template data if api fails

export const DEMO_NETWORK: Network = {
    name: "demo",
    status: "online",
}

export const DEMO_POD: InspectInfo = {
    public_url: "192.168.0.110:8080",
    bound_socket: "",
    hostname: "demo",
    name: "demo",
    connected_peers: [
        { hostname: "demo_2", url: "192.168.0.111:8080" },
        { hostname: "demo_3", url: "192.168.0.112:8080" },
    ],
    mount: "/home/user1/demo_mount",
    disk_space: {
        free_size: 2000000,
        total_size: 3000000,
        files: 420,
        ffree: 0,
        bsize: 0,
    }
}

export const DEMO_REDUNDANCY: { [key in RedundancyStatus]?: number } = {
    "NotRedundant": 16,
    "BelowTarget": 512,
    "OnTarget": 512*5,
    "AboveTarget": 128,
}

export const DEMO_STATS_PER_FILETYPE: { [key in string]?: number } = {
    "pdf": 16,
    "mp4": 512,
    "txt": 25,
    "mkv": 25,
    "unknown": 128,
}