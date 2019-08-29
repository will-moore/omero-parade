import React from "react";
import { CXContext } from "../DataContext";
import * as dc from "dc";
import { css } from "glamor";

const ResetButton = props => {
  const style = css({
    padding: 4,
    display: "inline",
    cursor:'pointer',
    float:'right',
    '&:hover':{
        background: "#ddd",
    }
  });
  return (
    <button
      {...style}
      onClick={() => {
        props.chart.filterAll();
        dc.redrawAll();
      }}
    >
      reset
    </button>
  );
};

const FilterTitle = props => {

    return (
        <label>
            <span style={{'marginRight': 10}}>{props.title}</span>
        </label>
    )
}


export const TextFilter = props => {

    const context = React.useContext(CXContext);
    const [text, setText] = React.useState("");
    const [dimension, setDimension] = React.useState(null);
    const ndx = context.ndx;

    React.useEffect(() => {
        var d = ndx.dimension(function(d) {return d[props.dimName];});
        setDimension(d);

        // Specify how to clean up after this effect:
        return () => {
            d.dispose();
            dc.redrawAll();
        };
    }, []);

    const handleChange = (event) => {
        let text = event.target.value;
        setText(text);
        dimension.filter(value => {
            return value.indexOf(text) > -1;
        });
        dc.redrawAll();
    }

    return (
        <div style={{padding:10}}>
            <button onClick={() => props.removeChart(props.dimName)}
                style={{float: 'right'}}
                >X</button>
            <FilterTitle title={props.dimName} /> 

            <div>
                <input
                    type="text"
                    placeholder="Filter"
                    value={text}
                    onChange={handleChange} />
            </div>
        </div>
    );
};