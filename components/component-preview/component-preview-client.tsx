"use client";

import React, { useState } from "react";
import { ReplayButton } from "./replay-button";

interface ComponentPreviewClientProps {
    Component: React.ComponentType;
    align: "center" | "start" | "end";
    replayButton?: boolean;
    isChartComponent?: boolean;
    className: string;
}

export function ComponentPreviewClient({
    Component,
    align,
    replayButton = false,
    isChartComponent = false,
    className
}: ComponentPreviewClientProps) {
    const [key, setKey] = useState(0);

    const handleReplay = () => {
        setKey(prev => prev + 1);
    };

    return (
        <div className={className}>
            <Component key={key} />
            {replayButton && <ReplayButton onReplay={handleReplay} />}
        </div>
    );
}