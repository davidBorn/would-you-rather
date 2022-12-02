import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/login";
import { MdOutlineLogout } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Logout() {
    const loginState = useSelector((state) => state.login.loggedIn);
    const dispatch = useDispatch();
    let history = useNavigate();
    const Logout = () => {
        dispatch(logout());
        history("/");
    };

    return (
        <Link
            to="/"
            onClick={() => Logout(loginState)}
            className="sideNav-link block mt-[10px] group relative z-[0] after:content-[''] after:block after:absolute after:w-[0px] after:h-full after:z-[2] after:rounded-3xl after:drop-shadow-md after:bg-white after:top-[0px] after:left-[0px] hover:after:bg-violet-400 hover:after:w-full hover:after:transition-all hover:after:duration-500 w-transition navLink-icon"
        >
            <div className="nav-item rounded-3xl drop-shadow-md relative z-[3]">
                <div className="inline-block align-middle bg-white p-[20px] rounded-3xl drop-shadow-md relative group-hover:drop-shadow-none group-hover:bg-transparent transition-all duration-400">
                    <MdOutlineLogout className="text-[30px] relative group-hover:z-[3]" />
                </div>
                <span className="inline-block align-middle pl-[15px] relative group-hover:z-[3]">
                    Logout
                </span>
            </div>
        </Link>
    );
}
