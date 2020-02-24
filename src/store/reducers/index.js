import createTodoReducer from './createTodoReducer'
import editTodoReducer from './editTodoReducer'
import doneTodoReducer from './doneTodoReducer'
import delTodoReducer from './delTodoReducer'
import checkFailTodoReducer from './checkFailTodoReducer'
// 将多个reducer合并成一个，并将state合并
import reduceReducers from 'reduce-reducers'

const initialState = {
  capacity: 5 * 1024 * 1024,  // localStorage总容量,单位bt
  curCapacity: 0, // 当前使用容量, 单位bt
  hasDoneTodos: [], // 已经完成的todo
  hasFailTodos: [], // 已经失败的todo
  unDoneTodos: [], // 未完成的todo
  // todo创建
  ctLoading: false,
  ctErrorMes: '',
}

const reducer = reduceReducers(
  (state = initialState, action) => createTodoReducer(state, action),
  (state = initialState, action) => editTodoReducer(state, action),
  (state = initialState, action) => doneTodoReducer(state, action),
  (state = initialState, action) => delTodoReducer(state, action),
  (state = initialState, action) => checkFailTodoReducer(state, action)
);

export default reducer