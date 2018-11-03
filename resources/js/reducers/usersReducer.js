import axios from 'axios';
var initialState = {
	users: []
}

const usersReducer = (state = initialState, action) => {
	switch (action.type){
		case 'ADD_USERS':{			return {...state,
				users: [...state.users,action.user]
			}
		}
		case 'FETCH_USERS':{
		    return {...state,
		    	users: action.users
		    };
		}
		case 'DELETE_USERS':{
			var oldState = {...state};
			var users = oldState.users;
			var users = users.filter(u=> u.id != action.user.id);

			return {...state, 
				users: users
			}
		}
		case 'UPDATE_USERS':{
			var users = [...state.users]
			const newUsers = users.map(user => {
				if(user.id === action.user.id){
					user.email = action.user.email;
					user.name = action.user.name;
					return user;
				}
				return user;
			});
			return {...state, 
				users: newUsers
			}
		}
		default: return state
	}
}

export default usersReducer;