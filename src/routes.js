import AddEditHostel from "./pages/HostelApplication/AddEditHostel";
import BookingRequests from "./pages/BookingRequests/BookingRequests";
import MyProfile from "./pages/MyProfile/MyProfile";
import MyHostels from "./pages/MyHostels/MyHostels";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";

const routes = [
  { path: "/", element: MyHostels },
  { path: "/booking-requests", element: BookingRequests },
  { path: "/add-hostel", element: AddEditHostel },
  { path: "/profile", element: MyProfile },
  { path: "/login", element: Login },
  { path: "/register", element: Register },
];

export default routes;
