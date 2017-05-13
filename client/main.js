let {el,mount,list} = require('redom');
let {get,post,pu,del} = require('xhr');

const hello =el('h1','Hello World');

mount(document.body,hello);

get({uri:"/grid?path=d3dset&direction=init&xstart=0&xend=0&ystart=0&yend=0" +
"&dim1=1&dim2=2&dim3Value=4"}, function (err, resp,body) {

    let whole_data=JSON.parse(body);
    let cur= whole_data["current_array"];
    let whole= whole_data["whole_array"];
    let edges= whole_data["current_array_edge_points"];

    let rows2 = whole.map((row) => {
        let entries = row.map((entry) => {
            return el('td',entry);
        });
        return el('tr',entries);
    });

    const war =el('h1','Whole Array');
    mount(document.body,war);
    let table2 = el('table',rows2);
    mount(document.body,table2);

    let rows1 = cur.map((row) => {
        let entries = row.map((entry) => {
            return el('td',entry);
        });
        return el('tr',entries);
    });

    const car=el('h1','Current Array');
    mount(document.body,car);
    let table1 = el('table',rows1);
    mount(document.body,table1);

    get({uri:`/grid?path=d3dset&direction=right&xstart=${edges[0]}&xend=${edges[1]}&ystart=
        ${edges[2]}&yend=${edges[3]}&dim1=1&dim2=2&dim3Value=4`}, function (err, resp,body) {

        //console.log(JSON.parse(body));
        let whole_data=JSON.parse(body);
        let cur= whole_data["current_array"];
        let edges= whole_data["current_array_edge_points"];


        let td= (value) => {
            return {
                element : el('td', value),
                update : (newData) => {
                    element.textContent = newData;
                }
            }
        };

        let tr= (value) => {
            let element = el('tr', value);
            let listt= list(element, td);
            return {
                element : element,
                list : listt,
                update :(newData) => {
                    listt.update(newData);
                }
            }
        };

        let table= list('table',tr);
        mount(document.body,table);


        //table.update(cur);
        //console.log(rows);

        // //
        // // console.log(rows1);
        // const car=el('h1','Current Array');
        // mount(document.body,car);
        //
        // let table1 = el('table',rows1);
        //
        // table1.update = (newData) => {
        //     for(let row of rows1) {
        //
        //     }
        //     table1.textContent = newData;
        // };
        //
        // mount(document.body,table1);
        //
        //
        get({uri:`/grid?path=d3dset&direction=up&xstart=${edges[0]}&xend=${edges[1]}&ystart=
            ${edges[2]}&yend=${edges[3]}&dim1=1&dim2=2&dim3Value=4`}, function (err, resp,body) {

            //console.log(JSON.parse(body));
            let whole_data=JSON.parse(body);
            let cur= whole_data["current_array"];
            let edges= whole_data["current_array_edge_points"];

            let rows1 = cur.map((row) => {
                let entries = row.map((entry) => {
                    return el('td',entry);
                });
                return el('tr',entries);
            });
            //table.update(rows1);


        });

    });
});
