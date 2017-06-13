let getPlotDatasetComponentConstructor = (obj) => {
    let {dependencies,plot_cb} = obj;
    let {app,html} = dependencies;
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
        let {table_div,data,dset_div,options_div,title_el,descr_el} = obj;

        let checkboxes = [];

        for (let row in data) {
            let new_row_el = html.create('tr');
            let new_path_el = html.create('td',{textContent:data[row].path});
            let new_shape_el = html.create('td',{textContent:data[row].shape});
            let new_dimnumber_el = html.create('td',{textContent:data[row]['dimnumber']});
            let new_check_el = html.create('td');

            let new_checkbox_el = html.create('input',{type:'checkbox'});
            checkboxes.push(new_checkbox_el);
            if (data[row]['dimnumber'] < 2) {
                new_checkbox_el.disabled = true;
            }

            html.mountTo(new_check_el)(new_checkbox_el);

            let mountToRow = html.mountTo(new_row_el);
            [new_path_el,new_shape_el,new_dimnumber_el,new_check_el].map((el)=> {
                mountToRow(el);
            });

            html.mountTo(table_div)(new_row_el);
        }

        let enable_extra = (el,row_array) => {
            options_div.innerHTML = "";
            let dims = Number(el.parentElement.parentElement.children[2].textContent);

            let first_dim_name_el = html.create('p',{textContent:'First dimention:'});
            let first_dim_input_el = html.create('input',{type:'number',value:0,max:5});

            let second_dim_name_el = html.create('p',{textContent:'Second dimention:'});
            let second_dim_input_el = html.create('input',{type:'number',value:0});

            let dropdown_name_el = html.create('p',{textContent:'Select plot type:'});
            let dropdown_el = html.create('select');

            let option_line_el = html.create('option',{textContent:'line'});
            let option_step_el = html.create('option',{textContent:'step'});
            let option_scatter_el = html.create('option',{textContent:'scatter'});

            let mountToDropdown = html.mountTo(dropdown_el);
            [option_line_el,option_step_el,option_scatter_el].map((el) =>{
                mountToDropdown(el);
            });

            let second_dim_value_name_el = html.create('p',{textContent:'Second dimention value:'});
            let second_dim_value_input_el = html.create('input',{type:'number',value:0});

            //let temp = html.create('div');

            let mountToDiv = html.mountTo(options_div);
            [first_dim_name_el,first_dim_input_el,
                second_dim_name_el,second_dim_input_el,dropdown_name_el,dropdown_el,
                second_dim_value_name_el,second_dim_value_input_el].map((el) => {
                mountToDiv(el);
            });

            let handler_object = {
                array:row_array,
                dim1:()=>first_dim_input_el.value,
                dim2:()=>second_dim_input_el.value,
                dim2Value:()=> second_dim_value_input_el.value,
                plot_type: ()=>dropdown_el.value,
                title: ()=>title_el.value,
                description:()=> descr_el.value
            };

            if (dims === 3) {
                let third_dim_value_name_el = html.create('p',{textContent:'Third dimention value:'});
                let third_dim_value_input_el = html.create('input',{type:'number',value:0});

                [third_dim_value_name_el,third_dim_value_input_el].map((el) => {
                    mountToDiv(el);
                });

                handler_object['dim3Value'] =()=>third_dim_value_input_el.value;
            }

            let plot_save_button_el = html.create('button',{textContent:'Save Plot'});
            let addListenerToSaveButton = html.addListenerTo(plot_save_button_el);
            html.mountTo(options_div)(plot_save_button_el);
            addListenerToSaveButton('click',()=>{

                let new_obj = {
                    array:handler_object['array'],
                    dim1item:handler_object['dim1'](),
                    dim2:handler_object['dim2'](),
                    dim2Value:handler_object['dim2Value'](),
                    plot_type:handler_object['plot_type'](),
                    title:handler_object['title'](),
                    description:handler_object['description']()
                };

                if(handler_object['dim3Value']) new_obj['dim3Value']=handler_object['dim3Value']();

                plot_cb(null,new_obj);
            });
        };

        let unique_handler = (enable_extra,row_array) => {
            return (e) => {
                checkboxes.map((box) => box.checked = false);
                e.target.checked = true;
                enable_extra(e.target,row_array);
            };
        };

        let cnt = 0;
        for (let row in data) {
            html.addListenerTo(checkboxes[cnt])('click',unique_handler(enable_extra,data[row]));
            cnt++;
        }
     };

    return {init,update};

};
module.exports = getPlotDatasetComponentConstructor;