import { signal } from "@preact/signals-react";

export const toastSignal = signal<IToast[]>([]);

export { ToastBox } from "./Toast";
export { toast } from "./toastTrigger";

interface IToast {
  id: string;
  description: string;
  type?: "failure" | "success";
}
