import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Navigation from "./navigation";
import Profile from "./profile";
import Leaderboard from "./leaderboard";

export default function LeaderboardPage() {
    const authedState = useSelector((state) => state.login.authedUser);

    return (
        <div className="homepage bg-slate-100 px-[30px] py-[30px]">
            {authedState !== null ? (
                <div className="homepage-content flex">
                    <Navigation />
                    <div className="homepage-content-right w-9/12">
                        <Profile />

                        <div className="homepage-content-main bg-white rounded-3xl md:p-5 px-5 m-[20px]  drop-shadow-md overflow-hidden">
                            <h1 className="text-center font-julius text-3xl tracking-wider mb-[40px] mt-4 font-bold">
                                Leaderboard
                            </h1>
                            <Leaderboard authedState={authedState} />
                        </div>
                    </div>
                </div>
            ) : (
                <Navigate to="/" />
            )}
        </div>
    );
}
