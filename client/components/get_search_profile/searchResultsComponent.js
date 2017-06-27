let searchResultsComponent = (obj) => {
    let {app,html,addHandlerConstructor} = obj;

    let dependencies = obj;
    let init = () => {
        let search_result_div=html.create('div');

        let title =  html.create('p',{textContent:`Search result:`});
        let p1name = html.create('p',{textContent:`Profile Username: `});
        let p2name = html.create('p',{textContent:`Email: `});
        let p3name = html.create('p',{textContent:`Name: `});

        let p1 = html.create('p',{textContent:``});
        let p2 = html.create('p',{textContent:``});
        let p3 = html.create('p',{textContent:``});

        let search_projects_arr_table =  html.create('table');

        let rowTitle = html.create('tr');
        let nameTitle = html.create('th',{textContent:'Name'});
        let descriptionTitle = html.create('th',{textContent:'Description'});
        let dateCreatedTitle = html.create('th',{textContent:'Date created'});

        let mountToRowTitle = html.mountTo(rowTitle);
        [nameTitle,descriptionTitle,dateCreatedTitle].map((el)=> {
            mountToRowTitle(el);
        });

        html.mountTo(search_projects_arr_table)(rowTitle);

        let mountToDiv = html.mountTo(search_result_div);
        [title,p1name,p1,p2name,p2,p3name,p3,search_projects_arr_table].map((el) => {
            mountToDiv(el);
        });

        html.mountTo(app)(search_result_div);
        return {dynamic :[p1,p2,p3,search_projects_arr_table],static:[search_result_div]}
    };

    let update = (obj) => {

        let {searchEl,data} = obj;

        searchEl[0].textContent = data.username;
        searchEl[1].textContent = data.email;
        searchEl[2].textContent = data.name;

        let {projects} = data;
        let my_table =  searchEl[3];

        projects.map((proj) => {
            let row = html.create('tr');
            let nameTitle = html.create('td',{textContent:proj.name});
            let descriptionTitle = html.create('td',{textContent: proj.description});
            let dateCreatedTitle = html.create('td',{textContent:proj.date});
            let button_el = html.create('td');

            if(proj.permission === 'denied') {
                let add_button = html.create('button',{textContent:'Join Project'});
                html.mountTo(button_el)(add_button);
                let addListenerToAddButton = html.addListenerTo(add_button);
                let addHandler =  addHandlerConstructor({dependencies,id:proj.id});
                addListenerToAddButton('click',addHandler);
            }

            let mountToTr =  html.mountTo(row);
            [nameTitle,descriptionTitle,dateCreatedTitle,button_el].map((el)=> {
                mountToTr(el);
            });

            html.mountTo(my_table)(row);
        })


    };

    return {init,update};
};
module.exports =searchResultsComponent;