
let usersMatrixConstructor = (obj) => {
    let {app,html,usersDatasetRowHandlerConstructor} = obj;
    let init = () => {
        let matrixDiv = html.create('div');

        let projectInfo = html.create('p',{textContent:"Projects: "});
        let matrixEl = html.create('table');
        let rowTitle = html.create('tr');
        let nameTitle = html.create('th',{textContent:'Name'});
        let descriptionTitle = html.create('th',{textContent:'Description'});
        let dateCreatedTitle = html.create('th',{textContent:'Date created'});

        let mountToRowTitle = html.mountTo(rowTitle);
        [nameTitle,descriptionTitle,dateCreatedTitle].map((el)=> {
            mountToRowTitle(el);
        });

        let mountToMatrix =html.mountTo(matrixEl);
        mountToMatrix(rowTitle);

        let mountToDiv = html.mountTo(matrixDiv);
        [projectInfo,matrixEl].map((el) => {
            mountToDiv(el);
        });

        let mountToApp = html.mountTo(app);
        mountToApp(matrixDiv);

        return {dynamic:[matrixEl],static:[]};
    };

    let update = (init_contents) => {
        let {projects,dynamic} =init_contents;
        let data=projects[0];

        console.log(data);

        for(let row in data)
        {
            let row_data = data[row];
            let new_tr = html.create('tr');
            let addListenerToTr = html.addListenerTo(new_tr);

            let usersDatasetRowHandler = usersDatasetRowHandlerConstructor({
                dependencies:obj,
                data:row_data
            });
            addListenerToTr('click',usersDatasetRowHandler);

            let mountToTr =html.mountTo(new_tr);

            for(let key in row_data) {
                if(key === 'id') continue;
                let new_td = html.create('td',{textContent:row_data[key]});
                mountToTr(new_td);
            }

            let mountToMatrix =html.mountTo(dynamic[0]);
            mountToMatrix(new_tr);
        }
    };

    return {init,update};
};
module.exports = usersMatrixConstructor;