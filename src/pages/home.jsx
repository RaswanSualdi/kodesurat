import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// COMPONENT
import Header from "../layouts/header";
import Heading from "../components/heading";
import Table from "../components/table";

// CONTEXT
import { KodeSuratContext } from "../context/kodeSuratContext";

// API
import getKodeSurat from "../api/getKodeSurat";
export default function Home() {
    const navigate = useNavigate();

    const { setKodeSurat, current, countData, query, setIsLoading } =
        useContext(KodeSuratContext);
    const [links, setLinks] = useState([]);
    const [firstData, setFirstData] = useState(0);
    const [lastData, setLastData] = useState(0);
    const [isLogin, setIsLogin] = useState(false);

    const totalData = useRef(0);

    useEffect(() => {
        if (!window.localStorage.getItem("TOKEN_AUTH")) {
            navigate("/login", { replace: true });
        } else {
            setIsLogin(true);
            setIsLoading(true);
            getKodeSurat(current, countData, query)
                .then((response) => response.json())
                .then((data) => data.data)
                .then((data) => {
                    setIsLoading(false);
                    setKodeSurat(data.data);
                    setLastData(data.to);
                    totalData.current = data.total;
                    setLinks(data.links);
                    setFirstData(data.from);
                })
                .catch((e) => console.error(e));
        }
    }, [current, setKodeSurat, countData, query, navigate, setIsLoading]);
    return (
        isLogin && (
            <>
                <Header isLogin={isLogin}></Header>
                <main>
                    <div className="container px-10 my-10 mx-auto">
                        <div className="shadow-2xl w-100 py-5 px-10 rounded-xl">
                            <div className="flex justify-between">
                                <Heading text="Penomoran Surat Upana"></Heading>
                            </div>

                            <Table
                                from={firstData}
                                to={lastData}
                                totalData={totalData.current}
                                ks={true}
                                links={links}
                            ></Table>
                        </div>
                    </div>
                </main>
            </>
        )
    );
}
