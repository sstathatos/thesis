let createProjectComponentConstructor = (obj) => {
    let {app,post,submitButtonProjectHandlerConstructor,html} =obj;

    let init = () => {
        let new_proj_div_el = html.create('div');
        let title_el= html.create('p',{textContent:"New Project:"});

        let name_input_el =html.create('input');
        let name_text_el = html.create('p',{textContent:`Name: `});

        let description_input_el =html.create('textarea');
        let description_text_el = html.create('p',{textContent:`Description: `});

        let submit_button_el = html.create('button',{textContent:'Submit'});
        let addListenerToSubmitButton = html.addListenerTo(submit_button_el);

        let submitProjectButtonHandler = submitButtonProjectHandlerConstructor({
            name: () => name_input_el.value,
            description: () => description_input_el.value,
            dependencies:obj,
        });
        addListenerToSubmitButton('click',submitProjectButtonHandler);

        let mountToDiv =html.mountTo(new_proj_div_el);
        [title_el,name_text_el,name_input_el,description_text_el,description_input_el,submit_button_el].map((el) => {
            mountToDiv(el);
        });


        html.mountTo(app)(new_proj_div_el);

        return {static:[new_proj_div_el,name_input_el,description_input_el,submit_button_el],dynamic:[]}
    };

    return {init};
};
module.exports = createProjectComponentConstructor;