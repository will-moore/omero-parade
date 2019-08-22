import React from 'react';
import config from '../config';
import crossfilter from 'crossfilter2';

class CrossFilterApp extends React.Component {

    constructor(props) {
        super(props);
        console.log('props', props);
    }

    componentDidMount() {
        console.log('componentDidMount...', config);

        let url = config.webgatewayBaseUrl + 'table/Project/3060/query/?query=*';  //Image-18236';
        fetch(url).then(rsp => rsp.json())
            .then(data => {
                console.log('d', data);
                let cols = data.data.columns;
                // map each row (list of values) into {colname:value} object
                let tableData = data.data.rows.map(r => {
                    let row = {};
                    r.forEach((value, idx) => {
                        row[cols[idx]] = value;
                    });
                    return row;
                });
                console.log('tableData', tableData);

                var cf = crossfilter(tableData);

                console.log(cf.size());

                var countDimension = cf.dimension(function(d) {return d.Count;});

                console.table(countDimension.top(5));
            });
    }

    render() {
        return (
            <div className="columnContainer">
                CrossFilter...
            </div>
        )
    }
}

export default CrossFilterApp
