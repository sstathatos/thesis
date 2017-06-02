let app = document.getElementById('app');
let {get,post,put,del} = require('xhr');
let html = require('./components/html');

let loginComponentConstructor = require('./components/login/loginComponent');
let loginHandlerConstructor =require('./components/login/loginHandler');

let registerComponentConstructor = require('./components/register/registerComponent');
let registerHandlerConstructor = require('./components/register/registerHandler');

let usersComponentConstructor = require('./components/users/usersComponent');
let isLoggedInConstructor = require('./components/users/isLoggedIn');
let usersButtonCreateHandlerConstructor = require('./components/users/usersButtonCreateHandler');

let errorHandler =console.log;


let isLoggedIn = isLoggedInConstructor(errorHandler);
let loginComponent = loginComponentConstructor({app, post,loginHandlerConstructor,errorHandler,isLoggedIn});
loginComponent.init();

let registerComponent = registerComponentConstructor({app,post,registerHandlerConstructor});
registerComponent.init();

let usersComponent = usersComponentConstructor({app,get,id:'5931b0a86b3bc32dee7dbc8c',errorHandler,usersButtonCreateHandlerConstructor});
usersComponent.update(usersComponent.init());

