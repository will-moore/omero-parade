import React from "react";
import * as dc from "dc";
import {scaleLinear } from "d3";
import { ChartTemplate } from "./ChartTemplate";
// import { numberFormat } from "./cxContext";
// import crossfilter from "crossfilter2";

const scatterPlotFunction = (divRef, ndx, dimName) => {

    var x = ndx.dimension(function(d) {return d[dimName] });
    var max_value = x.top(1)[0][dimName];
    var min_value = x.bottom(1)[0][dimName];

    var scatterDim = ndx.dimension(function(d) {return [d[dimName], d['Bounding_Box']];});
    var sumGroup = scatterDim.group()    

    // generate chart
    var plot = dc.scatterPlot(divRef);
    plot
        .x(scaleLinear().domain([min_value,max_value]))
        .symbolSize(5)
        .nonemptyOpacity(1)
        .clipPadding(10)
        .yAxisLabel("This is the Y Axis!")
        .brushOn(false)
        .dimension(scatterDim)
        .group(sumGroup)

    return plot;
}

export const ScatterPlot = props => (
    <ChartTemplate
        chartFunction={scatterPlotFunction}
        title={props.dimName}
        dimName={props.dimName}
        removeChart={props.removeChart}
    />
)