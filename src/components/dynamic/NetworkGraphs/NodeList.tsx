import { Doughnut } from "react-chartjs-2";
import GridPart from "../GridPart";
import type { RedundancyStatus } from "../../../ts/rust_bindings/RedundancyStatus";
import type { PeerInfo } from "../../../ts/rust_bindings/PeerInfo";

export default function ({ nodes }: { nodes: PeerInfo[] }) {
    return (
        <GridPart title={`Connected nodes`}>
            <ul>
                {nodes.map(n => (
                    <li>
                        <p>
                            <b>{`${n.hostname}`}</b>{` - ${n.url || "No url"}`}
                        </p>
                    </li>
                ))}
            </ul>
        </GridPart>
    )
}