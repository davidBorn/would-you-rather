import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionsAsync } from "../features/questions";
import { useEffect } from "react";
import { TbQuestionMark } from "react-icons/tb";

const Leaderboard = (props) => {
    const authedState = props.authedState;
    console.log(authedState);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getQuestionsAsync());
    }, []);
    const userList = useSelector((state) => state.users);
    console.log(userList.users);
    const loadingQuestionsState = useSelector(
        (state) => state.questions.loading
    );
    const questionsState = useSelector((state) => state.questions.questions);

    const answeredQuestions = (userid, questionsState) => {
        const answeredArray = questionsState.filter(
            (question) =>
                question.optionOne.votes.includes(userid) ||
                question.optionTwo.votes.includes(userid)
        );
        return answeredArray.length;
    };

    const askedQuestions = (userid, questionsState) => {
        const askedArray = questionsState.filter(
            (question) => question.author === userid
        );
        return askedArray.length;
    };

    // For each user in userlist find out the sum of the total number of questions asked and answered and return each user with their total score, then sort the array by the total score
    const userScore = (userList, questionsState) => {
        let userScore = [];
        userList.forEach((user) => {
            let answeredQuestions = questionsState.filter(
                (question) =>
                    question.optionOne.votes.includes(user.id) ||
                    question.optionTwo.votes.includes(user.id)
            );
            let askedQuestions = questionsState.filter(
                (question) => question.author === user.id
            );
            let totalScore = answeredQuestions.length + askedQuestions.length;
            userScore.push({
                id: user.id,
                name: user.name,
                avatarURL: user.avatarURL,
                totalScore: totalScore,
            });

            userScore.sort((a, b) => b.totalScore - a.totalScore);
        });
        return userScore;
    };
    console.log(userScore(userList.users, questionsState));

    return (
        <div>
            <ul className="leaderboard">
                {userScore(userList.users, questionsState).map((user) => (
                    <li key={user.id} className="relative leaderboard-card">
                        <div className="user-score">
                            <div
                                className="avatarImage w-[70px] h-[70px] mb-[20px] rounded-3xl drop-shadow-md w-[70px] h-[70px] bg-cover bg-center"
                                style={{
                                    backgroundImage: `url(${user.avatarURL})`,
                                }}
                            ></div>
                            <div className="user-score__info">
                                <h2 className="font-julius text-xl mb-2">
                                    {user.name}
                                </h2>
                                <p className="questions-asked">
                                    Questions Asked:{" "}
                                    {askedQuestions(user.id, questionsState)}
                                </p>
                                <p className="questions-answered">
                                    Questions Answered:{" "}
                                    {answeredQuestions(user.id, questionsState)}
                                </p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Leaderboard;
