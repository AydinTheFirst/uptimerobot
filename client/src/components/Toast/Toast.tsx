import { Toast } from "flowbite-react";
import { toastSignal } from ".";
import { HiCheck, HiX } from "react-icons/hi";
import "./toast.css";
export const ToastBox = () => {
  console.log("Toast Triggered", toastSignal.value.length);
  return (
    <div className="fixed bottom-0 end-0 z-50 m-3">
      <div className="flex flex-col gap-3">
        {toastSignal.value.map((t) => (
          <>
            {(t.type === "success" && (
              <Toast key={t.id} className="toast">
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                  <HiCheck className="h-5 w-5" />
                </div>
                <div className="ml-3 text-sm font-normal">{t.description}</div>
                <Toast.Toggle />
              </Toast>
            )) || (
              <Toast key={t.id} className="toast">
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                  <HiX className="h-5 w-5" />
                </div>
                <div className="ml-3 text-sm font-normal">{t.description}</div>
                <Toast.Toggle />
              </Toast>
            )}
          </>
        ))}
      </div>
    </div>
  );
};
