import { useState, useEffect } from "preact/hooks";
import H2 from "../text/H2";
import Status from "../dynamic/Status";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { fetchBackendState, validState, type FetchState } from "../../ts/backend";
import type { InspectAnswer } from "../../ts/rust_bindings/InspectAnswer";
import type { InspectInfo } from "../../ts/rust_bindings/InspectInfo";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ({ name }: { name: string }) {
    const [network, setNetwork] = useState<InspectInfo | FetchState | undefined>("loading");

    function validateSetNetwork(nw: InspectAnswer) {
        if (nw === "PodNotFound") setNetwork(undefined)
        else setNetwork(nw.Information)
    }
    useEffect(() => {
        fetchBackendState(
            {
                "Inspect": { "Name": name },
            },
            validateSetNetwork
        );
    }, []);

    return (
        <>
            <div class="flex items-center gap-5 h-6">
                <Status status={validState(network)?.status} />
                <H2>{name}</H2>
            </div>
            <div className="w-full h-full">
                <Doughnut data={{
                    labels: [
                        'Red',
                        'Blue',
                        'Yellow'
                    ],
                    datasets: [{
                        label: 'My First Dataset',
                        data: [300, 50, 100],
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 205, 86)'
                        ],
                        hoverOffset: 4
                    }]
                }} />
            </div>
        </>
    )
}