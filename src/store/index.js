import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    patients: [],
    displayPatients: [],
    rows: 0,
    showSpinner: false
  },
  mutations: {
    SET_PATIENTS(state, patients) {
      state.patients = patients;
    },
    SET_DISPLAY_PATIENTS(state, displayPatients) {
      state.displayPatients = displayPatients;
    },
    SET_ROWS(state, rows) {
      state.rows = rows;
    },
    SET_SPINNER(state, spinner) {
      state.showSpinner = spinner;
    }
  },
  actions: {
    // add async functions here, not in the mutations
    async fetchData({ commit }) {
      commit("SET_SPINNER", true);
      return new Promise(resolve => {
        setTimeout(async () => {
          const result = await fetch("patients.json");
          const value = await result.json();
          resolve(value);
          commit("SET_SPINNER", false);
        }, 1000);
      });
    },
    async fetchPatients({ dispatch, commit }, { perPage }) {
      const myJson = await dispatch("fetchData");
      commit("SET_PATIENTS", myJson);
      const displayPatients = myJson.slice(0, perPage);
      commit("SET_DISPLAY_PATIENTS", displayPatients);
      commit("SET_ROWS", myJson.length);
    },
    async paginate({ commit, state }, { currentPage, perPage }) {
      const start = (currentPage - 1) * perPage;
      const patients = state.patients.slice(start, start + perPage);
      commit("SET_DISPLAY_PATIENTS", patients);
    },
    updatePagination({ commit, dispatch }, { myJson, currentPage, perPage }) {
      commit("SET_PATIENTS", myJson);
      commit("SET_ROWS", myJson.length);
      dispatch("paginate", { currentPage, perPage });
    },
    async search({ dispatch }, { text }) {
      const myJson = await this.dispatch("fetchData");
      const values = myJson.filter(val => 
        val.name.toLowerCase().includes(text.toLowerCase()) || val.patient_id.toLowerCase().includes(text.toLowerCase())
      );
      dispatch("updatePagination", { myJson: values, currentPage: 1, perPage: 4});
    }
  },
  getters: {
    patients(state) {
      return state.patients;
    },
    displayPatients(state) {
      return state.displayPatients;
    },
    rows(state) {
      return state.rows;
    },
    showSpinner(state) {
      return state.showSpinner;
    }
  },
  modules: {}
});
