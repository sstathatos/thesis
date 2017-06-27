let getPlotComponentConstructor = (obj) => {
    let {dependencies,id} = obj;
    let {getPlotInfoComponentConstructor,errorHandler,
        getPlotDataComponentConstructor,getPlotDiagramComponentConstructor} = dependencies;

    let getPlotInfoComponent = getPlotInfoComponentConstructor(dependencies);
    let getPlotDataComponent = getPlotDataComponentConstructor({id,dependencies});
    let getPlotDiagramComponent = getPlotDiagramComponentConstructor({id,dependencies});

    let init = () => {
        document.getElementById('BackToProjectButton').style.display='initial';

        return {
            infoEls:getPlotInfoComponent.init(),
            diagramEls:getPlotDiagramComponent.init()
        }
    };

    let update = (obj) => {
        let {infoEls,diagramEls} =obj;
        let init_obj = {direction:'init',currystart:0,curryend:0,zoomstart:0,zoomend:0};
        getPlotDataComponent.getData(init_obj)((err,body) => {
            let {title,description,data,plot_metadata} = body;
            getPlotInfoComponent.update({title,description,infoEls});
            getPlotDiagramComponent.update({data,plot_metadata,diagramEls});
        });
    };

    return {init,update};

};
module.exports = getPlotComponentConstructor;