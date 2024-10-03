/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { BiHomeSmile } from "react-icons/bi";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { BsCart2, BsBox } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdLogin, MdLogout } from "react-icons/md";
import { useAuth } from "../../context/auth";
import SearchBar from "./SearchBar";
import { useCart } from "../../context/cart";

const Header = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const { auth, setAuth, LogOut } = useAuth();
    const [cartItems, setCartItems] = useCart();

    const toggleDropdown = () => {
        setDropdownOpen(true);
    };
    const closeDropdown = () => {
        setDropdownOpen(false);
    };

    const handleLogout = () => {
        LogOut();
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-[10000] bg-white w-full h-[70px] shadow-lg">
            <nav className="p-1 sm:py-2 sm:px-4 md:px-12 h-full">
                <div className="flex items-center justify-between gap-1.5 sm:gap-6 md:gap-8 lg:gap-16 w-full h-full">
                    {/* primary div */}
                    <Link to="/">
                        <img src={logo} alt="logo" className="w-14 h-14" />
                    </Link>

                    {/* secondary div */}
                    <div className="flex-1 flex items-center gap-1 sm:gap-5 lg:gap-14 w-[70%]">
                        {/* search bar*/}
                        <SearchBar />
                        {/* home */}
                        <div className="hidden sm:flex items-center group hover:bg-slate-100 px-2 sm:px-3 py-2 rounded-full">
                            <NavLink to="/" className="flex items-center gap-1">
                                <BiHomeSmile className="text-2xl" />
                                <span className="text-lg hidden md:block lg:block ">
                                    Home
                                </span>
                            </NavLink>
                        </div>

                        {/* Account */}
                        <div
                            className={`flex items-center relative cursor-pointer group rounded-full px-2 sm:px-3 py-2 ${
                                auth.user
                                    ? "hover:bg-slate-100"
                                    : "hover:bg-primary"
                            } `}
                            onMouseEnter={toggleDropdown}
                            onMouseLeave={closeDropdown}
                        >
                            {auth.user ? (
                                <div className="flex items-center gap-1 ">
                                    <AiOutlineUser className="text-xl sm:text-2xl " />
                                    <span className="text-lg max-w-fit hidden md:block ">
                                        <p>{auth.user.name.split(" ")[0]}</p>
                                    </span>
                                    <span>
                                        <RiArrowDropDownLine className="group-hover:rotate-[180deg] transition-all " />
                                    </span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-1 w-fit ">
                                    <Link
                                        to="/login"
                                        className=" flex gap-1 group-hover:text-white"
                                    >
                                        <AiOutlineUser className="text-xl sm:text-2xl group-hover:text-white" />
                                        <span className="text-[18px] max-w-fit hidden md:block lg:block whitespace-nowrap">
                                            <p>Sign in</p>
                                        </span>
                                    </Link>
                                    <span>
                                        <RiArrowDropDownLine
                                            className="group-hover:rotate-[180deg] transition-all 
                                                    group-hover:text-white"
                                        />
                                    </span>
                                </div>
                            )}

                            {/* dropdown menu */}
                            {isDropdownOpen && (
                                <div className="absolute top-[38px] sm:top-[44px] -left-[80%] sm:-left-[2px] z-50 bg-white rounded-b-md p-2 w-[140px] shadow-2xl transition-all">
                                    <ul>
                                        {!auth.user && (
                                            <li className="p-1 hover:bg-slate-100 rounded-md">
                                                <Link
                                                    to="/register"
                                                    className="flex items-center gap-3"
                                                >
                                                    <MdLogin className="text-[14px]" />
                                                    <span className="text-[16px]">
                                                        Sign up
                                                    </span>
                                                </Link>
                                            </li>
                                        )}
                                        <li className="p-1 hover:bg-slate-100 rounded-md">
                                            <Link
                                                to={`${
                                                    auth?.user?.role === 1
                                                        ? "/admin"
                                                        : "/user"
                                                }/dashboard`}
                                                className="flex items-center gap-3"
                                            >
                                                <AiOutlineUser className="text-[14px]" />
                                                <span className="text-[16px]">
                                                    My Profile
                                                </span>
                                            </Link>
                                        </li>
                                        {/* if user is not admin */}
                                        {auth.user?.role !== 1 && (
                                            <li className="p-1 hover:bg-slate-100 rounded-md">
                                                <Link
                                                    to="/user/wishlist"
                                                    className="flex items-center gap-3"
                                                >
                                                    <AiOutlineHeart className="text-[14px]" />
                                                    <span className="text-[16px]">
                                                        Wishlist
                                                    </span>
                                                </Link>
                                            </li>
                                        )}
                                        <li className="p-1 hover:bg-slate-100 rounded-md">
                                            <Link
                                                to={`${
                                                    auth?.user?.role === 1
                                                        ? "/admin"
                                                        : "/user"
                                                }/orders`}
                                                className="flex items-center gap-3"
                                            >
                                                <BsBox className="text-[14px]" />
                                                <span className="text-[16px]">
                                                    Orders
                                                </span>
                                            </Link>
                                        </li>

                                        {auth.user && (
                                            <li className="p-1 hover:bg-slate-100 rounded-md ">
                                                <Link
                                                    onClick={handleLogout}
                                                    to="/login"
                                                    className="flex items-center gap-3"
                                                >
                                                    <MdLogout className="text-[14px]" />
                                                    <span className="text-[16px]">
                                                        Logout
                                                    </span>
                                                </Link>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* cart */}
                        {auth?.user?.role !== 1 && (
                            <div className="flex items-center group rounded-full p-2 sm:p-3 hover:bg-stone-100">
                                <NavLink
                                    to="/cart"
                                    className="relative flex items-center gap-1"
                                >
                                    <span className="absolute w-4 h-4 text-xs text-center font-semibold left-2 bottom-3 text-white bg-primary rounded-[50%] ">
                                        {cartItems?.length}
                                    </span>
                                    <BsCart2 className="text-xl sm:text-2xl" />
                                </NavLink>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
