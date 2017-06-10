let html = require('../../html');

let getDatasetGridComponentConstructor = (obj) => {

    let {app} = obj;
    let init = () => {
        let grid_table_el = html.create('table');

        html.mountTo(app)(grid_table_el);

        return {static:[],dynamic:[grid_table_el]};
    };

    let update = (obj) => {
        let {dataGridEls,data} = obj;
        let array = data['current_array'];
        dataGridEls['dynamic'][0].innerHTML = "";

        let mountToTable = html.mountTo(dataGridEls['dynamic'][0]);
        for (let i in array) {

            let row =array[i];
            let datasetgrid_tr_el = html.create('tr');
            let mountToGrid = html.mountTo(datasetgrid_tr_el);

            for(let j in row) {
                let datasetgrid_td_el = html.create('td',{textContent:row[j]});
                mountToGrid(datasetgrid_td_el);
            }

            mountToTable(datasetgrid_tr_el);
        }

        return {static:[],dynamic:[dataGridEls['dynamic'][0]]};
    };

    return {init,update};

};
module.exports = getDatasetGridComponentConstructor;