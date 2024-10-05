import { encrypt } from "@/helpers/encoderHelper";

const domainConfig =
  process.env.NODE_ENV === "production"
    ? "https://crbv-app-backend.onrender.com"
    : "";
const sessionToken = localStorage.getItem("sessionToken") || "";
const Authorization = `Bearer ${sessionToken}`;

export default {
  async login(logInInformation) {
    try {
      const route = `${domainConfig}/api/auth/login`;
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
      const route = `${domainConfig}/api/auth/logout`;
      const response = await fetch(route, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization,
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
