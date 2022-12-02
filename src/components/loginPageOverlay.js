import React, { useEffect, useState } from "react";

// Overlay component which opacity goes down after 1 second
export default function LoginPopupPage() {
    const [opacityState, setOpacityState] = useState(1);

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpacityState(0);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className={`absolute z-[1] w-full h-full block bg-black/100 ${
                opacityState ? "opacity-100" : "opacity-0"
            } transition-all duration-2000 ease-out`}
        ></div>
    );
}
