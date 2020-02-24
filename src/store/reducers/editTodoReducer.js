import { calculatedSize, getCharset } from 'utils/tool'
import actionType from '../actions/actionType'

export default (state, action) => {
	let charset = getCharset()
	switch(action.type){
		case actionType.EDIT_TODO_DOING: 
			return Object.assign({}, state, { ctLoading: true })
		case actionType.EDIT_TODO_SUCCESS: 
			let i = action.payload.index
			delete action.payload.index
			// 计算大小差
			let prevSize = calculatedSize(JSON.stringify(state.unDoneTodos[i]), charset),
				curSize = calculatedSize(JSON.stringify(action.payload), charset)
			// 将修改后的todo赋值给原来的todo
			state.unDoneTodos[i] = action.payload
			return Object.assign({}, state, {
				ctLoading: false,
				unDoneTodos: [...state.unDoneTodos],
				curCapacity: state.curCapacity + curSize - prevSize
			})
		case actionType.EDIT_TODO_FAILURE: 
			return Object.assign({}, state, {
				ctLoading: false,
				ctErrorMes: action.payload
			})
		default:
			return state;
	}
}
