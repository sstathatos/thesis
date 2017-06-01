let html = require('./html');

let userProfileConstructor = (obj) => {
    let {app,get,id} = obj;

    let retrieveUser = (id,cb) => {
        get({uri:`/users/?_id=${id}`}, (err,response,body) => {
            cb({err,response,body:JSON.parse(body)});
        })
    };
    let init = () => {
        let userdata=html.create('div');

        let p1 = html.create('p',{textContent:``});
        let p2 = html.create('p',{textContent:``});
        let p3 = html.create('p',{textContent:``});

        let mountToUserdata = html.mountTo(userdata);
        [p1,p2,p3].map((el) => {
            mountToUserdata(el);
        });

        html.mountTo(app)(userdata);

        return {p1,p2,p3,userdata}
    };

    let update = (obj) => {
        let {username,email,name,data} = obj;
        console.log(typeof data);
        username.textContent = `${data.data.username} Profile`;
        email.textContent = `Email: ${data.data.email}`;
        name.textContent = `Name: ${data.data.name}`;

        let mpla = [username,email,name];












        // mpla.map((el)=> {
        //     console.log([mpla[0]]);
        //     el.textContent=data.data[el];
        // })
    };

    return {retrieveUser,init,update};
};
module.exports =userProfileConstructor;