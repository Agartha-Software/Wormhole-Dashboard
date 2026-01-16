import { Doughnut } from "react-chartjs-2";
import GridPart from "../GridPart";

export default function ({stats}: {stats?: { [key in string]?: number }}) {
    console.log("spft is", stats)
    return (
        <GridPart title={`Stats per file type${Object.values(stats).find(v => v!= 0) ? "" : "  -  No data for now"}`}>
            <Doughnut data={{
                labels: Object.keys(stats),
                datasets: [{
                    label: 'Stats per file type',
                    data: Object.values(stats),
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