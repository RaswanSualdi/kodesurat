import React from "react";

export default function Select(props) {
    const data = props.data;
    let options;

    if (data && data.length > 0) {
        options = data.map((d, i) => (
            <option value={d.id || d} key={i}>
                {d.letter || d}
            </option>
        ));
    }

    return (
        <select
            className={"rounded border mx-2 " + props.colors}
            onChange={props.change}
            value={props.value}
            id={props.id}
        >
            {options}
        </select>
    );
}
