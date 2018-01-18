import { ActionTree, MutationTree } from 'vuex'

interface IState {
  name: string,
  phone: string
}

const state: IState = {
  name: '',
  phone: ''
}

const actions: ActionTree<IState, any> = {
  async getData ({ commit }, payload: IState): Promise<void> {
    commit('saveData', payload)
  }
}

const mutations: MutationTree<IState> = {
  saveData ($state: IState, payload: IState): void {
    $state.name = payload.name
    $state.phone = payload.phone
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
