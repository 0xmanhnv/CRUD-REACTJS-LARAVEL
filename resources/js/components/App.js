import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from '../reducers';
import UserList from './UserList';
import { fetchAllUsers } from '../actions/index';
import { 
    BrowserRouter as Router,
    Route, 
    Link,
    Redirect 
} from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const store = createStore(rootReducer,applyMiddleware(thunk));
store.dispatch(fetchAllUsers());

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100)
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

// check da dang nhap hay chua
var auth = localStorage.getItem('auth');
if(auth){
    // neu dang nhap roi thi chuyen ve true
    fakeAuth.isAuthenticated = true;
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

class Login extends React.Component {
    constructor(props) {
      super(props);
    
      this.state = {
        redirectToReferrer: false,
        email: '',
        password: ''
      };
      this.login = this.login.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }
    login(e){
        e.preventDefault();
        var $this = this;
        var user = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post('/api/login', user)
          .then(response => {
            var token = response.data.token;
            var newUser = response.data.user;
            var user = {...newUser, token};
            console.log(user);
            localStorage.setItem('auth', JSON.stringify(user));
            fakeAuth.authenticate(() => {
              $this.setState(() => ({
                redirectToReferrer: true
              }))
            })
            toast("Đăng nhập thành công!");
          })
          .catch(error => {
            console.log(error);
          });
    }
    /**
     * [handleChange description]
     * @param  {[type]} event [description]
     * @return {[type]}       [description]
     */
    handleChange(event) {
        const target = event.target;
        const name = target.name;
        this.setState({ 
            [name]: target.value
        });
    }
    render() {
        const { redirectToReferrer } = this.state

        if (redirectToReferrer === true) {
          return <Redirect to='/' />
        }

        return (
          <div>
            <div>
                <form onSubmit={this.login}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input 
                            onChange={this.handleChange} 
                            value={this.state.email} 
                            name="email" 
                            type="email" 
                            className="form-control" 
                            id="exampleInputEmail1" 
                            aria-describedby="emailHelp" 
                            placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input 
                            value={this.state.password}
                            onChange={this.handleChange}
                            name="password" 
                            type="password" 
                            className="form-control" 
                            id="exampleInputPassword1" 
                            placeholder="Password" />
                    </div>
                  <button type="submit">Log in</button>
                </form>
              </div>
          </div>
        )
    }
}

export default class App extends Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <ToastContainer />
                    <PrivateRoute exact path="/" component={UserList} />
                    <Route path="/login" component={Login} />
                </div>
            </Router>
        );
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>
    , document.getElementById('root'));
}
