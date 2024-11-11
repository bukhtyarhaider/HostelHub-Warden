export type BookingApplicationStatus = "pending" | "approved" | "rejected";
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
export interface SignUpForm {
  fullName: string;
  email: string;
  phoneNumber: string;
  hostelName: string;
  hostelAddress: string;
  password: string;
  cnicFront?: File;
  cnicBack?: File;
}

export interface Hostel {
  name: string;
  email: string;
  location: string;
  contactNumber: string;
  type: "Student" | "Staff" | "Vistor";
  description: string;
  images: string[];
  rooms: Room[];
}

export interface IHostel {
  name: string;
  email: string;
  location: string;
  contactNumber: string;
  type: "Student" | "Staff" | "Vistor";
  description: string;
  images: File[];
  rooms: Room[];
}
export interface Room {
  roomNumber: string;
  type: "Single Room" | "Double Room" | "Shared Room" | "Bunker Room";
  numberOfBeds: number;
  washroom: number;
  seatsAvailable: number;
  price: number;
}

interface BookingApplication {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  documents: {
    cnicFront: string;
    cnicBack: string;
    studentId: string;
  };
  hostel: {
    name: string;
    type: string;
    id: string;
    location: string;
    image: string;
  };
  booking: {
    roomNumber: string;
    roomType: string;
    hostelRent: string;
    stay: {
      duration: string;
      startDate: string;
      endDate: string;
    };
  };
  createdAt: Timestamp;
  status: BookingApplicationStatus;
}
