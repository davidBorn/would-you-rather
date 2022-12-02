import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Profile() {
    const authedState = useSelector((state) => state.login.authedUser);
    const users = useSelector((state) => state.users.users);

    return (
        <div className="">
            {users
                .filter((user) => user.id === authedState)
                .map((user) => (
                    <div
                        key={user.id}
                        className="text-black flex mb-8 mx-[20px] mt-[0px] justify-end"
                    >
                        <div className="flex items-center md:text-2xl text-xl font-medium">
                            <p className="font-julius">{user.name}</p>
                        </div>
                        <div
                            style={{
                                backgroundImage: `url(${user.avatarURL})`,
                            }}
                            className="avatar rounded-3xl drop-shadow-md w-[70px] h-[70px] ml-3 bg-cover bg-center"
                        ></div>
                    </div>
                ))}
        </div>
    );
}
