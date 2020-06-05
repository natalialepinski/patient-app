<template>
  <div>
      <b-col>
        <b-card 
          :title="patient_id"
          tag="article"
          style="max-width:15rem;"
          class="mb-2"

        >
          <b-card-text>
            Patient name: {{ name }} <br/>
            Account Holder: {{ account_holder }}
          </b-card-text>
          <br/>
          <b-button   
            v-b-modal="modalId"
            variant="primary"
          >View</b-button>
          <b-modal :id="modalId" title="Patient details" size="xl">
            <p class="my-4">Account Holder: {{ account_holder }}</p>
            <p class="my-4">Patient ID: {{ patient_id }}</p>
            <p class="my-4">Nome: {{ name }}</p>
            <p class="my-4">Diagnosis: <span v-if="diagnosis">{{ diagnosis }}</span><span v-else="">Not confirmed</span></p>
          </b-modal>
        </b-card>
      </b-col>
  </div>
</template>

<script>
export default {
  props: ["name", "patient_id", "diagnosis", "account_holder", "id"],
  computed: {
    modalId() {
      return `modal-${this.id}`;
    }
  }

}
</script>

<style>

</style>