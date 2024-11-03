import { toast as toastFunc, TypeOptions } from "react-toastify";

const toast = (msg: string, type: TypeOptions) =>
  toastFunc(msg, {
    position: "bottom-right",
    autoClose: 3500,
    type,
  });

export default toast;
