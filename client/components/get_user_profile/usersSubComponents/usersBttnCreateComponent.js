let html = require('../../html');

let usersBttnCreateConstructor = (obj) => {
    let {app,usersBttnCreateHandlerConstructor} = obj;

    let init = () => {
        let buttonDivEl = html.create('div');

        let buttonText =html.create('p',{textContent:'Create Project: '});
        let buttonEl = html.create('button', {textContent:'Create'});

        let addListenerToButton = html.addListenerTo(buttonEl);
        let usersBttnCreateHandler = usersBttnCreateHandlerConstructor();
        addListenerToButton('click',usersBttnCreateHandler);

        let mountToDiv = html.mountTo(buttonDivEl);
        [buttonText,buttonEl].map((el) => {
            mountToDiv(el);
        });
        html.mountTo(app)(buttonDivEl);

        return {static:[buttonDivEl,buttonText,buttonEl],dynamic:[]};
    };

    return {init};
};
module.exports = usersBttnCreateConstructor;