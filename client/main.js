let {elementOpen,elementVoid,elementClose,text,patch}=require('incremental-dom');
let {get,post,pu,del} = require('xhr');

get({uri:"/grid?path=d3dset&direction=init&xstart=0&xend=0&ystart=0&yend=0" +
"&dim1=1&dim2=2&dim3Value=4"}, function (err, resp,body) {

    let whole_data=JSON.parse(body);
    let cur= whole_data["current_array"];
    let whole= whole_data["whole_array"];
    let edges= whole_data["current_array_edge_points"];

    patch(document.getElementById('app'), function() {
        text('Whole Array');
        render2DArray(whole);
        text('Current Array');
        render2DArray(cur);
        text('Current Array edges');
        renderArray(edges);
    });

    get({uri:`/grid?path=d3dset&direction=right&xstart=${edges[0]}&xend=${edges[1]}&ystart=${edges[2]}&yend=${edges[3]}` +
    `&dim1=1&dim2=2&dim3Value=4`}, function (err, resp,body) {

        let whole_data=JSON.parse(body);
        let cur= whole_data["current_array"];
        let whole= whole_data["whole_array"];
        let edges= whole_data["current_array_edge_points"];

        patch(document.body, function() {
            text('MOVED TO THE RIGHT ');
            text('Current Array');
            render2DArray(cur);
            text('Current Array edges');
            renderArray(edges);
        });

        get({uri:`/grid?path=d3dset&direction=up&xstart=${edges[0]}&xend=${edges[1]}&ystart=${edges[2]}&yend=${edges[3]}` +
        `&dim1=1&dim2=2&dim3Value=4`}, function (err, resp,body) {

            let whole_data=JSON.parse(body);
            let cur= whole_data["current_array"];
            let whole= whole_data["whole_array"];
            let edges= whole_data["current_array_edge_points"];

            patch(document.body, function() {
                text('MOVED UP ');
                text('Current Array');
                render2DArray(cur);
                text('Current Array edges');
                renderArray(edges);
            });

            get({uri:`/grid?path=d3dset&direction=right&xstart=${edges[0]}&xend=${edges[1]}&ystart=${edges[2]}&yend=${edges[3]}` +
            `&dim1=1&dim2=2&dim3Value=4`}, function (err, resp,body) {

                let whole_data=JSON.parse(body);
                let cur= whole_data["current_array"];
                let whole= whole_data["whole_array"];
                let edges= whole_data["current_array_edge_points"];

                patch(document.body, function() {
                    text('MOVED RIGHT AGAIN');
                    text('Current Array');
                    render2DArray(cur);
                    text('Current Array edges');
                    renderArray(edges);
                });

                get({uri:`/grid?path=d3dset&direction=right&xstart=${edges[0]}&xend=${edges[1]}&ystart=${edges[2]}&yend=${edges[3]}` +
                `&dim1=1&dim2=2&dim3Value=4`}, function (err, resp,body) {

                    let whole_data=JSON.parse(body);
                    let cur= whole_data["current_array"];
                    let whole= whole_data["whole_array"];
                    let edges= whole_data["current_array_edge_points"];

                    patch(document.body, function() {
                        text('MOVED RIGHT AGAIN');
                        text('Current Array');
                        render2DArray(cur);
                        text('Current Array edges');
                        renderArray(edges);
                    });


                });
            });
        });
    });
});






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
