import type { Command } from "./rust_bindings/Command";

export const BACKEND = "/127.0.0.1:8081"
export type FetchState = "loading" | "error";

export function fetchBackend(command: Command) {
    return fetch(BACKEND, {
        method: "POST",
        body: JSON.stringify(command)
    })
}

export function fetchBackendState(command: Command, setState: (a: any | FetchState) => void) {
    fetchBackend(command).then(answer => {
        if (answer.ok) {
            console.log("called here", answer)
            answer.json().then(out => setState(out))
        } else {
            console.error(answer.status)
            setState("error")
        }
    })
}

export function validState<T>(state: T | FetchState) {
    if (state === "loading" || state === "error") return undefined;
    else return state;
}