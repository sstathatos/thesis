let html = require('../../html');

let createPostFormComponentConstructor = (obj) => {
    let {app} = obj;
    let init = () => {
        let post_form_div_el =html.create('div');
        let post_title_el = html.create('p',{textContent:'New Post:'});

        let post_input_title_name_el =html.create('p',{textContent:'Title:'});
        let post_input_title_el = html.create('input');

        let post_input_desc_name_el =html.create('p',{textContent:'Description:'});
        let post_input_desc_el =html.create('textarea');

        let mountToDiv =html.mountTo(post_form_div_el);
        [post_title_el,post_input_title_name_el,post_input_title_el,post_input_desc_name_el,post_input_desc_el].map((el) => {
            mountToDiv(el);
        });

        html.mountTo(app)(post_form_div_el);

        return {dynamic:[],static:[post_form_div_el,post_input_title_el,post_input_desc_el]};
    };
    return {init};
};
module.exports = createPostFormComponentConstructor;