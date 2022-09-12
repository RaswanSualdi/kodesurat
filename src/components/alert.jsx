import React from "react";
import Button from "./button";

export default function Alert(props) {
    return (
        <div
            className="fixed left-0 right-0 bottom-0 top-0 bg-[rgba(0,0,0,.6)] grid min-h-screen place-content-center backdrop-blur-sm"
            onClick={props.closeAlert}
        >
            <div
                className="bg-white rounded px-3 drop-shadow-md min-w-[450px] p-5 text-center"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className="w-[75px] h-[75px] border-2 border-red-400 rounded-full leading-[110px] mx-auto">
                    <i className="bx bx-x text-red-400 text-6xl"></i>
                </div>

                <div className="my-4">
                    <h2 className="font-bold text-xl mb-1">{props.title}</h2>
                    <p>{props.text}</p>
                </div>
                <div className="mt-8">
                    <Button
                        text="tutup"
                        cls="bg-blue-bird text-white text-lg font-bold py-1 px-4 rounded uppercase tracking-wide"
                        click={props.closeAlert}
                    ></Button>
                </div>
            </div>
        </div>
    );
}
