var React = require('react');
var DefaultLayout = require('../layouts/default');

function Home(props) {

    return (
        <DefaultLayout titel={"Home"} >
            <div className="home_wrapper">
                <div className="home_container">
                    <h3 className="home_h3"> Home </h3>
                    <div className="home">
                        <button className="home_btn">
                            <a className="home_a" href='/'> <p className="home_btntekst">Main</p> </a>
                        </button>

                        <ul>
                            <li> Name: {props.user.name} </li>
                            <li> Email: {props.user.email} </li>
                        </ul>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );

}

module.exports = Home;