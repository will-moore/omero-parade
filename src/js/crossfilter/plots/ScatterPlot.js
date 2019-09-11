import React from "react";
import * as dc from "dc";
import {scaleLinear } from "d3";
import * as d3 from "d3";
import { css } from "glamor";
import { CXContext } from "../DataContext";

const scatterPlotFunction = (divRef, ndx, xAxis, yAxis) => {

    var x = ndx.dimension(function(d) {return d[xAxis] });
    var max_value = x.top(1)[0][xAxis];
    var min_value = x.bottom(1)[0][xAxis];

    var scatterDim = ndx.dimension(function(d) {return [d[xAxis], d[yAxis]];});
    var sumGroup = scatterDim.group()    


    var scatter1 = dc.scatterPlot(divRef)
        .width(500)
        .height(250)
        .margins({top:10,bottom:30,right:20,left:50})
        .dimension(scatterDim)
        .group(sumGroup)
        .symbolSize(5)
        .clipPadding(10)
        .xAxisLabel(xAxis)
        .yAxisLabel(yAxis)
        .excludedOpacity(0.5)
        // .elasticY(true)
        .x(scaleLinear().domain([min_value,max_value]));
    // scatter1.yAxis().ticks(5);
    return scatter1;
}


export const ScatterPlot = props => {
    /*
    We render the dc chart using an effect. We want to pass the chart as a prop after the dc call,
    but there is nothing by default to trigger a re-render and the prop, by default would be undefined.
    To solve this, we hold a state key and increment it after the effect ran. 
    By passing the key to the parent div, we get a rerender once the chart is defined. 
    */
  const context = React.useContext(CXContext);
  const [chart, updateChart] = React.useState(null);
  const ndx = context.ndx;
  const div = React.useRef(null);
  React.useEffect(() => {
    const newChart = scatterPlotFunction(div.current, ndx, props.xAxis, props.yAxis); // chartfunction takes the ref and does something with it

    newChart.render();
    updateChart(newChart);

    // Specify how to clean up after this effect:
    return () => {
      newChart.dimension().dispose();
      dc.redrawAll();
    };
  }, [props.xAxis, props.yAxis]);

  const chartStyles  = css({
    width:'100%',
    height:'100%',
    boxSizing:'border-box',
    padding: 10,
    '& label':{
      textTransform:'capitalize',
      textDecoration:'underline'
    }
  })
  return (
    <div
      ref={div}
      {...chartStyles}
    >
    </div>
  );
};
