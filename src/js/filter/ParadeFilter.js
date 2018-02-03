import React, { Component } from 'react';
import FilterInput from './FilterInput';


export default React.createClass({

    getInitialState: function() {
        return {
            filterFunc: undefined,
            filterParams: [],
            paramValues: [],
        }
    },

    componentDidMount: function() {
        // Load /filter/?filter=filterName&plate=plateId script
        // which adds itself to the PARADE_FILTERS list,
        // like OPEN_WITH list.

        var url = window.PARADE_INDEX_URL + 'filters/script/' + this.props.name;
        url += '?plate=' + this.props.plateId;
        url += '&field=' + this.props.fieldId;
        $.getJSON(url, function(data){

            // Response has filter function - Needs eval()
            var f = eval(data.f);
            this.setState({
                filterFunc: f,
                filterParams: data.params,
            })
        }.bind(this));
    },
    
    handleFilterInput: function(event, paramIndex) {

        // If we have all the parameters we need, do the filtering...
        let limit = parseInt(event.target.value);
        let blank = (event.target.value.length === 0);
        // convert 2D grid to list of images....
        let imgIds = [];
        this.props.plateData.grid.forEach(row => {
            row.forEach(col => {
                // returns True if ROI count > 2
                if (col && (blank || this.state.filterFunc(col, limit))) {
                    imgIds.push(col.id);
                }
            });
        });
        this.props.updateFiltering(this.props.index, imgIds);
    },

    render: function() {
        return(
            <div>{this.props.name}
                {this.state.filterParams.map((f, i) => {
                    return <FilterInput
                                filter={f}
                                key={i}
                                paramIndex={i}
                                onChange={this.handleFilterInput}
                            />
                })}
            </div>
        )
    }
});
