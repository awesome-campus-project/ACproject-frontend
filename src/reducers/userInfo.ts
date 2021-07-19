import { UPDATE, EMPTY } from '@constants/userInfo'
import { UserInfo } from '@types'

const INITIAL_STATE: UserInfo = {
  name: '',
  user_code: '',
  level: 0,
  clazz: '',
  major: '',
  depart: '',
  campus_name: '',
  campus_id: 0,
  username: '',
  password: '',
}

export default function counter (state = INITIAL_STATE, action) {
  const { type, payload } = action

  switch (type) {
    case UPDATE:
      return {
        ...state,
        ...payload,
      }
     case EMPTY:
       return INITIAL_STATE
     default:
       return state
  }
}
