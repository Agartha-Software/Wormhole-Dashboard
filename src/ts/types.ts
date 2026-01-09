import type { NetworkStatus } from "./NetworkStatus";

export type Network = {
    name: string;
    pods: number;
    status: NetworkStatus
}