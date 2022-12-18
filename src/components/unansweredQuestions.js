import { useDispatch, useSelector } from "react-redux";
import { getQuestionsAsync } from "../features/questions";
import { _saveQuestionAnswer } from "../utils/_DATA";
import React, { useEffect, useState } from "react";

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
    unansweredQuestions = unansweredQuestions.sort((a, b) => b.timestamp - a.timestamp);

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
                                        <ul className="flex justify-between">
                                            <li className="w-[49%]">
                                                <button
                                                    className="flex group optionOne items-center text-center w-[100%] py-[15px] px-[20px] rounded-3xl bg-white min-h-[78px] hover:bg-violet-400 transition-all duration-200 ease-in-out"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        optionSelected(
                                                            e.target.parentNode
                                                        );
                                                    }}
                                                >
                                                    <p className="text-center w-[100%] text-black group-hover:text-white transition-all duration-200 ease-in-out">
                                                        {
                                                            question.optionOne
                                                                .text
                                                        }
                                                    </p>
                                                </button>
                                            </li>
                                            <li className="w-[49%]">
                                                <button
                                                    className="flex group optionTwo items-center text-center w-[100%] py-[15px] px-[20px] rounded-3xl bg-white min-h-[78px] hover:bg-violet-400 transition-all duration-200 ease-in-out"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        optionSelected(
                                                            e.target.parentNode
                                                        );
                                                    }}
                                                >
                                                    <p className="text-center w-[100%] text-black group-hover:text-white transition-all duration-200 ease-in-out">
                                                        {
                                                            question.optionTwo
                                                                .text
                                                        }
                                                    </p>
                                                </button>
                                            </li>
                                        </ul>
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
                        {unansweredQuestions.length > 0 ? (
                            <div className="w-[100%] text-center">
                                <button
                                    className="submit group items-center text-center py-[15px] px-[20px] rounded-3xl bg-white border-2 border-[#badda8] hover:bg-[#badda8] ease-in-out inline-block duration-300"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        let allQuestionCards =
                                            document.querySelectorAll(
                                                ".question-card"
                                            );

                                        allQuestionCards.forEach((card) => {
                                            const selectedOption =
                                                card.querySelectorAll(
                                                    "button.selected"
                                                );

                                            if (
                                                selectedOption.length > 0 &&
                                                selectedOption != null
                                            ) {
                                                const cardId = selectedOption[0]
                                                    .closest(".question-card")
                                                    .getAttribute("id");

                                                if (
                                                    selectedOption[0].classList.contains(
                                                        "optionOne"
                                                    )
                                                ) {
                                                    handleSubmit(
                                                        authedState,
                                                        cardId,
                                                        "optionOne"
                                                    );
                                                }
                                                if (
                                                    selectedOption[0].classList.contains(
                                                        "optionTwo"
                                                    )
                                                ) {
                                                    handleSubmit(
                                                        authedState,
                                                        cardId,
                                                        "optionTwo"
                                                    );
                                                }
                                            }
                                        });
                                    }}
                                >
                                    <p className="submit text-center w-[100%] text-[#badda8] font-semibold group-hover:text-[#fff] ease-in-out duration-300">
                                        Submit
                                    </p>
                                </button>
                            </div>
                        ) : null}
                    </div>
                </div>
            )}
        </div>
    );
}
