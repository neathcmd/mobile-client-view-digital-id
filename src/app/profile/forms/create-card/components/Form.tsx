import { FormProps } from "@/types/form-type";

const Form = ({
  formData,
  error,
  isSubmitting,
  onChange,
  onSubmit,
  onCancel,
}: FormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  const InputField = ({
    label,
    name,
    type = "text",
    required = false,
    Placeholder,
    helperText,
    rows,
  }: {
    label: string;
    name: keyof typeof formData;
    type?: string;
    required?: boolean;
    Placeholder: string;
    helperText: string;
    rows: number;
  }) => {
    const hasError = !!errors[name];
    const fieldId = `${name}-field`;
    const errorId = `${name}-error`;
  };

  const baseClasses =
    "w-full px-4 py-3 border rounded-xl shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 bg-white";
  const errorClasses = hasError
    ? "border-red-300 focus:border-red-500 focus:ring-red-200 bg-red-50"
    : "border-gray-200 focus:border-blue-500 hover:border-gray-300 hover:shadow-md";
};
