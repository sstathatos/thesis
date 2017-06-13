let usersDatasetRowHandlerConstructor = (obj) => {

    let {dependencies,data} = obj;
    let {getProjectComponentConstructor} = dependencies;
    let usersDatasetRowHandler = () => {

        document.getElementById('app').innerHTML = "";
        let getProjectComponent = getProjectComponentConstructor({id:data.id,dependencies});
        getProjectComponent.update(getProjectComponent.init());
    };

    return usersDatasetRowHandler;

};
module.exports = usersDatasetRowHandlerConstructor;