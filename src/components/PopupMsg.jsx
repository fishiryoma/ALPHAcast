import Swal from "sweetalert2";

export const successMsg = (msg, time = 1500) => {
  return Swal.fire({
    title: msg,
    icon: "success",
    timer: time,
    showConfirmButton: false,
  });
};
export const failMsg = (msg, time = 1500) => {
  return Swal.fire({
    title: msg,
    icon: "error",
    timer: time,
    showConfirmButton: false,
  });
};

export const bottomMsg_s = (msg, icon = "success") => {
  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 2500,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  return Toast.fire({
    icon: icon,
    html: `<p class="fs-4 fw-bold">${msg}</p>`,
  });
};
