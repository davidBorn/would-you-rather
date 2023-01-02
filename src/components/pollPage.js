import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Navigation from "./navigation";
import Profile from "./profile";
import UnansweredQuestions from "./unansweredQuestions";
import AnsweredQuestions from "./answeredQuestions";
import PollDetail from "./pollDetail";

export default function HomePage() {
    const authedState = useSelector((state) => state.login.authedUser);
    const location = useLocation();

    return (
        <div className="homepage bg-slate-100 px-[30px] py-[30px] min-h-screen">
            {authedState !== null ? (
                <div className="homepage-content flex">
                    <Navigation />
                    <div className="homepage-content-right w-9/12">
                        <Profile />

                        <div className="homepage-content-main bg-white rounded-3xl md:p-5 px-5 m-[20px]  drop-shadow-md overflow-hidden">
                            <div className="questions-section flex">
                                <div id="questions-wrapper" className="w-full">
                                    <PollDetail />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Navigate to="/" replace state={{ from: location }} />
            )}
        </div>
    );
}
