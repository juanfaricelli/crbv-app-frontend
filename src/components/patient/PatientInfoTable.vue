<template>
  <v-table density="compact" class="flex-1-0 ma-2 pa-2 patient-info-table">
    <tbody v-if="patientInfo.length > 0">
      <tr
        v-for="item in patientInfo"
        :key="item.name"
      >
        <td width="200" class="patient-info-table__row-header"><strong>{{ item.name }}</strong></td>
        <td class="text-left">{{ item.value }}</td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr>
        <td width="170"></td>
        <td class="text-left"></td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
export default {
  name: 'PatientInfoTable',
  props: {
    patientInfo: {
      type: Array,
      default: [],
    }
  },
}
</script>

<style lang="scss" scoped>
.patient-info-table {
  &__row-header {
    text-wrap: nowrap;
  }
}
</style>