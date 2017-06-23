let getPostDataComponentConstructor = require('./getPostDataComponent');

let getPostComponentConstructor = (obj) => {
    let {dependencies,id} = obj;
    let {app,get,createResponseButtonHandlerConstructor,postStructurer,html} = dependencies;

    let getPostDataComponent = getPostDataComponentConstructor(id,get);

    let init = () => {

        document.getElementById('BackToProjectButton').style.display='initial';

        let wholepost_div_el = html.create('div');

        let wholepost_name_el = html.create('p',{textContent:'Whole Post:'});

        let wholepost_parent_div = html.create('div');

        let wholepost_createresponse_name_el = html.create('p',{textContent:'Create Response:'});
        let wholepost_createresponse_button_el = html.create('button',{textContent:'Create'});
        let addListenerToCreateButton = html.addListenerTo(wholepost_createresponse_button_el);

        let createResponseButtonHandler = createResponseButtonHandlerConstructor({
            dependencies,
            parent_post_id:id
        });
        addListenerToCreateButton('click',createResponseButtonHandler);

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
            postStructurer({dependencies,post_data:posts.parent,post_div_el:dynamic[0]});

            let {kids} =posts;
            for(let row in kids) {
                postStructurer({dependencies,post_data:kids[row],post_div_el:dynamic[2]});
            }
        });
    };

    return {init,update};

};
module.exports = getPostComponentConstructor;