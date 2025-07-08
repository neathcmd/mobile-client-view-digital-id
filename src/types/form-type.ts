export interface CardFormData {
  fullName: string;
  description: string;
  socialMedia: string;
  position: string;
  email: string;
  phoneNumber: string;
  address: string;
}

export interface FormErrors {
  fullName?: string;
  socialMedia?: string;
  position?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  description?: string;
}

export interface FormProps {
  formData: CardFormData;
  errors: FormErrors;
  isSubmitting: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}
