import {
  totalHostelsIcon,
  totalRequestsIcon,
  totalResidentsIcon,
  totalRevenueIcon,
} from "./assets";

// TODO : convert to real data
export const residentsData = [
  {
    key: "1",
    wardenId: "EFH238",
    wardenName: "Naomi Doe",
    hostelName: "Downing Hostel",
    address: "123, downing street",
    email: "naomi@gmail.com",
    phoneNumber: "+92 123-4567890",
    createdAt: "12-Mar-2024",
    type: "Student Accommodation",
    totalRooms: "05",
    status: "active",
    roomNumber: "DH-001",
    roomPrice: "Rs. 14,000",
    duration: "3-Months",
    joinDate: "12-May-2024",
    endDate: "12-Jul-2024",
    totalAmount: "Rs. 14,000",
    dueDate: "12-Mar-2024",
    paymentStatus: "Unpaid",
    documents: [
      { name: "CNIC Front Side", url: "naomi_cnic_front_side.pdf" },
      { name: "CNIC Back Side", url: "naomi_cnic_back_side.pdf" },
      { name: "Student Card", url: "naomi_student_card.pdf" },
    ],
    paymentHistory: [
      {
        month: "January-2024",
        paymentAmount: "Rs. 14,000",
        dueDate: "12-Mar-2024",
        receivedDate: "12-Mar-2024",
        status: "Unpaid",
      },
      {
        month: "December-2023",
        paymentAmount: "Rs. 14,000",
        dueDate: "12-Mar-2024",
        receivedDate: "12-Mar-2024",
        status: "Paid",
      },
      // Add more history as needed
    ],
  },
  {
    key: "2",
    wardenId: "EFH239",
    wardenName: "Naomi Doe",
    hostelName: "My Hostel",
    address: "123, downing street",
    email: "naomi@gmail.com",
    phoneNumber: "+92 123-4567890",
    createdAt: "12-Mar-2024",
    type: "Student Accommodation",
    totalRooms: "05",
    status: "active",
    roomNumber: "MH-002",
    roomPrice: "Rs. 12,000",
    duration: "6-Months",
    joinDate: "01-Jan-2024",
    endDate: "01-Jul-2024",
    totalAmount: "Rs. 12,000",
    dueDate: "01-Jul-2024",
    paymentStatus: "Paid",
    documents: [
      { name: "CNIC Front Side", url: "naomi_cnic_front_side.pdf" },
      { name: "CNIC Back Side", url: "naomi_cnic_back_side.pdf" },
      { name: "Student Card", url: "naomi_student_card.pdf" },
    ],
    paymentHistory: [
      {
        month: "January-2024",
        paymentAmount: "Rs. 12,000",
        dueDate: "01-Jul-2024",
        receivedDate: "01-Jul-2024",
        status: "Paid",
      },
      {
        month: "December-2023",
        paymentAmount: "Rs. 12,000",
        dueDate: "01-Jun-2024",
        receivedDate: "01-Jun-2024",
        status: "Paid",
      },
      // Add more history as needed
    ],
  },
  {
    key: "3",
    wardenId: "EFH240",
    wardenName: "Naomi Doe",
    hostelName: "Your Hostel",
    address: "123, downing street",
    email: "naomi@gmail.com",
    phoneNumber: "+92 123-4567890",
    createdAt: "12-Mar-2024",
    type: "Student Accommodation",
    totalRooms: "05",
    status: "past",
    roomNumber: "YH-003",
    roomPrice: "Rs. 15,000",
    duration: "1-Year",
    joinDate: "01-Jan-2023",
    endDate: "01-Jan-2024",
    totalAmount: "Rs. 15,000",
    dueDate: "01-Jan-2024",
    paymentStatus: "Paid",
    documents: [
      { name: "CNIC Front Side", url: "naomi_cnic_front_side.pdf" },
      { name: "CNIC Back Side", url: "naomi_cnic_back_side.pdf" },
      { name: "Student Card", url: "naomi_student_card.pdf" },
    ],
    paymentHistory: [
      {
        month: "January-2024",
        paymentAmount: "Rs. 15,000",
        dueDate: "01-Jan-2024",
        receivedDate: "01-Jan-2024",
        status: "Paid",
      },
      {
        month: "December-2023",
        paymentAmount: "Rs. 15,000",
        dueDate: "01-Dec-2023",
        receivedDate: "01-Dec-2023",
        status: "Paid",
      },
      // Add more history as needed
    ],
  },
  {
    key: "4",
    wardenId: "EFH241",
    wardenName: "Naomi Doe",
    hostelName: "His Hostel",
    address: "123, downing street",
    email: "naomi@gmail.com",
    phoneNumber: "+92 123-4567890",
    createdAt: "12-Mar-2024",
    type: "Student Accommodation",
    totalRooms: "05",
    status: "active",
    roomNumber: "HH-004",
    roomPrice: "Rs. 13,000",
    duration: "6-Months",
    joinDate: "01-Feb-2024",
    endDate: "01-Aug-2024",
    totalAmount: "Rs. 13,000",
    dueDate: "01-Aug-2024",
    paymentStatus: "Unpaid",
    documents: [
      { name: "CNIC Front Side", url: "naomi_cnic_front_side.pdf" },
      { name: "CNIC Back Side", url: "naomi_cnic_back_side.pdf" },
      { name: "Student Card", url: "naomi_student_card.pdf" },
    ],
    paymentHistory: [
      {
        month: "January-2024",
        paymentAmount: "Rs. 13,000",
        dueDate: "01-Aug-2024",
        receivedDate: "01-Aug-2024",
        status: "Unpaid",
      },
      {
        month: "December-2023",
        paymentAmount: "Rs. 13,000",
        dueDate: "01-Jul-2024",
        receivedDate: "01-Jul-2024",
        status: "Paid",
      },
      // Add more history as needed
    ],
  },
  {
    key: "5",
    wardenId: "EFH242",
    wardenName: "Naomi Doe",
    hostelName: "His Hostel",
    address: "123, downing street",
    email: "naomi@gmail.com",
    phoneNumber: "+92 123-4567890",
    createdAt: "12-Mar-2024",
    type: "Student Accommodation",
    totalRooms: "05",
    status: "past",
    roomNumber: "HH-005",
    roomPrice: "Rs. 11,000",
    duration: "3-Months",
    joinDate: "01-May-2024",
    endDate: "01-Aug-2024",
    totalAmount: "Rs. 11,000",
    dueDate: "01-Aug-2024",
    paymentStatus: "Paid",
    documents: [
      { name: "CNIC Front Side", url: "naomi_cnic_front_side.pdf" },
      { name: "CNIC Back Side", url: "naomi_cnic_back_side.pdf" },
      { name: "Student Card", url: "naomi_student_card.pdf" },
    ],
    paymentHistory: [
      {
        month: "January-2024",
        paymentAmount: "Rs. 11,000",
        dueDate: "01-Aug-2024",
        receivedDate: "01-Aug-2024",
        status: "Paid",
      },
      {
        month: "December-2023",
        paymentAmount: "Rs. 11,000",
        dueDate: "01-Jul-2024",
        receivedDate: "01-Jul-2024",
        status: "Paid",
      },
      // Add more history as needed
    ],
  },
];

// TODO : convert to real data
export const requestsData = [
  {
    key: "1",
    candidateName: "Naomi Doe",
    email: "naomi@gmail.com",
    phoneNumber: "+92 123-4567890",
    selectedHostel: "Downing Hostel",
    selectedRoom: "DH-004",
    hostelType: "Student",
    RequestedType: "Student Accommodation",
    RequestedRoom: "DH-004",
    RequestDate: "09-12-2024",
    type: "active",
    status: "rejected",
  },
  {
    key: "2",
    candidateName: "Naomi Doe",
    email: "naomi@gmail.com",
    phoneNumber: "+92 123-4567890",
    selectedHostel: "Downing Hostel",
    selectedRoom: "DH-004",
    hostelType: "Student",
    RequestedType: "Student Accommodation",
    RequestedRoom: "DH-004",
    RequestDate: "09-12-2024",
    type: "active",
    status: "rejected",
  },
  {
    key: "3",
    candidateName: "Naomi Doe",
    email: "naomi@gmail.com",
    phoneNumber: "+92 123-4567890",
    selectedHostel: "Downing Hostel",
    selectedRoom: "DH-004",
    hostelType: "Student",
    RequestedType: "Student Accommodation",
    RequestedRoom: "DH-004",
    RequestDate: "09-12-2024",
    type: "past",
    status: "rejected",
  },
  {
    key: "4",
    candidateName: "Naomi Doe",
    email: "naomi@gmail.com",
    phoneNumber: "+92 123-4567890",
    selectedHostel: "Downing Hostel",
    selectedRoom: "DH-004",
    hostelType: "Student",
    RequestedType: "Student Accommodation",
    RequestedRoom: "DH-004",
    RequestDate: "09-12-2024",
    type: "past",
    status: "accepted",
  },
  {
    key: "5",
    candidateName: "Naomi Doe",
    email: "naomi@gmail.com",
    phoneNumber: "+92 123-4567890",
    selectedHostel: "Downing Hostel",
    selectedRoom: "DH-004",
    hostelType: "Student",
    RequestedType: "Student Accommodation",
    RequestedRoom: "DH-004",
    RequestDate: "09-12-2024",
    type: "past",
    status: "accepted",
  },
];

// TODO : convert to real data
export const adminDetails = {
  fullName: "Naomi Doe",
  profilePicture: "",
  dateOfBirth: "14-11-2000",
  email: "naomi@gmail.com",
  phoneNumber: "+92 123-4567890",
  currentAddress: "123, Downing street, China town.",
  currentState: "Punjab",
  currentPassword: "12345678",
  newPassword: "",
  confirmPassword: "",
};

export const statisticsData = [
  {
    label: "Total Rooms",
    value: "145",
    icon: totalHostelsIcon,
  },
  {
    label: "Total Residents",
    value: "12k",
    icon: totalResidentsIcon,
  },
  {
    label: "New Requests",
    value: "156",
    icon: totalRequestsIcon,
  },
  {
    label: "Total Revenue",
    value: "125,00k",
    icon: totalRevenueIcon,
  },
];

export const noticesData = [
  {
    title: "Urgent Notice!",
    description:
      "Lorem ipsum dolor sit amet consectetur. Tristique leo sollicitudin volutpat nunc ac. Justo mattis nullam imperdiet aliquam pulvinar. Facilisis potenti pellentesque feugiat in dui. Amet hendrerit aliquam fringilla turpis cursus blandit tortor diam.Amet hendrerit aliquam fringilla turpis cursus blandit tortor diam.",
    date: "12-May-2024",
  },
  {
    title: "Urgent Notice!",
    description:
      "Lorem ipsum dolor sit amet consectetur. Tristique leo sollicitudin volutpat nunc ac. Justo mattis nullam imperdiet aliquam pulvinar. Facilisis potenti pellentesque feugiat in dui. Amet hendrerit aliquam fringilla turpis cursus blandit tortor diam.Amet hendrerit aliquam fringilla turpis cursus blandit tortor diam.",
    date: "12-May-2024",
  },
  {
    title: "Urgent Notice!",
    description:
      "Lorem ipsum dolor sit amet consectetur. Tristique leo sollicitudin volutpat nunc ac. Justo mattis nullam imperdiet aliquam pulvinar. Facilisis potenti pellentesque feugiat in dui. Amet hendrerit aliquam fringilla turpis cursus blandit tortor diam.Amet hendrerit aliquam fringilla turpis cursus blandit tortor diam.",
    date: "12-May-2024",
  },
];

// TODO : convert to real data
export const hostelDetailsTableData = [
  {
    key: 1,
    roomNumber: "DH-01",
    roomType: "Bunker Room",
    numberOfBeds: "04",
    washroom: "01",
    seatsAvailable: "02",
    roomPricePerSeat: "Rs. 14,000",
  },
  {
    key: 2,
    roomNumber: "DH-01",
    roomType: "Bunker Room",
    numberOfBeds: "04",
    washroom: "01",
    seatsAvailable: "02",
    roomPricePerSeat: "Rs. 14,000",
  },
  {
    key: 3,
    roomNumber: "DH-01",
    roomType: "Bunker Room",
    numberOfBeds: "04",
    washroom: "01",
    seatsAvailable: "02",
    roomPricePerSeat: "Rs. 14,000",
  },
  {
    key: 4,
    roomNumber: "DH-01",
    roomType: "Bunker Room",
    numberOfBeds: "04",
    washroom: "01",
    seatsAvailable: "02",
    roomPricePerSeat: "Rs. 14,000",
  },
  {
    key: 5,
    roomNumber: "DH-01",
    roomType: "Bunker Room",
    numberOfBeds: "04",
    washroom: "01",
    seatsAvailable: "02",
    roomPricePerSeat: "Rs. 14,000",
  },
  {
    key: 6,
    roomNumber: "DH-01",
    roomType: "Bunker Room",
    numberOfBeds: "04",
    washroom: "01",
    seatsAvailable: "02",
    roomPricePerSeat: "Rs. 14,000",
  },
];

// TODO : convert to real data
export const hostelDetailsDescriptionData = {
  title: "Description",
  description: [
    "Lorem ipsum dolor sit amet consectetur. Lobortis quis ornare est velit cursus quam gravida tellus lobortis. Eget ut adipiscing convallis fames pretium sed pellentesque sit eget. Tristique dignissim vel tortor adipiscing quis ultricies. Massa odio duis risus orci maecenas in massa eget eget.",
    "Lorem ipsum dolor sit amet consectetur. Vitae sagittis eget diam lacus. Sapien cras mauris sollicitudin dolor nec enim imperdiet.",
    "Lorem ipsum dolor sit amet consectetur. At nibh pretium turpis tellus. Sit gravida non praesent nunc. Congue aliquam convallis malesuada amet diam orci vitae at vel. Maecenas sapien vestibulum morbi placerat id. Posuere venenatis mauris quam nisl aenean sed nulla vel. Tellus aliquet curabitur risus quis molestie iaculis pretium viverra vulputate. Libero porttitor quam vestibulum congue luctus amet. Et eget pharetra quis ac adipiscing eros sagittis justo lacus. Nibh cras tempus aenean mauris gravida lectus. Volutpat tincidunt enim arcu turpis est varius condimentum ut. Duis congue nunc faucibus turpis porttitor.",
    "Lorem ipsum dolor sit amet consectetur. In dictum ipsum quis ullamcorper elit malesuada eget augue. Vel sed neque vulputate lectus urna faucibus ac pellentesque.",
  ],
};
