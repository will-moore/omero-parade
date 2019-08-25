import React from 'react';
import { DataContext } from './DataContext';
import { Histogram } from './Histogram';

class CrossFilterApp extends React.Component {

    constructor(props) {
        super(props);
        console.log('props', props)
        console.log('Histogram', Histogram);
    }

    render() {
        return (
            <DataContext>
                <div className="chartContainer">
                    <Histogram dimName="Bounding_Box" />
                </div>
                <div className="chartContainer">
                    <Histogram dimName="Count" />
                </div>
            </DataContext>
        )
    }
}

export default CrossFilterApp
