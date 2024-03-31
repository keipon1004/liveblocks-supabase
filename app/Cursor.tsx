import React from "react";

type Props = {
    x: number;
    y: number;
    color: string;
    name: string;
    image: string;
};

export const Cursor: React.FC<Props> = ({ x, y, color, name, image }) => {
    return (
        <svg
            style={{
                position: "absolute",
                left: 0,
                top: 0,
                transform: `translateX(${x}px) translateY(${y-10}px)`,
            }}
            width="260"
            height="64"
            viewBox="0 0 260 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <text x="0" y="16" fill={color} fontWeight={'bold'} >👈{name}</text>
            <image href={image} x="0" y="20" height="20" width="20" />
        </svg>
    );
}
