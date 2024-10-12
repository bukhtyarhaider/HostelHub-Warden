export interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  hostelName: string;
  hostelAddress: string;
  password: string;
  confirmPassword: string;
  cnicFront: File | null;
  cnicBack: File | null;
}
