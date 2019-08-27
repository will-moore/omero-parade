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

        // First, get column types
        let jsonUrl = "/webclient/omero_table/189802/json/?limit=0"
        fetch(jsonUrl).then(rsp => rsp.json())
        .then(data => {
            let numberColumnNames = [];
            // we want names of DoubleColumns
            data.data.column_types.forEach((c, idx) => {
                if (c === "DoubleColumn") {
                    numberColumnNames.push(data.data.columns[idx]);
                }
            });        

            let url = "/webclient/omero_table/189802/csv/?limit=100"
            d3.csv(url)
            .then((data)=> {
                data.forEach(function (d) {
                    // Coerce strings to number for named columns
                    numberColumnNames.forEach(name => {
                        d[name] = +d[name];
                    });
                });

                this.ndx = crossfilter(data);
                this.setState({loading:false,hasNDX:true});
            });

        });
    }
    
    render() {
        if(!this.state.hasNDX){
            console.log("Loading...")
            return (<div>Loading...</div>);
        }
        return (
            <CXContext.Provider value={{ndx:this.ndx}}>
                <div ref={this.parent}>
                    {this.props.children}
                </div>
            </CXContext.Provider>
        );
    }
}
