import actionType from './actionType'

export default (data) => {
	return {
        type: actionType.CHECK_FAIL_TODO,
        payload: data
    }
}