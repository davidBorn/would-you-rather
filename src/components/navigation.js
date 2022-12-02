import React from "react";
import { Link, NavLink } from "react-router-dom";
import Logout from "./logout";
import { MdOutlineHome, MdOutlinePoll, MdOutlineCreate } from "react-icons/md";

// navigation for the application
export default function Navigation() {
    return (
        <nav className="navbar w-3/12 pr-[20px] pt-[0px] pb-[20px]">
            <div className="navbar-content">
                <Link to="/">
                    <p className="font-julius text-4xl md:text-5xl tracking-wide mb-8">
                        Would You Rather?
                    </p>
                </Link>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink
                            to="/polls"
                            className={(isActive) =>
                                "sideNav-link block mt-[10px] group relative z-[0] after:content-[''] after:block after:absolute after:h-full after:z-[2] after:rounded-3xl after:drop-shadow-md after:top-[0px] after:left-[0px] w-transition navLink-icon" +
                                (!isActive
                                    ? " after:w-[0px] after:bg-white hover:after:bg-violet-400 hover:after:w-full hover:after:transition-all hover:after:duration-500"
                                    : " after:w-full after:bg-violet-400 active")
                            }
                        >
                            <div className="nav-item rounded-3xl drop-shadow-md relative z-[3]">
                                <div className="icon-container inline-block align-middle bg-white p-[20px] rounded-3xl drop-shadow-md relative group-hover:drop-shadow-none group-hover:bg-transparent transition-all duration-400">
                                    <MdOutlinePoll className="text-[30px] relative group-hover:z-[3]" />
                                </div>
                                <span className="inline-block align-middle pl-[15px] relative group-hover:z-[3]">
                                    Polls
                                </span>
                            </div>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            to="/add"
                            className={(isActive) =>
                                "sideNav-link block mt-[10px] group relative z-[0] after:content-[''] after:block after:absolute after:h-full after:z-[2] after:rounded-3xl after:drop-shadow-md after:top-[0px] after:left-[0px] w-transition navLink-icon" +
                                (isActive
                                    ? " after:w-[0px] after:bg-white hover:after:bg-violet-400 hover:after:w-full hover:after:transition-all hover:after:duration-500"
                                    : " after:w-full after:bg-violet-400 active")
                            }
                        >
                            <div className="nav-item rounded-3xl drop-shadow-md relative z-[3]">
                                <div className="icon-container inline-block align-middle bg-white p-[20px] rounded-3xl drop-shadow-md relative group-hover:drop-shadow-none group-hover:bg-transparent transition-all duration-400">
                                    <MdOutlineCreate className="text-[30px] relative group-hover:z-[3]" />
                                </div>
                                <span className="inline-block align-middle pl-[15px] relative group-hover:z-[3]">
                                    Create New Poll
                                </span>
                            </div>
                        </NavLink>
                    </li>
                </ul>
                <Logout />
            </div>
        </nav>
    );
}
