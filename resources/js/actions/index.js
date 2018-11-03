import axios from 'axios';
const apiUrl = '/api/users';

export const addUser = (user) => {
  return {
    type: 'ADD_USERS',
    user: user
  }
};

export const updateUser = (user) => {
  return {
    type: 'UPDATE_USERS',
    user: user
  }
};

export const fetchUsers = (users) => {
  return {
    type: 'FETCH_USERS',
    users: users
  }
};

export const fetchAllUsers = () => {
  return (dispatch) => {
    return axios.get(apiUrl)
      .then(response => {
        dispatch(fetchUsers(response.data))
      })
      .catch(error => {
        // throw(error);
      });
  };
};