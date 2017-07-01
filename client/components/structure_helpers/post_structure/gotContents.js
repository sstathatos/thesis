
let gotContentsConstructor = (obj) => {
    let {html,trArrayHandlerConstructor} =obj;
    let gotContents = (err,contents) => {
        let {data,caller,dset_id} = contents;

        if (data) {
            caller.innerHTML = '';
            caller.className = 'fl w-100';
            let contents_table = html.create('table',{className:"f6 w-90 mw8 left pt2 pl3"});
            contents_table.cellSpacing = 0;

            let mountToTable = html.mountTo(contents_table);
            let new_tr = html.create('tr',{className:'stripe-dark'});
            let mountToTr = html.mountTo(new_tr);
            let path_th = html.create('th',{textContent:'Path',className:'pa1 f4'});
            let dims_th = html.create('th',{textContent:'# of dimentions',className:'pa1 f4'});
            let size_th = html.create('th',{textContent:'Size',className:'pa1 f4'});

            [path_th,dims_th,size_th].map((el)=> {
                mountToTr(el);
            });
            mountToTable(new_tr);

            for(let tr in data) {
                let tr_data = data[tr];
                if(tr_data['dimnumber'] === 1) continue; //change later?
                let new_tr = html.create('tr',{className:'stripe-dark'});
                new_tr.style.cursor = 'pointer';

                let mountToTr = html.mountTo(new_tr);
                let path_td = html.create('td',{textContent:tr_data['path'],className:'f4 w3 pa2'});
                path_td.style.textAlign = "center";

                let dims_td = html.create('td',{textContent:tr_data['dimnumber'],className:'f4 w3 pa2'});
                dims_td.style.textAlign = "center";

                let size_td = html.create('td',{textContent:tr_data['size'],className:'f4 w3 pa2'});
                size_td.style.textAlign = "center";

                let addListenerToTr =  html.addListenerTo(new_tr);

                let trArrayHandler = trArrayHandlerConstructor({
                    dset_id,
                    dependencies:obj,
                    data: tr_data
                });
                addListenerToTr('click',trArrayHandler);

                [path_td ,dims_td ,size_td].map((el)=> {
                    mountToTr(el);
                });
                mountToTable(new_tr);
            }

            let mountToCaller = html.mountTo(caller);
            mountToCaller(contents_table);
        }

    };
    return gotContents;
};

module.exports = gotContentsConstructor;