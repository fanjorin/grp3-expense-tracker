const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

const getHeaders = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  return {
    "Content-Type": "application/json",
    ...(token ? { "Authorization": `Bearer ${token}` } : {}),
  };
};

export const authAPI = {
  signup: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return await response.json();
  },

  createPassword: async (data) => {
    const response = await fetch(`${API_BASE_URL}/auth/password/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await response.json();
  },

  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return await response.json();
  },

  forgotPassword: async (email) => {
    const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    return await response.json();
  },

  verifyCode: async (data) => {
    const response = await fetch(`${API_BASE_URL}/auth/verify-code`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await response.json();
  },

  resetPassword: async (data) => {
    const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await response.json();
  },

  getProfile: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: getHeaders(),
      });
      return await response.json();
    } catch (error) {
      console.error("Error fetching profile:", error);
      return { success: false, error: "Failed to fetch profile" };
    }
  },

  updateProfile: async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: "PATCH",
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error("Error updating profile:", error);
      return { success: false, error: "Failed to update profile" };
    }
  },
};

export const transactionAPI = {
  create: async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error("Error creating transaction:", error);
    }
  },

  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions`, {
        headers: getHeaders(),
      });
      return await response.json();
    } catch (error) {
      console.error("Error fetching transactions:", error);
      return { success: false, data: [] };
    }
  },

  delete: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      return await response.json();
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  },
};

export const budgetAPI = {
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/budgets`, {
        headers: getHeaders(),
      });
      return await response.json();
    } catch (error) {
      console.error("Error fetching budgets:", error);
      return { success: false, data: [] };
    }
  },

  save: async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/budgets`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error("Error saving budget:", error);
    }
  },
};

export const reportAPI = {
  getSummary: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/reports/summary`, {
        headers: getHeaders(),
      });
      return await response.json();
    } catch (error) {
      console.error("Error fetching report summary:", error);
      return { success: false, data: null };
    }
  },

  getCategories: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/reports/categories`, {
        headers: getHeaders(),
      });
      return await response.json();
    } catch (error) {
      console.error("Error fetching report categories:", error);
      return { success: false, data: [] };
    }
  },

  getStats: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/reports/stats`, {
        headers: getHeaders(),
      });
      return await response.json();
    } catch (error) {
      console.error("Error fetching report stats:", error);
      return { success: false, data: null };
    }
  },

  getOverTime: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/reports/over-time`, {
        headers: getHeaders(),
      });
      return await response.json();
    } catch (error) {
      console.error("Error fetching report over-time:", error);
      return { success: false, data: [] };
    }
  },
};
