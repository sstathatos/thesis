let usersDatasetRowHandlerConstructor = (obj) => {

    let {dependencies,data} = obj;
    let {get,getProjectComponentConstructor} = dependencies;
    let usersDatasetRowHandler = () => {
        console.log(data);

        let getProjectComponent = getProjectComponentConstructor({id:data.id,dependencies});
        getProjectComponent.update(getProjectComponent.init());
    };

    return usersDatasetRowHandler;

};
module.exports = usersDatasetRowHandlerConstructor;