let getDatasetOptionsComponentConstructor = require('./subComponents/getDatasetOptionsComponent');
let getDatasetGridComponentConstructor = require('./subComponents/getDatasetGridComponent');
let getDatasetConstrolComponentConstructor = require('./subComponents/getDatasetControlComponent');

let buttonHandlerConstructor = require('./subComponents/buttonHandler');

let getDatasetComponentConstructor = (obj) => {
    let {app,get,id,path} = obj;

    let {buttonHandler} = buttonHandlerConstructor({id,path,get});
    let getDatasetOptionsComponent = getDatasetOptionsComponentConstructor({app,buttonHandler});
    let getDataGridComponent = getDatasetGridComponentConstructor({app});
    let getDatasetControlComponent = getDatasetConstrolComponentConstructor({app});

    let init = () => {
        return {
            optionsEls:getDatasetOptionsComponent.init(),
            dataGridEls:getDataGridComponent.init(),
            controlEls: getDatasetControlComponent.init()
        }
    };

    let update = (obj) => {
        let {dataGridEls} =obj;
        // getDataComponent.getData({direction:'init',xstart:0,xend:0,ystart:0,yend:0,dim3Value:0})((err,body) => {
        //     console.log(body);
        // });
    };

    return {init,update};

};
module.exports = getDatasetComponentConstructor;