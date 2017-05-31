let app = document.getElementById('app');
let {get,post,put,del} = require('xhr');

let loginComponentConstructor = require('./components/loginComponent');
let registerComponentConstructor = require('./components/registerComponent');
let html = require('./components/html');

html.mount(document.getElementById('app'))('div',{'id':'a','class':'asdf'});
let loginComponent = loginComponentConstructor({app, post});
let registerComponent = registerComponentConstructor({app,post});

loginComponent.mount();
registerComponent.mount();






// window.loginComponent = loginComponent;
