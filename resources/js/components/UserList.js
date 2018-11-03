import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { fetchAllUsers } from '../actions/index';
import UserForm from './UserForm';
import UserEditForm from './UserEditForm';
import UserDetail from './UserDetail';
import './index.css';
import { 
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

class UserList extends Component{
  constructor(props) {
    super(props);
  
    this.state = {
      user: null,
      isDisplayFormAdd: false,
      isDisplayFormEdit: false,
      modal: false
    };

    this.__handleShowDetail = this.__handleShowDetail.bind(this);
    this.__handleDelete = this.__handleDelete.bind(this);
    this.__handleShowFormEdit = this.__handleShowFormEdit.bind(this);
    this.__handleToggleAddForm = this.__handleToggleAddForm.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  

  /**
   * [__handleShowDetail description]
   * @param  {[type]} id [description]
   * @return {[type]}    [description]
   */
  __handleShowDetail(id){
    var $this = this;
    axios.post('/api/detail/'+id)
      .then(response => {
        var user = response.data;
        $this.setState({
          user: user
        });
        $this.toggle();
      })
      .catch(error => {
        console.log(error);
      });
  }
  toggle() {
    var $this = this;
    $this.setState({
      modal: !$this.state.modal
    });
  }
  /**
   * [__handleShowAddForm show form add user]
   * @return {[type]} [description]
   */
  __handleToggleAddForm(){
    this.setState({
      isDisplayFormAdd: !this.state.isDisplayFormAdd
    })
  }
  /**
   * [__handleShowEdit description]
   * @param  {[type]} id [description]
   * @return {[type]}    [description]
  */
  __handleShowFormEdit(id){
    var $this = this;
    axios.post('/api/detail/'+id)
      .then(response => {
        var user = response.data;
        $this.setState({
          isDisplayFormEdit: !$this.state.isDisplayFormEdit,
          user: user
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  
  /**
   * [__handleShowDelete description]
   * @param  {[type]} id [description]
   * @return {[type]}    [description]
   */
  __handleDelete(id){
    var $this = this;
    var { dispatch } = $this.props;
    axios.delete('/api/delete/'+id)
      .then(response => {
        var user = response.data;
        // var users = $this.props.users.filter(u=> u.id != user.id);
        dispatch({ 
          type: 'DELETE_USERS', 
          user: user
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

	render() {
		var $this = this;
    return (
      <div>
        {$this.state.modal ? (
          <Modal 
            isOpen={this.state.modal} 
            toggle={this.toggle} 
            className={this.props.className}
            >
            <ModalHeader toggle={this.toggle}>Thông tin user: #{$this.state.user.id}</ModalHeader>
            <ModalBody>
              <ul>
                <li>NAME: {$this.state.user.name}</li>
                <li>EMAIL: {$this.state.user.email}</li>
              </ul>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggle}>Đóng</Button>
            </ModalFooter>
          </Modal>
        ) : ('')}
        {$this.state.isDisplayFormEdit ? (<UserEditForm user={$this.state.user}/>) : ('')}
        {$this.state.isDisplayFormAdd ? (<UserForm/>) : ('')}
        <br/>
        <button 
          className="btn btn-primary btn-add-new" 
          onClick={() => {$this.__handleToggleAddForm()}}
        >Thêm mới</button>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              $this.props.users.map((user, index) => {
                return <tr key={index}>
                  <td>{ user.id }</td>
                  <td>{ user.name }</td>
                  <td>{ user.email }</td>
                  <td>
                    <Button 
                      color="info" 
                      onClick={() => {$this.__handleShowDetail(user.id)}}
                    ><i className="fas fa-eye"></i></Button>
                    <button 
                      className="btn btn-primary"
                      onClick={() => {$this.__handleShowFormEdit(user.id)}}
                    ><i className="far fa-edit"></i></button>
                    <button 
                      className="btn btn-danger"
                      onClick={() => {$this.__handleDelete(user.id)}}
                    ><i className="fas fa-trash-alt"></i></button>
                  </td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.usersReducer.users
  };
};

export default connect(
	mapStateToProps,
	null
)(UserList);