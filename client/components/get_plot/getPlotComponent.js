let getPlotInfoComponentConstructor = require('./subComponents/getPlotInfoComponent');
let getPlotDataComponentConstructor = require('./subComponents/getPlotDataComponent');
let getPlotDiagramComponentConstructor = require('./subComponents/getPlotDiagramComponent');

let getPlotComponentConstructor = (obj) => {
    let {app,get,id} = obj;

    let getPlotInfoComponent = getPlotInfoComponentConstructor({app});
    let getPlotDataComponent = getPlotDataComponentConstructor(id,get);
    let getPlotDiagramComponent = getPlotDiagramComponentConstructor({app});

    let init = () => {
        return {
            infoEls:getPlotInfoComponent.init(),
            diagramEls:getPlotDiagramComponent.init()
        }
    };

    let update = (obj) => {
        let {infoEls,diagramEls} =obj;
        getPlotDataComponent.getData((err,body) => {
            let {title,description,data,plot_metadata} = body;
            getPlotInfoComponent.update({title,description,infoEls});
            getPlotDiagramComponent.update({data,plot_metadata,diagramEls});
        });
    };

    return {init,update};

};
module.exports = getPlotComponentConstructor;