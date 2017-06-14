
let gotContentsConstructor = (obj) => {
    let {errorHandler,html,trArrayHandlerConstructor} =obj;
    let gotContents = (err,contents) => {
        let {data,caller,dset_id} = contents;
        if (err) return errorHandler(new Error(err));
        caller.innerHTML = '';
        let contents_table = html.create('table');
        let mountToTable = html.mountTo(contents_table);
        let new_tr = html.create('tr');
        let mountToTr = html.mountTo(new_tr);
        let path_th = html.create('th',{textContent:'Path'});
        let dims_th = html.create('th',{textContent:'# of dimentions'});
        let size_th = html.create('th',{textContent:'Size'});

        [path_th,dims_th,size_th].map((el)=> {
            mountToTr(el);
        });
        mountToTable(new_tr);

        for(let tr in data) {
            let new_tr = html.create('tr');
            let tr_data = data[tr];
            let mountToTr = html.mountTo(new_tr);
            let path_td = html.create('td',{textContent:tr_data['path']});
            let dims_td = html.create('td',{textContent:tr_data['dimnumber']});
            let size_td = html.create('td',{textContent:tr_data['size']});

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
    };
    return gotContents;
};

module.exports = gotContentsConstructor;