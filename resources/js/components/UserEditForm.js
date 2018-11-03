import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { updateUser } from '../actions/index';

class UserEditForm extends Component{
	constructor(props) {
		super(props);
		var $this = this;
		var user = this.props.user;
		this.state = {
			email: user.email,
			name: user.name,
			id: user.id
		};
		this.handleChange = this.handleChange.bind(this);
		this.__handleSubmitForm = this.__handleSubmitForm.bind(this);
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
	/**
	 * [__handleSubmitForm description]
	 * @param  {[type]} e [description]
	 * @return {[type]}   [description]
	 */
	__handleSubmitForm(e){
		e.preventDefault();
		var user = {
			email: this.state.email,
			name: this.state.name
		}
		var $this = this;
		var { dispatch } = $this.props;
	    axios.put('/api/update/'+$this.state.id, user)
	      .then(response => {
	      	console.log(response);
	        var user = response.data;
	        $this.props.onUpdateUser(user);
	      })
	      .catch(error => {
	        console.log(error);
	      });
	}
	render(){
		return (
			<div className="card">
				<div className="card-body">
					<form onSubmit={this.__handleSubmitForm}>
			            <div className="form-group">
			              <label htmlFor="exampleInputEmail1">Email: </label>
			              <input 
			                value={this.state.email} 
			                name="email"  
			                onChange={this.handleChange} 
			                type="email" 
			                className="form-control" 
			                id="exampleInputEmail1" 
			                aria-describedby="emailHelp" 
			                placeholder="Enter email" />
			            </div>
			            <div className="form-group">
			              <label htmlFor="exampleInputPassword1">Tên: </label>
			              <input 
			                onChange={this.handleChange} 
			                type="text"  value={this.state.name} 
			                name="name"
			                className="form-control" 
			                id="exampleInputPassword1" 
			                placeholder="Name" />
			            </div>
			            <div className="float-right">
				            <button 
				            	type="submit" 
				            	className="btn btn-primary"
				            >Cập nhật</button>
				        </div>
		          	</form>
		        </div>
	        </div>
		);
	}
}

const mapStateToProps = state => {
	return {
		users: state.usersReducer.users
	}
};

const mapDispatchToProps = (dispatch, props) => {
	return {
		onUpdateUser: (user) => {
			dispatch(updateUser(user));
		}
	}
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserEditForm);