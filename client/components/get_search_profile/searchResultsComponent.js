let searchResultsComponent = (obj) => {
    let {app,html,addHandlerConstructor,css} = obj;

    let dependencies = obj;
    let init = () => {
        let search_result_div=html.create('div',{className:'pt2 pl4'});

        let title =  html.create('h4',{textContent:`Search result`,className:'f3  light-yellow'});

        let p1name = html.create('p',{textContent:`Username:`,className:'f4 pl3 di '});
        let p2name = html.create('p',{textContent:`Email:`,className:'f4 pl3 di '});
        let p3name = html.create('p',{textContent:`Name:`,className:'f4 pl3 di '});

        let p1 = html.create('h4',{textContent:``,className:'di pl2 f4'});
        let p2 = html.create('h4',{textContent:``,className:'di pl2 f4'});
        let p3 = html.create('h4',{textContent:``,className:'di pl2 f4'});

        let username_div = html.create('div',{className:'w-100 pv2'});
        let mountToUsernameDiv = html.mountTo(username_div);
        [p1name,p1].map((el) => {
            mountToUsernameDiv(el);
        });

        let email_div = html.create('div',{className:'w-100 pv2'});
        let mountToEmailDiv = html.mountTo(email_div);
        [p2name,p2].map((el) => {
            mountToEmailDiv(el);
        });

        let name_div = html.create('div',{className:'w-100 pv2'});
        let mountToNameDiv = html.mountTo(name_div);
        [p3name,p3].map((el) => {
            mountToNameDiv(el);
        });

        let projectInfo = html.create('h4',{textContent:"Projects",className:'f3 light-yellow'});


        let search_projects_arr_table =  html.create('table',{className:"f6 w-80 mw8 left pt2 pl3"});
        search_projects_arr_table.cellSpacing = 0;


        let mountToDiv = html.mountTo(search_result_div);
        [title,username_div,email_div,name_div,projectInfo,search_projects_arr_table].map((el) => {
            mountToDiv(el);
        });

        html.mountTo(app)(search_result_div);
        return {dynamic :[p1,p2,p3,search_projects_arr_table],static:[search_result_div]}
    };

    let update = (obj) => {

        let {searchEl,data,whole_div} = obj;

        searchEl[0].textContent = data.username;
        searchEl[1].textContent = data.email;
        searchEl[2].textContent = data.name;

        let {projects} = data;
        let my_table =  searchEl[3];



        if(projects.length >0)  {

            let rowTitle = html.create('tr',{className:'stripe-dark'});
            let nameTitle = html.create('th',{textContent:'Name',className:'pa1 f4'});
            let descriptionTitle = html.create('th',{textContent:'Description',className:'pa1 f4'});
            let dateCreatedTitle = html.create('th',{textContent:'Date created',className:'pa1 f4'});
            let buttonTitle = html.create('th',{textContent:'Contribute',className:'pa1 f4'});


            let mountToRowTitle = html.mountTo(rowTitle);
            [nameTitle,descriptionTitle,dateCreatedTitle,buttonTitle].map((el)=> {
                mountToRowTitle(el);
            });

            html.mountTo(my_table)(rowTitle);

            projects.map((proj) => {
                let row = html.create('tr',{className:'stripe-dark'});
                row.style.cursor = 'pointer';

                let nameTitle = html.create('td',{textContent:proj.name,className:'f4 w3 pa2'});
                nameTitle.style.textAlign = "center";

                let descriptionTitle = html.create('td',{textContent: proj.description,className:'f4 w3 pa2'});
                descriptionTitle.style.textAlign = "center";

                let dateCreatedTitle = html.create('td',{textContent:proj.date,className:'f4 w3 pa2'});
                dateCreatedTitle.style.textAlign = "center";

                let button_el = html.create('td',{className:'f4 w3 pa2'});
                button_el.style.textAlign = "center";


                if(proj.permission === 'denied') {
                    let add_button = html.create('button',{textContent:'Join Project',className:css.button});
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
        }

        else {

            let projectInfo = html.create('h3',{textContent:"User doesn\'t participate in a project right now.",className:'f4 bl pv2 bw2 pl2 light-yellow'});
            let mountToDiv =html.mountTo(whole_div);
            mountToDiv(projectInfo);
        }



    };

    return {init,update};
};
module.exports =searchResultsComponent;