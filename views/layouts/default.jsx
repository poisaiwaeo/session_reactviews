// Her skal alt HTLM-dokumenter være
var React = require('react');


function DefaultLayout(props) {

    return (

        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title> {props.titel} </title>
                <link href="/public/css/StyleSheet.css" rel="stylesheet"/>
            </head>
            <body>

                {/* props.children er endeligt bare index */}
                {props.children} 

            </body>
        </html>
    );

}

module.exports = DefaultLayout;