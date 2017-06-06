let html =require('../../../html');
let getProjectPostComponentConstructor = (obj) => {
    let {app,get,post} = obj;

    let init = () => {
        let getproject_post_div_el = html.create('div');
        let getproject_post_title_name_el = html.create('p',{textContent:'Posts:'});
        let getproject_post_createpost_name_el = html.create('p',{textContent:'Create post:'});
        let getproject_post_createpost_button_el = html.create('button',{textContent:'Create'});

        let mountToDiv = html.mountTo(getproject_post_div_el);
        [getproject_post_title_name_el,getproject_post_createpost_name_el,
            getproject_post_createpost_button_el].map((el) => {
            mountToDiv(el);
        });

        html.mountTo(app)(getproject_post_div_el);

        return {dynamic:[],static:[getproject_post_div_el,getproject_post_createpost_button_el]};
    };

    let update = (obj) => {

        return {static:[],dynamic:[]};

    };

    return {init,update};

};
module.exports = getProjectPostComponentConstructor;