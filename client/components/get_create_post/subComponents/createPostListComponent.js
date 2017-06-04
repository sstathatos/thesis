let html =require('../../html');
let createPostListComponentConstructor = (obj) => {
    let {app,get} = obj;

    let init = () => {
        let post_list_div_el = html.create('div');
        let post_list_title_el = html.create('p',{textContent:'Select Dataset:'});
        let post_list_ul_el = html.create('ul');

        let mountToDiv =html.mountTo(post_list_div_el);
        [post_list_title_el,post_list_ul_el].map((el) => {
            mountToDiv(el);
        });

        html.mountTo(app)(post_list_div_el);

        return {dynamic:[post_list_ul_el],static:[post_list_div_el]};
    };

    let update = (obj) => {
        let {data,listEls} =obj;
        //console.log(listEls.dynamic[0]);
        for(let row in data){
            let post_list_li_el = html.create('li',{textContent:data[row].name});
            let post_checkbox_el = html.create('input',{type: 'checkbox'});

            // let mountToLi = html.mountTo(post_list_li_el);
            // mountToLi(post_checkbox_el);

            let mountToUl = html.mountTo(listEls.dynamic[0]);
            [post_list_li_el,post_checkbox_el].map((el) => {
                mountToUl(el);
            });
        }
    };

    return {init,update};

};
module.exports = createPostListComponentConstructor;