let userInfoConstructor = (obj) => {
    let {app,html} = obj;

    let init = () => {
        let userDataEl=html.create('div',{className:'pt2 pl4'});

        let p1 = html.create('h4',{textContent:``,className:'di pl2 f4'});
        let p2 = html.create('h4',{textContent:``,className:'di pl2 f4'});
        let p3 = html.create('h4',{textContent:``,className:'di pl2 f4 '});

        let profile_title = html.create('h4',{textContent:`User Profile`,className:'f3 light-yellow mt3 mb3'});

        let p1name = html.create('p',{textContent:`Username: `,className:'f4 pl3 di '});
        let p2name = html.create('p',{textContent:`Email: `,className:'f4 pl3 di'});
        let p3name = html.create('p',{textContent:`Name: `,className:'f4 pl3 di'});

        let username_div = html.create('div',{className:'w-100 pv2'});
        let mountToUsernameDiv = html.mountTo(username_div);
        [p1name,p1].map((el) => {
            mountToUsernameDiv(el);
        });

        let email_div = html.create('div',{className:'w-100 pv2'});
        let mountToEmailDiv = html.mountTo(email_div);
        [p2name,p2].map((el) => {
            mountToEmailDiv(el);
        });

        let name_div = html.create('div',{className:'w-100 pv2'});
        let mountToNameDiv = html.mountTo(name_div);
        [p3name,p3].map((el) => {
            mountToNameDiv(el);
        });


        let mountToUserdata = html.mountTo(userDataEl);
        [profile_title,username_div,email_div,name_div].map((el) => {
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