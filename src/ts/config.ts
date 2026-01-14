import type { InspectInfo } from "./rust_bindings/InspectInfo";
import type { Network } from "./types";

export const DEMO: boolean = true; //loads template data if api fails

export const DEMO_NETWORK: Network = {
    name: "demo",
    status: "online",
    nodes: 2,
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
        free_size: 3000000,
        total_size: 1000000
    }
}