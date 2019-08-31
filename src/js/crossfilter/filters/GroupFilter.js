import React from "react";
import * as dc from "dc";
import { ChartTemplate } from "../chartTemplate";

const rowChartFunc = (divRef, ndx, dimName) => {
    const chart = dc.rowChart(divRef)
    const dimension = ndx.dimension(function(d) {return d[dimName];});
    const group = dimension.group()
    chart.dimension(dimension)
        .group(group)

    return chart
}

export const GroupFilter = props => (
    <ChartTemplate chartFunction={rowChartFunc}
        title={props.dimName}
        dimName={props.dimName}
        removeChart={props.removeChart}
    />
)
