import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Navigation from "./navigation";
import Profile from "./profile";
import UnansweredQuestions from "./unansweredQuestions";
import AnsweredQuestions from "./answeredQuestions";

export default function HomePage() {
    const authedState = useSelector((state) => state.login.authedUser);

    // If user clicks on Unanswered Questions, then Unanswered Questions will be hidden and Answered Questions will be shown
    const [unansweredQuestionsShown, setUnansweredQuestionsShown] =
        useState(true);

    const [questionsClass, setQuestionsClass] = useState("");
    const questionsContainerClass = () => {
        setTimeout(() => {
            if (unansweredQuestionsShown === true) {
                setQuestionsClass("showUnansweredQuestions");
            } else {
                setQuestionsClass("showAnsweredQuestions");
            }
        }, 0);
    };

    questionsContainerClass();

    const handleToggle = (e) => {
        e.preventDefault();
        // If Unanswered Questions button is clicked, then show Answered Questions and hide Unanswered Questions
        if (unansweredQuestionsShown && e.target.id === "answered") {
            setUnansweredQuestionsShown(false);
            document.querySelectorAll(".secondary-nav li").forEach((li) => {
                li.classList.remove("active");
            });
            e.target.parentNode.classList.add("active");
        }
        // If Answered Questions button is clicked, then show Unanswered Questions and hide Answered Questions
        if (!unansweredQuestionsShown && e.target.id === "unanswered") {
            setUnansweredQuestionsShown(true);
            document.querySelectorAll(".secondary-nav li").forEach((li) => {
                li.classList.remove("active");
            });
            e.target.parentNode.classList.add("active");
        }

        questionsContainerClass();
    };

    return (
        <div className="homepage bg-slate-100 px-[30px] py-[30px] min-h-screen">
            {authedState !== null ? (
                <div className="homepage-content flex">
                    <Navigation />
                    <div className="homepage-content-right w-9/12">
                        <Profile />
                        <nav className="secondary-nav flex justify-between mb-[30px] mt-[59px]">
                            <ul className="flex w-full justify-center">
                                <li className="active text-white mr-[10px]">
                                    <button
                                        id="unanswered"
                                        className="unanswered-questions-btn bg-violet-400 rounded-3xl h-[70px] w-[215px] border border-[transparent] hover:bg-white hover:text-violet-400 hover:border hover:border-violet-400 transition-all duration-200 ease-in"
                                        onClick={handleToggle}
                                    >
                                        Unanswered Questions
                                    </button>
                                </li>
                                <li className="text-white">
                                    <button
                                        id="answered"
                                        className="answered-questions-btn py-[15px] px-[20px] bg-violet-400 rounded-3xl h-[70px] w-[215px] border border-[transparent] hover:bg-white hover:text-violet-400 hover:border hover:border-violet-400 transition-all duration-200 ease-in"
                                        onClick={handleToggle}
                                    >
                                        Answered Questions
                                    </button>
                                </li>
                            </ul>
                        </nav>
                        <div className="homepage-content-main bg-white rounded-3xl md:p-5 px-5 m-[20px]  drop-shadow-md overflow-hidden">
                            <div className="questions-section flex">
                                <div
                                    id="questions-wrapper"
                                    className={questionsClass + " w-full"}
                                >
                                    {unansweredQuestionsShown ? (
                                        <UnansweredQuestions />
                                    ) : (
                                        <AnsweredQuestions />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Navigate to="/" />
            )}
        </div>
    );
}
