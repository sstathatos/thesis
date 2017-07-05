let createPlotPreviewComponentConstructor = (obj) => {
    let {dependencies,dim1,dim2,plot_type,dim2Value,dim3Value,getplot_diagram_el,dataset_id,path} = obj;
    let {PlotConstructor,get,errorHandler,DataTransformConstructor} = dependencies;

    let {transformData} = DataTransformConstructor();

    let {updateChart} = PlotConstructor();

    let init = () => {

        let obj = `/preview/?_id=${dataset_id}&path=${path}&direction=init&currystart=0&curryend=0&zoomstart=0&zoomend=0&dim1=${dim1()}&dim2=${dim2()}&dim2Value=${dim2Value()}`;
        if(dim3Value) obj = `${obj}&dim3Value=${dim3Value()}`;

        get({uri:obj}, (err,response,body) => {
            if(errorHandler({err,response})) {
                return;
            }
            let data = JSON.parse(body).data;


            console.log(data);

            document.getElementsByClassName('c3')[0].className += ' bg-white black  ba b-solid bw2 b--green br2';


            let arr =transformData(data);

            updateChart(getplot_diagram_el,arr,{plot_type:plot_type()},()=>{

            });

        });

        return {dynamic :[],static:[]}
    };


    return {init};
};
module.exports =createPlotPreviewComponentConstructor;