import { Doughnut } from "react-chartjs-2";
import { validState } from "../../../ts/backend";
import GridPart from "../GridPart";
import type { InspectInfo } from "../../../ts/rust_bindings/InspectInfo";

export default function ({network}: {network?: InspectInfo}) {
    return (
        <GridPart title="Storage Space">
            <Doughnut data={{
                labels: [
                    'Used space',
                    'Remaining space',
                ],
                datasets: [{
                    label: 'Disk space',
                    data: [
                        network?.disk_space.total_size - network?.disk_space.free_size,
                        network?.disk_space.free_size
                    ],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
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