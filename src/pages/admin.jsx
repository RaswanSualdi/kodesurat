import React, { useContext, useEffect } from "react";
import Heading from "../components/heading";
import Modal from "../components/modal";
import Table from "../components/table";
import { KodeSuratContext } from "../context/kodeSuratContext";
import Header from "../layouts/header";

export default function Admin() {
    const { setIsLoading, setAdmins } = useContext(KodeSuratContext);

    useEffect(() => {
        setAdmins([
            {
                id: 1,
                name: "Abdul Malik",
                email: "adbulmalik@gmail.com",
                role: "Administrator",
                join: "24 April 2022",
            },
            {
                id: 2,
                name: "Abdul Malik",
                email: "adbulmalik@gmail.com",
                role: "Administrator",
                join: "24 April 2022",
            },
            {
                id: 3,
                name: "Abdul Malik",
                email: "adbulmalik@gmail.com",
                role: "Administrator",
                join: "24 April 2022",
            },
            {
                id: 4,
                name: "Abdul Malik",
                email: "adbulmalik@gmail.com",
                role: "Administrator",
                join: "24 April 2022",
            },
            {
                id: 5,
                name: "Abdul Malik",
                email: "adbulmalik@gmail.com",
                role: "Administrator",
                join: "24 April 2022",
            },
        ]);
        setIsLoading(false);
    }, [setAdmins, setIsLoading]);

    return (
        <>
            <Header icon="bx bxs-home"></Header>
            <main>
                <div className="container px-10 my-10 mx-auto">
                    <div className="shadow-2xl w-100 py-5 px-10 rounded-xl">
                        <div className="flex justify-between">
                            <Heading text="User Management"></Heading>
                        </div>

                        <Table
                            from={1}
                            to={5}
                            totalData={5}
                            isAdmin={true}
                        ></Table>
                    </div>
                </div>
            </main>
            <Modal isAdmin={true}></Modal>
        </>
    );
}
