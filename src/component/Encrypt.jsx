import React from 'react'
import '../style/Encrypt.css'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom';
function Encrypt() {
    const location=useLocation();
    const {hint_msg,secret_msg}=location.state
  return (
    <>
    <div className='main'>
                <h1>Your message has been secured</h1>
                <h2>You can copy & send the blow given content to your friend</h2>
                <h2>Copy the secret message in the decoder box and type the password based on the Hint that I have provided</h2>
                <br/>
                <h3>Secret message is: {secret_msg}</h3>
                <br/>
                <h3>Hint is : {hint_msg}</h3>
                <Link to='/'>Go to Home</Link>

    </div>
    </>
  )
}

export default Encrypt