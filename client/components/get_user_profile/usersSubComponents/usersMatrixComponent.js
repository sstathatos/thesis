
let usersMatrixConstructor = (obj) => {
    let {app,html,usersDatasetRowHandlerConstructor} = obj;
    let init = () => {
        let matrixDiv = html.create('div',{className:'pt2 pl4'});

        let projectInfo = html.create('h4',{textContent:"Projects",className:'f3 light-yellow'});
        let matrixEl = html.create('table',{className:"f6 w-80 mw8 left pt2 pl3"});
        matrixEl.cellSpacing = 0;
//pt2 dt
        let mountToDiv = html.mountTo(matrixDiv);
        [projectInfo,matrixEl].map((el) => {
            mountToDiv(el);
        });

        let mountToApp = html.mountTo(app);
        mountToApp(matrixDiv);

        return {dynamic:[matrixEl],static:[matrixDiv]};
    };

    let update = (init_contents) => {
        let {projects,dynamic,static} =init_contents;
        let data=projects[0];

        if(data) {
            let rowTitle = html.create('tr',{className:'stripe-dark'});
            let nameTitle = html.create('th',{textContent:'Name',className:'pa1 f4'});
            let descriptionTitle = html.create('th',{textContent:'Description',className:'pa1 f4'});
            let dateCreatedTitle = html.create('th',{textContent:'Date created',className:'pa1 f4'});

            let mountToRowTitle = html.mountTo(rowTitle);
            [nameTitle,descriptionTitle,dateCreatedTitle].map((el)=> {
                mountToRowTitle(el);
            });

            let mountToMatrix =html.mountTo(dynamic[0]);
            mountToMatrix(rowTitle);

            for(let row in data)
            {
                let row_data = data[row];
                let new_tr = html.create('tr',{className:'stripe-dark'});
                new_tr.style.cursor = 'pointer';

                let addListenerToTr = html.addListenerTo(new_tr);

                let usersDatasetRowHandler = usersDatasetRowHandlerConstructor({
                    dependencies:obj,
                    data:row_data
                });
                addListenerToTr('click',usersDatasetRowHandler);

                let mountToTr =html.mountTo(new_tr);

                for(let key in row_data) {
                    if(key === 'id') continue;
                    let new_td = html.create('td',{textContent:row_data[key],className:'f4 w3 pa2'});
                    new_td.style.textAlign = "center";
                    mountToTr(new_td);
                }

                let mountToMatrix =html.mountTo(dynamic[0]);
                mountToMatrix(new_tr);
            }
        }

        else {
            let projectInfo = html.create('h3',{textContent:"You don\'t participate in a project right now.",className:'f4 bl pv2 bw2 pl2 light-yellow'});

            let mountToDiv =html.mountTo(static[0]);
            mountToDiv(projectInfo);
        }
    };

    return {init,update};
};
module.exports = usersMatrixConstructor;