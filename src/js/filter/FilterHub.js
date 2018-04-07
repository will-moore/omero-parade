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
import FilterContainer from './FilterContainer';
import Layout from '../dataView/Layout';

class FilterHub extends React.Component {

    constructor(props) {
        super(props);
        // We store various filter inputs & defaults in STATE
        // but the filter functions are stored here
        this.filterFunctions = [];
        this.state = {
            filterNames: [],
            filterValues: [],   // [{'inputName':'value'}]
            iconSize: 50,
        }
        this.addFilter = this.addFilter.bind(this);
        this.handleFilterLoaded = this.handleFilterLoaded.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleRemoveFilter = this.handleRemoveFilter.bind(this);
        this.setIconSize = this.setIconSize.bind(this);
    }

    addFilter(filterName) {
        this.setState({
            filterNames: [...this.state.filterNames, filterName],
        });
    }

    handleFilterLoaded(filterIndex, filterFunc, defaultValues) {
        this.filterFunctions[filterIndex] = filterFunc;
        let filterValues = [...this.state.filterValues];    // new list
        filterValues[filterIndex] = defaultValues;
        console.log('handleFilterLoaded', filterValues);
        this.setState({
            filterValues: filterValues,
        });
    }

    handleFilterChange(filterIndex, paramName, paramValue) {
        // A parameter has changed in one of the list of filters...
        this.setState(prevState => {
            // Copy the previous set of values for the filter at this index...
            let newValues = Object.assign({}, prevState.filterValues[filterIndex]);
            // Assign the new value...
            newValues[paramName] = paramValue;
            // Make a copy of the previous list of parameter values
            let filterValues = [...prevState.filterValues];
            // And add back the new object to the correct index
            filterValues[filterIndex] = newValues;
            return {
                filterValues: filterValues
            }
        });
    }

    handleRemoveFilter(filterIndex) {
        let fNames = [...this.state.filterNames];
        let fValues = [...this.state.filterValues];
        fNames.splice(filterIndex, 1);
        fValues.splice(filterIndex, 1);
        this.setState({
            filterNames: fNames,
            filterValues: fValues
        });
    }

    setIconSize(size) {
        this.setState({iconSize: parseInt(size, 10)});
    }

    render() {

        // Images could be from parent PlateLoader OR DatasetLoader
        let images = this.props.images;
        let filteredImages;

        if (this.state.filterNames) {
            const startTime = performance.now();
            filteredImages = this.state.filterNames.reduce((imgList, name, idx) => {
                // get the filter function...
                let f = this.filterFunctions[idx];
                let paramValues = this.state.filterValues[idx];
                if (f && paramValues) {
                    imgList = imgList.filter(image => f(image, paramValues));
                }
                return imgList;
            }, images);
            console.log("Filtering images took ms:", performance.now() - startTime);
        } else {
            filteredImages = images;
        }
        let imageComponent;

        return(<div className="reactContainer">
                    <FilterContainer
                        parentType={this.props.parentType}
                        parentId={this.props.parentId}
                        fieldId={this.props.fieldId}
                        images={this.props.images}
                        addFilter={this.addFilter}
                        handleFilterLoaded={this.handleFilterLoaded}
                        handleFilterChange={this.handleFilterChange}
                        handleRemoveFilter={this.handleRemoveFilter}
                        filterNames={this.state.filterNames}
                        filterValues={this.state.filterValues}
                        />
                    <Layout
                        parentType={this.props.parentType}
                        parentId={this.props.parentId}
                        fieldId={this.props.fieldId}
                        setSelectedImages={this.props.setSelectedImages}
                        plateData={this.props.plateData}
                        filteredImages={filteredImages}
                        />
                </div>)
    }
}

export default FilterHub
