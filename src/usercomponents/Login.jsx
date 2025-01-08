import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  async function login(event) {
    event.preventDefault();
    const credentials = { username, password };
    localStorage.setItem('userCreds', JSON.stringify(credentials));
    try {
      await axios
        .post('http://localhost:8082/users/login', {
          username: username,
          password: password,
        })
        .then(
          (res) => {
            console.log(res.data);
            if (res.data.code == 102) {
              alert('Username does not exist!');
            } else if (res.data.code == 100) {
              navigate('/Home');
            } else if (res.data.code == 104) {
              alert('Login Failed!');
            } else {
              alert('Password not match!');
            }
          },
          (fail) => {
            console.error(fail); // Error!
          }
        );
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div>
      <div class="container">
        <div class="row">
          <h2>Login</h2>
          <hr />
        </div>

        <div class="row">
          <div class="col-sm-6">
            <form>
              <div class="form-group">
                <label>Username</label>
                <input
                  type="username"
                  class="form-control"
                  id="username"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                />
              </div>
              <br></br>
              <div class="form-group">
                <label>password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  class="form-control"
                  id="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
                <label style={{ marginTop: '5px' }}>
                  <input
                    type="checkbox"
                    onChange={() => setShowPassword(!showPassword)}
                    checked={showPassword}
                  />
                  Show Password
                </label>
              </div>
              <br></br>
              <button type="submit" class="btn btn-primary" onClick={login}>
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
