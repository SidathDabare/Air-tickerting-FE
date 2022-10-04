/** @format */
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers"
import HomePage from "./pages/HomePage"
import SearchResultPage from "./pages/SearchResultPage"
import LogInPage from "./pages/LogInPage"
import "./App.css"
import RegisterPage from "./pages/RegisterPage"
import DetailsPage from "./pages/DetailsPage"
import PassengerDetails from "./pages/PassengerDetails"

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/search-result' element={<SearchResultPage />} />
          <Route path='/passenger-details' element={<PassengerDetails />} />
          <Route path='/login' element={<LogInPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/details/:id' element={<DetailsPage />} />
        </Routes>
      </BrowserRouter>{" "}
    </LocalizationProvider>
  )
}

export default App