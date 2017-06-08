let html = require('../../html');

let getDatasetGridComponentConstructor = (obj) => {

    let {app} = obj;
    let init = () => {
        let grid_table_el = html.create('table');


        html.mountTo(app)(grid_table_el);

        return {static:[],dynamic:[grid_table_el]};
    };

    let update = (obj) => {
    };

    return {init,update};

};
module.exports = getDatasetGridComponentConstructor;