import { calculatedSize, getCharset } from 'utils/tool'
import actionType from '../actions/actionType'

export default (state, action) => {
	let charset = getCharset()
	switch(action.type){
		case actionType.DEL_TODO_DOING: 
			return Object.assign({}, state, { ctLoading: true })
		case actionType.DEL_TODO_SUCCESS: 
			let curDone = state.unDoneTodos[action.payload],
			    curDoneSize = calculatedSize(JSON.stringify(curDone), charset)
            // 删除todo
			state.unDoneTodos.splice(action.payload, 1)
			return Object.assign({}, state, {
				ctLoading: false,
				curCapacity: state.curCapacity - curDoneSize
			})
		case actionType.DEL_TODO_FAILURE: 
			return Object.assign({}, state, {
				ctLoading: false,
				ctErrorMes: action.payload
			})
		default:
			return state;
	}
}
