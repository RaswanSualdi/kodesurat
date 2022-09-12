import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import { KodeSuratContext } from "../context/kodeSuratContext";

import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";

import presets from "../utils/presets";

import Input from "./input";
import Select from "./select";
import Button from "./button";
import deleteDetailSurat from "../api/deleteDetailSurat";

export default function Table(props) {
    const [companies, setCompanies] = useState([]);

    const {
        kodeSurat,
        letterFormat,
        countData,
        current,
        filter,
        admins,
        isLoading,
        setIsReloadSurat,
        setCurrent,
        setCountData,
        setLetterId,
        setQuery,
        setFilter,
        setIsOpenModal,
        setIsEdit,
        setFormatId,
        setIsUpload,
    } = useContext(KodeSuratContext);

    useEffect(() => {
        if (props.company) {
            setCompanies(props.company);
        }
    }, [props.company]);

    function handleCopy(e) {
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

    function setNoData(colspan) {
        return (
            <tr key="tr-1">
                <td className="border text-center" colSpan={colspan}>
                    Maaf Data Belum ada
                </td>
            </tr>
        );
    }

    function handleSearch(e) {
        setQuery(e.target.value);
    }

    const clearState = () => {
        setCurrent(1);
        setQuery("");
        setFilter({
            company: "0",
            date_from: "",
            date_to: "",
        });
    };

    let dataTable;
    let number = props.from;
    if (props.ks) {
        if (kodeSurat && kodeSurat.length > 0) {
            dataTable = kodeSurat.map((ks) => (
                <tr key={ks.id}>
                    <td className="border py-2 text-center">{number++}</td>
                    <td className="border pl-4">
                        <Link
                            to={`/${ks.letter}`}
                            className="cursor-pointer"
                            onClick={() => {
                                clearState();
                                setLetterId(ks.id);
                            }}
                        >
                            {ks.kind_letter}
                        </Link>
                    </td>
                </tr>
            ));
        } else {
            dataTable = setNoData(2);
        }
    }

    if (props.isDetail) {
        if (letterFormat && letterFormat.length > 0) {
            dataTable = letterFormat.map((lf) => (
                <tr key={lf.id}>
                    <td className="border text-center">{number++}</td>
                    <td className="border pl-4">
                        <p className="relative">
                            {lf.letter}
                            <Button
                                icon="bx bx-copy"
                                cls="ml-2 absolute right-2 text-lg"
                                click={handleCopy}
                            ></Button>
                        </p>
                    </td>
                    <td className="border text-center">{lf.date_letter}</td>
                    <td className="border text-center">{lf.description}</td>
                    <td className="border text-center">
                        <a
                            href={lf.link}
                            target="_blank"
                            rel="noreferrer"
                            title="link Document"
                        >
                            <i className="bx bx-file text-xl"></i>
                        </a>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a
                            href="#"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block ml-3"
                            title="Dokumentasi"
                        >
                            <i class="bx bxs-file-pdf text-xl"></i>
                        </a>
                    </td>
                    <td className="border text-center py-1">
                        <Button
                            icon="bx bxs-edit text-white text-xl"
                            cls="py-1 px-2 mr-2 text-black rounded bg-yellow-400"
                            title="Edit Kode Surat"
                            click={() => {
                                setFormatId(lf.id);
                                setIsEdit(true);
                                setIsOpenModal(true);
                            }}
                        ></Button>
                        <Button
                            icon="bx bx-upload text-xl text-white"
                            cls="py-1 px-2 mr-2 text-black rounded bg-green-600"
                            title="Upload Dokumentasi"
                            click={() => {
                                setFormatId(lf.id);
                                setIsUpload(true);
                            }}
                        ></Button>
                        <Button
                            icon="bx bx-trash text-xl text-white"
                            cls=" py-1 px-2 text-black rounded bg-red-500"
                            title="Hapus Kode Surat"
                            click={() => {
                                Swal.fire({
                                    title: "Apa anda Yakin?",
                                    icon: "warning",
                                    showCancelButton: true,
                                    text: "Kode Surat akan dihapus permanen!",
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: "Ya, Hapus!",
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        deleteDetailSurat(lf.id)
                                            .then(() => {
                                                setIsReloadSurat(true);
                                                Swal.fire(
                                                    "Deleted!",
                                                    "Kode Surat Berhasil Dihapus.",
                                                    "success"
                                                );
                                            })
                                            .catch((e) => console.error(e));
                                    }
                                });
                            }}
                        ></Button>
                    </td>
                </tr>
            ));
        } else {
            if (current > 1) setCurrent(current - 1);
            else {
                dataTable = setNoData(6);
            }
        }
    }

    if (props.isAdmin) {
        if (admins && admins.length > 0) {
            dataTable = admins.map((ad) => (
                <tr key={ad.id}>
                    <td className="py-3 text-center">{number++}</td>
                    <td className="py-3 pl-4">
                        <h3 className="font-bold mb-[-3px]">{ad.name}</h3>
                        <p className="text-gray-500">{ad.email}</p>
                    </td>
                    <td className="py-3 text-center text-gray-500">
                        {ad.role}
                    </td>
                    <td className="py-3 text-center text-gray-500">
                        {ad.join}
                    </td>
                    <td className="py-3 text-center">
                        <Button
                            icon="bx bxs-edit text-xl"
                            cls="bg-slate-300 py-1 px-2 mr-2 text-black rounded"
                        ></Button>
                        <Button
                            icon="bx bx-trash text-xl"
                            cls="bg-slate-300 py-1 px-2 text-black rounded"
                        ></Button>
                    </td>
                </tr>
            ));
        } else {
            dataTable = setNoData(5);
        }
    }

    let buttons;
    const links = [];
    if (props.links && props.links.length > 0) {
        links.push(...props.links.slice(1, props.links.length - 1));
        buttons = links.map((link) => (
            <Button
                key={link.label}
                text={link.label}
                cls={`py-1 px-3 border border-slate-300 rounded hover:bg-blue-bird hover:text-white ${
                    // eslint-disable-next-line eqeqeq
                    current == link.label ? "bg-blue-bird text-white" : ""
                }`}
                click={() => {
                    setCurrent(Number(link.label));
                }}
            ></Button>
        ));
    }

    return (
        <div className="mt-5">
            <div className="flex justify-between px-24 items-center">
                <div className="flex flex-auto">
                    <p className="py-1">Showing</p>
                    <Select
                        change={(e) => {
                            setCountData(e.target.value);
                        }}
                        value={countData}
                        data={[20, 50, 100]}
                        colors="border-slate-300 hover:border-blue-bird outline-none"
                    ></Select>
                    <p className="py-1">entries</p>
                </div>
                <div className="flex flex-row">
                    {props.isDetail && (
                        <>
                            <DateRangePickerComponent
                                delayUpdate={true}
                                placeholder="Filter Date"
                                firstDayOfWeek={1}
                                presets={presets}
                                change={(e) => {
                                    setFilter({
                                        ...filter,
                                        date_from: e.startDate / 1000,
                                        date_to: e.endDate / 1000,
                                    });
                                }}
                            />
                            <Select
                                data={[
                                    { id: "0", letter: "ALL" },
                                    ...companies,
                                ]}
                                colors="border-slate-300 hover:border-blue-bird outline-none"
                                change={(e) => {
                                    setFilter({
                                        ...filter,
                                        company: e.target.value,
                                    });
                                }}
                            ></Select>
                        </>
                    )}
                    {props.isAdmin && (
                        <Button
                            icon="bx bx-plus text-xl mr-1"
                            text="Add User"
                            cls="mr-2 px-3 py-2 bg-blue-bird rounded flex flex-row items-center text-white"
                            click={() => setIsOpenModal(true)}
                        ></Button>
                    )}
                    <Input
                        type="text"
                        placeholder="Search"
                        id="input-search"
                        clsField="border-slate-300 hover:border-blue-bird"
                        icon="bx bx-search"
                        clsIcon="px-3 my-1 text-base border-r mr-2 border-slate-400 group-hover:text-blue-bird"
                        input={handleSearch}
                    ></Input>
                </div>
            </div>
            <table className="table-auto w-10/12 mx-auto my-4 border-collapse">
                <thead>
                    {props.ks && (
                        <tr>
                            <th className="border w-1/12 py-2 bg-slate-300">
                                NO
                            </th>
                            <th className="border bg-slate-300">KODE SURAT</th>
                        </tr>
                    )}
                    {props.isDetail && (
                        <tr>
                            <th className="border w-1/12 py-2 bg-slate-300">
                                NO
                            </th>
                            <th className="border w-4/12 bg-slate-300">
                                KODE SURAT
                            </th>
                            <th className="border w-2/12 bg-slate-300">
                                TGL SURAT
                            </th>
                            <th className="border w-2/12 bg-slate-300">
                                DESKRIPSI
                            </th>
                            <th className="border w-1/12 bg-slate-300">
                                DOCUMENT
                            </th>
                            <th className="border w-2/12 bg-slate-300">AKSI</th>
                        </tr>
                    )}
                    {props.isAdmin && (
                        <tr className="border-b-2 pb-3 border-slate-400">
                            <th className="w-1/12 py-2">NO</th>
                            <th className="w-4/12">USER</th>
                            <th className="w-2/12">ROLE</th>
                            <th className="w-3/12">JOINED DATE</th>
                            <th className="w-2/12">ACTION</th>
                        </tr>
                    )}
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr key="tr-1">
                            <td
                                className="border text-center py-5"
                                colSpan={"100%"}
                            >
                                <div className="inline-block w-12 h-12 border-4 border-blue-400 border-dotted rounded-full animate-spin"></div>
                            </td>
                        </tr>
                    ) : (
                        dataTable
                    )}
                </tbody>
            </table>
            <div className="flex justify-between px-24 align-middle">
                <p className="py-1">
                    Showing {props.from} to {props.to} of {props.totalData}{" "}
                    entries
                </p>
                <div className="flex flex-row">
                    {links.length > 0 && (
                        <>
                            <Button
                                key="prev"
                                icon="bx bx-chevron-left"
                                cls={`py-1 px-3 border border-slate-300 rounded text-xl font-semibold ${
                                    current > 1
                                        ? "hover:bg-blue-bird hover:text-white"
                                        : ""
                                }`}
                                isDisabled={current <= 1 ? true : false}
                                click={() => {
                                    setCurrent(current - 1);
                                }}
                            ></Button>
                            {buttons}
                            <Button
                                key="next"
                                icon="bx bx-chevron-right"
                                cls={`py-1 px-3 border border-slate-300 rounded text-xl font-semibold ${
                                    current >= links.length
                                        ? ""
                                        : "hover:bg-blue-bird hover:text-white "
                                }`}
                                isDisabled={
                                    current >= links.length ? true : false
                                }
                                click={() => {
                                    setCurrent(current + 1);
                                }}
                            ></Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
