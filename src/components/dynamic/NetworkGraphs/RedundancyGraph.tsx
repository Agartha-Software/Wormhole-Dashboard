import { Doughnut } from "react-chartjs-2";
import GridPart from "../GridPart";
import type { RedundancyStatus } from "../../../ts/rust_bindings/RedundancyStatus";

export default function ({redundancy}: {redundancy?: { [key in RedundancyStatus]?: number }}) {
    return (
        <GridPart title="Redundancy">
            <Doughnut data={{
                labels: [
                    'Not Redundant',
                    'Below Target',
                    'On Target',
                    'Above Target',
                ],
                datasets: [{
                    label: 'Disk space',
                    data: [
                        redundancy.NotRedundant,
                        redundancy.BelowTarget,
                        redundancy.OnTarget,
                        redundancy.AboveTarget,
                    ],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 255, 75)',
                        'rgb(80, 235, 185)',
                        'rgb(54, 162, 235)',
                    ],
                    hoverOffset: 4,
                }]
            }}
                options={{
                    animation: {
                        animateRotate: true,
                        duration: 1000,
                    },
                    color: "white",
                    aspectRatio: 2 / 1,
                    plugins: {
                        legend: {
                            position: "right"
                        }
                    }
                }}
            />
        </GridPart>
    )
}