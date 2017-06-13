let getProjectPostComponentConstructor = (obj) => {
    let {app,get,post,postStructurer,fullPostButtonHandlerConstructor,html,getProjectCreatePostHandlerConstructor} = obj;

    let init = () => {
        let getproject_post_div_el = html.create('div');
        let getproject_post_title_name_el = html.create('p',{textContent:'Posts:'});
        let getproject_post_createpost_name_el = html.create('p',{textContent:'Create post:'});
        let getproject_post_createpost_button_el = html.create('button',{textContent:'Create'});

        let addListenerToCreatePost = html.addListenerTo(getproject_post_createpost_button_el);

        let getProjectCreatePostHandler = getProjectCreatePostHandlerConstructor(obj);
        addListenerToCreatePost('click',getProjectCreatePostHandler);

        let post_div_el =html.create('div');

        let mountToDiv = html.mountTo(getproject_post_div_el);
        [getproject_post_title_name_el,getproject_post_createpost_name_el,
            getproject_post_createpost_button_el,post_div_el].map((el) => {
            mountToDiv(el);
        });

        html.mountTo(app)(getproject_post_div_el);

        return {dynamic:[],static:[getproject_post_div_el,getproject_post_createpost_button_el,post_div_el]};
    };

    let update = (obj) => {
        let {post_parents,postEls} = obj;
        let post_div =postEls['static'][2];
        for(let row in post_parents) {
            postStructurer({app,get,post_data:post_parents[row],post_div_el:post_div});
            let getproject_post_full_name_el = html.create('p',{textContent:'See full post:'});
            let getproject_post_full_el = html.create('button',{textContent:'See post'});
            let addListenerToFullPostButton = html.addListenerTo(getproject_post_full_el);

            let fullPostButtonHandler = fullPostButtonHandlerConstructor({get,post_id:post_parents[row]._id});
            addListenerToFullPostButton('click',fullPostButtonHandler);

            let mountToDiv = html.mountTo(post_div);
            [getproject_post_full_name_el,getproject_post_full_el].map((el) => {
                mountToDiv(el);
            })
        }
        return {static:[],dynamic:[]};

    };

    return {init,update};

};
module.exports = getProjectPostComponentConstructor;