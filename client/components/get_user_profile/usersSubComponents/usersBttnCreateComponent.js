let usersBttnCreateConstructor = (obj) => {
    let {app,usersBttnCreateHandlerConstructor,html,css} = obj;

    let init = () => {
        let buttonDivEl = html.create('div',{className:'pt2 pl4'});

        let buttonText =html.create('h3',{textContent:'Create New Project',className:'f3 light-yellow'});
        let buttonEl = html.create('button', {textContent:'Create',className:css.button});

        let addListenerToButton = html.addListenerTo(buttonEl);
        let usersBttnCreateHandler = usersBttnCreateHandlerConstructor(obj);
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