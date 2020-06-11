var React = require('react');
var DefaultLayout = require('../layouts/default');

function Login(props) {

    return (
        <DefaultLayout titel={"Login"}  >
            <div className="home_wrapper">
                <div className="home_container">
                    <h3 className="login_h3"> Login </h3>
                    <form method='post' action='/login'>
                        <input className="login_input" type='email' name='email' placeholder='Email' required />
                        <input className="login_input" type='password' name='password' placeholder='Password' required />
                        <button className="login_btn" type='submit'> Login </button>
                        {/* <input className="login_btn" type='submit' /> */}
                    </form>
                    <button className="login_btn"><a href='/register'> Register </a></button>
                </div>
            </div>
        </DefaultLayout>
    );

}

module.exports = Login;