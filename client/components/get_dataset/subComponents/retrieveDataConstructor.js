let retrieveDataConstructor = ({id,path,dependencies}) => {
    let {get,errorHandler} = dependencies;

    let retrieveData = (obj) => {
        let {direction,xstart,xend,ystart,yend,dim3Value,dim1,dim2,cnt} = obj;
        return (cb) => {

            let my_obj = `/datasetgrid/?_id=${id}&path=${path}&direction=${direction}&xstart=${xstart}&xend=${xend}&ystart=${ystart}&yend=${yend}&dim1=${dim1}&dim2=${dim2}`;

            if (dim3Value) my_obj = `${my_obj}&dim3Value=${dim3Value}`;
            get({uri:my_obj}, (err, response, body) => {
                if(errorHandler({err,response})) {
                    return;
                }
                return cb(null, JSON.parse(body).data);
            });
        };
    };

    return {retrieveData};
};
module.exports = retrieveDataConstructor;