let getDatasetGridComponentConstructor = require('./getDatasetGridComponent');

let html = require('../../html');

let getDatasetOptionsComponentConstructor = (obj) => {

    let {app,retrieveData} = obj;

    let curr_state = [];

    let data_obj = {
    };

    let getDataGridComponent = getDatasetGridComponentConstructor({app});

    let init = () => {

        let options_div_el = html.create('div');

        let dim1_name_el = html.create('p',{textContent:'Dimension 1:'});
        let dim1_input_el = html.create('input',{type:'number',value:1});

        let dim2_name_el = html.create('p',{textContent:'Dimension 2:'});
        let dim2_input_el = html.create('input',{type:'number',value:2});

        let dim3value_name_el = html.create('p',{textContent:'Dimension 3 Value:'});
        let dim3value_input_el = html.create('input',{type:'number',value:0});

        let mountToDiv = html.mountTo(options_div_el);
        [dim1_name_el,dim1_input_el,dim2_name_el,dim2_input_el,
            dim3value_name_el,dim3value_input_el].map((el) => {
            mountToDiv(el);
        });

        let button_names = ['init','up','down','left','right'];

        let grid_div = getDataGridComponent.init();

        let buttons =  button_names.map((but) =>{
            let button = html.create('button',{textContent:but});
            html.mountTo(options_div_el)(button);
            let listenerToButton = html.addListenerTo(button);
            let button_obj = {
                input1:dim1_input_el,input2:dim2_input_el,input3:dim3value_input_el,
                direction:but,
                dataGridEls:grid_div
            };
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