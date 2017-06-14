let getDatasetOptionsComponentConstructor = (obj) => {

    let {dependencies,retrieveData,data} = obj;
    let {html,app,getDatasetGridComponentConstructor} = dependencies;

    let curr_state = [];

    let data_obj = {
    };

    let getDataGridComponent = getDatasetGridComponentConstructor(dependencies);

    let init = () => {

        let options_div_el = html.create('div');

        let dim1_name_el = html.create('p',{textContent:'Dimension 1:'});
        let dim1_input_el = html.create('input',{type:'number',value:1});

        let dim2_name_el = html.create('p',{textContent:'Dimension 2:'});
        let dim2_input_el = html.create('input',{type:'number',value:2});

        let mountToDiv = html.mountTo(options_div_el);
        [dim1_name_el,dim1_input_el,dim2_name_el,dim2_input_el].map((el) => {
            mountToDiv(el);
        });

        let dim3value_name_el;
        let dim3value_input_el;

        if(data['dimnumber'] === 3) {
            dim3value_name_el = html.create('p',{textContent:'Dimension 3 Value:'});
            dim3value_input_el = html.create('input',{type:'number',value:0});

            [ dim3value_name_el,dim3value_input_el].map((el)=> {
               mountToDiv(el);
           })
        }

        let grid_div_el =  html.create('div');
        mountToDiv(grid_div_el);


        let button_names = ['init','up','down','left','right'];

        let grid_div = getDataGridComponent.init(grid_div_el);

        let buttons =  button_names.map((but) =>{
            let button = html.create('button',{textContent:but});
            html.mountTo(options_div_el)(button);
            let listenerToButton = html.addListenerTo(button);
            let button_obj = {
                input1:dim1_input_el,input2:dim2_input_el,
                direction:but,
                dataGridEls:grid_div
            };

            if(data['dimnumber'] === 3) {
                button_obj['input3'] = dim3value_input_el;
            }
            listenerToButton('click',() => getData(button_obj));
            return button;
        }) ;

        html.mountTo(app)(options_div_el);

        return {static:[options_div_el],dynamic:[dim1_input_el,dim2_input_el,dim3value_input_el,buttons]};
    };


    let getData = (button_obj) => {

        data_obj['direction'] = button_obj.direction;
        data_obj['dim1'] = button_obj.input1.value;
        data_obj['dim2'] = button_obj.input2.value;
        data_obj['dim3Value'] = button_obj.input3.value;
        let names= ['xstart','xend','ystart','yend'];

        console.log(data_obj);


        if (button_obj.direction === 'init') {

            for(let i=0;i<names.length;i++) {

                data_obj[names[i]] = 0;
            }
            retrieveData(data_obj)((err,data)=> {
                curr_state=data['current_array_edge_points'];
                console.log(curr_state);

                getDataGridComponent.update({dataGridEls:button_obj.dataGridEls,data});
            });
        }

        else {

            for(let i=0;i<names.length;i++) {
                data_obj[names[i]] = curr_state[i];
            }

            retrieveData(data_obj)((err,data)=> {
                curr_state=data['current_array_edge_points'];
                console.log(curr_state);

                getDataGridComponent.update({dataGridEls:button_obj.dataGridEls,data});
            });
        }
    };

    return {init};

};
module.exports = getDatasetOptionsComponentConstructor;