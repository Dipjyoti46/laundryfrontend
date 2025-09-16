import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Make sure path is correct

const LogInPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login({ username, password });
            navigate('/dashboard'); // Redirect to dashboard on successful login
        } catch (err) {
            console.error("Login failed:", err);
            setError('Failed to log in. Please check your credentials.');
        }
    };

    return (
        <div className='min-h-screen w-full bg-white flex flex-col justify-center items-center p-4 md:p-8'>
            <div className='w-full max-w-md p-6 md:p-8 bg-blue-50 text-blue-950 rounded-xl shadow-lg'>
                <div className='text-center mb-8'>
                    <h1 className='font-extrabold text-blue-900 text-2xl md:text-3xl font-serif'>Log In Now</h1>
                    <p className='text-gray-600 mt-2'>Welcome back! Please enter your details</p>
                </div>
                
                {/* Use the handleSubmit function */}
                <form className='space-y-4' onSubmit={handleSubmit}>
                    <div className='space-y-2'>
                        <label htmlFor="username" className='block text-sm font-medium text-gray-700'>Username</label>
                        <input 
                            id="username"
                            className='w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200'
                            type="text" 
                            placeholder='Enter your username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className='space-y-2'>
                        <label htmlFor="password" className='block text-sm font-medium text-gray-700'>Password</label>
                        <input 
                            id="password"
                            className='w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200'
                            type="password" 
                            placeholder='Enter your password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <button 
                        type="submit"
                        className='w-full py-3 px-4 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200'
                    >
                        Log in
                    </button>

                    <div className='text-center mt-4'>
                        <p className='text-gray-600'>
                            Don't have an account?{' '}
                            <Link to="/signup" className='text-blue-600 hover:text-blue-800 font-semibold'>
                                Sign up Now
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LogInPage;