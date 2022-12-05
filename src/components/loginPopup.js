import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../features/login";
// import { setUsers } from "../features/users";
import { getUsersAsync } from "../features/users";
import { Link } from "react-router-dom";

// Login popup component
export default function LoginPopup() {
    const dispatch = useDispatch();
    // const { isLoggedIn } = useSelector((state) => state.login);
    const userList = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(getUsersAsync());
    }, []);
    const loadingState = useSelector((state) => state.users.loading);
    const authedState = useSelector((state) => state.login.authedUser);
    // // Logout user
    // const handleLogout = () => {
    //     dispatch(logout());
    // };

    // Login user

    const handleLogin = (id) => {
        dispatch(login(id));
    };

    return (
        <div className="group login-popup md:w-full md:max-w-[calc(500px_-_32px)] max-w-[100%_-_32px] text-left z-[3] absolute md:left-1/2 left-[16px] right-[16px] md:top-[10.5%] md:bottom-[10.5%] top-[15px] bottom-[15px] md:-translate-x-1/2 translate-none md:height-9/12 bg-black/20 hover:bg-white/100 rounded-3xl border-[1px] border-white transition-all duration-200 ease-in">
            <div className="login-popup-content relative text-center md:top-1/2 md:-translate-y-1/2 md:p-5 px-5 py-[60px]">
                <h1 className="text-white group-hover:text-black mb-5">
                    <p className="mb-2 font-julius text-4xl md:text-5xl tracking-wide transition-all duration-200 ease-in">
                        Would You Rather?
                    </p>
                </h1>
                <div className="users-container">
                    {loadingState ? ( // If loading state is true, show loading spinner
                        <div className="spinner mt-3" role="status">
                            <span className="loader group-hover:border-black transition-all duration-200 ease-in"></span>
                            <span className="sr-only">Loading...</span>
                        </div>
                    ) : (
                        // If loading state is false, show user list
                        <ul className="users-list md:px-[50px] px-[20px]">
                            <p className="text-white group-hover:text-black md:text-2xl text-xl mb-9 transition-all duration-200 ease-in">
                                Select a profile to login
                            </p>
                            {userList.users.map((user) => {
                                return (
                                    <li
                                        key={user.id}
                                        className="py-5 px-2 first-of-type:mt-0 text-white group-hover:text-black text-left border-b-[1px] first-of-type:border-t-[1px] border-slate-400 group-hover:border-black flex transition-all duration-200 ease-in hover:bg-slate-100"
                                    >
                                        <Link to="/polls" tabIndex="-1">
                                            <div
                                                className="avatar_img rounded-full w-[50px] h-[50px] mr-3 bg-cover bg-center"
                                                style={{
                                                    backgroundImage: `url(${user.avatarURL})`,
                                                }}
                                                alt={user.name}
                                            ></div>
                                        </Link>
                                        <Link
                                            className="flex items-center w-[calc(100%_-_50px)]"
                                            to="/polls"
                                            onClick={() => handleLogin(user.id)}
                                        >
                                            <p>{user.name}</p>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                    ;
                </div>
            </div>
        </div>
    );
}
