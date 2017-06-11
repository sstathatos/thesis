let usersBttnCreateHandlerConstructor = (obj) =>{
    let {createProjectComponentConstructor} = obj;
    let usersBttnCreateHandler = () => {

        let createProjectComponent = createProjectComponentConstructor(obj);
        createProjectComponent.init();
    };
    return usersBttnCreateHandler;
};
module.exports =usersBttnCreateHandlerConstructor;