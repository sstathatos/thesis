const dependencies = require('./dependencies');

window.store = dependencies.store;

let addListenerToWindow = dependencies.html.addListenerTo(window);
addListenerToWindow('popstate',(e)=>console.log(e));

let loginComponent = dependencies.loginComponentConstructor(dependencies);
loginComponent.init();

// let navigationComponent = dependencies.navigationComponentConstructor(dependencies);
// navigationComponent.init();

// let run_test =  require('./client_test');
//
// window.test = true;
//
// if (window.test) run_test(dependencies);
































// let createDatasetComponent =createDatasetComponentConstructor({app,post,submitButtonDatasetHandlerConstructor});
// createDatasetComponent.init();

//USED ID EXAMPLE
// let createPostComponent = createPostComponentConstructor({app,get,id:'59356d2584ca9e2539b49b93',post,errorHandler});
// createPostComponent.update(createPostComponent.init());

// let getPlotComponent = getPlotComponentConstructor({app,get,id:'59356d2784ca9e2539b49bad'});
// getPlotComponent.update(getPlotComponent.init());

// let getProjectComponent = getProjectComponentConstructor({app,get,post,id:'59356d2584ca9e2539b49b93',postStructurer,errorHandler});
// getProjectComponent.update(getProjectComponent.init());


// let getPostComponent = getPostComponentConstructor({app,get,post,id:'59356d2684ca9e2539b49b97'});
// getPostComponent.update(getPostComponent.init());

// let createPlotComponent = createPlotComponentConstructor({app,get,post,id:'59356d2684ca9e2539b49b95',post_id:'59356d2684ca9e2539b49b97'});
// createPlotComponent.update(createPlotComponent.init());

// let getDatasetComponent = getDatasetComponentConstructor({app,get,id:'59356d2684ca9e2539b49b95',path:'d3dset'});
// getDatasetComponent.init();

// let testComponentConstructor =  require('./components/testComponent');
// let testComponent = testComponentConstructor({app,get,id:'59356d2684ca9e2539b49b95',path:'d3dset'});
//
// testComponent.buttonInit();
// testComponent.buttonUp();
// testComponent.buttonDown();
// testComponent.buttonLeft();
// testComponent.buttonRight();

// setTimeout(function(){ testComponent.change_something('15'); }, 3000);






















