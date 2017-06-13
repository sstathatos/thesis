let usersBttnCreateHandlerConstructor = (obj) =>{
    let {createProjectComponentConstructor} = obj;
    let usersBttnCreateHandler = () => {

        document.getElementById('app').innerHTML = "";

        let createProjectComponent = createProjectComponentConstructor(obj);
        createProjectComponent.init();
    };
    return usersBttnCreateHandler;
};
module.exports =usersBttnCreateHandlerConstructor;