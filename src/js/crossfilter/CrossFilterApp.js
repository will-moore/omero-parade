import React from 'react';
import { DataContext } from './DataContext';
import { Histogram } from './Histogram';
import { DataTable } from './DataTable';
import { css } from "glamor";

var style = css({
    width: 300,
});

class CrossFilterApp extends React.Component {

    constructor(props) {
        super(props);
        console.log('props', props)
        console.log('Histogram', Histogram);
    }

    render() {
        return (
            <DataContext>
            <div className="fullPage">
                <div className="leftColumn">
                    <div {...style}>
                        <Histogram dimName="Bounding_Box" />
                    </div>
                    <div {...style}>
                        <Histogram dimName="Count" />
                    </div>
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
}

export default CrossFilterApp
