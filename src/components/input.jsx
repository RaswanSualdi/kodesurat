import React from "react";

export default function Input(props) {
    return (
        <div
            className={`rounded border flex items-center group ${props.clsField}`}
        >
            <i className={props.icon + " " + props.clsIcon}></i>
            <input
                type={props.type}
                id={props.id}
                placeholder={props.placeholder}
                className={`outline-none ${props.clsInput}`}
                onInput={props.input}
            ></input>
        </div>
    );
}
