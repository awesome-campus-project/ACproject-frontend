import {
  UPDATE,
  EMPTY,
} from '@constants/userInfo'

export const updateUserInfo = (userInfo) => {
  return {
    type: UPDATE,
    payload: userInfo,
  }
}
export const emptyUserInfo = () => {
  return {
    type: EMPTY,
  }
}

// // 异步的action
// export function asyncAdd () {
//   return dispatch => {
//     setTimeout(() => {
//       dispatch(add())
//     }, 2000)
//   }
// }
