import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { KodeSuratContext } from "../context/kodeSuratContext";

export default function Header(props) {
    const { setCurrent, setQuery, setFilter } = useContext(KodeSuratContext);

    const navigate = useNavigate();
    const returnHome = () => {
        clearState();
        navigate("/");
    };

    const logoutHandle = () => {
        clearState();
        window.localStorage.removeItem("TOKEN_AUTH");
        window.localStorage.clear();
        navigate("/login", { replace: true }, [navigate]);
    };

    const clearState = () => {
        setCurrent(1);
        setQuery("");
        setFilter({
            company: "",
            date_from: "",
            date_to: "",
        });
    };

    return (
        <header>
            <div className="py-5 bg-blue-bird">
                <div className="container flex justify-between items-center px-10 mx-auto">
                    <img
                        src="/assets/img/logo.svg"
                        alt="Logo Upana"
                        className="w-2/12"
                    />
                    {props.icon && (
                        <div
                            className="group flex flex-row items-center  cursor-pointer hover:bg-white rounded-md px-3 py-2"
                            onClick={returnHome}
                        >
                            <i
                                className={`text-white text-2xl pr-1 group-hover:text-blue-bird ${props.icon}`}
                            ></i>
                            <p className="text-white text-lg group-hover:text-blue-bird">
                                Home
                            </p>
                        </div>
                    )}
                    {props.isLogin && (
                        <div
                            className="group flex flex-row items-center  cursor-pointer hover:bg-white rounded-md px-3 py-2"
                            onClick={logoutHandle}
                        >
                            <i className="bx bx-exit text-white text-2xl pr-1 group-hover:text-blue-bird"></i>
                            <p className="text-white text-lg group-hover:text-blue-bird">
                                Logout
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
