import React from "react";
import { ScatterPlot } from "./ScatterPlot";
import { CXContext } from "../DataContext";

export const PlotContainer = props => {

    const context = React.useContext(CXContext);
    const numberCols = context.columns.filter(col => col.type == 'number');

    // Start by plotting the first 2 dimensions we have
    const [xAxis, setXAxis] = React.useState(numberCols[0].name)
    const [yAxis, setYAxis] = React.useState(numberCols[1].name)

    const handleChangeX = (event) => {
        let name = event.target.value;
        setXAxis(name);
    }
    const handleChangeY = (event) => {
        let name = event.target.value;
        setYAxis(name);
    }

    return (
        <div>
            {(xAxis !== '-' && yAxis !== '-') ?
                <ScatterPlot
                    xAxis={xAxis}
                    yAxis={yAxis}
                /> : <div>Choose xAxis and yAxis</div>
            }
            <div style={{'position': 'absolute', top: 10, right: 10}}>
                <label>Y axis:</label>
                <select onChange={handleChangeY} value={yAxis}>
                    {numberCols.map(col => (
                        <option value={col.name} key={col.name}>
                            {col.name}
                        </option>
                    ))}
                </select>
                <label>X axis:</label>
                <select onChange={handleChangeX} value={xAxis}>
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