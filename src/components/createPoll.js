import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Navigation from "./navigation";
import Profile from "./profile";
import PollForm from "./pollForm";

export default function CreatePoll() {
    const authedState = useSelector((state) => state.login.authedUser);

    return (
        <div className="homepage bg-slate-100 px-[30px] py-[30px] min-h-screen">
            {authedState !== null ? (
                <div className="homepage-content flex">
                    <Navigation />
                    <div className="homepage-content-right w-9/12">
                        <Profile />

                        <div className="homepage-content-main bg-white rounded-3xl md:p-5 px-5 m-[20px]  drop-shadow-md overflow-hidden">
                            <PollForm />
                        </div>
                    </div>
                </div>
            ) : (
                <Navigate to="/" />
            )}
        </div>
    );
}
