var React = require('react');
var DefaultLayout = require('../layouts/default');

function Profile(props) {

    return (
        <DefaultLayout titel={"Profile"} >
            <h1> {props.velkomsthilsen} </h1>
            <div>
                <a href='/'> Main </a>
                <ul>
                    <li> Name: {props.user.name} </li>
                    <li> Email: {props.user.email} </li>
                </ul>

                <form method='post' action='/changeprofile'>
                    <input type='text' name='id' placeholder='ID' required defaultValue={props.user.id} readOnly />
                    <input type='text' name='name' placeholder='Name' required defaultValue={props.user.name} />
                    <input type='email' name='email' placeholder='Email' required defaultValue={props.user.email} />
                    <button type='submit'> Login </button>
                </form>

            </div>
        </DefaultLayout>
    );

}

module.exports = Profile;