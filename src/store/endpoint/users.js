import CONSTANTS from "@/constants";

export default {
  async getPatientById(userId) {
    try {
      const route = '/api/user/patient'
      const patientData = await fetch(`${route}/${userId}`).then((response) =>
        response.json()
      );
      return patientData[0].user_data;
    } catch (error) {
      console.error(error)
      return [];
    }
  }
}