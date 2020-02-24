import actionType from './actionType'
import { delay } from 'utils/tool'

class Actions {
    static start() {
        return {
            type: actionType.DONE_TODO_DOING
        }
    }

    static ok(data, cb) {
        cb && 'function' === typeof cb && cb(data);
        return {
            type: actionType.DONE_TODO_SUCCESS,
            payload: data
        }
    }

    static fail(data, cb) {
        cb && 'function' === typeof cb && cb(data);
        return {
            type: actionType.DONE_TODO_FAILURE,
            payload: data
        }
    }
}

export default (data, cb) => {
	return (dispatch, getState) => {
    dispatch(Actions.start());
		delay(0.5).then(() => {
			dispatch(Actions.ok(data, cb));
		}).catch(error => dispatch(Actions.fail(error || '操作失败', cb)))
	}
}