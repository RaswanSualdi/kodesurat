import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import postLogin from "../api/postLogin";
import Alert from "../components/alert";
import Button from "../components/button";

import Input from "../components/input";

export default function Login() {
    const navigate = useNavigate();
    const [isOpenAlert, setIsOpenAlert] = useState(false);

    function handleLogin(e) {
        e.preventDefault();

        const usernameField = document.getElementById("username");
        const passwordField = document.getElementById("password");

        const data = {
            email: usernameField.value,
            password: passwordField.value,
        };

        postLogin(data)
            .then((response) => {
                if (response.status === 401) setIsOpenAlert(true);
                if (response.status === 200) return response.json();
            })
            .then((data) => {
                if (data) {
                    console.log(data);
                    window.localStorage.setItem(
                        "TOKEN_AUTH",
                        data.access_token
                    );
                    navigate("/", { replace: true }, [navigate]);
                }
            })
            .catch((e) => {
                console.error(e);
            });
    }

    return (
        <main className="bg-blue-bird min-h-screen grid relative place-content-center overflow-hidden">
            <img
                src="./assets/img/blub.svg"
                alt=""
                className="absolute right-0 w-6/12"
            />
            <div className="text-center">
                <img
                    src="./assets/img/logo.svg"
                    alt="Upana Studio"
                    className="w-5/12 inline-block "
                />
                <form onSubmit={handleLogin}>
                    <div className="my-10 w-72 mx-auto">
                        <Input
                            type="text"
                            id="username"
                            placeholder="username"
                            icon="bx bx-user"
                            clsIcon="text-white mr-2 text-lg"
                            clsInput="bg-transparent placeholder:text-white text-white"
                            clsField="p-2 mb-4"
                        ></Input>
                        <Input
                            type="password"
                            id="password"
                            placeholder="password"
                            icon="bx bx-lock"
                            clsIcon="text-white mr-2 text-lg"
                            clsInput="bg-transparent placeholder:text-white text-white"
                            clsField="p-2 mb-6"
                        ></Input>
                        <Button
                            cls="bg-white w-full uppercase text-blue-bird rounded drop-shadow-lg font-semibold py-2"
                            text="login"
                            type="submit"
                        ></Button>
                    </div>
                </form>
            </div>
            <div className="w-72 h-72 rounded-full absolute left-[-8%] bottom-[-20%] bg-[#274FC7] opacity-50"></div>
            <div className="w-80 h-80 rounded-full absolute left-[-8%] bottom-[-20%] bg-[#244BC5] opacity-50"></div>
            <div className="w-96 h-96 rounded-full absolute left-[-10%] bottom-[-25%] bg-[#264ECA] opacity-50"></div>
            {isOpenAlert && (
                <Alert
                    title="Login Gagal"
                    text="Username atau Password Salah"
                    closeAlert={() => setIsOpenAlert(false)}
                ></Alert>
            )}
        </main>
    );
}
