import React, { useState, createContext } from "react";

export const KodeSuratContext = createContext();

export const KodeSuratProvider = (props) => {
    const [kodeSurat, setKodeSurat] = useState([]);
    const [current, setCurrent] = useState(1);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [query, setQuery] = useState("");
    const [countData, setCountData] = useState(20);
    const [letterId, setLetterId] = useState(null);
    const [formatId, setFormatId] = useState(null);
    const [letterFormat, setLetterFormat] = useState([]);
    const [isReloadSurat, setIsReloadSurat] = useState(false);
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [formatCode, setFormatCode] = useState("");
    const [filter, setFilter] = useState({
        company: "0",
        date_from: "",
        date_to: "",
    });
    const [isLoading, setIsLoading] = useState(true);
    const [admins, setAdmins] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [isUpload, setIsUpload] = useState(false);

    return (
        <KodeSuratContext.Provider
            value={{
                kodeSurat,
                setKodeSurat,
                current,
                setCurrent,
                isOpenModal,
                setIsOpenModal,
                query,
                setQuery,
                countData,
                setCountData,
                letterId,
                setLetterId,
                letterFormat,
                setLetterFormat,
                isReloadSurat,
                setIsReloadSurat,
                isOpenPopup,
                setIsOpenPopup,
                formatCode,
                setFormatCode,
                filter,
                setFilter,
                isLoading,
                setIsLoading,
                admins,
                setAdmins,
                isEdit,
                setIsEdit,
                formatId,
                setFormatId,
                isUpload,
                setIsUpload,
            }}
        >
            {props.children}
        </KodeSuratContext.Provider>
    );
};
