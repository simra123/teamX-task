import { toast } from "react-toastify";
//resusable react Toasts
const ToastSuccess = (text: string) => {
  toast.success(
    <div className="toastify-body p-0">
      <small>{text}</small>
    </div>,
    { hideProgressBar: false },
  );
};

const ToastError = (text: string) => {
  toast.error(
    <>
      <div className="toastify-body p-0">
        <small>{text}</small>
      </div>
    </>,
    { hideProgressBar: false },
  );
};
export { ToastSuccess, ToastError };
