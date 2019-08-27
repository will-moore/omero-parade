import React from 'react';
import { DataContext } from './DataContext';
import { Histogram } from './Histogram';
import { DataTable } from './DataTable';
import DimensionChooser from './DimensionChooser';
import { css } from "glamor";

var style = css({
    width: 300,
});

const CrossFilterApp = props => {

    const [filters, setFilters] = React.useState([]);

    const addFilter = (name) => {
        // Don't add if already used
        if (filters.indexOf(name) > -1) return;
        setFilters(filters.concat(name));
    }
    const removeFilter = (name) => {
        console.log('removeFilter()', name);
        // remove matching item
        setFilters(filters.filter(f => f !== name));
    }
    return (
        <DataContext>
            <div className="fullPage">
                <div className="leftColumn">
                    <DimensionChooser addFilter={addFilter} />

                    {filters.map(filter => (
                        <div key={filter} {...style}>
                            <Histogram dimName={filter} removeChart={removeFilter}/>
                        </div>
                    ))}
                </div>
                <div className="centrePanel">
                    <div>
                        <DataTable />
                    </div>
                </div>
            </div>
        </DataContext>
    )
}

export default CrossFilterApp
