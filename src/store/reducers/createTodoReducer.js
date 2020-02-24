import { calculatedSize, getCharset } from 'utils/tool'
import actionType from '../actions/actionType'

export default (state, action) => {
	switch(action.type){
		case actionType.CREATE_TODO_DOING: 
			return Object.assign({}, state, { ctLoading: true })
		case actionType.CREATE_TODO_SUCCESS: 
			return Object.assign({}, state, {
				ctLoading: false,
        unDoneTodos: [...state.unDoneTodos, action.payload],
        curCapacity: state.curCapacity + calculatedSize(JSON.stringify(action.payload), getCharset())
			})
		case actionType.CREATE_TODO_FAILURE: 
			return Object.assign({}, state, {
				ctLoading: false,
				ctErrorMes: action.payload
			})
		default:
			return state;
	}
}
