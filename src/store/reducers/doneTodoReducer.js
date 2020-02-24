import actionType from '../actions/actionType'

export default (state, action) => {
	switch(action.type){
		case actionType.DONE_TODO_DOING: 
			return Object.assign({}, state, { ctLoading: true })
		case actionType.DONE_TODO_SUCCESS: 
			let newDone = state.unDoneTodos[action.payload]
			state.unDoneTodos.splice(action.payload, 1)
			return Object.assign({}, state, {
				ctLoading: false,
				hasDoneTodos: [...state.hasDoneTodos, newDone]
			})
		case actionType.DONE_TODO_FAILURE: 
			return Object.assign({}, state, {
				ctLoading: false,
				ctErrorMes: action.payload
			})
		default:
			return state;
	}
}
