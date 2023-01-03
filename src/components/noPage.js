import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Navigation from "./navigation";
import Profile from "./profile";
import NotFound from "./404";
import Leaderboard from "./leaderboard";

export default function NoPage() {
    const authedState = useSelector((state) => state.login.authedUser);
    const location = useLocation();

    return (
        <div className="homepage bg-slate-100 px-[30px] py-[30px]">
            {authedState !== null ? (
                <div className="homepage-content flex">
                    <Navigation />
                    <div className="homepage-content-right w-9/12">
                        <Profile />
                        <NotFound />
                    </div>
                </div>
            ) : (
                <Navigate to="/" replace state={{ from: location }} />
            )}
        </div>
    );
}
