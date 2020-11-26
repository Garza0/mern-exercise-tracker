import React, { useState } from 'react';
import axios from 'axios';

function CreateUser() {
  const [user, setUser] = useState('');

  function onChangeUsername(e) {
    setUser(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();

    const username = {
      username: user,
    };

    axios
      .post('http://localhost:5000/users/add', username)
      .then((res) => console.log(res.data));

    setUser('');
  }

  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            required
            className="form-control"
            value={user}
            onChange={onChangeUsername}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create User"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default CreateUser;
