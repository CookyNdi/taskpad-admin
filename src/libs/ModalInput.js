import Swal from "sweetalert2";
import { addCategory, addStatus, login } from "./apiHandler";

export const handleLogin = async (setIsLogin) => {
  const { value } = await Swal.fire({
    title: "Login",
    html: `
      <label for="swal-input1">Username:</label>
      <input id="swal-input1" class="swal2-input" placeholder="Username">
      <label for="swal-input2">Password:</label>
      <input id="swal-input2" class="swal2-input" placeholder="Password" type="password">
    `,
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonText: "Login",
    showLoaderOnConfirm: true,
    preConfirm: async () => {
      try {
        return await login();
      } catch (error) {
        Swal.showValidationMessage(`Request failed: ${error.message}`);
        return null;
      }
    },
    allowOutsideClick: () => !Swal.isLoading(),
  });
  if (value !== "Forbiden access!" && value === "Login Successfully") {
    let timerInterval;
    Swal.fire({
      title: "Login Successfully, Please Wait",
      timer: 2000,
      html: "It will redirecting in <b></b> milliseconds.",
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer().querySelector("b");
        timerInterval = setInterval(() => {
          b.textContent = Math.ceil(Swal.getTimerLeft() / 1000);
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        setIsLogin(true);
      }
    });
  } else if (value === "Forbiden access!" || value === "Incorrect password") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${value}`,
    });
  }
};

export const handleAddCategory = async (setAction) => {
  const { isConfirmed } = await Swal.fire({
    title: "Add Category",
    html: `
      <div>
        <div class="flex w-full items-center">
          <label for="swal-input1">Title:</label>
          <input id="swal-input1" class="swal2-input" placeholder="Category Title">
        </div>
        <div class="flex w-full items-center">
          <label for="swal-input2">Color:</label>
          <input style="width: 55%;" id="swal-input2" class="swal2-input" placeholder="Color : #542b26" type="color">
        </div>
      </div>
    `,
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonText: "Add",
    showLoaderOnConfirm: true,
    preConfirm: async () => {
      try {
        return await addCategory();
      } catch (error) {
        Swal.showValidationMessage(`Request failed: ${error.message}`);
        return null;
      }
    },
    allowOutsideClick: () => !Swal.isLoading(),
  });
  if (isConfirmed) {
    Swal.fire({
      icon: "success",
      title: "Successfully",
      text: "Category Created Successfully",
    }).then((result) => {
      if (result.isConfirmed) {
        setAction(true);
      }
    });
  }
};
export const handleAddStatus = async (setAction) => {
  const { isConfirmed } = await Swal.fire({
    title: "Add Status",
    html: `
      <label for="swal-input1">Title:</label>
      <input id="swal-input1" class="swal2-input" placeholder="Category Title">
    `,
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonText: "Add",
    showLoaderOnConfirm: true,
    preConfirm: async () => {
      try {
        return await addStatus();
      } catch (error) {
        Swal.showValidationMessage(`Request failed: ${error.message}`);
        return null;
      }
    },
    allowOutsideClick: () => !Swal.isLoading(),
  });
  if (isConfirmed) {
    Swal.fire({
      icon: "success",
      title: "Successfully",
      text: "Category Created Successfully",
    }).then((result) => {
      if (result.isConfirmed) {
        setAction(true);
      }
    });
  }
};
