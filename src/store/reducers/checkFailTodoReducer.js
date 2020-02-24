import actionType from '../actions/actionType'

export default (state, action) => {
	switch(action.type){
		case actionType.CHECK_FAIL_TODO: 
			let curDone = state.unDoneTodos[action.payload]
			// 从未完成todo列表中删除todo
			state.unDoneTodos.splice(action.payload, 1)
			return Object.assign({}, state, {
				hasFailTodos: [...state.hasFailTodos, curDone]
			})
		default:
			return state;
	}
}
