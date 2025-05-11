"use client";
import React, { useEffect, useState, useRef } from "react";
import { Typewriter } from "@quova/effects";

/*
Copyright © 2025 Kars (github.com/kars1996)

Not to be shared, replicated or used without prior consent.
Contact Kars for any enquiries
*/

type BaseTextProps = {
    className?: string;
    text: string;
    [key: string]: any;
};

export default function TextEffect({
    className,
    text,
    effect = "typing",
    color,
    ...props
}: BaseTextProps & {
    effect?:
        | "glow"
        | "rainbow"
        | "shake"
        | "typing"
        | "scramble"
        | "gradient"
        | "name"
        | "none";
} & { color?: string }) {
    switch (effect) {
        case "glow":
            return <GlowText className={className} text={text} {...props} />;
        case "rainbow":
            return <RainbowText className={className} text={text} {...props} />;
        case "shake":
            return <ShakeText className={className} text={text} {...props} />;
        case "typing":
            return <TypingText className={className} text={text} {...props} />;
        case "name":
            return (
                <NameText
                    className={className}
                    color={color!}
                    text={text}
                    {...props}
                />
            );
        case "scramble":
            return (
                <ScrambleText className={className} text={text} {...props} />
            );
        case "gradient":
            return (
                <GradientText className={className} text={text} {...props} />
            );
        default:
            return (
                <div className={className} {...props}>
                    {text}
                </div>
            );
    }
}

//...
