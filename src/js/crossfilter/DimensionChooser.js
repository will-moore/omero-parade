
import React from 'react';

import { CXContext } from "./DataContext";

const DimensionChooser = props => {

    const context = React.useContext(CXContext);

    const handleChange = (event) => {
        console.log("handleChange", event.target.value)
        props.addFilter(event.target.value);
    }

    return (
        <select value={"--"} onChange={handleChange}>
            <option value="--">Add Filter</option>
            {context.columns.map(col => (
                <option value={col} key={col}>
                    {col}
                </option>
            ))}
        </select>
    )
}

export default DimensionChooser;
