let getDatasetGridComponentConstructor = (obj) => {

    let {html,css} =  obj;

    let init = (grid_div_el,button_obj,getData) => {
        let grid_table_el = html.create('table',{className:"f6 w-60 mw8 left"});
        grid_table_el.cellSpacing = 0;


        html.mountTo(grid_div_el)(grid_table_el);

        let button_names = ['up','down','left','right'];

        let button_div = html.create('div',{className:'pt3'});


        let  buttons =button_names.map((but) =>{
            let button = html.create('button',{textContent:but,disabled:'true',className:`${css.button}`});
            html.mountTo(button_div)(button);
            let listenerToButton = html.addListenerTo(button);

            button_obj['direction'] = but;

            listenerToButton('click',() =>{

                button_obj['direction'] = but;
                getData(button_obj,{static:[grid_div_el],dynamic:[grid_table_el,buttons]});

            });

            return button;
        }) ;

        html.mountTo(grid_div_el)(button_div);

        return {static:[grid_div_el],dynamic:[grid_table_el,buttons]};
    };

    let update = (obj) => {
        let {datasetGridEls,data} = obj;
        let array = data['current_array'];
        datasetGridEls['dynamic'][0].innerHTML = "";

        datasetGridEls['dynamic'][0].className ="f6 w-60 mw8 ba b--solid bw2 b--green left ";

        console.log(data);
        let mountToTable = html.mountTo(datasetGridEls['dynamic'][0]);

        let buttons = datasetGridEls['dynamic'][1];
        let cur = data['current_array_edge_points'];
        let dimlimits = data['shape_of_array'];
        if(cur[0] <= 0) buttons[2].disabled = true;
        else buttons[2].disabled = false;

        if(cur[1] >= dimlimits[0]) buttons[3].disabled = true;
        else buttons[3].disabled = false;

        if(cur[2] <= 0) buttons[1].disabled = true;
        else buttons[1].disabled = false;

        if(cur[3] >= dimlimits[1]) buttons[0].disabled = true;
        else buttons[0].disabled = false;


        for (let i in array) {

            let row =array[i];
            let datasetgrid_tr_el = html.create('tr',{className:'stripe-dark'});
            let mountToGrid = html.mountTo(datasetgrid_tr_el);

            for(let j in row) {
                let datasetgrid_td_el = html.create('td',{textContent:row[j],className:'pa1 f4'});
                mountToGrid(datasetgrid_td_el);
            }

            mountToTable(datasetgrid_tr_el);
        }

        return {static:[],dynamic:[datasetGridEls]};
    };

    return {init,update};

};
module.exports = getDatasetGridComponentConstructor;