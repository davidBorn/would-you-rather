import { MdPersonOutline } from "react-icons/md";
import React from "react";

const questionStats = (props) => {
    const { question } = props;

    // Calculate total votes for each question
    const totalVotes = (question) => {
        return (
            question.optionOne.votes.length + question.optionTwo.votes.length
        );
    };

    // Calculate the percentage of votes for option one
    const percentageOptionOne = (question) => {
        return (
            (props.question.optionOne.votes.length / totalVotes(question)) *
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
        <div className="question-stats-container">
            <div className="question-stats-inner">
                <ul className="flex">
                    <li className="w-1/2 pt-2">
                        <p>
                            {question.optionOne.votes.length}
                            <MdPersonOutline className="mr-2 inline-block align-[-3px]"></MdPersonOutline>
                            ({percentageOptionOne(question)}
                            %)
                        </p>
                    </li>
                    <li className="w-1/2 pt-2">
                        <p>
                            {question.optionTwo.votes.length}
                            <MdPersonOutline className="mr-2 inline-block align-[-3px]"></MdPersonOutline>
                            ({percentageOptionTwo(question)}
                            %)
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default questionStats;
