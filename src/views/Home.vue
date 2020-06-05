<template>
  <b-container>
    <b-row align-v="center">
        <patient-card 
          v-for="patient in displayPatients" 
          :key="patient.id" 
          :name="patient.name" 
          :patient_id="patient.patient_id" 
          :diagnosis="patient.diagnosis"
          :account_holder="patient.account_holder"
          :id="patient.id"
        ></patient-card>
      </b-row>
      <b-row align-v="left">
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          first-text="First"
          prev-text="Prev"
          next-text="Next"
          last-text="Last"
          @input="paginate(currentPage)"
        ></b-pagination>
    </b-row>
  </b-container>
</template>

<script>
import PatientCard from '@/components/PatientCard.vue';
import {mapGetters} from 'vuex';

export default {
  name: "Home",
  components: {
    'patient-card': PatientCard
  },
  computed: {
    ...mapGetters(["patients", "displayPatients", "rows"])
  },
  mounted() {
    this.fetchData();
  },
  data() {
    return {
      currentPage: 1,
      perPage: 4
    }
  },
  methods: {
    async fetchData() {
      await this.$store.dispatch("fetchPatients", {perPage: this.perPage});
    },
    paginate(currentPage, ) {
      this.$store.dispatch("paginate", { currentPage, perPage: this.perPage })
    }
  },
};
</script>
