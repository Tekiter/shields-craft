import { FC, ReactNode } from "react";

export interface WrapBoxProps {
    children?: ReactNode;
}

export const WrapBox: FC<WrapBoxProps> = (props) => {
    return (
        <div className="flexbox-container">
            {props.children}

            <style jsx global>{`
                .flexbox-container {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                }
            `}</style>
        </div>
    );
};
