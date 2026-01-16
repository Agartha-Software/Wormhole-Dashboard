import { useState, useEffect } from "preact/hooks";
import H2 from "../text/H2";
import Status from "../dynamic/Status";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { fetchBackendState, validState, type FetchState } from "../../ts/backend";
import type { InspectAnswer } from "../../ts/rust_bindings/InspectAnswer";
import type { InspectInfo } from "../../ts/rust_bindings/InspectInfo";
import { DEMO, DEMO_POD, DEMO_REDUNDANCY, DEMO_STATS_PER_FILETYPE } from "../../ts/config";
import DiskSpace from "../dynamic/NetworkGraphs/DiskSpace";
import RedundancyGraph from "../dynamic/NetworkGraphs/RedundancyGraph";
import NodeList from "../dynamic/NetworkGraphs/NodeList";
import type { RedundancyStatusAnswer } from "../../ts/rust_bindings/RedundancyStatusAnswer";
import type { RedundancyStatus } from "../../ts/rust_bindings/RedundancyStatus";
import type { StatsPerFiletypeAnswer } from "../../ts/rust_bindings/StatsPerFiletypeAnswer";
import StatsPerFiletypeGraph from "../dynamic/NetworkGraphs/StatsPerFiletypeGraph";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ({ name }: { name: string }) {
  const [network, setNetwork] = useState<InspectInfo | FetchState | undefined>("loading");
  const [redundancy, setRedundancy] = useState<{ [key in RedundancyStatus]?: number } | FetchState | undefined>("loading");
  const [stats_per_filetype, setSPFT] = useState<{ [key in string]?: number } | FetchState | undefined>("loading");

  function validateSetNetwork(nw: InspectAnswer | FetchState) {
    if (nw === "PodNotFound") setNetwork(DEMO ? DEMO_POD : undefined)
    else if (nw === "error") setNetwork(DEMO ? DEMO_POD : "error")
    else if (nw !== "loading") setNetwork(nw.Information)
  }

  function validateSetRedundancy(rd: RedundancyStatusAnswer | FetchState) {
    if (rd === "PodNotFound") setRedundancy(DEMO ? DEMO_REDUNDANCY : undefined)
    else if (rd === "error" || rd === "InternalError") setRedundancy(DEMO ? DEMO_REDUNDANCY : "error")
    else if (rd !== "loading") setRedundancy(rd.Status)
  }

  function validateSetSPFT(spft: StatsPerFiletypeAnswer | FetchState) {
    console.log("spft", spft)
    if (spft === "PodNotFound") setSPFT(DEMO ? DEMO_STATS_PER_FILETYPE : undefined)
    else if (spft === "error" || spft === "InternalError") setSPFT(DEMO ? DEMO_STATS_PER_FILETYPE : "error")
    else if (spft !== "loading") setSPFT(spft.Stats)
  }

  useEffect(() => {
    fetchBackendState(
      {
        "Inspect": { "Name": name },
      },
      validateSetNetwork
    );

    fetchBackendState(
      {
        "RedundancyStatus": { "Name": name },
      },
      validateSetRedundancy
    );

    fetchBackendState(
      {
        "StatsPerFiletype": { "Name": name },
      },
      validateSetSPFT
    );
  }, []);

  if (network === "loading" || redundancy === "loading" || stats_per_filetype === "loading") return <p>loading...</p>
  if (network === "error" || redundancy === "error" || stats_per_filetype === "error") return <p>Error fetching pod!</p>
  if (network === undefined || redundancy === undefined || stats_per_filetype === undefined) return <p>Pod not found!</p>
  return (
    <>
      <div class="flex items-center gap-5 h-6">
        <Status status="online" />
        <H2>{name}</H2>
        <div className="flex-1" />
        <p>{network.connected_peers.length} peers</p>
      </div>
      <div className="grid gap-10 p-10 lg:grid-cols-2 w-full">
        <DiskSpace network={validState(network)} />
        <RedundancyGraph redundancy={redundancy} />
        <NodeList nodes={network.connected_peers} />
        <StatsPerFiletypeGraph stats={stats_per_filetype} />
      </div>
    </>
  )
}
