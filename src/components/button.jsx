import React from "react";

export default function Button(props) {
    return (
        <button
            onClick={props.click}
            className={props.cls}
            disabled={props.isDisabled}
            type={props.type || "button"}
            title={props.title || ""}
        >
            {props.icon && <i className={props.icon}></i>}
            {props.text && props.text}
        </button>
    );
}
