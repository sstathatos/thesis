
let errorHandler =  (obj) => {
    let {err,response} =  obj;

    if(err !== null) {

        let msg;
        switch(err) {

            case 'invalid login':
                msg = 'Only ascii characters are allowed.';
                console.log(msg);
                break;

            case 'empty fields':
                msg = 'All fields are required.';
                console.log(msg);
                break;

            case 'empty field':
                msg = 'Field is required.';
                console.log(msg);
                break;

            case 'empty file':
                msg = 'File is required.';
                console.log(msg);
                break;

            case 'invalid email':
                msg = 'Email is invalid';
                console.log(msg);
                break;

            default:
                throw new Error(err);

        }

        messageAnimation(msg);
    }

    else if(response.statusCode === 200) {
        return false;
    }

    else if(response.statusCode === 404) {
        console.log(response);
        callErrorComponent(response.statusCode);
    }

    else if(response.statusCode === 422) {
        console.log(response.body);
        messageAnimation(response.body);
        return true;
    }

    else if(response.statusCode === 500) {
        console.log(response.body);
        callErrorComponent(response.statusCode);
        return true;
    }

    else {
        console.log('Unhandled Case.');
        return true;
    }

};

let callErrorComponent = (code) => {
    let dependencies = require('../../dependencies');
    let errorComponent = dependencies.errorComponentConstructor(dependencies);
    errorComponent.init(code);
};

let messageAnimation = (msg) => {
    document.getElementById('message').textContent = msg;
    let el = document.getElementById('messagediv').style;

    el.display = 'inline';
    setTimeout(()=> {
        let id = setInterval(function() {
            let op = Number(el.opacity);
            el.opacity = String(op - 0.1);
            if (op === 0) {
                el.display = 'none';
                el.opacity = '1.0';
                clearInterval(id);
            }
        }, 50);

    },3000);
};
module.exports =  errorHandler;