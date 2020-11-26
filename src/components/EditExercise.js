import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouteMatch } from 'react-router-dom';

function EditExercise() {
  const match = useRouteMatch();

  const [exerciseInfo, setExerciseInfo] = useState({
    username: '',
    description: '',
    duration: 0,
    date: new Date(),
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/exercises/' + match.params.id)
      .then((response) => {
        setExerciseInfo({
          username: response.data.username,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date),
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get('http://localhost:5000/users/')
      .then((res) => {
        if (res.data.length > 0) {
          setUsers(res.data.map((user) => user.username));
          setExerciseInfo((prevState) => ({
            ...prevState,
            username: res.data[0].username,
          }));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function onChangeUsername(e) {
    setExerciseInfo({
      ...exerciseInfo,
      username: e.target.value,
    });
  }

  function onChangeDescription(e) {
    setExerciseInfo({
      ...exerciseInfo,
      description: e.target.value,
    });
  }

  function onChangeDuration(e) {
    setExerciseInfo({
      ...exerciseInfo,
      duration: e.target.value,
    });
  }

  function onChangeDate(date) {
    setExerciseInfo({
      ...exerciseInfo,
      date: date,
    });
  }

  function onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: exerciseInfo.username,
      description: exerciseInfo.description,
      duration: exerciseInfo.duration,
      date: exerciseInfo.date,
    };

    axios
      .post(
        'http://localhost:5000/exercises/update/' + match.params.id,
        exercise
      )
      .then((res) => console.log(res.data));

    console.log(exercise);

    window.location = '/';
  }

  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            className="form-control"
            value={exerciseInfo.username}
            onChange={onChangeUsername}
          >
            {users.map(function (user) {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            value={exerciseInfo.description}
            onChange={onChangeDescription}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            className="form-control"
            value={exerciseInfo.duration}
            onChange={onChangeDuration}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker selected={exerciseInfo.date} onChange={onChangeDate} />
          </div>
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Edit Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default EditExercise;
