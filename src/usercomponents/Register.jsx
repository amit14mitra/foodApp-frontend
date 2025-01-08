import { useState } from 'react';
import axios from 'axios';

function Register() {
  const [userId, setUserId] = useState(0);
  const [username, setUserename] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8082/users/addUser', {
        id: userId,
        username: username,
        email: email,
        role: role,
        password: password,
      });
      alert('User Registation Successfully');
    } catch (err) {
      alert('Error--->' + err);
    }
  }

  return (
    <div>
      <div class="container mt-4">
        <div class="card">
          <h1>User Registation</h1>

          <form>
            <div className="form-group">
              <label>User ID</label>
              <input
                type="number"
                className="form-control"
                id="userId"
                placeholder="Enter User ID"
                value={userId}
                onChange={(event) => {
                  setUserId(event.target.value);
                }}
              />
            </div>
            <br></br>
            <div class="form-group">
              <label>User Name</label>
              <input
                type="text"
                class="form-control"
                id="username"
                placeholder="Enter Username"
                value={username}
                onChange={(event) => {
                  setUserename(event.target.value);
                }}
              />
            </div>
            <br></br>
            <div class="form-group">
              <label>User Role</label>
              <input
                type="text"
                class="form-control"
                id="role"
                placeholder="Enter Role"
                value={role}
                onChange={(event) => {
                  setRole(event.target.value);
                }}
              />
            </div>
            <br></br>
            <div class="form-group">
              <label>email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="Enter Email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
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
                placeholder="Enter password"
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

            <button type="submit" class="btn btn-primary mt-4" onClick={save}>
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
