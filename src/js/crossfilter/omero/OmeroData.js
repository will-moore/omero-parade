
import React from "react";
import * as dc from "dc";
import {scaleLinear } from "d3";
import { css } from "glamor";
import { CXContext } from "../DataContext";


const OmeroData = props => {

    const context = React.useContext(CXContext);
    const [filteredData, setData] = React.useState([]);
    const ndx = context.ndx;
    const div = React.useRef(null);
    React.useEffect(() => {

        var removeListener = ndx.onChange((event) => {
            setData(ndx.allFiltered());
        });

        // Specify how to clean up after this effect:
        return () => {
            removeListener();
        };
    }, []);

    return (
        <div>
            <div>{filteredData.length} images</div>
            {filteredData.length < 100 ? 
                filteredData.map(d => (
                    <img key={d.Image} src={`/webclient/render_thumbnail/${ d.Image }/`} />
                )) : <div>sdf</div>
            }
        </div>
    );
};

export default OmeroData;
