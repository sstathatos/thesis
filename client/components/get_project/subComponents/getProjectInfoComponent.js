let html = require('../../html');

let getProjectInfoComponentConstructor = (obj) => {

    let {app} = obj;
    let init = () => {
        let getproject_info_div_el = html.create('div');

        let getproject_title_name_el = html.create('p',{textContent:'Project name: '});
        let getproject_title_el = html.create('p',{textContent:''});
        let getproject_description_name_el = html.create('p',{textContent:'Project description: '});
        let getproject_description_el = html.create('p',{textContent:''});
        let getproject_date_name_el = html.create('p',{textContent:'Date created: '});
        let getproject_date_el = html.create('p',{textContent:''});

        let mountToDiv = html.mountTo(getproject_info_div_el);

        [getproject_title_name_el,getproject_title_el,getproject_description_name_el,getproject_description_el,
            getproject_date_name_el,getproject_date_el].map((el) => {
            mountToDiv(el);
        });

        html.mountTo(app)(getproject_info_div_el);

        return {
            static:[getproject_info_div_el],
            dynamic:[getproject_title_el,
                getproject_description_el,getproject_date_el]
        };
    };

    let update = (obj) => {
        let {name,description,date,infoEls} = obj;
        infoEls['dynamic'][0].textContent=name;
        infoEls['dynamic'][1].textContent=description;
        infoEls['dynamic'][2].textContent=date;
    };

    return {init,update};

};
module.exports = getProjectInfoComponentConstructor;