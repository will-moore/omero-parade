import React from 'react';
import { DataContext } from './DataContext';
import { Histogram } from './filters/Histogram';
import { TextFilter } from './filters/TextFilter';
import { DataTable } from './DataTable';
import DimensionChooser from './DimensionChooser';
import { css } from "glamor";

var style = css({
    width: 300,
});

const CrossFilterApp = props => {

    const [filters, setFilters] = React.useState([]);

    const addFilter = (column) => {
        // Don't add if already used
        if (filters.find(f => f.name === column.name)) return;
        setFilters(filters.concat(column));
    }
    const removeFilter = (name) => {
        // remove matching item
        setFilters(filters.filter(f => f.name !== name));
    }
    return (
        <DataContext>
            <div className="fullPage">
                <div className="leftColumn">
                    <DimensionChooser addFilter={addFilter} />

                    {filters.map(filter => {
                        if (filter.type === 'number') {
                            return (
                                <div key={filter.name} {...style}>
                                    <Histogram dimName={filter.name} removeChart={removeFilter}/>
                                </div>
                            )
                        } else {
                            return <div key={filter.name}>
                                <TextFilter dimName={filter.name}
                                    removeChart={removeFilter} />
                            </div>
                        }
                    })}
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
