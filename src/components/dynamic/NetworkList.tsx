import { useEffect, useState } from "preact/hooks";
import List from "../div/List";
import NetworkManifest from "./NetworkManifest";
import { fetchBackendState, type FetchState } from "../../ts/backend";
import type { Network } from "../../ts/types";
import { DEMO, DEMO_NETWORK } from "../../ts/config";

export default function ({ selected }: { selected: string }) {
    const [nwList, setNwList] = useState<Network[] | undefined | "error">(undefined);

    function validateAndSetNetworkList(nw: FetchState) {
        console.log("called on", nw)
        if (nw === "error") setNwList(DEMO ? [DEMO_NETWORK] : undefined)
        else if (nw !== "loading") setNwList(nw)
    }

    useEffect(() => {
        fetchBackendState(
            "ListPods",
            validateAndSetNetworkList
        );
    }, []);

    if (nwList === undefined) {
        return <List><p>loading...</p></List>
    } else if (nwList === "error") {
        return <List><p>Error loading networks</p></List>
    } else {
        return <List className="max-w-lg grid gap-2.5 h-fit">{nwList.map(
            nw => <NetworkManifest selected={nw.name === selected} network={nw} />
        )}</List>
    }
}