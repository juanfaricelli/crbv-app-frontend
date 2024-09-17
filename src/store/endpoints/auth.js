export default {
  async getPatientById(userId) {
    try {
      const route = "/api/user/patient";
      const patientData = await fetch(`${route}/${userId}`).then((response) =>
        response.json()
      );
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
};
