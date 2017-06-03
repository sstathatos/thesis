let html = require('../../html');

let usersGetDataConstructor = (id,get) => {

    let getData = (cb) => {
        get({uri:`/users/?_id=${id}`}, (err,response,body) => {
            if (err) return cb(new Error(err));
            try {
                return cb(null,JSON.parse(body).data);
            }
            catch(e) {
                return cb(new Error(e));
            }
        })
    };

    return {getData};
};
module.exports = usersGetDataConstructor;