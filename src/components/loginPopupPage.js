import React from "react";
import LoginPopup from "./loginPopup";
import LoginPageOverlay from "./loginPageOverlay";

export default function LoginPopupPage() {
    return (
        <div className="login-popup-page">
            <div className="login-popup-page-content relative h-screen w-screen">
                <LoginPageOverlay />
                <video
                    autoPlay
                    muted
                    loop
                    className="absolute z-0 w-auto min-w-auto min-h-full max-w-none left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 origin-center"
                >
                    <source src="../videos/ink.mp4" type="video/mp4"></source>
                </video>

                <LoginPopup />
            </div>
        </div>
    );
}
