import { toast as toastFunc, TypeOptions } from "react-toastify";

const toast = (msg: string, type: TypeOptions) =>
  toastFunc(msg, {
    position: "top-right",
    autoClose: 5000,
    type,
  });

export default toast;
