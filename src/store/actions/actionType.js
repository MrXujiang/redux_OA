import keyMirror from 'keymirror'
/**
 * keymirror作用是提供压缩优化，会自动生成和键一样的对应的值
 */

export default keyMirror({
  CREATE_TODO_DOING: null,
  CREATE_TODO_SUCCESS: null,
  CREATE_TODO_FAILURE: null,

  EDIT_TODO_DOING: null,
  EDIT_TODO_SUCCESS: null,
  EDIT_TODO_FAILURE: null,

  DONE_TODO_DOING: null,
  DONE_TODO_SUCCESS: null,
  DONE_TODO_FAILURE: null,

  DEL_TODO_DOING: null,
  DEL_TODO_SUCCESS: null,
  DEL_TODO_FAILURE: null,
   
  CHECK_FAIL_TODO: null
})