let saveButtonHandlerConstructor  = (obj) => {
    let { array, dim1, dim2, dim2Value, plot_type, title,
        description, post, post_id,dim3Value}= obj;

    let saveButtonHandler = () => {
        post({uri:`/plots/?inpost=${post_id}&dim1=${dim1()}&dim2=${dim2()}&dim2Value=${dim2Value()}&dim3Value=${dim3Value()}&plot_type=${plot_type}&title=${title}&description=${description}&array_path_saved=${array.path}`}, (err,response,body) => {
            console.log(err,response,body);
            // if (err) return isLoggedIn(new Error(err));
            // return isLoggedIn(null,true);
        })
    };

    return saveButtonHandler;
};

module.exports = saveButtonHandlerConstructor;