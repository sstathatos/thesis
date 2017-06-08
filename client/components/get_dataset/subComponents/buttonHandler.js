let buttonHandlerConstructor = ({id,path,get}) => {

    let buttonHandler = (obj) => {
        let {direction,xstart,xend,ystart,yend,dim3Value,dim1,dim2} = obj;
        return (cb) => {
            get({uri:`/datasets/grid/?_id=${id}&path=${path}&direction=${direction}&xstart=${xstart}&xend=${xend}&ystart=${ystart}&yend=${yend}&dim1=${dim1}&dim2=${dim2}&dim3Value=${dim3Value}`}, (err, response, body) => {
                console.log(body);
                if (err) return cb(new Error(err));
                return cb(null, JSON.parse(body).data);
            });
        };
    };

    return {buttonHandler};
};
module.exports = buttonHandlerConstructor;