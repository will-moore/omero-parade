import React from 'react';
import { DataContext } from './DataContext';

class CrossFilterApp extends React.Component {

    constructor(props) {
        super(props);
        console.log('props', props);
    }

    render() {
        return (
            <DataContext>
                <div className="columnContainer">
                    CrossFilter...
                </div>
            </DataContext>
        )
    }
}

export default CrossFilterApp
