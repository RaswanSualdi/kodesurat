import React, { useContext } from "react";
import { KodeSuratContext } from "../context/kodeSuratContext";
import Swal from "sweetalert2";

import Button from "../components/button";

export default function Popup() {
    const { isOpenPopup, setIsOpenPopup, formatCode } =
        useContext(KodeSuratContext);

    function handleCopy(e) {
        e.stopPropagation();
        navigator.clipboard
            .writeText(e.target.parentElement.parentElement.innerText)
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Kode Surat Berhasil Dicopy",
                    showConfirmButton: false,
                    timer: 1500,
                });
            });
    }

    return (
        <div
            className={`fixed left-0 right-0 bottom-0 top-0 bg-[rgba(0,0,0,.6)] grid min-h-screen place-content-center backdrop-blur-sm ${
                !isOpenPopup ? "hidden" : "block"
            }`}
            onClick={() => setIsOpenPopup(false)}
        >
            <div className="bg-white rounded text-center p-5 drop-shadow-md min-w-[500px] relative">
                <div className="border-b border-slate-300 pb-2">
                    <h2 className="text-2xl font-bold">
                        Kode Surat Berhasil Digenerate
                    </h2>
                </div>
                <p className="text-xl font-semibold border-b border-slate-400 inline-block pb-1 my-8">
                    {formatCode}
                    <Button
                        icon="bx bx-copy"
                        cls="ml-2 text-lg"
                        click={handleCopy}
                    ></Button>
                </p>
                <div className="pt-3">
                    <Button
                        text="tutup"
                        cls="bg-blue-bird text-white text-lg font-bold py-1 px-4 rounded uppercase tracking-wide"
                        click={() => setIsOpenPopup(false)}
                    ></Button>
                </div>
            </div>
        </div>
    );
}
