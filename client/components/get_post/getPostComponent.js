let getPostDataComponentConstructor = require('./getPostDataComponent');

let getPostComponentConstructor = (obj) => {
    let {dependencies,id} = obj;
    let {app,createResponseButtonHandlerConstructor,postStructurer,html,css} = dependencies;

    let getPostDataComponent = getPostDataComponentConstructor(id,dependencies);

    let init = () => {

        document.getElementById('BackToProjectButton').style.display='initial';

        let wholepost_div_el = html.create('div',{className:'pt2 pl4'});

        let wholepost_name_el = html.create('h4',{textContent:'Whole Post',className:'f3 light-yellow mb2 mt2'});

        let wholepost_parent_div = html.create('div',{className:'w-40 dtc'});

        let wholepost_createresponse_name_el = html.create('h4',{textContent:'Create Response',className:'f3 light-yellow mb1 mt2'});
        let wholepost_createresponse_button_el = html.create('button',{textContent:'Create',className:`${css.button}`});
        let addListenerToCreateButton = html.addListenerTo(wholepost_createresponse_button_el);

        let createResponseButtonHandler = createResponseButtonHandlerConstructor({
            dependencies,
            parent_post_id:id
        });
        addListenerToCreateButton('click',createResponseButtonHandler);

        let button_div = html.create('div',{className:'w-40 dtc v-mid'});
        let mountToButtonDiv = html.mountTo(button_div);

        [wholepost_createresponse_name_el,wholepost_createresponse_button_el].map((el) => {
            mountToButtonDiv(el);
        });

        let post_response_div = html.create('div',{className:'w-100 dt'});
        let mountToPostResponseDiv = html.mountTo(post_response_div);

        [wholepost_parent_div,button_div].map((el) => {
            mountToPostResponseDiv(el);
        });


        let wholepost_responses_name_el = html.create('h4',{textContent:'Responses',className:'f3 light-yellow mb2 mt2'});

        let wholepost_kids_div = html.create('div',{className:'w-60'});

        let mountToDiv = html.mountTo(wholepost_div_el);

        [wholepost_name_el,post_response_div,wholepost_responses_name_el,wholepost_kids_div].map((el) => {
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
            let wrapper_div;
            wrapper_div = html.create('div',{className:'w-100  dt'});
            html.mountTo(dynamic[0])(wrapper_div);

            postStructurer({dependencies,post_data:posts.parent,post_div_el:wrapper_div});

            let {kids} =posts;
            if(kids.length > 0) {
                for(let row in kids) {

                    if(!(Number(row) === kids.length -1)) {
                        wrapper_div = html.create('div',{className:'fl w-80 pt2 pl2 dt mr1 bw1 bb b--light-yellow '});
                    }
                    else wrapper_div = html.create('div',{className:'fl w-80 pt2 pl2 dt mr1'});

                    html.mountTo(dynamic[2])(wrapper_div);
                    postStructurer({dependencies,post_data:kids[row],post_div_el:wrapper_div});
                }
            }

            else {
                let empty_response = html.create('h3',{textContent:"There are no responses in this post.",
                    className:'f4 bl pv2 bw2 pl2 light-yellow'});
                let mountToDiv =html.mountTo(dynamic[2]);
                mountToDiv(empty_response);
            }

        });
    };

    return {init,update};

};
module.exports = getPostComponentConstructor;