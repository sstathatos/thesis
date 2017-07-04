let client = () => {

    let code = "/bundle.js";
    let c3css = "/c3.css";
    let tachyons =  "/tachyons.min.css";
    let home = `
        <!doctype html>
        <html lang=en class='h-auto light-gray bg-dark-green'>
        <head>
            <meta charset=utf-8>
            <title>PlotNet</title>
            <link rel="stylesheet" type="text/css" href="${c3css}">
            <link rel="stylesheet" type="text/css" href="${tachyons}">
            <style> 
                button:disabled {
                    display:none;
                }
  
            </style>
        </head>
        <body class='h-auto' >
            <div id="top"></div>
            <div id="app"></div>
            <script src="${code}"></script>
        </body>
        </html>
    `;

    return home;

};
module.exports = client;