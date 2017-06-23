let html = require('../html');

let createDatasetComponentConstructor = (obj) => {
    let {app,post,submitButtonDatasetHandlerConstructor} = obj;

    let init = () => {
        document.getElementById('BackToProjectButton').style.display='initial';

        let dataset_div_el =html.create('div');

        let title_dataset_el = html.create('p',{textContent:'New Dataset:'});

        let name_dataset_el = html.create('p',{textContent:'Dataset Name:'});
        let name_input_el =html.create('input');

        let upload_dataset_el = html.create('p',{textContent:'Upload:'});
        let upload_input_el =html.create('input',{type:'file',textContent:'Select'});

        let submitDatasetButtonHandler = submitButtonDatasetHandlerConstructor({
            name: () => name_input_el.value,
            data: () => upload_input_el.files[0],
            dependencies:obj
        });

        let submit_button_el =html.create('button',{textContent:'Submit'});
        let addListenerToButton = html.addListenerTo(submit_button_el);
        addListenerToButton('click',submitDatasetButtonHandler);

        let mountToDiv = html.mountTo(dataset_div_el);
        [title_dataset_el,name_dataset_el,name_input_el,upload_dataset_el,upload_input_el,submit_button_el].map((el) => {
            mountToDiv(el);
        });

        html.mountTo(app)(dataset_div_el);

        return {static:[dataset_div_el,name_input_el,upload_input_el,submit_button_el],dynamic:[]};
    };

    return {init};
};
module.exports =createDatasetComponentConstructor;