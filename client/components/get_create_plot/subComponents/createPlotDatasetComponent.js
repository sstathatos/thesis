let html = require('../../html');

let getPlotDatasetComponentConstructor = (obj) => {

    let {app} = obj;
    let init = () => {
        let plot_dataset_div_el = html.create('div');

        let plot_dataset_select_name_el = html.create('p',{textContent:`Select Array:`});

        let plot_dataset_table_el = html.create('table');

        let plot_dataset_tr_el = html.create('tr');

        let plot_dataset_th_path_el = html.create('th',{textContent:'path'});
        let plot_dataset_th_shape_el = html.create('th',{textContent:'shape'});
        let plot_dataset_th_dims_el = html.create('th',{textContent:'# of dims'});
        let plot_dataset_th_check_el = html.create('th',{textContent:'check'});

        let plot_dataset_options_el = html.create('div');

        let mountToTr =  html.mountTo(plot_dataset_tr_el);
        [plot_dataset_th_path_el,plot_dataset_th_shape_el,
            plot_dataset_th_dims_el,plot_dataset_th_check_el].map((el)=> {
            mountToTr(el);
        });

        html.mountTo(plot_dataset_table_el)(plot_dataset_tr_el);

        let mountToDiv = html.mountTo(plot_dataset_div_el);
        [plot_dataset_select_name_el,plot_dataset_table_el,plot_dataset_options_el].map((el) => {
            mountToDiv(el);
        });

        html.mountTo(app)(plot_dataset_div_el);

        return {
            static:[plot_dataset_div_el],dynamic:[plot_dataset_select_name_el,
                plot_dataset_table_el,plot_dataset_options_el]
        }

    };

    let update = (obj) => {
        let {table_div,data,dset_div,options_div} = obj;

        let checkboxes = [];

        for (let row in data) {
            let new_row_el = html.create('tr');
            let new_path_el = html.create('td',{textContent:data[row].path});
            let new_shape_el = html.create('td',{textContent:data[row].shape});
            let new_dimnumber_el = html.create('td',{textContent:data[row].dimnumber});
            let new_check_el = html.create('td');

            let new_checkbox_el = html.create('input',{type:'checkbox'});
            checkboxes.push(new_checkbox_el);
            if (data[row].dimnumber < 2) {
                new_checkbox_el.disabled = true;
            }

            html.mountTo(new_check_el)(new_checkbox_el);

            let mountToRow = html.mountTo(new_row_el);
            [new_path_el,new_shape_el,new_dimnumber_el,new_check_el].map((el)=> {
                mountToRow(el);
            });

            html.mountTo(table_div)(new_row_el);
        }

        let enable_extra = (el) => {
            let dims = Number(el.parentElement.parentElement.children[2].textContent);

            let first_dim_name_el = html.create('p',{textContent:'First dimention:'});
            let first_dim_input_el = html.create('input');

            let second_dim_name_el = html.create('p',{textContent:'Second dimention:'});
            let second_dim_input_el = html.create('input');

            let second_dim_value_name_el = html.create('p',{textContent:'Second dimention value:'});
            let second_dim_value_input_el = html.create('input');

            let temp = html.create('div');

            let mountToDiv = html.mountTo(temp);
            [first_dim_name_el,first_dim_input_el,
                second_dim_name_el,second_dim_input_el,
                second_dim_value_name_el,second_dim_value_input_el].map((el) => {
                mountToDiv(el);
            });


            if (dims === 3) {
                let third_dim_value_name_el = html.create('p',{textContent:'Third dimention value:'});
                let third_dim_value_input_el = html.create('input');

                [third_dim_value_name_el,third_dim_value_input_el].map((el) => {
                    mountToDiv(el);
                })
            }
            
            options_div.innerHTML = temp.innerHTML;

        };


        let unique_handler = (enable_extra) => {
            return (e) => {
                checkboxes.map((box) => box.checked = false);
                e.srcElement.checked = true;
                enable_extra(e.srcElement);
            };
        };

        let handler = unique_handler(enable_extra);

        checkboxes.map((box) => {
            html.addListenerTo(box)('click',handler);
        })
    };

    return {init,update};

};
module.exports = getPlotDatasetComponentConstructor;