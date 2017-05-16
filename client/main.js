console.time('bench');

let {elementOpen,elementVoid,elementClose,text,patch}=require('incremental-dom');
let {get,post,pu,del} = require('xhr');
var Plotly = require('plotly.js/lib/core');



get({uri:"/plot/?path=d3dset&dim1=1&dim2=2&dim3Value=0&" +
"dim2Value=2&currystart=0&curryend=0&zoomstart=0&zoomend=0&direction=init"},(err,resp,body)=> {
    console.timeEnd('bench');
    let whole_data=JSON.parse(body);
    let final= whole_data["final_arr"];
    let whole= whole_data["sorted_slice"];
    let limits= whole_data["final_arr_limits"];
    let dims=whole_data["final_arr_dims"];
    console.time('binch');
    //<div id="tester" style="width:600px;height:250px;"></div>

    let TESTER = document.body;
    Plotly.plot( TESTER, [{
        x: whole[2],
        y: whole[0]
    },{
        x: whole[2],
        y: whole[1]
    },
        {
            x: whole[2],
            y: whole[3]
        },
        {
            x: whole[2],
            y: whole[4]
        },
        {
            x: whole[2],
            y: whole[5]
        },{
            x: whole[2],
            y: whole[6]
        },{
            x: whole[2],
            y: whole[7]
        }], {
        margin: { t: 0 } } );
    console.timeEnd('binch');
});




// get({uri:"/grid?path=d3dset&direction=init&xstart=0&xend=0&ystart=0&yend=0" +
// "&dim1=1&dim2=2&dim3Value=4"}, function (err, resp,body) {
//
//     let whole_data=JSON.parse(body);
//     let cur= whole_data["current_array"];
//     let whole= whole_data["whole_array"];
//     let edges= whole_data["current_array_edge_points"];
//
//     patch(document.getElementById('app'), function() {
//         text('Whole Array');
//         render2DArray(whole);
//         text('Current Array');
//         render2DArray(cur);
//         text('Current Array edges');
//         renderArray(edges);
//     });
//
//     get({uri:`/grid?path=d3dset&direction=right&xstart=${edges[0]}&xend=${edges[1]}&ystart=${edges[2]}&yend=${edges[3]}` +
//     `&dim1=1&dim2=2&dim3Value=4`}, function (err, resp,body) {
//
//         let whole_data=JSON.parse(body);
//         let cur= whole_data["current_array"];
//         let whole= whole_data["whole_array"];
//         let edges= whole_data["current_array_edge_points"];
//
//         patch(document.body, function() {
//             text('MOVED TO THE RIGHT ');
//             text('Current Array');
//             render2DArray(cur);
//             text('Current Array edges');
//             renderArray(edges);
//         });
//
//         get({uri:`/grid?path=d3dset&direction=up&xstart=${edges[0]}&xend=${edges[1]}&ystart=${edges[2]}&yend=${edges[3]}` +
//         `&dim1=1&dim2=2&dim3Value=4`}, function (err, resp,body) {
//
//             let whole_data=JSON.parse(body);
//             let cur= whole_data["current_array"];
//             let whole= whole_data["whole_array"];
//             let edges= whole_data["current_array_edge_points"];
//
//             patch(document.body, function() {
//                 text('MOVED UP ');
//                 text('Current Array');
//                 render2DArray(cur);
//                 text('Current Array edges');
//                 renderArray(edges);
//             });
//
//             get({uri:`/grid?path=d3dset&direction=right&xstart=${edges[0]}&xend=${edges[1]}&ystart=${edges[2]}&yend=${edges[3]}` +
//             `&dim1=1&dim2=2&dim3Value=4`}, function (err, resp,body) {
//
//                 let whole_data=JSON.parse(body);
//                 let cur= whole_data["current_array"];
//                 let whole= whole_data["whole_array"];
//                 let edges= whole_data["current_array_edge_points"];
//
//                 patch(document.body, function() {
//                     text('MOVED RIGHT AGAIN');
//                     text('Current Array');
//                     render2DArray(cur);
//                     text('Current Array edges');
//                     renderArray(edges);
//                 });
//
//                 get({uri:`/grid?path=d3dset&direction=right&xstart=${edges[0]}&xend=${edges[1]}&ystart=${edges[2]}&yend=${edges[3]}` +
//                 `&dim1=1&dim2=2&dim3Value=4`}, function (err, resp,body) {
//
//                     let whole_data=JSON.parse(body);
//                     let cur= whole_data["current_array"];
//                     let whole= whole_data["whole_array"];
//                     let edges= whole_data["current_array_edge_points"];
//
//                     patch(document.body, function() {
//                         text('MOVED RIGHT AGAIN');
//                         text('Current Array');
//                         render2DArray(cur);
//                         text('Current Array edges');
//                         renderArray(edges);
//                     });
//
//
//                 });
//             });
//         });
//     });
// });
//
//




function  renderArray (data) {
    elementOpen('table', '', ['class', 'tableComponent']);
    for (let i = 0; i < data.length; i++) {
        let row = data[i];
        elementOpen('td');
        text(row);
        elementClose('td');
    }
    return elementClose('table');
}

function render2DArray(data) {
    elementOpen('table', '', ['class', 'tableComponent']);
    for (let i = 0; i < data.length; i++) {
        let row = data[i];
        elementOpen('tr');
        for (let j = 0; j < row.length; j++) {
            let value = row[j];
            elementOpen('td');
            text(value);
            elementClose('td');
        }
        elementClose('tr');
    }
    return elementClose('table');
}
