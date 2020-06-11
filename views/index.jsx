//index.jsx er en start side
var React = require('react');
var DefaultLayout = require('./layouts/default.jsx');
// import 'bootstrap/dist/js/bootstrap.bundle';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import $ from 'jquery';
// import Popper from 'popper.js';


function Index(props) {

    return (

        <DefaultLayout titel={"Forside"} >
            <section className="index_wrapper">
                <section className="index_imgbox">
                    <img className="index_icon" src="../public/assets/images/login.png" alt="login icon" />
                </section>
                <h3 className="index_h3"> {props.velkomsthilsen} </h3>
                <h5 className="index_h5"> Logge ind på vores siden med de muligheder</h5>
                {
                    props.userId ?
                        <div className="homeknap_container">
                            <button className="home_btn"><a className="home_a" href='/home'> <p className="home_btntekst">Home</p> </a></button>
                            <form method='post' action='/logout'>
                                <button className="home_btn"> <p className="home_btntekst">Logout</p> </button>
                            </form>
                        </div>
                        :
                        <section className="index_container">
                            <button className="index_btn">
                                <a href='/login'> <p className="index_btntekst">Login</p> </a>
                            </button>
                            <button className="register_btn">
                                <a href='/register'> <p className="index_btntekst">Register</p> </a>
                            </button>
                            <button className="medier_btn">
                                <a> <p className="index_btntekst">Sociale medier</p> </a>
                            </button>
                        </section>
                }
            </section>
        </DefaultLayout>

    );
}

module.exports = Index;