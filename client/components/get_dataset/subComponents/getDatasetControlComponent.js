let html = require('../../html');

let getDatasetControlComponentConstructor = (obj) => {

    let {app} = obj;
    let init = () => {
        let buttons_div_el = html.create('div');
        let up_button_el = html.create('button',{textContent:'Up'});
        let down_button_el = html.create('button',{textContent:'Down'});
        let left_button_el = html.create('button',{textContent:'Left'});
        let right_button_el = html.create('button',{textContent:'Right'});

        let mountToDiv = html.mountTo(buttons_div_el);

        [up_button_el,down_button_el,left_button_el,right_button_el].map((el) => {
            mountToDiv(el);
        });

        html.mountTo(app)(buttons_div_el);

        return {static:[buttons_div_el],dynamic:[up_button_el,
            down_button_el,left_button_el,right_button_el]};
    };

    let update = (obj) => {

    };

    return {init,update};

};
module.exports = getDatasetControlComponentConstructor;