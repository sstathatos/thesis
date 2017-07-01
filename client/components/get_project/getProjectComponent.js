let getProjectComponentConstructor = (obj) => {
    let {id,dependencies} = obj;
    store.setItem('project_id',id);
    document.getElementById('BackToProjectButton').style.display='none';

    let {getProjectInfoComponentConstructor,
        getProjectDataComponentConstructor,
        getProjectDatasetComponentConstructor,
        getProjectPostComponentConstructor} = dependencies;

    let getProjectInfoComponent = getProjectInfoComponentConstructor(dependencies);
    let getProjectDataComponent = getProjectDataComponentConstructor(dependencies);

    let getProjectDatasetComponent = getProjectDatasetComponentConstructor(dependencies);

    let getProjectPostComponent = getProjectPostComponentConstructor(dependencies);


    let init = () => {
        return {
            infoEls:getProjectInfoComponent.init(),
            datasetEls:getProjectDatasetComponent.init(),
            postEls: getProjectPostComponent.init()
        }
    };

    let update = (obj) => {
        let {infoEls,datasetEls,postEls} =obj;
        getProjectDataComponent.getData((err,body) => {

            let {name,description,date,dsets,post_parents} = body;
            getProjectInfoComponent.update({name,description,date,infoEls});
            getProjectDatasetComponent.update({dsets,datasetEls});

            getProjectPostComponent.update({post_parents,postEls,dsets,datasetEls});

        });
    };

    return {init,update};

};
module.exports = getProjectComponentConstructor;