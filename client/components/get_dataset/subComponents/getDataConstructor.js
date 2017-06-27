let getDataConstructor = (obj) => {

    let {dependencies,retrieveData} = obj;
    let {getDatasetGridComponentConstructor} = dependencies;

    let getDataGridComponent = getDatasetGridComponentConstructor(dependencies);

    let curr_state = [];

    let getData = (button_obj,datasetGridEls) => {
        let data_obj = {
        };

        data_obj['direction'] = button_obj.direction;
        data_obj['dim1'] = button_obj.input1.value;
        data_obj['dim2'] = button_obj.input2.value;
        if(button_obj['input3'])    data_obj['dim3Value'] = button_obj.input3.value;
        let names= ['xstart','xend','ystart','yend'];

        if (button_obj.direction === 'init') {

            for(let i=0;i<names.length;i++) {

                data_obj[names[i]] = 0;
            }

            retrieveData(data_obj)((err,data)=> {
                curr_state=data['current_array_edge_points'];

                getDataGridComponent.update({datasetGridEls,data});
            });
        }

        else {

            for(let i=0;i<names.length;i++) {
                data_obj[names[i]] = curr_state[i];
            }

            retrieveData(data_obj)((err,data)=> {
                curr_state=data['current_array_edge_points'];

                getDataGridComponent.update({datasetGridEls,data});
            });
        }
    };

    return getData;
};

module.exports = getDataConstructor;