/* eslint-disable react-hooks/rules-of-hooks */
import Swal from "sweetalert2";
import { logout } from "./apiHandler";

export const handleChangeTableName = (name, setTableName) => {
  setTableName(name);
};

export const handleLogout = (setIsLogin) => {
  Swal.fire({
    title: "Are you sure?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, logout it!",
  }).then((result) => {
    if (result.isConfirmed) {
      let timerInterval;
      Swal.fire({
        title: "Please Wait",
        timer: 1000,
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
          logout();
          setIsLogin(false);
        }
      });
    }
  });
};
