import React from "react";
// import "./dc.css";
import * as d3 from "d3";

import crossfilter from "crossfilter2";

export const CXContext = React.createContext("CXContext");

export class DataContext extends React.Component {
    constructor(props) {
        super(props);
        this.state={loading:false,hasNDX:false};
    }
    
    componentDidMount(){
        if (this.state.hasNDX){
            return
        }
        if(this.state.loading){
            return
        }
        this.setState({loading:true});

        // Load CSV file...
        let url = "/webclient/annotation/951";
        d3.csv(url)
        .then(data => {
            // First get column names...
            let columns = [];
            let firstRow = data[0];
            for (name in firstRow) {
                columns.push({name: name});
            }

            // Go through all rows in the table
            data.forEach(function (d) {
                // Coerce strings to number for named columns
                columns.forEach(col => {
                    // ignore empty cells
                    if (d[col.name].length == 0) return;
                    // coerce to number
                    if (col.type === 'number') {
                        d[col.name] = +d[col.name];
                    } else if (col.type === undefined) {
                        // don't know type yet - check for number
                        let val = +d[col.name];
                        if (isNaN(val)) {
                            col.type = 'string';
                        } else {
                            col.type = 'number';
                            // update the value to use number
                            d[col.name] = val;
                        }
                    }
                });
            });
            // save columns and crossfilter for Context
            this.columns = columns;
            this.ndx = crossfilter(data);
            // setState to render...
            this.setState({loading:false, hasNDX:true});
        });
    }
    
    render() {
        if(!this.state.hasNDX){
            return (<div>Loading...</div>);
        }
        return (
            <CXContext.Provider value={{ndx:this.ndx, columns: this.columns}}>
                <div ref={this.parent}>
                    {this.props.children}
                </div>
            </CXContext.Provider>
        );
    }
}
