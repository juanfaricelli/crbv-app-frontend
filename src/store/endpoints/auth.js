import { encrypt } from "@/helpers/encoderHelper";

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
  async login(logInInformation) {
    // 'username': 'juanTest01',
    // 'password': '123qweQWE'
    try {
      const route = "/api/auth/login";
      const requestBody = {
        body: encrypt(JSON.stringify(logInInformation)),
      };
      const response = await fetch(route, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const loginData = await response.json();
      return loginData;
    } catch (error) {
      console.error(error);
      return { error: "Login failed" };
    }
  },
  // WIP
  // async logout() {
  //   try {
  //     const route = "/api/auth/logout";
  //     const response = await fetch(route, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error("Logout failed");
  //     }

  //     return { message: "Logout successful" };
  //   } catch (error) {
  //     console.error(error);
  //     return { error: "Logout failed" };
  //   }
  // },
};
