import React, { useState } from 'react';
import axios from 'axios';
import '../style/Secret.css';
import { useNavigate } from 'react-router-dom';

function Secret() {
  const [msg, setMsg] = useState('');
  const [password, setPassword] = useState('');
  const [hint, setHint] = useState('');
  const [secret, setSecret] = useState('');
  const [encryptmsgs, setEncryptmsgs] = useState('');
  const [epassword, setEpassword] = useState('');
  const [eform, setEform] = useState(true);
  const [dform, setDform] = useState(false);
  const [decryptmsg, setDecryptmsg] = useState('');
  const navigate = useNavigate();

  const encryptMsg = () => {
    if (!msg.trim() || !password.trim() || !hint.trim()) {
      alert('All fields are required for encryption!');
      return;
    }

    axios.post(`https://encrypt-production-23b1.up.railway.app/addencrypt?msg=${msg}&password=${password}`)
      .then((response) => {
        const secretmsg = response.data;
        setSecret(secretmsg);
        navigate('/encrypt', {
          state: {
            hint_msg: hint,
            secret_msg: secretmsg
          }
        });
      });
  };

  const decrypt = () => {
    if (!encryptmsgs.trim() || !epassword.trim()) {
      alert('All fields are required for decryption!');
      return;
    }

    axios.post(`https://encrypt-production-23b1.up.railway.app/decrypt?secret=${encodeURIComponent(encryptmsgs)}&password=${encodeURIComponent(epassword)}`)
      .then((response) => {
        setDecryptmsg(response.data);
      });
  };

  return (
    <div className='container'>
      <h1>Lock-Talk</h1>
      <div style={{ display: 'flex', columnGap: '20px' }}>
        <button className={eform ? 'active' : 'disable'} onClick={() => {
          setEform(true);
          setDform(false);
          setMsg('');
          setPassword('');
          setHint('');
          setSecret('');
        }}>Encrypt</button>
        <button className={dform ? 'active' : 'disable'} onClick={() => {
          setDform(true);
          setEform(false);
          setEncryptmsgs('');
          setEpassword('');
          setDecryptmsg('');
        }}>Decrypt</button>
      </div>

      {eform && (
        <div id='form'>
          <label>Message:</label>
          <textarea
            id='msg_box'
            placeholder='Enter the message'
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <label>Password:</label>
          <input
            type="password"
            placeholder='Enter the password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Hint:</label>
          <input
            type='text'
            placeholder='Enter hint for password'
            value={hint}
            onChange={(e) => setHint(e.target.value)}
          />
          <button onClick={encryptMsg}>Encrypt</button>
        </div>
      )}

      {dform && (
        <div id='dform'>
          <label>Encrypted Message:</label>
          <input
            type='text'
            placeholder='Paste the secret message'
            value={encryptmsgs}
            onChange={(e) => setEncryptmsgs(e.target.value)}
          />
          <label>Password:</label>
          <input
            type='text'
            placeholder='Enter the password'
            value={epassword}
            onChange={(e) => setEpassword(e.target.value)}
          />
          <button onClick={decrypt}>Decrypt</button>
          <label>Decrypted Message:</label>
          <textarea id='msg_box' readOnly value={decryptmsg} />
        </div>
      )}
    </div>
  );
}

export default Secret;
