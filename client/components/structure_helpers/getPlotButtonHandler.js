
let getPlotButtonHandlerConstructor = (obj) => {

    let {get,plot_id} =obj;

    let getPlotButtonHandler = () => {
        console.log('must use state to continue');
        // get({uri:`/plots/?_id=${plot_id}`},(err,response,body) => {
        //     console.log(body);
        //     // if (err) return gotContents(new Error(err));
        //     //
        //     // return gotContents(null,{data:JSON.parse(body).data,caller:getproject_dataset_tr_el});
        // })
    };
    return getPlotButtonHandler;
};
module.exports = getPlotButtonHandlerConstructor;