let html = require('../../html');

let getDatasetOptionsComponentConstructor = (obj) => {

    let {app,buttonHandler} = obj;
    let init = () => {
        let options_div_el = html.create('div');

        let dim1_name_el = html.create('p',{textContent:'Dimension 1:'});
        let dim1_input_el = html.create('input',{type:'number',value:1});

        let dim2_name_el = html.create('p',{textContent:'Dimension 2:'});
        let dim2_input_el = html.create('input',{type:'number',value:2});

        let dim3value_name_el = html.create('p',{textContent:'Dimension 3 Value:'});
        let dim3value_input_el = html.create('input',{type:'number',value:0});

        let options_button_el = html.create('button',{textContent:'Show data'});
        let addListenerToButton = html.addListenerTo(options_button_el);

        console.log(buttonHandler);
        let buttonCb = buttonHandler({
            direction:'init',xstart:0,xend:0,ystart:0,yend:0,
            dim3Value:dim3value_input_el.value,dim1:dim1_input_el.value,dim2:dim2_input_el.value
        });

        addListenerToButton('click',buttonCb);

        let mountToDiv = html.mountTo(options_div_el);
        [dim1_name_el,dim1_input_el,dim2_name_el,dim2_input_el,
            dim3value_name_el,dim3value_input_el,options_button_el].map((el) => {
            mountToDiv(el);
        });

        html.mountTo(app)(options_div_el);

        return {static:[options_div_el],dynamic:[dim1_input_el,dim2_input_el,dim3value_input_el,options_button_el]};
    };

    let update = (obj) => {
    };

    return {init,update};

};
module.exports = getDatasetOptionsComponentConstructor;