let userInfoConstructor = (obj) => {
    let {app,html} = obj;

    let init = () => {
        let userDataEl=html.create('div');

        let p1 = html.create('p',{textContent:``});
        let p2 = html.create('p',{textContent:``});
        let p3 = html.create('p',{textContent:``});
        let p1name = html.create('p',{textContent:`Profile Username: `});
        let p2name = html.create('p',{textContent:`Email: `});
        let p3name = html.create('p',{textContent:`Name: `});

        let mountToUserdata = html.mountTo(userDataEl);
        [p1name,p1,p2name,p2,p3name,p3].map((el) => {
            mountToUserdata(el);
        });

        html.mountTo(app)(userDataEl);
        return {dynamic :[p1,p2,p3],static:[userDataEl,p1name,p2name,p3name]}
    };

    let update = (obj) => {
        let {username,email,name,infoEl} = obj;
        infoEl[0].textContent = username;
        infoEl[1].textContent = email;
        infoEl[2].textContent = name;
    };

    return {init,update};
};
module.exports =userInfoConstructor;