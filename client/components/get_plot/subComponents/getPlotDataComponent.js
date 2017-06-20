let getPlotDataComponentConstructor = (obj) => {
    let {id,dependencies} = obj;
    let {get} = dependencies;
    let getData = (obj) => {

        let {direction,currystart,curryend,zoomstart,zoomend} = obj;

        return (cb) => {
            get({uri:`/plots/?_id=${id}&direction=${direction}&currystart=${currystart}&curryend=${curryend}&zoomstart=${zoomstart}&zoomend=${zoomend}`}, (err,response,body) => {
                if (err) return cb(new Error(err));
                return cb(null, JSON.parse(body).data[0]);
            });
        };
    };

    return {getData};
};
module.exports = getPlotDataComponentConstructor;