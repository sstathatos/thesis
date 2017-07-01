let getProjectInfoComponentConstructor = (obj) => {

    let {app,html} = obj;
    let init = () => {
        let getproject_info_div_el = html.create('div',{className:'pt2 pl4'});

        let project_title = html.create('h4',{textContent:`Project`,className:'f3 light-yellow mb2 mt2'});

        let getproject_title_name_el = html.create('p',{textContent:'Name:',className:'f4 pl3 di '});
        let getproject_title_el = html.create('h4',{textContent:'',className:'di pl2 f4'});

        let name_div = html.create('div',{className:'w-100 pv2'});
        let mountToNameDiv = html.mountTo(name_div);
        [getproject_title_name_el,getproject_title_el].map((el) => {
            mountToNameDiv(el);
        });

        let getproject_description_name_el = html.create('p',{textContent:'Description:',className:'f4 pl3 di '});
        let getproject_description_el = html.create('h4',{textContent:'',className:'di pl2 f4'});

        let description_div = html.create('div',{className:'w-100 pv2'});
        let mountToDescriptionDiv = html.mountTo(description_div);
        [getproject_description_name_el,getproject_description_el].map((el) => {
            mountToDescriptionDiv(el);
        });

        let getproject_date_name_el = html.create('p',{textContent:'Date created:',className:'f4 pl3 di'});
        let getproject_date_el = html.create('h4',{textContent:'',className:'di pl2 f4'});

        let date_div = html.create('div',{className:'w-100 pv2'});
        let mountToDateDiv = html.mountTo(date_div);
        [getproject_date_name_el,getproject_date_el].map((el) => {
            mountToDateDiv(el);
        });

        let mountToDiv = html.mountTo(getproject_info_div_el);

        [project_title,name_div,description_div,date_div].map((el) => {
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