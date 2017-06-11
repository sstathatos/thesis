let {get,post,put,del} = require('xhr');

const dependencies = Object.freeze({
    app: document.getElementById('app'),
    get: get,
    post: post,
    put: put,
    del: del,
    html: require('./components/html'),

    postStructurer: require('./components/structure_helpers/postStructurer'),

    loginComponentConstructor: require('./components/login/loginComponent'),
    loginHandlerConstructor: require('./components/login/loginHandler'),
    isLoggedInConstructor: require('./components/login/isLoggedIn'),

    registerComponentConstructor: require('./components/login/register/registerComponent'),
    registerHandlerConstructor: require('./components/login/register/registerHandler'),

    usersComponentConstructor: require('./components/get_user_profile/usersComponent'),
    usersInfoComponentConstructor : require('./components/get_user_profile/usersSubComponents/usersInfoComponent'),
    usersMatrixComponentConstructor : require('./components/get_user_profile/usersSubComponents/usersMatrixComponent'),
    usersBttnCreateComponentConstructor : require('./components/get_user_profile/usersSubComponents/usersBttnCreateComponent'),
    usersGetDataComponentConstructor : require('./components/get_user_profile/usersSubComponents/usersGetDataComponent'),
    usersBttnCreateHandlerConstructor : require('./components/get_user_profile/usersSubComponents/usersBttnCreateHandler'),
    usersDatasetRowHandlerConstructor: require('./components/get_user_profile/usersSubComponents/usersDatasetRowHandler'),

    createProjectComponentConstructor: require('./components/get_create_project/createProjectComponent'),
    submitButtonProjectHandlerConstructor: require('./components/get_create_project/submitProjectButtonHandler'),

    createDatasetComponentConstructor: require('./components/get_create_dataset/createDatasetComponent'),
    submitButtonDatasetHandlerConstructor : require('./components/get_create_dataset/submitDatasetButtonHandler'),

    createPostComponentConstructor: require('./components/get_create_post/createPostComponent'),

    getPlotComponentConstructor: require('./components/get_plot/getPlotComponent'),

    getProjectComponentConstructor: require('./components/get_project/getProjectComponent'),
    getProjectCreateDatasetHandlerConstructor: require('./components/get_project/subComponents/datasetComponents/getProjectCreateDatasetHandler'),
    getProjectInfoComponentConstructor : require('./components/get_project/subComponents/getProjectInfoComponent'),
    getProjectDataComponentConstructor : require('./components/get_project/getProjectDataComponent'),
    getProjectDatasetComponentConstructor :require('./components/get_project/subComponents/datasetComponents/getProjectDatasetComponent'),
    getDatasetContentsHandlerConstructor :  require('./components/get_project/subComponents/datasetComponents/getDatasetContentsHandler'),
    gotContentsConstructor : require('./components/get_project/subComponents/datasetComponents/gotContents'),
    getProjectPostComponentConstructor : require('./components/get_project/subComponents/postComponents/getProjectPostComponent'),
    getProjectCreatePostHandlerConstructor : require('./components/get_project/subComponents/postComponents/getProjectCreatePostHandler'),
    fullPostButtonHandlerConstructor : require('./components/get_project/subComponents/postComponents/fullPostButtonHandler'),

    getPostComponentConstructor: require('./components/get_post/getPostComponent'),

    createPlotComponentConstructor :require('./components/get_create_plot/createPlotComponent'),

    getDatasetComponentConstructor : require('./components/get_dataset/getDatasetComponent'),
    errorHandler :console.log,
    store : localStorage
});


window.store = dependencies.store;
store.setItem('username',undefined);

let loginComponent = dependencies.loginComponentConstructor(dependencies);
loginComponent.init();

//USED ID EXAMPLE

//
// let createDatasetComponent =createDatasetComponentConstructor({app,post,submitButtonDatasetHandlerConstructor});
// createDatasetComponent.init();

//USED ID EXAMPLE
// let createPostComponent = createPostComponentConstructor({app,get,id:'59356d2584ca9e2539b49b93',post,errorHandler});
// createPostComponent.update(createPostComponent.init());

// let getPlotComponent = getPlotComponentConstructor({app,get,id:'59356d2784ca9e2539b49bad'});
// getPlotComponent.update(getPlotComponent.init());

// let getProjectComponent = getProjectComponentConstructor({app,get,post,id:'59356d2584ca9e2539b49b93',postStructurer,errorHandler});
// getProjectComponent.update(getProjectComponent.init());


// let getPostComponent = getPostComponentConstructor({app,get,post,id:'59356d2684ca9e2539b49b97'});
// getPostComponent.update(getPostComponent.init());

// let createPlotComponent = createPlotComponentConstructor({app,get,post,id:'59356d2684ca9e2539b49b95',post_id:'59356d2684ca9e2539b49b97'});
// createPlotComponent.update(createPlotComponent.init());

// let getDatasetComponent = getDatasetComponentConstructor({app,get,id:'59356d2684ca9e2539b49b95',path:'d3dset'});
// getDatasetComponent.init();

// let testComponentConstructor =  require('./components/testComponent');
// let testComponent = testComponentConstructor({app,get,id:'59356d2684ca9e2539b49b95',path:'d3dset'});
//
// testComponent.buttonInit();
// testComponent.buttonUp();
// testComponent.buttonDown();
// testComponent.buttonLeft();
// testComponent.buttonRight();

// setTimeout(function(){ testComponent.change_something('15'); }, 3000);






















