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
        if (response.status === 500) {
          // Handle 500 Internal Server Error
          console.error(
            "Internal Server Error: ",
            response.statusText,
            response.status
          );
          // Optionally, retry the request or provide a fallback
          // return retryRequest() or return fallbackResponse();
        }
        throw new Error(
          JSON.stringify({
            code: response.status,
            message: response.statusText,
          })
        );
      }
      const loginData = await response.json();
      return loginData;
    } catch (error) {
      try {
        const parsedError = JSON.parse(error.message);
        console.error(`Login request failed with Error`, parsedError);
        return parsedError;
      } catch (parseError) {
        console.error("Failed to parse error message as JSON:", parseError);
      }
    }
  },
  async logout() {
    try {
      const route = "/api/auth/logout";
      const response = await fetch(route, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      return { message: "Logout successful" };
    } catch (error) {
      console.error(error);
      return { error: "Logout failed" };
    }
  },
};
