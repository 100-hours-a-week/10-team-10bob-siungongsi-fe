import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showCustomNotification = ({
  title,
  body,
}: {
  title: string | undefined;
  body: string | undefined;
}) => {
  toast(
    ({ closeToast }) => (
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold text-primary">{title}</p>
        <p className="text-sm text-gray-700">{body}</p>
      </div>
    ),
    {
      position: "top-center",
      autoClose: 5000,
      closeOnClick: true,
      hideProgressBar: false,
      className: "bg-white shadow-lg border-l-4 border-blue-500 p-3 rounded-md",
      progressClassName: "bg-blue-500",
    },
  );
};
