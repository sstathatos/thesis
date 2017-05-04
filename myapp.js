const express = require('express');
let app= express();

app.use('/', require('./routes2'));

app.set('port',(process.env.PORT || 3000));

app.listen(app.get('port'), () => {
    console.log('Server up: http://localhost:' +app.get('port'));

});
