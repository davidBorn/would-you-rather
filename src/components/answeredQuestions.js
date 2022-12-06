import { useDispatch, useSelector } from "react-redux";
import { getQuestionsAsync } from "../features/questions";
import { MdPersonOutline } from "react-icons/md";
import React, { useEffect } from "react";
import QuestionStats from "./questionStats";

export default function UnansweredQuestions() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getQuestionsAsync());
    }, []);
    const loadingQuestionsState = useSelector(
        (state) => state.questions.loading
    );
    const questionsState = useSelector((state) => state.questions.questions);
    const authedState = useSelector((state) => state.login.authedUser);
    const users = useSelector((state) => state.users.users);

    // returns the Avatar of the current questions author
    const getAvatar = (users, id) => {
        return users.filter((user) => user.id === id)[0].avatarURL;
    };

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

    // Adds show class to the answered questions container, for animation
    const loadingFinished = () => {
        document.querySelector(".answered-qs").classList.add("show");
    };
    // If the questions are still loading, show the spinner
    const answeredQuestionsInterval = setInterval(() => {
        const myElement = document.querySelector(".answered-qs");
        if (myElement) {
            clearInterval(answeredQuestionsInterval);
            loadingFinished();
            setTimeout(loadingFinished, 300);
        }
    });

    // Calculate total votes for each question
    const totalVotes = (question) => {
        return (
            question.optionOne.votes.length + question.optionTwo.votes.length
        );
    };

    // Calculate the percentage of votes for option one
    const percentageOptionOne = (question) => {
        return (
            (question.optionOne.votes.length / totalVotes(question)) *
            100
        ).toFixed(0);
    };

    // Calculate the percentage of votes for option two
    const percentageOptionTwo = (question) => {
        return (
            (question.optionTwo.votes.length / totalVotes(question)) *
            100
        ).toFixed(0);
    };

    return (
        <div className="answered-questions w-[100%] hide">
            {loadingQuestionsState ? (
                <div className="spinner mt-3" role="status">
                    <span className="loader border-black group-hover:border-black transition-all duration-200 ease-in"></span>
                    <span className="sr-only">Loading...</span>
                </div>
            ) : (
                <div className="answered-qs">
                    <h2 className="font-julius mt-4 mb-[30px] text-center font-bold text-3xl tracking-wider">
                        Answered Questions
                    </h2>
                    <div className="questions_container flex justify-between flex-wrap">
                        {answeredQuestions.map((question) => {
                            const authorImage = getAvatar(
                                users,
                                question.author
                            );

                            return (
                                <div
                                    key={question.id}
                                    className="text-center w-[49%] py-[30px] px-[15px] bg-slate-700 rounded-3xl drop-shadow-md text-white mb-[20px]"
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
                                                className={`flex ${userAnswer1(
                                                    question
                                                )} items-center text-center w-[100%] py-[15px] px-[20px] rounded-3xl bg-white min-h-[78px]`}
                                            >
                                                <p className="text-center w-[100%] text-black">
                                                    {question.optionOne.text}
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
                                                    {question.optionTwo.text}
                                                </p>
                                            </button>
                                        </li>
                                    </ul>
                                    <QuestionStats question={question} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
