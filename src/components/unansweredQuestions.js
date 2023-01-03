import { useDispatch, useSelector } from "react-redux";
import { getQuestionsAsync } from "../features/questions";
import { _saveQuestionAnswer } from "../utils/_DATA";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UnansweredQuestions() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getQuestionsAsync());
    }, []);

    const loadingQuestionsState = useSelector(
        (state) => state.questions.loadingQuestions
    );
    const questionsState = useSelector((state) => state.questions.questions);
    const authedState = useSelector((state) => state.login.authedUser);
    const users = useSelector((state) => state.users.users);

    // returns the Avatar of the current questions author
    const getAvatar = (users, id) => {
        return users.filter((user) => user.id === id)[0].avatarURL;
    };

    let unansweredQuestions = questionsState.filter(
        (question) =>
            !question.optionOne.votes.includes(authedState) &&
            !question.optionTwo.votes.includes(authedState)
    );

    // sort unanswered questions going from most recent timestamp to oldest timestamp
    unansweredQuestions = unansweredQuestions.sort(
        (a, b) => b.timestamp - a.timestamp
    );

    const loadingFinished = () => {
        document.querySelector(".unanswered-qs").classList.add("show");
    };

    if (loadingQuestionsState === false) {
        const loadingQuesitons = setInterval(() => {
            const myElement = document.querySelector(".unanswered-qs");
            if (myElement) {
                clearInterval(loadingQuesitons);
                loadingFinished();
            }
        }, 300);
    }

    // Poll Option Submit Handler
    const handleSubmit = (authedUser, qid, answer) => {
        _saveQuestionAnswer({ authedUser, qid, answer });
        dispatch(getQuestionsAsync());
    };

    // Adds 'selected' to class list if the option is selected
    const optionSelected = (e) => {
        // Remove 'selected' from all options
        const questionCard = e.closest(".question-card");
        const options = questionCard.querySelectorAll("button");
        options.forEach((option) => {
            option.classList.remove("selected");
        });
        e.classList.add("selected");
    };

    return (
        <div className="unanswered-questions w-[100%] ">
            {loadingQuestionsState ? (
                <div className="spinner mt-3" role="status">
                    <span className="loader border-black group-hover:border-black transition-all duration-200 ease-in"></span>
                    <span className="sr-only">Loading...</span>
                </div>
            ) : (
                <div className="unanswered-qs">
                    <h2 className="font-julius mt-4 mb-[30px] text-center font-bold text-3xl tracking-wider">
                        Unanswered Questions
                    </h2>
                    <div className="questions_container flex justify-between flex-wrap">
                        {unansweredQuestions.length > 0 ? (
                            unansweredQuestions.map((question) => {
                                const authorImage = getAvatar(
                                    users,
                                    question.author
                                );
                                return (
                                    <div
                                        key={question.id}
                                        id={question.id}
                                        className="question-card text-center w-[49%] py-[30px] px-[15px] bg-slate-700 rounded-3xl drop-shadow-md text-white mb-[20px]"
                                    >
                                        <div
                                            className="avatarImage w-[70px] h-[70px] mx-auto mb-[20px] rounded-full bg-cover bg-center"
                                            style={{
                                                backgroundImage: `url(${authorImage})`,
                                            }}
                                        ></div>
                                        <h3 className="mb-[30px]">
                                            Would you Rather:
                                        </h3>
                                        <p className="text-center mb-[30px]">
                                            {question.optionOne.text} or ...?
                                        </p>

                                        <div className="w-[100%] text-center mt-[30px]">
                                            <Link
                                                className="hover:text-violet-400 transition-all ease-in-out duration-400"
                                                to={`/questions/question_${question.id}`}
                                            >
                                                Details
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="w-[100%] text-center">
                                <h3 className="text-2xl text-violet-400">
                                    No questions to answer!
                                </h3>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
