import api from "./axios";

export const tokenRefresher = async () => {
  try {
    await api.get("/api/token");
  } catch (error) {
    console.log(error);
  }
};

export const login = async () => {
  try {
    const usernameInput = document.getElementById("swal-input1").value;
    const passwordInput = document.getElementById("swal-input2").value;
    const form = new FormData();
    form.append("username", usernameInput);
    form.append("password", passwordInput);
    if (usernameInput === "CookyNdi" || usernameInput === "vrlomhrn") {
      const response = await api.post("/api/admin/login", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.msg;
    } else {
      return "Forbiden access!";
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return error.response.data.msg;
    } else {
      console.error("Error:", error);
    }
  }
};

export const logout = async () => {
  try {
    await api.delete("/api/logout");
  } catch (error) {
    console.error("Error:", error.message);
  }
};

export const categoryDatas = async () => {
  try {
    const response = await api.get("/api/category");
    return response.data.categories;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const statusDatas = async () => {
  try {
    const response = await api.get("/api/status");
    return response.data.status;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const categoryDataById = async (id) => {
  try {
    const response = await api.get(`/api/category/${id}`);
    return response.data.category;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const statusDataById = async (id) => {
  try {
    const response = await api.get(`/api/status/${id}`);
    return response.data.status;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const addCategory = async () => {
  try {
    const titleInput = document.getElementById("swal-input1").value;
    const colorInput = document.getElementById("swal-input2").value;
    const form = new FormData();
    form.append("title", titleInput);
    form.append("color", colorInput);
    await api.post("/api/category", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.error("Error:", error);
  }
};
export const addStatus = async () => {
  try {
    const titleInput = document.getElementById("swal-input1").value;
    const form = new FormData();
    form.append("title", titleInput);
    await api.post("/api/status", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

export const deleteCategory = async (id) => {
  try {
    await api.delete(`/api/category/${id}`);
  } catch (error) {
    console.error("Error:", error);
  }
};

export const deleteStatus = async (id) => {
  try {
    await api.delete(`/api/status/${id}`);
  } catch (error) {
    console.error("Error:", error);
  }
};

export const updateCategory = async (id) => {
  try {
    const titleInput = document.getElementById("swal-input1").value;
    const colorInput = document.getElementById("swal-input2").value;
    const form = new FormData();
    form.append("title", titleInput);
    form.append("color", colorInput);
    await api.patch(`/api/category/${id}`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

export const updateStatus = async (id) => {
  try {
    const titleInput = document.getElementById("swal-input1").value;
    const form = new FormData();
    form.append("title", titleInput);
    await api.patch(`/api/status/${id}`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.error("Error:", error);
  }
};
