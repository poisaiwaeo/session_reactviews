var React = require('react');
var DefaultLayout = require('../layouts/default');

function Register(props) {

    return (
        <DefaultLayout titel={"Register"}  >
            <div className="register_wrapper">
                <div className="register_container">
                <h3 className="reg_h3"> Register </h3>
                <form method='post' action='/register'>
                    <input className="reg_input" name='name' placeholder='Name ' required />
                    <input className="reg_input" type='email' name='email' placeholder='Email' required />
                    <input className="reg_input" type='password' name='password' placeholder='Password' required />
                    <button className="reg_btn" type='submit'> Register </button>
                </form>
                
                <button className="reg_btn" type='submit'> <a className="reg_a" href='/login'> Login </a> </button>
                </div>
            </div>
        </DefaultLayout>
    );

}

module.exports = Register;