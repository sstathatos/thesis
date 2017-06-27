let getPlotDatasetComponentConstructor = (obj) => {
    let {dependencies,plot_cb} = obj;
    let {html,errorHandler,validator} = dependencies;
    let init = (plot_div) => {
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

        html.mountTo(plot_div)(plot_dataset_div_el);

        return {
            static:[plot_dataset_div_el],dynamic:[plot_dataset_select_name_el,
                plot_dataset_table_el,plot_dataset_options_el]
        }

    };

    let update = (obj) => {
        let {table_div,data,dset_div,options_div,title_el,descr_el,post_div,plot_div} = obj;

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
            console.log(row_array);
            options_div.innerHTML = "";

            //FIRST INPUT
            let dims = Number(el.parentElement.parentElement.children[2].textContent);
            let first_dim_name_el = html.create('p',{textContent:'Horizontal dimention:'});
            let dim1_select_el =  html.create('select');
            let dim1_option1_el = html.create('option',{value:1,textContent:1});
            let dim1_option2_el = html.create('option',{value:2,textContent:2});

            let mountToSel1 = html.mountTo(dim1_select_el);
            mountToSel1(dim1_option1_el);
            mountToSel1(dim1_option2_el);
            if(row_array['dimnumber'] > 2) {
                let dim1_option3_el = html.create('option',{value:3,textContent:3});
                mountToSel1(dim1_option3_el);
            }

            //SECOND INPUT
            let second_dim_name_el = html.create('p',{textContent:'Vertical dimention:'});
            let dim2_select_el =  html.create('select');
            let dim2_option1_el = html.create('option',{value:1,textContent:1});
            let dim2_option2_el = html.create('option',{value:2,textContent:2});

            let mountToSel2 = html.mountTo(dim2_select_el);
            mountToSel2(dim2_option1_el);
            mountToSel2(dim2_option2_el);

            let dim2_option3_el;
            if(row_array['dimnumber'] > 2) {
                dim2_option3_el = html.create('option',{value:3,textContent:3});
                mountToSel2(dim2_option3_el);
            }

            let addListenerToSel1 = html.addListenerTo(dim1_select_el);

            let parameters_obj = {
                dim2_option1_el,dim2_option2_el,
                dim1_select_el,dim2_select_el,row_array,
                dim2_option3_el
            };

            addListenerToSel1('change',()=>changeOptions(parameters_obj));
            changeOptions(parameters_obj);


            let dropdown_name_el = html.create('p',{textContent:'Select plot type:'});
            let dropdown_el = html.create('select');

            let option_line_el = html.create('option',{textContent:'line'});
            let option_step_el = html.create('option',{textContent:'step'});
            let option_scatter_el = html.create('option',{textContent:'area'});

            let mountToDropdown = html.mountTo(dropdown_el);
            [option_line_el,option_step_el,option_scatter_el].map((el) =>{
                mountToDropdown(el);
            });

            let second_dim_value_name_el = html.create('p',{textContent:'Vertical dimention value (represents X axis):'});

            let dim2value_input_el = html.create('input',{type:'range'});
            let dim2value_show_el = html.create('input',{readOnly:'true'});

            let mountToDiv = html.mountTo(options_div);
            [first_dim_name_el,dim1_select_el,
                second_dim_name_el,dim2_select_el,dropdown_name_el,dropdown_el,
                second_dim_value_name_el,second_dim_value_name_el,dim2value_input_el,dim2value_show_el].map((el) => {
                mountToDiv(el);
            });

            let dim2_obj = {dim2value_input_el,row_array,dim2_select_el,dim2value_show_el};

            let addListenerToDim2 =  html.addListenerTo(dim2_select_el);
            addListenerToDim2('change',() =>changeDim2Range(dim2_obj));

            let addListenerToDim1 =  html.addListenerTo(dim1_select_el);
            addListenerToDim1('change',() =>changeDim2Range(dim2_obj));


            let addListenerToRange2 = html.addListenerTo(dim2value_input_el);
            addListenerToRange2('change',()=>showValue(dim2value_show_el,dim2value_input_el));

            changeDim2Range(dim2_obj);


            let handler_object = {
                array:row_array,
                dim1:()=>dim1_select_el.value,
                dim2:()=>dim2_select_el.value,
                dim2Value:()=> dim2value_input_el.value,
                plot_type: ()=>dropdown_el.value,
                title: ()=>title_el.value,
                description:()=> descr_el.value
            };




            let third_dim_value_name_el;
            let dim3value_input_el;
            let dim3value_show_el;

            if (dims === 3) {
                third_dim_value_name_el = html.create('p',{textContent:'Third dimention value:'});

                dim3value_input_el = html.create('input',{type:'range'});
                dim3value_show_el = html.create('input',{readOnly:'true'});

                [ third_dim_value_name_el,dim3value_input_el,dim3value_show_el].map((el)=> {
                    mountToDiv(el);
                });


                let addListenerToRange = html.addListenerTo(dim3value_input_el);
                addListenerToRange('change',() => showValue(dim3value_show_el,dim3value_input_el));

                let my_data = {row_array,dim2_select_el,dim1_select_el,dim3value_input_el,dim3value_show_el};

                let addListenerToSel2 = html.addListenerTo(dim2_select_el);
                addListenerToSel2('change',()=>changeRange(my_data));
                let addListenerToSel1 = html.addListenerTo(dim1_select_el);
                addListenerToSel1('change',()=>changeRange(my_data));
                changeRange(my_data);


                handler_object['dim3Value'] =()=>dim3value_input_el.value;
            }

            let plot_save_button_el = html.create('button',{textContent:'Save Plot'});
            let addListenerToSaveButton = html.addListenerTo(plot_save_button_el);
            html.mountTo(options_div)(plot_save_button_el);
            addListenerToSaveButton('click',()=>{

                if(validator.isEmpty(handler_object['title']()) || validator.isEmpty(handler_object['description']())) {
                    errorHandler({err:'empty fields'});
                    return;
                }

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

                post_div.style.display='initial';
                plot_div.innerHTML = '';
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



    let changeOptions = (obj) => {
        let {
            dim2_option1_el,dim2_option2_el,
            dim1_select_el,dim2_select_el,row_array,
            dim2_option3_el
        } = obj;
        [dim2_option1_el,dim2_option2_el].map((el) => {
            if(el.value === dim1_select_el.value) {
                el.disabled = true;
                if(dim2_select_el.value === el.value) {
                    getNext(dim2_select_el,row_array);
                }
            }
            else el.disabled = false;
        });
        if(row_array['dimnumber'] > 2) {
            let el = dim2_option3_el;
            if(el.value === dim1_select_el.value) {
                el.disabled = true;
                if(dim2_select_el.value === el.value) {
                    getNext(dim2_select_el,row_array);
                }
            }
            else el.disabled = false;
        }
    };

    let getNext = (el,row_array) => {

        if(row_array['dimnumber'] > 2) {
            if(el.value === '1' | el.value === '2') {
                el.value = Number(el.value) +1;
            }
            else el.value = 1;
        }
        else {
            if(el.value === '1') {
                el.value = Number(el.value) +1;
            }
            else el.value = 1;
        }
    };

    let showValue = (show_el,input_el) => {
        show_el.value =  input_el.value;
    };

    let changeDim2Range = (obj) => {
        let {dim2value_input_el,row_array,dim2_select_el,dim2value_show_el} = obj;
        dim2value_input_el.max = row_array['shape'][Number(dim2_select_el.value)-1]-1;
        dim2value_input_el.value = row_array['shape'][Number(dim2_select_el.value)-1]-1;
        showValue(dim2value_show_el,dim2value_input_el);
    };

    let get3rd = (obj) => {
        let {row_array,dim2_select_el,dim1_select_el} = obj;
        return row_array['shape'].filter((dim,index) => {
            if (index!==Number(dim2_select_el.value) -1 && index!==Number(dim1_select_el.value) -1) {
                return dim;
            }
        })[0];
    };

    let changeRange = (objs) => {
        let {row_array,dim2_select_el,dim1_select_el,dim3value_input_el,dim3value_show_el} = objs;
        let obj ={row_array,dim2_select_el,dim1_select_el};
        dim3value_input_el.max = get3rd(obj)-1;
        dim3value_input_el.value = get3rd(obj)-1;
        showValue(dim3value_show_el,dim3value_input_el);
    };

    return {init,update};

};
module.exports = getPlotDatasetComponentConstructor;