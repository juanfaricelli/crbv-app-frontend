import { sessionHelper } from "@/helpers/sessionHelper";

const domainConfig =
  process.env.NODE_ENV === "production"
    ? "https://crbv-app-backend.onrender.com"
    : "";

export default {
  async fetchPatientConditions() {
    try {
      // setSessionToken();
      const route = `${domainConfig}/api/patient-conditions`;
      const patientConditions = await sessionHelper(route, "GET");
      return patientConditions;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
  async postMedicalRecordEntry(payload) {
    try {
      // setSessionToken();
      const route = `${domainConfig}/api/medical-record/create`;
      const newEntry = await sessionHelper(route, "POST", {
        body: JSON.stringify(payload),
      });
      return newEntry;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
  async getMedicalRecordEntries(patiendId) {
    try {
      // setSessionToken();
      const route = `${domainConfig}/api/medical-record/${patiendId}`;
      const newEntry = await sessionHelper(route, "GET");
      return newEntry;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
};
