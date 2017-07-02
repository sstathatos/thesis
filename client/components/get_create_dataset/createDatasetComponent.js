let createDatasetComponentConstructor = (obj) => {
    let {app,html,css,submitButtonDatasetHandlerConstructor} = obj;

    let init = () => {
        document.getElementById('BackToProjectButton').style.display='initial';

        let dataset_div_el =html.create('div',{className:'pt2 pl4'});

        let title_dataset_el = html.create('h4',{textContent:'New Dataset',className:'f3 light-yellow mt2 mb1'});

        let name_dataset_el = html.create('p',{textContent:'Name:',className:' w-30 f4 pl3 pr5 di dtc'});
        let name_input_el =html.create('input',{className:`${css.input} dtc`});

        let name_div = html.create('div',{className:'w-100 pv2 dt'});
        let mountToNameDiv = html.mountTo(name_div);
        [name_dataset_el,name_input_el].map((el) => {
            mountToNameDiv(el);
        });

        let upload_dataset_el = html.create('p',{textContent:'Upload:',className:'f4 w-30 pl3 pr5 di dtc'});


        let hidden_input_file_el =  html.create('input',{type:'file',className:'inputFile'});
        hidden_input_file_el.style.display = 'none';
        let upload_button_el =  html.create('button',{textContent:'Select File',className:'dark-green b--solid dim b--green bg-light-yellow ph2 mb2 pa2 mh2 bw2 br3'});
        let upload_input_el =  html.create('input',{className:'ph3 pv2 mh2 b--green b--solid'});
        upload_input_el.readOnly =  'true';
        let addListenerToUpload = html.addListenerTo(upload_button_el);
        addListenerToUpload('click',() => {
            hidden_input_file_el.click();
            let addListenerToHiddenInput = html.addListenerTo(hidden_input_file_el);
            addListenerToHiddenInput('change',() => {
                upload_input_el.value = hidden_input_file_el.files[0].name;
            });
        });

        let submitDatasetButtonHandler = submitButtonDatasetHandlerConstructor({
            name: () => name_input_el.value,
            data: () => hidden_input_file_el.files[0],
            dependencies:obj
        });

        let submit_button_el =html.create('button',{textContent:'Submit',className:'dark-green b--solid dim b--green bg-white ph2 mb2 pa2 mh2 bw2 br3 dtc'});
        let addListenerToButton = html.addListenerTo(submit_button_el);
        addListenerToButton('click',submitDatasetButtonHandler);

        let upload_div = html.create('div',{className:'w-100 pv2 dt'});
        let mountToUploadDiv = html.mountTo(upload_div);
        [upload_dataset_el,upload_button_el,hidden_input_file_el,upload_input_el].map((el) => {
            mountToUploadDiv(el);
        });



        let mountToDiv = html.mountTo(dataset_div_el);
        [title_dataset_el,name_div,upload_div,submit_button_el].map((el) => {
            mountToDiv(el);
        });

        html.mountTo(app)(dataset_div_el);

        return {static:[dataset_div_el,name_input_el,upload_input_el,submit_button_el],dynamic:[]};
    };

    return {init};
};
module.exports =createDatasetComponentConstructor;