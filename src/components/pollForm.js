import React, { useState, useRef } from "react";
import { _saveQuestion } from "../utils/_DATA";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function PollForm() {
    const authedState = useSelector((state) => state.login.authedUser);

    const optionOneTextRef = useRef(null);
    const optionTwoTextRef = useRef(null);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        _saveQuestion({
            optionOneText: optionOneTextRef.current.value,
            optionTwoText: optionTwoTextRef.current.value,
            author: authedState,
        });

        navigate("/");
    };
    return (
        <div className="poll-form-container">
            <div className="poll-form-inner">
                <h1 className="text-center font-julius text-3xl tracking-wider mb-[30px] mt-4 font-bold">
                    Create a Poll
                </h1>
                <p className="font-medium text-xl mb-4">
                    Enter new options for a would you rather
                </p>
                <h2 className="text-xl font-medium mb-2 font-julius">
                    Would you rather?
                </h2>
                <form onSubmit={handleSubmit} className="poll-form">
                    <div className="poll-form-input flex flex-col mb-2">
                        <label htmlFor="optionOne">Option One</label>
                        <input
                            ref={optionOneTextRef}
                            type="text"
                            name="optionOne"
                            id="optionOne"
                            placeholder="Enter option one"
                            className="w-3/4 border-b-[1px] border-black"
                        />
                    </div>
                    <div className="poll-form-input flex flex-col mb-4">
                        <label htmlFor="optionTwo">Option Two</label>
                        <input
                            ref={optionTwoTextRef}
                            type="text"
                            name="optionTwo"
                            id="optionTwo"
                            placeholder="Enter option two"
                            className="w-3/4 border-b-[1px] border-black"
                        />
                    </div>
                    <button className="btn btn-primary group items-center text-center py-[15px] px-[20px] rounded-3xl bg-white text-[#badda8] border-2 border-[#badda8] hover:bg-[#badda8] hover:text-white ease-in-out inline-block duration-300">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
