import type ChildrenProps from "../../ts/ChildrenProps";

export default function (props: ChildrenProps) {
    return (
        <h3 class="text-xl font-bold">{props.children}</h3>
    )
}