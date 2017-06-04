let html = require('../../html');

let createPostButtonsComponentConstructor = (obj) => {
    let {app,createPostSaveButtonHandlerConstructor} = obj;

    let init = () => {
        let post_savebutton_div_el =html.create('div');

        let post_savebutton_name_el = html.create('p',{textContent:'Save Post:'});
        let post_savebutton_el = html.create('button',{textContent:'Save'});
        let addListenerToSaveButton = html.addListenerTo(post_savebutton_el);
        let createPostSaveButtonHandler = createPostSaveButtonHandlerConstructor({

        });
        addListenerToSaveButton('click',createPostSaveButtonHandler);

        let mountToDiv =html.mountTo(post_savebutton_div_el);
        [post_savebutton_name_el,post_savebutton_el].map((el) => {
            mountToDiv(el);
        });

        html.mountTo(app)(post_savebutton_div_el);

        return {dynamic:[],static:[post_savebutton_div_el,post_savebutton_el]};
    };

    return {init};
};
module.exports = createPostButtonsComponentConstructor;