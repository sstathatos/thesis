let html = require('../../html');

let getPlotDataComponentConstructor = (id,get) => {

    let getData = (cb) => {
        get({uri:`/plots/?_id=${id}&direction=init&currystart=0&curryend=0&zoomstart=0&zoomend=0`}, (err,response,body) => {
            if (err) return cb(new Error(err));
            return cb(null, JSON.parse(body).data[0]);
        });
    };

    return {getData};
};
module.exports = getPlotDataComponentConstructor;