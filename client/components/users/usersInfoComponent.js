let html = require('../html');


// need to change, probably html.js...
let userInfoConstructor = (obj) => {
    let {app,get,id} = obj;

    let init = () => {
        let userDataEl=html.create('div');

        let p1 = html.create('p',{textContent:``});
        let p2 = html.create('p',{textContent:``});
        let p3 = html.create('p',{textContent:``});

        let mountToUserdata = html.mountTo(userDataEl);
        [p1,p2,p3].map((el) => {
            mountToUserdata(el);
        });

        html.mountTo(app)(userDataEl);
        return {dynamic :[p1,p2,p3],static:[userDataEl]}
    };

    let update = (obj) => {
        let {username,email,name,infoEl} = obj;
        let data = [`${username} Profile:`,`Email: ${email}`,`Name: ${name}`];

        for(let i=0; i<infoEl.length;i++) {
            infoEl[i].textContent = data[i];
        }
    };

    return {init,update};
};
module.exports =userInfoConstructor;