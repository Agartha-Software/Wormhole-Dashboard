import { useState, useEffect } from "preact/hooks";
import H2 from "../text/H2";
import Status from "../dynamic/Status";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { fetchBackendState, validState, type FetchState } from "../../ts/backend";
import type { InspectAnswer } from "../../ts/rust_bindings/InspectAnswer";
import type { InspectInfo } from "../../ts/rust_bindings/InspectInfo";
import { DEMO, DEMO_POD } from "../../ts/config";
import GridPart from "../dynamic/GridPart";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ({ name }: { name: string }) {
  const [network, setNetwork] = useState<InspectInfo | FetchState | undefined>("loading");

  function validateSetNetwork(nw: InspectAnswer | FetchState) {
    if (nw === "PodNotFound") setNetwork(DEMO ? DEMO_POD : undefined)
    else if (nw === "error") setNetwork(DEMO ? DEMO_POD : "error")
    else if (nw !== "loading") setNetwork(nw.Information)
  }

  useEffect(() => {
    fetchBackendState(
      {
        "Inspect": { "Name": name },
      },
      validateSetNetwork
    );
  }, []);

  switch (network) {
    case "loading":
      return <p>loading...</p>
    case "error":
      return <p>Error fetching pod!</p>
    case undefined:
      return <p>Pod not found!</p>
    default:
      return (
        <>
          <div class="flex items-center gap-5 h-6">
            <Status status="online" />
            <H2>{name}</H2>
          </div>
          <div className="grid gap-10 p-10 grid-cols-2 w-full">
            <GridPart title="Storage Space">
              <Doughnut data={{
                labels: [
                  'Used space',
                  'Remaining space',
                ],
                datasets: [{
                  label: 'Disk space',
                  data: [
                    validState(network)?.disk_space.total_size - validState(network)?.disk_space.free_size,
                    validState(network)?.disk_space.free_size
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
                  aspectRatio: 2/1,
                  plugins: {
                    legend: {
                      position: "right"
                    }
                  }
                }}
              />
            </GridPart>
            <GridPart title="Storage Space">
              <Doughnut data={{
                labels: [
                  'Used space',
                  'Remaining space',
                ],
                datasets: [{
                  label: 'Disk space',
                  data: [
                    validState(network)?.disk_space.total_size - validState(network)?.disk_space.free_size,
                    validState(network)?.disk_space.free_size
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
                  aspectRatio: 2/1,
                  plugins: {
                    legend: {
                      position: "right"
                    }
                  }
                }}
              />
            </GridPart>
          </div>
        </>
      )
  }
}