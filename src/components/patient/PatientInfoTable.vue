<template>
  <v-table density="compact" class="flex-1-0 ma-2 pa-2 patient-info-table">
    <tbody v-if="patientInfo.length > 0">
      <tr v-for="item in patientInfo" :key="item.name">
        <td width="200" class="patient-info-table__row-header">
          <strong>{{ item.name }}</strong>
        </td>
        <td class="text-left">
          <template v-if="isClinicHistory(item)">
            <v-tooltip
              location="top"
              origin="auto"
              no-click-animation
              :text="item.value.toUpperCase()"
              >
              <template v-slot:activator="{ props }">
                {{ valueToShow(item) }} <v-icon v-bind="props" icon="$info"></v-icon>
              </template>
            </v-tooltip>
          </template>
          <template v-else>
            {{ valueToShow(item) }}
          </template>
        </td>
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
import { helperMethods } from "@/helpers/mixins";

export default {
  name: "PatientInfoTable",
  mixins: [helperMethods],
  props: {
    patientInfo: {
      type: Array,
      default: [],
    },
  },
  methods: {
    valueToShow(item) {
      switch (item.name) {
        case 'Fecha de Nacimiento':
          return this.dateParser(item.value)
        case 'Sexo':
          return this.genderParser(item.value)
        case 'Estado Civil':
          return this.maritalStatusParser(item.value)
        // case 'Localidad':
        //   return this.locationParser(item)
        case 'Historia Clinica':
          return item.value.slice(-6).toUpperCase()
        case 'Obra Social':
          return this.healthInsuraceParser(item.value)
        default:
          return item.value && item.value.id
            ? item.value.name
            : item.value;
      }
    },
    isClinicHistory(item) {
      return item.name === 'Historia Clinica'
    }
  },
};
</script>

<style lang="scss" scoped>
.patient-info-table {
  &__row-header {
    text-wrap: nowrap;
  }
}
</style>