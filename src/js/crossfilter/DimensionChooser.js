
import React from 'react';

import { CXContext } from "./DataContext";

const DimensionChooser = props => {

    const context = React.useContext(CXContext);

    const handleChange = (event) => {
        props.addFilter(event.target.value);
    }

    return (
        <select value={"--"} onChange={handleChange}>
            <option value="--">Add Filter</option>
            {context.columns.map(col => (
                <option value={col.name} key={col.name}>
                    {col.name}
                </option>
            ))}
        </select>
    )
}

export default DimensionChooser;
