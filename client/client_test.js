let config = {
    username : 'ken',
    password : 'ken',
    email : 'ken',
    name: 'ken'
};

let login_test = (dependencies) => {
    let loginComponent = dependencies.loginComponentConstructor(dependencies);
    let loginEls = loginComponent.init();

    console.assert(loginEls.static.length === 5,'Login Component did not show up correctly');
    let [div,button,username,password] = loginEls.static;

    console.assert(button.tagName === 'BUTTON','Button tag name is not correct');
    console.assert(username.tagName === 'INPUT','Input tag name is not correct');
    console.assert(password.tagName === 'INPUT','Input tag name is not correct');

    username.value = config.username;
    password.value = config.password;
    console.log(loginComponent);
    button.click();


};

let user_profile_test =  (dependencies) => {
    let usersComponent = dependencies.usersComponentConstructor(dependencies);
    let userprofileEls = usersComponent.init();
    setTimeout(() =>usersComponent.update(userprofileEls),0);

    console.assert(userprofileEls.usersInfoEl,'User Profile Component did not show up correctly');
    console.assert(userprofileEls.usersMatrixEl,'User Profile Component did not show up correctly');
    console.assert(userprofileEls.usersButtonEl,'User Profile Component did not show up correctly');

    console.log(userprofileEls.usersInfoEl.dynamic[0]);
    console.log(userprofileEls.usersInfoEl.dynamic[0].innerHTML);
    console.log(userprofileEls.usersInfoEl.dynamic[0].textContent);
    console.assert(userprofileEls.usersInfoEl.dynamic[0].innerHTML === config.username,'Wrong username showed up');
    console.assert(userprofileEls.usersInfoEl.dynamic[1].value === config.email,'Wrong email showed up');
    console.assert(userprofileEls.usersInfoEl.dynamic[2].value === config.name,'Wrong name showed up');

};

let run_test = (dependencies) => {
    window.store = dependencies.store;

    [
        login_test
    ].map((test) => test(dependencies));

};

module.exports =  run_test;