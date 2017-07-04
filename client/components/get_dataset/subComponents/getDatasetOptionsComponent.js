let getDatasetOptionsComponentConstructor = (obj) => {

    let {dependencies,data} = obj;
    let {html,app,getDatasetGridComponentConstructor,css,getDataConstructor} = dependencies;
    let getData = getDataConstructor(obj);
    let getDataGridComponent = getDatasetGridComponentConstructor(dependencies);

    let init = (data) => {

        let options_div_el = html.create('div',{className:'pt2 pl4'});

        let title_el = html.create('h4',{textContent:'Show Dataset',className:'f3 light-yellow mt2 mb1'});

        let dim1_name_el = html.create('p',{textContent:'Horizontal Dimention:',className:' w-20 f4 pl3 pr5 di dtc'});
        let dim1_select_el =  html.create('select',{className:'dtc v-mid'});
        let dim1_option1_el = html.create('option',{value:1,textContent:1});
        let dim1_option2_el = html.create('option',{value:2,textContent:2});

        let horizontal_div = html.create('div',{className:'w-100 pv2 dt'});
        let mountToHorizontalDiv = html.mountTo(horizontal_div);
        [dim1_name_el,dim1_select_el].map((el) => {
            mountToHorizontalDiv(el);
        });


        let mountToSel1 = html.mountTo(dim1_select_el);
        mountToSel1(dim1_option1_el);
        mountToSel1(dim1_option2_el);
        if(data['dimnumber'] > 2) {
            let dim1_option3_el = html.create('option',{value:3,textContent:3});
            mountToSel1(dim1_option3_el);
        }

        let dim2_name_el = html.create('p',{textContent:'Vertical Dimention:',className:' w-20 f4 pl3 pr5 di dtc'});
        let dim2_select_el =  html.create('select',{className:'dtc v-mid'});
        let dim2_option1_el = html.create('option',{value:1,textContent:1});
        let dim2_option2_el = html.create('option',{value:2,textContent:2});

        let vertical_div = html.create('div',{className:'w-100 pv2 dt'});
        let mountToVerticalDiv = html.mountTo(vertical_div);
        [dim2_name_el,dim2_select_el].map((el) => {
            mountToVerticalDiv(el);
        });

        let mountToSel2 = html.mountTo(dim2_select_el);
        mountToSel2(dim2_option1_el);
        mountToSel2(dim2_option2_el);

        let dim2_option3_el;
        if(data['dimnumber'] > 2) {
            dim2_option3_el = html.create('option',{value:3,textContent:3});
            mountToSel2(dim2_option3_el);
        }

        let addListenerToSel1 = html.addListenerTo(dim1_select_el);

        let getNext = (el) => {

            if(data['dimnumber'] > 2) {
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

        let changeOptions = () => {
            [dim2_option1_el,dim2_option2_el].map((el) => {
                if(el.value === dim1_select_el.value) {
                    el.disabled = true;
                    if(dim2_select_el.value === el.value) {
                        getNext(dim2_select_el);
                    }
                }
                else el.disabled = false;
            });
            if(data['dimnumber'] > 2) {
                let el = dim2_option3_el;
                if(el.value === dim1_select_el.value) {
                    el.disabled = true;
                    if(dim2_select_el.value === el.value) {
                        getNext(dim2_select_el);
                    }
                }
                else el.disabled = false;
            }
        };

        addListenerToSel1('change',changeOptions);
        changeOptions();


        let mountToDiv = html.mountTo(options_div_el);
        [title_el,horizontal_div,vertical_div].map((el) => {
            mountToDiv(el);
        });

        let dim3value_name_el;
        let dim3value_input_el;
        let dim3value_show_el;

        if(data['dimnumber'] === 3) {
            dim3value_name_el = html.create('p',{textContent:'Dimension 3 Value:',className:' w-20 f4 pl3 pr5 di dtc'});
            dim3value_input_el = html.create('input',{type:'range',className:'dtc v-mid '});
            dim3value_show_el = html.create('input',{readOnly:'true',className:`dtc w3 tc v-mid mh2 b--green b--solid green bg-light-yellow bw2 br3`});

            let third_div = html.create('div',{className:'w-100 pv2 dt'});
            let mountToThirdDiv = html.mountTo(third_div);
            [dim3value_name_el,dim3value_input_el,dim3value_show_el].map((el) => {
                mountToThirdDiv(el);
            });
            mountToDiv(third_div);

            let showValue = () => {
                dim3value_show_el.value = dim3value_input_el.value;
            };

            let addListenerToRange = html.addListenerTo(dim3value_input_el);
            addListenerToRange('change',showValue);

            let get3rd = () => {
                return data['shape'].filter((dim,index) => {
                    if (index!==Number(dim2_select_el.value) -1 && index!==Number(dim1_select_el.value) -1) {
                        return dim;
                    }
                })[0];
            };

            let changeRange = () => {

                dim3value_input_el.max = get3rd()-1;
                dim3value_input_el.value = get3rd()-1;
                showValue();
            };

            let addListenerToSel2 = html.addListenerTo(dim2_select_el);
            addListenerToSel2('change',changeRange);
            let addListenerToSel1 = html.addListenerTo(dim1_select_el);
            addListenerToSel1('change',changeRange);
            changeRange();


        }




        let button = html.create('button',{textContent:'Show Data',className:css.button});
        mountToDiv(button);
        let grid_div_el =  html.create('div');
        mountToDiv(grid_div_el);


        let listenerToButton = html.addListenerTo(button);
        let button_obj = {
            input1:dim1_select_el,input2:dim2_select_el
        };

        if(data['dimnumber'] === 3) {
            button_obj['input3'] = dim3value_input_el;
        }


        let datasetGridEls = getDataGridComponent.init(grid_div_el,button_obj,getData);

        listenerToButton('click',() => {
            button_obj['direction'] = 'init';
            getData(button_obj,datasetGridEls);

        });

        html.mountTo(app)(options_div_el);

        return {static:[options_div_el],dynamic:[dim1_select_el,dim2_select_el,dim3value_input_el,button]};
    };


    return {init};

};
module.exports = getDatasetOptionsComponentConstructor;