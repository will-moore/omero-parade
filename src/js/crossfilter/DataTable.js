import React from "react";
import * as dc from "dc";
import "dc/dc.css";

// import {format as d3Format } from 'd3'
import { ChartTemplate } from "./chartTemplate";
// import { numberFormat } from "./cxContext";
import {css} from 'glamor'
const tableFunc = (divRef, ndx) => {
    const table = dc.dataTable(divRef);

    const dimension = ndx.dimension(d=> d.Count);
    table.dimension(dimension)
    // .group(d=>{
    //     var format = d3Format('02d');
    //     return d.dd.getFullYear() + '/' + format((d.dd.getMonth() + 1));
    // })
    .columns([
        "Slice",
        "Count",
        "Total Area",
        "Average Size",
        "%Area",
        "Mean",
        "Mode",
        "Perim.",
        "Feret",
        "FeretX",
        "FeretY",
        "FeretAngle",
        "MinFeret",
        "Dataset",
        "Bounding_Box",
        "Channel Index",
        "Image"
        ])
    //   {
    //     label: 'Change',
    //     format: function (d) {
    //         return numberFormat(d.close - d.open);
    //     }
    // },
    // 'volume'


    // ])
    // .sortBy(function (d) {
    //     return d.dd;
    // })
    // .on('renderlet', function (table) {
    //     table.selectAll('.dc-table-group').classed('info', true);
    // });

    return table;

}
const style = css({
    '& tr':{
        '&:hover':{
            background:'#dddd'
        }
    },
    '& td':{
        // padding:rhythm(0.1),
        textAlign:'left',
        borderTop:'1px solid #ddd',
        
    }
})
export const DataTable = props => (
    <ChartTemplate chartFunction={tableFunc} styles={style} title="Data Table"/>
)
