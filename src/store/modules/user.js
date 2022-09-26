import { login } from '@/api/login'
import { getUserInfoAPI, getUserDetailById } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: null,
    userInfo: {}
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    },
    REMOVE_USER_INFO(state) {
      state.userInfo = {}
    }
  },
  actions: {
    async LoginAction({ commit }, loginData) {
      const data = await login(loginData)
      console.log(data)
      commit('SET_TOKEN', data)
    },
    async getUserInfo({ commit }) {
      // 接口请求
      const res = await getUserInfoAPI()
      // console.log(res)
      const res1 = await getUserDetailById(res.userId)
      const result = { ...res, ...res1 }
      commit('SET_USER_INFO', result)
      // res是复杂数据类型，需要深拷贝返回，后续在外面修改值不会对原有的值造成影响
      return JSON.parse(JSON.stringify(result))
    }
  }
}
