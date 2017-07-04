let errorComponentConstructor =  (obj) => {
    let {html,app} =  obj;

    let init = (code) => {

        app.innerHTML = '';
        let error_div=html.create('div',{className:'pt2 pl4 tc'});

        let error_code_el = html.create('h2',{textContent:`Error ${code}`,className:'f3 light-yellow'});

        let error_message_el = html.create('span',
            {textContent:`Something went wrong. We are sorry for the inconvenience.`,className:'f3 light-yellow'});

        let mountToErrorDiv = html.mountTo(error_div);
        [error_code_el,error_message_el].map((el)=> {
            mountToErrorDiv(el);
        });

        html.mountTo(app)(error_div);

    };

    return {init};

};

module.exports =  errorComponentConstructor;