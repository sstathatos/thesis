let getProjectPostComponentConstructor = (obj) => {
    let {app,post,postStructurer,fullPostButtonHandlerConstructor,html,css} = obj;
    let dependencies = obj;
    let init = () => {
        let getproject_post_div_el = html.create('div',{className:'mb1 pt2 pl4'}); //the complete post div
        let getproject_post_title_name_el = html.create('h4',{textContent:'Posts',className:'f3 light-yellow mb1 mt2'});

        let post_div_el =html.create('div',{className:''});//all posts together without Posts h4

        let mountToDiv = html.mountTo(getproject_post_div_el);
        [getproject_post_title_name_el,post_div_el].map((el) => {
            mountToDiv(el);
        });

        html.mountTo(app)(getproject_post_div_el);

        return {dynamic:[],static:[getproject_post_div_el,post_div_el,getproject_post_title_name_el]};
    };

    let update = (obj) => {
        let {post_parents,postEls,dsets,datasetEls} = obj;
        let post_div =postEls['static'][1];


        if(dsets.length > 0) {
            datasetEls['static'][3].disabled=false;
        }

        if(post_parents.length > 0) {
            for (let row in post_parents) {

                let post_whole_div;
                if (!(Number(row) === post_parents.length - 1)) {
                    post_whole_div = html.create('div', {className: 'fl w-50 pt2 pl2 dt mr1 bw1 bb b--light-yellow '});
                }
                else post_whole_div = html.create('div', {className: 'fl w-50 pt2 pl2 dt mr1'});


                postStructurer({dependencies, post_data: post_parents[row], post_div_el: post_whole_div});

                let post_button_div = html.create('div', {className: 'dtc v-mid db w-20'});

                let getproject_post_full_el = html.create('button', {
                    textContent: 'Full post',
                    className: `${css.button} fr`
                });
                let addListenerToFullPostButton = html.addListenerTo(getproject_post_full_el);

                let fullPostButtonHandler = fullPostButtonHandlerConstructor({
                    dependencies, post_id: post_parents[row]._id
                });
                addListenerToFullPostButton('click', fullPostButtonHandler);


                let mountToButtonDiv = html.mountTo(post_button_div);
                [getproject_post_full_el].map((el) => {
                    mountToButtonDiv(el);
                });

                let mountToDiv = html.mountTo(post_whole_div);
                [post_button_div].map((el) => {
                    mountToDiv(el);
                });

                html.mountTo(post_div)(post_whole_div);
            }
        }

        else {

            let empty_text = html.create('h4',{textContent:'This project doesn\'t contain a post yet.',className:'f4 bl pv2 bw2 pl2 light-yellow'});

            let mountToButtonDiv = html.mountTo(postEls['static'][1]);
            [empty_text].map((el) => {
                mountToButtonDiv(el);
            });
        }


        return {static:[],dynamic:[]};

    };

    return {init,update};

};
module.exports = getProjectPostComponentConstructor;