let getDatasetOptionsComponentConstructor = (obj) => {

    let {dependencies,data} = obj;
    let {html,app,getDatasetGridComponentConstructor,getDataConstructor} = dependencies;
    let getData = getDataConstructor(obj);
    let getDataGridComponent = getDatasetGridComponentConstructor(dependencies);

    let init = (data) => {

        let options_div_el = html.create('div');
        console.log(data);
        let dim1_name_el = html.create('p',{textContent:'Horizontal Dimention:'});
        let dim1_input_el = html.create('input',{type:'number',value:1});

        let dim2_name_el = html.create('p',{textContent:'Vertical Dimention:'});
        let dim2_input_el = html.create('input',{type:'number',value:2});

        let mountToDiv = html.mountTo(options_div_el);
        [dim1_name_el,dim1_input_el,dim2_name_el,dim2_input_el].map((el) => {
            mountToDiv(el);
        });

        let dim3value_name_el;
        let dim3value_input_el;

        if(data['dimnumber'] === 3) {
            dim3value_name_el = html.create('p',{textContent:'Dimension 3 Value:'});
            dim3value_input_el = html.create('input',{type:'range',value:0});

            [ dim3value_name_el,dim3value_input_el].map((el)=> {
               mountToDiv(el);
           })
        }

        let button = html.create('button',{textContent:'Show Data'});
        mountToDiv(button);
        let grid_div_el =  html.create('div');
        mountToDiv(grid_div_el);


        let listenerToButton = html.addListenerTo(button);
        let button_obj = {
            input1:dim1_input_el,input2:dim2_input_el
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

        return {static:[options_div_el],dynamic:[dim1_input_el,dim2_input_el,dim3value_input_el,button]};
    };


    return {init};

};
module.exports = getDatasetOptionsComponentConstructor;