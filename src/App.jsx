import React from 'react'
import Navbar from './components/common/Navbar'
import Home from './components/pages/Home'
import Service from './components/pages/Service'
import Prices from './components/pages/Prices'
import Booking from './components/pages/Booking'
import PreviewBooking from './components/Booking/PreviewBooking'
import BookingSuccess from './components/Booking/BookingSuccess'
import OrderDetails from './components/orders/OrderDetails'
//Staff Related
import StaffSignUp from './components/staff/auth/StaffSignUp'
import StaffSignin from './components/staff/auth/StaffSignin'
import StaffOrderList from './components/staff/Orders/StaffOrderList'
import StaffDeshboard from './components/staff/Deshboard/StaffDeshBoard'


import Login from './components/auth/Login'
import SignUp from './components/auth/SignUp'
import Dashboard from './components/pages/Dashboard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { PrivateRoute } from './middleware/PrivateRoute'
import { LaundryDataProvider } from './contexts/LaundryDataContext'

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen w-full bg-gray-100">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <LaundryDataProvider>
            <Routes> 
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/staff-signin" element={<StaffSignin />} />
              <Route path="/staff-signup" element={<StaffSignUp />} />
              <Route path="/signup" element={<SignUp />} />
                <Route path="/service" element={
                  <PrivateRoute>
                    <Service />
                  </PrivateRoute>
                } />
                  <Route path="/prices/*" element={
                    <PrivateRoute>
                      <Prices />
                    </PrivateRoute>
                  } />
                  <Route path="/booking" element={
                    <PrivateRoute>
                      <Booking />
                    </PrivateRoute>
                  } />
                
                <Route path="/orderdetails/:orderId" element={
                    <PrivateRoute>
                        <OrderDetails />
                    </PrivateRoute>
                } />
                <Route path="/stafforderlist" element={
                    <PrivateRoute>
                        <StaffOrderList />
                    </PrivateRoute>
                } />
                <Route path="/staffdashboard" element={
                    <PrivateRoute>
                        <StaffDeshboard />
                    </PrivateRoute>
                } />
                <Route path="/dashboard" element={
                    <PrivateRoute>
                        <Dashboard />
                      </PrivateRoute>
                    } />
                <Route path="/preview-booking" element={
                  <PrivateRoute>
                    <PreviewBooking />
                  </PrivateRoute>
                } />
                <Route path="/booking-success" element={
                  <PrivateRoute>
                    <BookingSuccess />
                  </PrivateRoute>
                } />
            </Routes>
            </LaundryDataProvider>
          </div>
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
