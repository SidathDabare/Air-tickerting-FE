/** @format */
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers"
import HomePage from "./pages/HomePage"
import SearchResultPage from "./pages/SearchResultPage"
import LogInPage from "./pages/LogInPage"

import RegisterPage from "./pages/RegisterPage"
import DetailsPage from "./pages/DetailsPage"
import PassengerDetails from "./pages/PassengerDetails"
import PaymentPage from "./pages/PaymentPage"
import BookingDeatils from "./pages/BookingDeatils"
import DashboardPage from "./pages/DashboardPage"
import PrivateRoutes from "./utils/PrivateRoutes"
import AdminDashBoard from "./pages/AdminDashBoard"
import PermissionDenied from "./pages/PermissionDenied"
import AdminOnlyRoutes from "./utils/AdminOnlyRoutes"
import ContactUsPage from "./pages/ContactUsPage"

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path='/booking-details' element={<BookingDeatils />} />
            <Route path='/details/:id' element={<DetailsPage />} />
            <Route path='/dashboard' element={<DashboardPage />} />
            <Route path='/passenger-details' element={<PassengerDetails />} />
            <Route path='/payment' element={<PaymentPage />} />
          </Route>
          <Route element={<AdminOnlyRoutes />}>
            <Route path='/admin' element={<AdminDashBoard />} />
          </Route>
          <Route path='/' element={<HomePage />} />
          <Route path='/search-result' element={<SearchResultPage />} />

          <Route path='/contact-us' element={<ContactUsPage />} />
          <Route path='/login' element={<LogInPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/unauthorized' element={<PermissionDenied />} />
        </Routes>
      </BrowserRouter>{" "}
    </LocalizationProvider>
  )
}

export default App
