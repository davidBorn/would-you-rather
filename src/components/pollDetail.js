import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getQuestionsAsync } from "../features/questions";
import { _saveQuestionAnswer } from "../utils/_DATA";
import QuestionStats from "./questionStats";
import NotFound from "./404";

// use props from parent component

export default function PollDetail() {
    const { id } = useParams();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getQuestionsAsync());
    }, []);
    const authedState = useSelector((state) => state.login.authedUser);
    const loadingQuestionsState = useSelector(
        (state) => state.questions.loadingQuestions
    );

    const questionsState = useSelector((state) => state.questions.questions);

    const unansweredQuestions = questionsState.filter(
        (question) =>
            question.optionOne.votes.includes(authedState) === false &&
            question.optionTwo.votes.includes(authedState) === false
    );

    let answeredQuestions = questionsState.filter(
        (question) =>
            question.optionOne.votes.includes(authedState) ||
            question.optionTwo.votes.includes(authedState)
    );

    // returns "ansewered" if the votes of the question is greater than 0 else this returns ""
    const userAnswer1 = (question) => {
        if (question.optionOne.votes.includes(authedState)) {
            return "answered";
        } else {
            return "";
        }
    };

    const userAnswer2 = (question) => {
        if (question.optionTwo.votes.includes(authedState)) {
            return "answered";
        } else {
            return "";
        }
    };

    const question = questionsState.filter((question) => question.id === id)[0];

    const isQuestionUnanswered = unansweredQuestions.includes(question);

    const isQuestionAnswered = answeredQuestions.includes(question);

    const users = useSelector((state) => state.users.users);

    let author = "";
    let avatar = "";
    if (question != undefined) {
        author = users.filter((user) => user.id === question.author)[0];
        avatar = author.avatarURL;
    } else {
        author = "null";
        avatar = "null";
    }

    const authedUser = useSelector((state) => state.login.authedUser);

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

    // if the id submitted-container is present in the DOM, then add the class grow to the element
    function submittedContainer() {
        setInterval(() => {
            const submittedContainer =
                document.getElementById("answered-container");
            if (submittedContainer) {
                clearInterval(submittedContainer);
                submittedContainer.classList.add("grow");
            }
        }, 500);
    }

    return (
        <div className="w-[100%] ">
            {loadingQuestionsState ? (
                <div className="spinner mt-3" role="status">
                    <span className="loader border-black group-hover:border-black transition-all duration-200 ease-in"></span>
                    <span className="sr-only">Loading...</span>
                </div>
            ) : (
                <div>
                    {question != undefined ? (
                        <div>
                            <h2 className="font-julius mt-4 mb-[30px] text-center font-bold text-3xl tracking-wider">
                                Question from {author.name}
                            </h2>
                            <div className="questions_container flex justify-center flex-wrap">
                                {isQuestionUnanswered ? (
                                    <div
                                        key={question.id}
                                        id={question.id}
                                        className="question-card text-center w-[49%] py-[30px] px-[15px] bg-slate-700 rounded-3xl drop-shadow-md text-white mb-[20px]"
                                    >
                                        <div
                                            className="avatarImage w-[70px] h-[70px] mx-auto mb-[20px] rounded-full bg-cover bg-center"
                                            style={{
                                                backgroundImage: `url(${avatar})`,
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
                                ) : (
                                    <div
                                        id="submitted-container"
                                        className="w-[100%] text-center"
                                    >
                                        {submittedContainer()}
                                        <h3 className="text-2xl text-violet-400">
                                            Submitted successfully!
                                        </h3>

                                        <div className="wrapper">
                                            <svg
                                                className="checkmark"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 52 52"
                                            >
                                                <circle
                                                    className="checkmark__circle"
                                                    cx="26"
                                                    cy="26"
                                                    r="25"
                                                    fill="none"
                                                />
                                                <path
                                                    className="checkmark__check"
                                                    fill="none"
                                                    d="M14.1 27.2l7.1 7.2 16.7-16.8"
                                                />
                                            </svg>
                                        </div>

                                        <p className="text-center mb-[15px]">
                                            Current results for this question:
                                        </p>

                                        <div
                                            id="answered-container"
                                            className="answered-qs"
                                        >
                                            <div className="questions_container flex justify-center flex-wrap">
                                                <div
                                                    key={question.id}
                                                    className="text-center w-[49%] py-[30px] px-[15px] bg-slate-700 rounded-3xl drop-shadow-md text-white mb-[20px]"
                                                >
                                                    <div
                                                        className="avatarImage w-[70px] h-[70px] mx-auto mb-[20px] rounded-full bg-cover bg-center"
                                                        style={{
                                                            backgroundImage: `url(${avatar})`,
                                                        }}
                                                    ></div>
                                                    <h3 className="mb-[30px]">
                                                        Would you Rather:
                                                    </h3>
                                                    <ul className="flex justify-between">
                                                        <li className="w-[49%]">
                                                            <button
                                                                className={`flex ${userAnswer1(
                                                                    question
                                                                )} items-center text-center w-[100%] py-[15px] px-[20px] rounded-3xl bg-white min-h-[78px]`}
                                                            >
                                                                <p className="text-center w-[100%] text-black">
                                                                    {
                                                                        question
                                                                            .optionOne
                                                                            .text
                                                                    }
                                                                </p>
                                                            </button>
                                                        </li>
                                                        <li className="w-[49%]">
                                                            <button
                                                                className={`flex ${userAnswer2(
                                                                    question
                                                                )} items-center text-center w-[100%] py-[15px] px-[20px] rounded-3xl bg-white min-h-[78px]`}
                                                            >
                                                                <p className="text-center w-[100%] text-black">
                                                                    {
                                                                        question
                                                                            .optionTwo
                                                                            .text
                                                                    }
                                                                </p>
                                                            </button>
                                                        </li>
                                                    </ul>
                                                    <QuestionStats
                                                        question={question}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <Link
                                            className="text-violet-300 hover:text-violet-400 transition-all duration-200 ease-in-out"
                                            to={`/polls/`}
                                        >
                                            Back to Home Page
                                        </Link>
                                    </div>
                                )}
                                {isQuestionUnanswered ? (
                                    <div className="w-[100%] text-center">
                                        <button
                                            className="submit group items-center text-center py-[15px] px-[20px] rounded-3xl bg-white border-2 border-[#badda8] hover:bg-[#badda8] ease-in-out inline-block duration-300"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                let allQuestionCards =
                                                    document.querySelectorAll(
                                                        ".question-card"
                                                    );

                                                allQuestionCards.forEach(
                                                    (card) => {
                                                        const selectedOption =
                                                            card.querySelectorAll(
                                                                "button.selected"
                                                            );

                                                        if (
                                                            selectedOption.length >
                                                                0 &&
                                                            selectedOption !=
                                                                null
                                                        ) {
                                                            const cardId =
                                                                selectedOption[0]
                                                                    .closest(
                                                                        ".question-card"
                                                                    )
                                                                    .getAttribute(
                                                                        "id"
                                                                    );

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
                                                    }
                                                );
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
                    ) : (
                        <NotFound />
                    )}
                </div>
            )}
        </div>
    );
}
