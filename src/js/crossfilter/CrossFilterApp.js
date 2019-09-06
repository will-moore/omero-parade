import React from 'react';
import { DataContext } from './DataContext';
import { Histogram } from './filters/Histogram';
import { ScatterPlot } from './filters/ScatterPlot';
import { GroupFilter } from './filters/GroupFilter';
import { TextFilter } from './filters/TextFilter';
import { DataTable } from './DataTable';
import OmeroData from './omero/OmeroData';
import DimensionChooser from './DimensionChooser';
import { css } from "glamor";

var style = css({
    width: 300,
});
var centreStyle = css({
    display: 'flex',
    flexDirection: 'column',
});
var centrePanelStyle = css({
    flex: '1 1 auto',
    overflow: 'auto',
    height: '50%',
    display: 'flex',
    position: 'relative',
})
var rowStyle = css({
    flex: '1 1 auto',
    overflow: 'auto',
    width: '50%',
    position: 'relative',
})

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
                                <GroupFilter dimName={filter.name}
                                    removeChart={removeFilter} />
                            </div>
                        }
                    })}
                </div>
                <div className="centrePanel" {...centreStyle}>
                    <div {...centrePanelStyle}>
                        <div {...rowStyle}>
                            <ScatterPlot dimName={"Count"} removeChart={removeFilter}/>
                        </div>
                        <div {...rowStyle}>
                            <OmeroData />
                        </div>
                    </div>
                    <div {...centrePanelStyle}>
                        <DataTable />
                    </div>
                </div>
            </div>
        </DataContext>
    )
}

export default CrossFilterApp
