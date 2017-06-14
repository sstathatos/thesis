
let {get,post,put,del} = require('xhr');

const dependencies = Object.freeze({
    app: document.getElementById('app'),
    top: document.getElementById('top'),
    get: get,
    post: post,
    put: put,
    del: del,
    html: require('./components/html'),

    postStructurer: require('./components/structure_helpers/post_structure/postStructurer'),
    uniqueCheckboxHandlerConstructor: require('./components/get_create_post/subComponents/uniqueCheckboxHandler'),
    getPlotButtonHandlerConstructor : require('./components/structure_helpers/post_structure/getPlotButtonHandler'),
    getDatasetButtonHandlerConstructor : require('./components/structure_helpers/post_structure/getDatasetButtonHandler'),
    trArrayHandlerConstructor: require('./components/structure_helpers/post_structure/trArrayHandler'),

    loginComponentConstructor: require('./components/login/loginComponent'),
    loginHandlerConstructor: require('./components/login/loginHandler'),
    isLoggedInConstructor: require('./components/login/isLoggedIn'),

    registerComponentConstructor: require('./components/login/register/registerComponent'),
    registerHandlerConstructor: require('./components/login/register/registerHandler'),

    navigationComponentConstructor : require('./components/navigation/navigationComponent'),
    homeHandlerConstructor : require('./components/navigation/homeHandler'),
    logoutHandlerConstructor : require('./components/navigation/logoutHandler'),

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
    createPostFormComponentConstructor : require('./components/get_create_post/subComponents/createPostFormComponent'),
    createPostListComponentConstructor : require('./components/get_create_post/subComponents/createPostListComponent'),
    createPostSaveButtonComponentConstructor : require('./components/get_create_post/subComponents/createPostSaveButtonComponent'),
    createPostAddPlotComponentConstructor : require('./components/get_create_post/subComponents/createPostAddPlotComponent'),
    createPostAddPlotButtonHandlerConstructor : require('./components/get_create_post/subComponents/createPostAddPlotButtonHandler'),
    createPostGetDatasetListConstructor : require('./components/get_create_post/subComponents/createPostGetDatasetListComponent'),
    createPostSaveButtonHandlerConstructor : require('./components/get_create_post/subComponents/createPostSaveButtonHandler'),

    getPlotComponentConstructor: require('./components/get_plot/getPlotComponent'),

    getProjectComponentConstructor: require('./components/get_project/getProjectComponent'),
    getProjectCreateDatasetHandlerConstructor: require('./components/get_project/subComponents/datasetComponents/getProjectCreateDatasetHandler'),
    getProjectInfoComponentConstructor : require('./components/get_project/subComponents/getProjectInfoComponent'),
    getProjectDataComponentConstructor : require('./components/get_project/getProjectDataComponent'),
    getProjectDatasetComponentConstructor :require('./components/get_project/subComponents/datasetComponents/getProjectDatasetComponent'),
    getDatasetContentsHandlerConstructor :  require('./components/get_project/subComponents/datasetComponents/getDatasetContentsHandler'),
    gotContentsConstructor : require('./components/structure_helpers/post_structure/gotContents'),
    getProjectPostComponentConstructor : require('./components/get_project/subComponents/postComponents/getProjectPostComponent'),
    getProjectCreatePostHandlerConstructor : require('./components/get_project/subComponents/postComponents/getProjectCreatePostHandler'),
    fullPostButtonHandlerConstructor : require('./components/get_project/subComponents/postComponents/fullPostButtonHandler'),

    getPostComponentConstructor: require('./components/get_post/getPostComponent'),
    createResponseButtonHandlerConstructor: require('./components/get_post/createResponseButtonHandler'),


    createPlotComponentConstructor :require('./components/get_create_plot/createPlotComponent'),
    createPlotInfoComponentConstructor :require('./components/get_create_plot/subComponents/createPlotInfoComponent'),
    createPlotDatasetComponentConstructor : require('./components/get_create_plot/subComponents/createPlotDatasetComponent'),
    getDatasetContentsComponentConstructor : require('./components/get_create_plot/getDatasetContentsComponent'),

    getDatasetComponentConstructor : require('./components/get_dataset/getDatasetComponent'),
    getDatasetGridComponentConstructor : require('./components/get_dataset/subComponents/getDatasetGridComponent'),

errorHandler :console.log,
    store : localStorage
});

module.exports =  dependencies;