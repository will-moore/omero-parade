//
// Copyright (C) 2018 University of Dundee & Open Microscopy Environment.
// All rights reserved.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//

import React, { Component } from 'react';
import FilterInput from './FilterInput';


class ParadeFilter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filterParams: [],
        }
        this.handleFilterInput = this.handleFilterInput.bind(this);
    }

    componentDidMount() {
        // Load /filter/?filter=filterName&plate=plateId script
        // which adds itself to the PARADE_FILTERS list,
        // like OPEN_WITH list.

        var url = window.PARADE_INDEX_URL + 'filters/script/' + this.props.name;
        if (this.props.plateId) {
            url += '?plate=' + this.props.plateId;
            if (this.props.fieldId !== undefined) {
                url += '&field=' + this.props.fieldId;
            }
        }
        else if (this.props.datasetId) {
            url += '?dataset=' + this.props.datasetId;
        } else {
            url += '?' + this.props.images.map(i => 'image=' + i.id).join('&');
        }
        $.getJSON(url, function(data){
            // Response has filter function - Needs eval()
            var f = eval(data.f);
            // Get current values - set state to parent
            var filterValues = data.params.reduce((prev, current) => {
                prev[current.name] = current.default;
                return prev;
            }, {});
            this.props.handleFilterLoaded(this.props.filterIndex, f, filterValues);

            this.setState({
                filterParams: data.params
            })
        }.bind(this));
    }
    
    handleFilterInput(paramName, value) {
        this.props.handleFilterChange(this.props.filterIndex, paramName, value);
    }

    render() {
        return(
            <div className="parade_filter">
                <select
                    onChange={(event) => {this.handleFilterInput('not', event.target.value)}} >
                    <option value="-">-</option>
                    <option value="not">NOT</option>
                </select>
                {this.props.name}
                {this.state.filterParams.map(p => {
                    return <FilterInput
                                param={p}
                                key={p.name}
                                onChange={this.handleFilterInput}
                            />
                })}
                <button
                    className="parade_removeFilter"
                    onClick={() => {this.props.handleRemoveFilter(this.props.filterIndex)}}>
                    X 
                </button>
            </div>
        )
    }
}

export default ParadeFilter
