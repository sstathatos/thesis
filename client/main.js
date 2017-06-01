let app = document.getElementById('app');
let {get,post,put,del} = require('xhr');

let loginComponentConstructor = require('./components/loginComponent');
let registerComponentConstructor = require('./components/registerComponent');
let userProfileComponentConstructor = require('./components/userProfileComponent');

let html = require('./components/html');

let loginComponent = loginComponentConstructor({app, post});
let registerComponent = registerComponentConstructor({app,post});
let userProfileComponent = userProfileComponentConstructor({app,get});

// loginComponent.init();
// registerComponent.init();
let {p1,p2,p3,userdata} = userProfileComponent.init();
userProfileComponent.retrieveUser('59286b77cf84fc3f0ff45a66',({err,response,body}) => {
    let keik = {username:p1,email:p2,name:p3,data:body};
    userProfileComponent.update(keik);
});







// window.loginComponent = loginComponent;
