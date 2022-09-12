import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import postDetailSurat from "../api/postDetailSurat";
import putDetailSurat from "../api/putDetailSurat";
import { KodeSuratContext } from "../context/kodeSuratContext";
import Button from "./button";
import Select from "./select";

export default function Modal(props) {
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [titleModal, setTitleModal] = useState("");
    // const [valueInputAdmin, setValueInputAdmin] = useState({
    //     fullName: "",
    //     email: "",
    // });
    const [valueInputDetail, setValueInputDetail] = useState({
        link: "",
        description: "",
    });
    const {
        isOpenModal,
        letterId,
        isEdit,
        setIsOpenModal,
        setIsReloadSurat,
        setIsOpenPopup,
        letterFormat,
        setFormatCode,
        formatId,
    } = useContext(KodeSuratContext);

    useEffect(() => {
        if (isEdit) {
            if (props.isAdmin) setTitleModal("Edit Admin");
            if (props.isDetail) {
                const data = letterFormat.find((lf) => lf.id === formatId);
                const { description, link } = data;

                setTitleModal("Edit Kode Surat");
                setValueInputDetail({ description, link });
            }
        } else {
            resetField();
            if (props.isAdmin) setTitleModal("Tambah Admin");
            if (props.isDetail) setTitleModal("Tambah Kode Surat");
        }
    }, [isEdit, props.isAdmin, props.isDetail, formatId, letterFormat]);

    function handleInputDate(e) {
        setDate(e.target.value);
    }

    function handleChangeModal(e, { isDetail }) {
        if (isDetail) {
            setValueInputDetail({
                ...valueInputDetail,
                [e.target.name]: e.target.value,
            });
        }
    }

    function resetField() {
        setValueInputDetail({
            link: "",
            description: "",
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!isEdit) {
            const selectCompany = document.getElementById("company");
            const dateField = document.getElementById("date");

            const date = new Date(dateField.value);

            const data = {
                deskripsi: valueInputDetail.description,
                tgl_surat: date.getTime() / 1000,
                link: valueInputDetail.link,
                company: Number(selectCompany.value),
            };

            postDetailSurat(data, letterId)
                .then((response) => response.json())
                .then((data) => {
                    resetField();
                    setFormatCode(data.data.letter);
                    setIsReloadSurat(true);
                    setIsOpenModal(false);
                    setIsOpenPopup(true);
                });
        } else {
            const data = {
                deskripsi: valueInputDetail.description,
                link: valueInputDetail.link,
            };

            putDetailSurat(data, formatId).then(() => {
                resetField();
                setIsReloadSurat(true);
                setIsOpenModal(false);

                Swal.fire({
                    icon: "success",
                    title: "SUCCESS",
                    text: "Kode Surat Berhasil di Edit",
                });
            });
        }
    }

    return (
        <div
            className={`fixed left-0 right-0 bottom-0 top-0 bg-[rgba(0,0,0,.6)] grid min-h-screen place-content-center backdrop-blur-sm ${
                !isOpenModal ? "hidden" : "block"
            }`}
        >
            <form onSubmit={handleSubmit}>
                <div className="bg-white rounded px-3 drop-shadow-md min-w-[500px] relative animate-up-down">
                    <div className="absolute top-2 right-2 ">
                        <Button
                            icon="bx bx-x"
                            cls="text-2xl bg-red-600 text-white rounded-full w-[40px] h-[40px] shadow-xl border-2 border-gray-400 hover:border-none"
                            click={() => {
                                setIsOpenModal(false);
                            }}
                        ></Button>
                    </div>
                    <div className="p-4">
                        <h2 className="font-semibold text-lg text-center">
                            {titleModal}
                        </h2>
                    </div>
                    <div className="border-b-[1px] border-slate-400"></div>
                    <div className="px-5 py-3">
                        {props.isAdmin && (
                            <>
                                <div className="flex flex-row my-5 items-center">
                                    <label
                                        htmlFor="full-name"
                                        className="basis-1/2"
                                    >
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="full-name"
                                        id="full-name"
                                        className="border-2 border-zinc-400 px-2 rounded hover:border-blue-bird basis-1/2 active:border-blue-bird outline-none"
                                        // value={valueInputAdmin.fullName}
                                    />
                                </div>
                                <div className="flex flex-row my-5 items-center">
                                    <label
                                        htmlFor="email"
                                        className="basis-1/2"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        // value={valueInputAdmin.email}
                                        className="border-2 border-zinc-400 px-2 rounded hover:border-blue-bird basis-1/2 active:border-blue-bird outline-none"
                                    />
                                </div>
                                <div className="flex flex-row my-5 items-center">
                                    <label
                                        htmlFor="password"
                                        className="basis-1/2"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        className="border-2 border-zinc-400 px-2 rounded hover:border-blue-bird basis-1/2 active:border-blue-bird outline-none"
                                    />
                                </div>
                                <div className="flex flex-row my-5 items-center">
                                    <label
                                        htmlFor="password2"
                                        className="basis-1/2"
                                    >
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password2"
                                        id="password2"
                                        className="border-2 border-zinc-400 px-2 rounded hover:border-blue-bird basis-1/2 active:border-blue-bird outline-none"
                                    />
                                </div>
                                <div className="flex flex-row my-5 items-center">
                                    <label htmlFor="role" className="basis-1/2">
                                        Role
                                    </label>
                                    <Select
                                        data={["Administrator"]}
                                        colors="border-2 border-zinc-400 hover:border-blue-bird outline-none basis-1/2 px-2 w-full"
                                        id="role"
                                    ></Select>
                                </div>
                            </>
                        )}
                        {props.isDetail && (
                            <>
                                <div
                                    className={`flex flex-row my-5 items-center ${
                                        isEdit ? "hidden" : ""
                                    }`}
                                >
                                    <label
                                        htmlFor="company"
                                        className="basis-1/2"
                                    >
                                        Nama Lembaga
                                    </label>
                                    <Select
                                        data={props.company}
                                        colors="border-2 border-zinc-400 hover:border-blue-bird outline-none basis-1/2 px-2 w-full"
                                        id="company"
                                    ></Select>
                                </div>
                                <div
                                    className={`flex flex-row my-5 items-center ${
                                        isEdit ? "hidden" : ""
                                    }`}
                                >
                                    <label htmlFor="date" className="basis-1/2">
                                        Tanggal Surat Keluar
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        id="date"
                                        value={date}
                                        className="border-2 border-zinc-400 px-2 rounded hover:border-blue-bird basis-1/2 active:border-blue-bird outline-none"
                                        onInput={handleInputDate}
                                    />
                                </div>
                                <div className="flex flex-row my-5">
                                    <label
                                        htmlFor="description"
                                        className="basis-1/2"
                                    >
                                        Deskripsi Surat
                                    </label>
                                    <textarea
                                        name="description"
                                        id="description"
                                        cols="30"
                                        rows="5"
                                        className="basis-1/2 border-2 border-zinc-400 px-2 rounded hover:border-blue-bird active:border-blue-bird outline-none"
                                        value={valueInputDetail.description}
                                        onChange={(e) =>
                                            handleChangeModal(e, {
                                                isDetail: true,
                                            })
                                        }
                                        required
                                    ></textarea>
                                </div>
                                <div className="flex flex-row my-5">
                                    <label htmlFor="link" className="basis-1/2">
                                        Link Document
                                    </label>
                                    <textarea
                                        name="link"
                                        id="link"
                                        cols="30"
                                        rows="3"
                                        className="basis-1/2 border-2 border-zinc-400 px-2 rounded hover:border-blue-bird active:border-blue-bird outline-none"
                                        value={valueInputDetail.link}
                                        onChange={(e) =>
                                            handleChangeModal(e, {
                                                isDetail: true,
                                            })
                                        }
                                        required
                                    ></textarea>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="border-b-[1px] border-slate-400"></div>
                    <div className="p-5 text-center">
                        <Button
                            text={isEdit ? "Edit" : "Tambah"}
                            cls={`text-white px-3 py-2 rounded uppercase font-bold tracking-wide ${
                                isEdit ? "bg-yellow-400 " : "bg-blue-bird"
                            }`}
                            type="submit"
                        ></Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
