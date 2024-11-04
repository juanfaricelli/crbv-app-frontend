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
};
