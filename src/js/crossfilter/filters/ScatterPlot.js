import React from "react";
import * as dc from "dc";
import {scaleLinear } from "d3";
import { css } from "glamor";
import { CXContext } from "../DataContext";

const scatterPlotFunction = (divRef, ndx, xAxis, yAxis) => {

    var x = ndx.dimension(function(d) {return d[xAxis] });
    var max_value = x.top(1)[0][xAxis];
    var min_value = x.bottom(1)[0][xAxis];

    var scatterDim = ndx.dimension(function(d) {return [d[xAxis], d[yAxis]];});
    var sumGroup = scatterDim.group()    

    // generate chart
    var plot = dc.scatterPlot(divRef);
    plot
        .x(scaleLinear().domain([min_value,max_value]))
        .symbolSize(5)
        .nonemptyOpacity(1)
        .clipPadding(10)
        .xAxisLabel(xAxis)
        .yAxisLabel(yAxis)
        .brushOn(false)
        .dimension(scatterDim)
        .group(sumGroup)

    return plot;
}


const PlotTemplate = props => {
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
    console.log('useEffect', props.xAxis, props.yAxis);
    const newChart = props.chartFunction(div.current, ndx, props.xAxis, props.yAxis); // chartfunction takes the ref and does something with it

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


export const ScatterPlot = props => {

    const context = React.useContext(CXContext);

    const [xAxis, setXAxis] = React.useState("-")
    const [yAxis, setYAxis] = React.useState("-")

    const handleChangeX = (event) => {
        let name = event.target.value;
        setXAxis(name);
    }
    const handleChangeY = (event) => {
        let name = event.target.value;
        setYAxis(name);
    }

    const numberCols = context.columns.filter(col => col.type == 'number');

    return (
        <div>
            {(xAxis !== '-' && yAxis !== '-') ?
                <PlotTemplate
                    chartFunction={scatterPlotFunction}
                    removeChart={props.removeChart}
                    xAxis={xAxis}
                    yAxis={yAxis}
                /> : <div>Choose xAxis and yAxis</div>
            }
            <div style={{'position': 'absolute', top: 10, right: 100}}>
                <select onChange={handleChangeY} value={yAxis}>
                    <option>Y axis</option>
                    {numberCols.map(col => (
                        <option value={col.name} key={col.name}>
                            {col.name}
                        </option>
                    ))}
                </select>
                <select onChange={handleChangeX} value={xAxis}>
                    <option>X axis</option>
                    {numberCols.map(col => (
                        <option value={col.name} key={col.name}>
                            {col.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}