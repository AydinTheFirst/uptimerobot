import { toastSignal } from ".";

export const removeAlert = (id: string) => {
  toastSignal.value = toastSignal.value.filter((t) => t.id !== id);
};

export const toast = (body: {
  description: string;
  type?: "failure" | "success";
}) => {
  const id = crypto.randomUUID();

  toastSignal.value = [
    ...toastSignal.value,
    {
      id: id,
      description: body.description,
      type: body.type || "success",
    },
  ];

  setTimeout(() => {
    removeAlert(id);
  }, 1000 * 5);
};
