let html = require('./html');

let retrieveDataConstructor = require('./get_dataset/subComponents/retrieveDataConstructor');


let buttonComponentConstructor = ({app,id,path,get}) => {

    let {retrieveData} = retrieveDataConstructor({id,path,get});

    let curr_state = [];

    let data_obj = {
        dim3Value:0,dim1:1,dim2:2
    };

    let button_names = ['init','up','down','left','right'];

    let buttons =  button_names.map((but) =>{
        let button_func = () =>{
            let button = html.create('button',{textContent:but});
            html.mountTo(app)(button);
            let listenerToButton = html.addListenerTo(button);

            listenerToButton('click',() => getData(but));
        };
        return button_func;
    }) ;

    let getData = (direction) => {
        data_obj['direction'] = direction;
        let names= ['xstart','xend','ystart','yend'];

        if (direction === 'init') {

            for(let i=0;i<names.length;i++) {

                data_obj[names[i]] = 0;
            }
            console.log(data_obj);
            retrieveData(data_obj)((err,data)=> {
                curr_state=data['current_array_edge_points'];
                console.log(curr_state);
            });
        }

        else {

            for(let i=0;i<names.length;i++) {
                data_obj[names[i]] = curr_state[i];
            }
            console.log(data_obj);

            retrieveData(data_obj)((err,data)=> {
                curr_state=data['current_array_edge_points'];
                console.log(curr_state);
            });
        }
    };

    return {buttonInit:buttons[0],buttonUp:buttons[1],
        buttonDown:buttons[2],buttonRight:buttons[3],buttonLeft:buttons[4]};

};
module.exports = buttonComponentConstructor;


