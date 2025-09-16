import React , {createContext, useState, useEffect , useContext, use} from 'react';
import axios from '../axios';


const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      fetchUser(access_token);
    } else {
      setLoading(false);
    }
  }, []);


  const fetchUser = async (access_token) => {
    try {
      const response = await axios.get('/api/profile/');
      setUser(response.data.data);
    } catch (error) {
      console.error('Error fetching user:', error);
      logout(); // Clear user if there's an error
    } finally {
      setLoading(false);
    }
  };

    // The register function - it will throw an error on failure
  const register = async (credentials) => {
      try {
          // Your API endpoint for creating a user is /api/users/
          const response = await axios.post('/api/users/', credentials);
          console.log('Registration successful:', response.data);
          return response.data; // Return data on success
      } catch (error) {
          console.error('Registration failed:', error.response ? error.response.data : error);
          throw error; // Throw the error so the component can catch it
      }
  };

  
  const login = async (credentials) => {
    try {
      // Remove any existing Authorization header for login request
      delete axios.defaults.headers.common['Authorization'];
      
      const response = await axios.post('/api/login/', credentials);
      
      if (response.data.status === false) {
        throw new Error(response.data.message || 'Login failed');
      }

      const {access, refresh} = response.data.data.tokens;
      const userData = response.data.data.user;
      setUser(userData);
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
      await fetchUser(access);
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      // If it's a response error with a message, use that
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
      }
      // Otherwise throw the original error
      throw error;
    }
  };
  
  const logout = async () => {
    setUser(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    delete axios.defaults.headers.common['Authorization'];
  };
  
  const booking = async (bookingData) => {
    try {
      const response = await axios.post('/api/orders/', bookingData);
      return response.data; // Return booking data on success
    }
    catch (error) {
      console.error('Error booking:', error);
      throw error; // Throw the error so the component can handle it
    }
  };
      // The function to create a new order
    const createOrder = async (orderData) => {
        try {
            const response = await axios.post('/api/orders/', orderData);
            return response.data;
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    };
    const createOrderItem = async (itemData) => {
        try {
            const response = await axios.post('/api/order-items/', itemData);
            return response.data;
        } catch (error) {
            console.error('Error creating order item:', error);
            throw error;
        }
      };
    const getOrders = async (userId) => {
        try {
            const response = await axios.get(`/api/orders/?user=${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching orders:', error);
            throw error;
        }
    };
const StaffOrderList = async () => {
    try {
        const response = await axios.get('/api/staff-order-list/');
        return response.data;
    } catch (error) {
        console.error('Error fetching staff order list:', error);
        throw error;
    }
};

const SendDeliveryOtp = async (order_id) => {
  try {
    const response = await axios.post(`/api/send-delivery-otp/${order_id}/`);
    return response.data;
  } catch (error) {
    console.error('Error sending delivery OTP:', error);
    throw error;
  }
};

const VerifyDeliveryOtp = async (order_id, otp) => {
  try {
    const response = await axios.post(`/api/verify-delivery-otp/${order_id}/`, { otp });
    return response.data;
  } catch (error) {
    console.error('Error verifying delivery OTP:', error);
    throw error;
  }
};



  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      logout, 
      register, 
      booking, 
      createOrder, 
      createOrderItem,
      getOrders, // Add getOrders to the context
      StaffOrderList,
      SendDeliveryOtp,
      VerifyDeliveryOtp 
    }}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthContext;