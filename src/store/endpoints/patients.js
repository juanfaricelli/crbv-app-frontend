import { sessionHelper } from "@/helpers/sessionHelper";

const domainConfig =
  process.env.NODE_ENV === "production"
    ? "https://crbv-app-backend.onrender.com"
    : "";

export default {
  async getPatientById(userId) {
    try {
      const route = `${domainConfig}/api/user/patient`;
      const patientData = await sessionHelper(`${route}/${userId}`, "GET");
      return patientData.length > 0
        ? Object.assign({}, patientData[0].user_data, {
            medical_record: patientData[0].medical_record,
          })
        : null;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
  async getPatientNewForm() {
    try {
      // setSessionToken();
      const route = `${domainConfig}/api/user/patient/new`;
      const patientNewForm = await sessionHelper(route, "GET");
      return patientNewForm;
    } catch (error) {
      console.error(error);
      return {};
    }
  },
  async createNewPatient(newPatientData) {
    try {
      // setSessionToken();
      const route = `${domainConfig}/api/user/patient/create`;
      const patientNew = await sessionHelper(route, "POST", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(newPatientData), // body data type must match "Content-Type" header
      });
      return Object.assign({}, patientNew.user_data, {
        medical_record: patientNew.medical_record,
      });
    } catch (error) {
      console.error(error);
      return {};
    }
  },
  async updatePatient(updatedPatientData) {
    try {
      // setSessionToken();
      const route = `${domainConfig}/api/user/patient/${updatedPatientData.id_number}/update`;
      const patientUpdated = await sessionHelper(route, "PUT", {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(updatedPatientData), // body data type must match "Content-Type" header
      });
      return patientUpdated
        ? Object.assign({}, patientUpdated.user_data, {
            medical_record: patientUpdated.medical_record,
          })
        : null;
    } catch (error) {
      console.error(error);
      return {};
    }
  },
};
