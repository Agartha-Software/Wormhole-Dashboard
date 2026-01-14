import type ChildrenProps from "../../ts/ChildrenProps";
import H3 from "../text/H3";

export default function (props: { title: string } & ChildrenProps) {
    return (
        <div className="w-full p-5 grid gap-5 bg-slate-500 rounded-2xl">
            <H3>{props.title}</H3>
            {props.children}
        </div>
    )
}