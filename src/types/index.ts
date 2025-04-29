export interface ServiceType {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface BookingFormData {
  name: string;
  email: string;
  service: string;
  date: string;
  time: string;
  paymentMethod: string;
}

export interface AuthFormData {
  email: string;
  password: string;
  fullName?: string;
}