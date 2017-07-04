let createProjectComponentConstructor = (obj) => {
    let {app,submitButtonProjectHandlerConstructor,html,css} =obj;

    let init = () => {
        let new_proj_div_el = html.create('div',{className:'pt2 pl4'});
        let title_el= html.create('h4',{textContent:"New Project",className:'f3 light-yellow'});

        let name_input_el =html.create('input',{value:'new project name',className:`${css.input} dtc`});
        let name_text_el = html.create('p',{textContent:`Name:`,className:'f4 pl3 pr5 di dtc'});

        let name_div = html.create('div',{className:'w-100 pv2 dt'});
        let mountToNameDiv = html.mountTo(name_div);
        [name_text_el,name_input_el].map((el) => {
            mountToNameDiv(el);
        });

        let description_input_el =html.create('textarea',{value:'new project description'
            ,maxLength:"100",className:'border-box green w-70 measure dtc bw1 ba b--green pa2 br2 mb2'});
        let description_text_el = html.create('p',{textContent:`Description:`,className:'f4 pl3 di dtc v-mid pr2'});

        let description_div = html.create('div',{className:'w-100 pv2 dt'});
        let mountToDescriptionDiv = html.mountTo(description_div);
        [description_text_el,description_input_el].map((el) => {
            mountToDescriptionDiv(el);
        });

        let submit_button_el = html.create('button',{textContent:'Submit',className:'dark-green b--solid dim b--green bg-white ph2 mb2 pa2 mh2 bw2 br3'});

        let box_div = html.create('div',{className:'w-80 mw8 left'});
        let mountToBox = html.mountTo(box_div);
        [name_div,description_div,submit_button_el].map((el) => {
           mountToBox(el);
        });


        // submit_button_el.style.cssFloat ="right";

        let addListenerToSubmitButton = html.addListenerTo(submit_button_el);

        let submitProjectButtonHandler = submitButtonProjectHandlerConstructor({
            name: () => name_input_el.value,
            description: () => description_input_el.value,
            dependencies:obj,
        });
        addListenerToSubmitButton('click',submitProjectButtonHandler);

        let mountToDiv =html.mountTo(new_proj_div_el);
        [title_el,box_div].map((el) => {
            mountToDiv(el);
        });


        html.mountTo(app)(new_proj_div_el);

        return {static:[new_proj_div_el,name_input_el,description_input_el,submit_button_el],dynamic:[]}
    };

    return {init};
};
module.exports = createProjectComponentConstructor;