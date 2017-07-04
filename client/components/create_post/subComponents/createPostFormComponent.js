let createPostFormComponentConstructor = (obj) => {
    let {html,css} = obj;
    let init = (post_div) => {
        let post_form_div_el =html.create('div',{className:'pt2 pl4 w-60'});
        let post_title_el = html.create('h4',{textContent:'New Post',className:'f3 light-yellow mt2 mb1'});

        let post_input_title_name_el =html.create('p',{textContent:'Title:',className:' w-30 f4 pl3 pr5 di dtc'});
        let post_input_title_el = html.create('input',{className:`${css.input} dtc`});

        let title_div = html.create('div',{className:'w-100 pv2 dt'});
        let mountToTitleDiv = html.mountTo(title_div);
        [post_input_title_name_el,post_input_title_el].map((el) => {
            mountToTitleDiv(el);
        });

        let post_input_desc_name_el =html.create('p',{textContent:'Description:',className:' w-30 f4 v-mid pl3 pr5 di dtc'});
        let post_input_desc_el =html.create('textarea',{maxLength:"100",className:'border-box w-70 green measure dtc bw1 ba b--green pa2 br2 mb2'});

        let description_div = html.create('div',{className:'w-100 pv2 dt'});
        let mountToDescriptionDiv = html.mountTo(description_div);
        [post_input_desc_name_el,post_input_desc_el].map((el) => {
            mountToDescriptionDiv(el);
        });

        let mountToDiv =html.mountTo(post_form_div_el);
        [post_title_el,title_div,description_div].map((el) => {
            mountToDiv(el);
        });

        html.mountTo(post_div)(post_form_div_el);

        return {dynamic:[],static:[post_form_div_el,post_input_title_el,post_input_desc_el]};
    };
    return {init};
};
module.exports = createPostFormComponentConstructor;