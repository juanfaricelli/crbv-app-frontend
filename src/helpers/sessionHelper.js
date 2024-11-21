// src/helpers/apiHelper.js
import store from "@/store";
import router from "@/router";

export async function sessionHelper(url, method = "GET", options = {}) {
  const sessionId = localStorage.getItem("sessionId") || "";
  const Authorization = `Bearer ${sessionId}`;

  const defaultOptions = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization,
    },
  };

  const finalOptions = { ...defaultOptions, ...options };

  try {
    const response = await fetch(url, finalOptions);

    if (response.status === 403) {
      // Handle session invalidation
      console.error("Session is invalid. Logging out...");
      store.commit("auth/CLEAR_SESSION");
      store.commit("app/IS_COMPONENT_LOADING_UPDATED", false);
      router.push({ name: "login" });
      return { error: "Session is invalid" };
    }

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  } catch (error) {
    console.error("API request failed:", error);
    return { error: error.message };
  }
}
