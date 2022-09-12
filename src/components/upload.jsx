import React, { useContext, useRef, useState } from "react";

import Button from "./button";

import { ImageConfig } from "../config/imageConfig";
import { KodeSuratContext } from "../context/kodeSuratContext";
import formatBytes from "../helper/formatBytes";
import uploadDokumentasi from "../api/uploadDokumentasi";

export default function Upload() {
    const { isUpload, setIsUpload, formatId } = useContext(KodeSuratContext);

    const wrapperRef = useRef(null);

    const [fileList, setFileList] = useState([]);

    const onDragEnter = () => wrapperRef.current.classList.add("opacity-60");

    const onDragLeave = () => wrapperRef.current.classList.remove("opacity-60");

    const onDrop = () => wrapperRef.current.classList.remove("opacity-60");

    const onFileDrop = (e) => {
        const newFile = e.target.files[0];
        if (newFile) {
            const updatedList = [...fileList, newFile];
            setFileList(updatedList);
        }
    };

    const fileRemove = (file) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
    };

    const handleUpload = () => {
        fileList.forEach((fl) => {
            uploadDokumentasi(fl, formatId)
                .then((response) => console.log(response))
                .catch((e) => console.error(e));
        });
    };
    return (
        <div
            className={`fixed left-0 right-0 bottom-0 top-0 bg-[rgba(0,0,0,.6)] grid min-h-screen place-content-center backdrop-blur-sm ${
                !isUpload ? "hidden" : "block"
            }`}
            onClick={() => setIsUpload(false)}
        >
            <div
                className="bg-white rounded text-center p-5 drop-shadow-md min-w-[500px] relative"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-2xl font-bold mb-8">Upload Dokumentasi</h2>
                <div
                    className="border-dashed border-2 border-slate-400 bg-slate-100 rounded-md relative py-5"
                    ref={wrapperRef}
                    onDragEnter={onDragEnter}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                >
                    <input
                        type="file"
                        value=""
                        className="opacity-0 absolute top-0 left-0 right-0 bottom-0 cursor-pointer peer"
                        onClick={(e) => e.stopPropagation()}
                        onChange={onFileDrop}
                    />
                    <i className="bx bx-cloud-upload text-9xl text-blue-bird peer-hover:opacity-60"></i>
                    <p className="text-gray-400 font-semibold peer-hover:opacity-60">
                        Drag & Drop your files here
                    </p>
                </div>
                {fileList.length > 0 ? (
                    <div className="mt-3">
                        <p className="font-medium text-left mb-3">
                            Ready to upload
                        </p>
                        {fileList.map((item, index) => (
                            <div
                                key={index}
                                className=" mb-3 bg-slate-200 rounded-md flex items-center gap-3 px-5 p-2"
                            >
                                <i
                                    className={`
                                    text-3xl 
                                    ${
                                        ImageConfig[item.type.split("/")[1]] ||
                                        ImageConfig["default"]
                                    }
                                    `}
                                />
                                <div className="mx-5 text-left text-gray-600">
                                    <p>{item.name}</p>
                                    <p>{formatBytes(item.size)}</p>
                                </div>
                                <Button
                                    cls="bg-white rounded-full w-[40px] h-[40px] ml-auto shadow-md"
                                    icon="text-xl bx bx-x"
                                    click={fileRemove}
                                />
                            </div>
                        ))}
                        <Button
                            click={handleUpload}
                            text="UPLOAD"
                            cls="mt-5 bg-blue-bird text-white text-lg font-bold py-1 px-4 rounded uppercase tracking-wide"
                        ></Button>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
