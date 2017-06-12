let html = require('../html');

let getPostDataComponentConstructor = require('./getPostDataComponent');
let postStructurer = require('../structure_helpers/post_structure/postStructurer');

let getPostComponentConstructor = (obj) => {
    let {app,get,post,id,errorHandler} = obj;

    let getPostDataComponent = getPostDataComponentConstructor(id,get);

    let init = () => {
        let wholepost_div_el = html.create('div');

        let wholepost_name_el = html.create('p',{textContent:'Whole Post:'});

        let wholepost_parent_div = html.create('div');

        let wholepost_createresponse_name_el = html.create('p',{textContent:'Create Response:'});
        let wholepost_createresponse_button_el = html.create('button',{textContent:'Create'});

        let wholepost_responses_name_el = html.create('p',{textContent:'Responses:'});

        let wholepost_kids_div = html.create('div');

        let mountToDiv = html.mountTo(wholepost_div_el);

        [wholepost_name_el,wholepost_parent_div,wholepost_createresponse_name_el,
            wholepost_createresponse_button_el,wholepost_responses_name_el,wholepost_kids_div].map((el) => {
            mountToDiv(el);
        });

        html.mountTo(app)(wholepost_div_el);

        return {
            static:[wholepost_div_el],dynamic:[wholepost_parent_div,
                wholepost_createresponse_button_el,wholepost_kids_div]
        }
    };

    let update = (obj) => {
        let {dynamic} =obj;

        getPostDataComponent.getData((err,posts) => {
            console.log(posts);
            console.log(dynamic);
            postStructurer({app,get,post_data:posts.parent,post_div_el:dynamic[0]});

            let {kids} =posts;
            for(let row in kids) {
                postStructurer({app,get,post_data:kids[row],post_div_el:dynamic[2]});
            }
        });
    };

    return {init,update};

};
module.exports = getPostComponentConstructor;