let errorHandler =  (obj) => {
    let {err,response} =  obj;

    if(err !== null) {

        switch(err) {

            case 'invalid login':
                console.log('Only ascii characters are allowed.');
                break;

            case 'empty fields':
                console.log('all fields are required.');
                break;

            case 'empty field':
                console.log('field is required.');
                break;

            case 'empty file':
                console.log('File is required.');
                break;

            case 'invalid email':
                console.log('email is invalid');
                break;

            default:
                throw new Error(err);

        }

    }

    else if(response.statusCode === 200) {
        return false;
    }

    else if(response.statusCode === 404) {
        console.log(response);
    }

    else if(response.statusCode === 422) {
        console.log(response.body);
        return true;
    }

    else if(response.statusCode === 500) {
        console.log(response.body);
        return true;
    }

    else {
        console.log('Unhandled Case');
        return true;
    }
};
module.exports =  errorHandler;