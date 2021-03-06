import { forwardRef, ReactNode } from "react";

export interface VisibleProps {
    visible: boolean;
    children: ReactNode;
}

export const Visible = forwardRef<HTMLDivElement, VisibleProps>((props, ref) => {
    return (
        <div
            ref={ref}
            style={{
                visibility: props.visible ? "visible" : "collapse",
                height: props.visible ? undefined : 0,
                overflow: "hidden"
            }}>
            {props.children}
        </div>
    );
});
