import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Heading from "../components/heading";
import Table from "../components/table";
import Button from "../components/button";

import Header from "../layouts/header";
import Modal from "../components/modal";
import { KodeSuratContext } from "../context/kodeSuratContext";

import getCompanies from "../api/getCompanies";
import getDetailSurat from "../api/getDetailSurat";
import Popup from "../components/popup";
import Upload from "../components/upload";

export default function Detail() {
    const { letter } = useParams();
    const navigate = useNavigate();

    const {
        letterId,
        current,
        countData,
        query,
        kodeSurat,
        isReloadSurat,
        setIsLoading,
        setIsReloadSurat,
        setIsOpenModal,
        setLetterFormat,
        filter,
        setIsEdit,
    } = useContext(KodeSuratContext);
    const [links, setLinks] = useState([]);
    const [firstData, setFirstData] = useState(0);
    const [lastData, setLastData] = useState(0);
    const [title, setTitle] = useState("");
    const dataCompanies = useRef(null);
    const totalData = useRef(0);

    useEffect(() => {
        if (!letterId) {
            navigate("/", { replace: true });
        } else {
            setIsLoading(true);
            setTitle(kodeSurat.find((ks) => ks.letter === letter).kind_letter);

            getCompanies()
                .then((response) => response.json())
                .then((data) => (dataCompanies.current = data))
                .catch((e) => console.error(e));

            getDetailSurat(
                letterId,
                current,
                countData,
                query,
                filter.company,
                filter.date_from,
                filter.date_to
            )
                .then((response) => response.json())
                .then((data) => {
                    setIsLoading(false);
                    setLetterFormat(data.data);
                    setLastData(data.to);
                    totalData.current = data.total;
                    setLinks(data.links);
                    setFirstData(data.from);

                    setIsReloadSurat(false);
                })
                .catch((e) => console.error(e));
        }
    }, [
        letter,
        letterId,
        kodeSurat,
        current,
        countData,
        query,
        isReloadSurat,
        setIsReloadSurat,
        setLetterFormat,
        setIsLoading,
        filter,
        navigate,
    ]);

    return (
        <>
            <Header icon="bx bxs-home"></Header>
            <main>
                <div className="container px-10 my-10 mx-auto">
                    <div className="shadow-2xl w-100 py-5 px-10 rounded-xl">
                        <div className="flex justify-between">
                            <Heading text={title}></Heading>
                        </div>

                        <Table
                            ks={false}
                            from={firstData}
                            to={lastData}
                            totalData={totalData.current}
                            links={links}
                            isDetail={true}
                            company={dataCompanies.current}
                        ></Table>
                    </div>
                </div>
                <Button
                    icon="bx bx-plus"
                    cls={
                        "rounded-full fixed text-5xl p-2 text-white bg-blue-bird bottom-[5%] right-[3%] shadow-xl border border-slate-400 hover:border-none"
                    }
                    click={() => {
                        setIsEdit(false);
                        setIsOpenModal(true);
                    }}
                ></Button>
            </main>
            <Modal
                letter={letter}
                company={dataCompanies.current}
                isDetail={true}
            ></Modal>
            <Popup></Popup>
            <Upload />
        </>
    );
}
