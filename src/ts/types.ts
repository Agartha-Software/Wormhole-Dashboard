import type { NetworkStatus } from "./NetworkStatus";

export type Network = {
    name: string;
    nodes: number;
    status: NetworkStatus
}