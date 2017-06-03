let app = document.getElementById('app');
let {get,post,put,del} = require('xhr');
let html = require('./components/html');

// let loginComponentConstructor = require('./components/login/loginComponent');
// let loginHandlerConstructor =require('./components/login/loginHandler');
// let isLoggedInConstructor = require('./components/login/isLoggedIn');
//
// let registerComponentConstructor = require('./components/register/registerComponent');
// let registerHandlerConstructor = require('./components/register/registerHandler');
//
// let usersComponentConstructor = require('./components/get_user_profile/usersComponent');
//
let createProjectComponentConstructor = require('./components/get_create_project/createProjectComponent');
let submitButtonProjectHandlerConstructor = require('./components/get_create_project/submitProjectButtonHandler');

let createDatasetComponentConstructor =  require('./components/get_create_dataset/createDatasetComponent');

let submitButtonDatasetHandlerConstructor = require('./components/get_create_dataset/submitDatasetButtonHandler');
let errorHandler =console.log;


// let isLoggedIn = isLoggedInConstructor(errorHandler);
// let loginComponent = loginComponentConstructor({app, post,loginHandlerConstructor,errorHandler,isLoggedIn});
// loginComponent.init();
//
// let registerComponent = registerComponentConstructor({app,post,registerHandlerConstructor});
// registerComponent.init();
//
// let usersComponent = usersComponentConstructor({app,get,id:'5931b0a86b3bc32dee7dbc8c',errorHandler});
// usersComponent.update(usersComponent.init());
//
let createProjectComponent = createProjectComponentConstructor({app,post,submitButtonProjectHandlerConstructor});
createProjectComponent.init();

let createDatasetComponent =createDatasetComponentConstructor({app,post,submitButtonDatasetHandlerConstructor});
createDatasetComponent.init();

