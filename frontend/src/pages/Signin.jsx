// SignIn.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import {motion} from "framer-motion"
import { useNavigate } from 'react-router-dom'; 
import './Signin.css'; 


const schema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
});

const Signin = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); 

    const onSubmit = async (data) => {
        setLoading(true);
        setErrorMessage('');

        try {
            const response = await axios.post('http://localhost:5000/api/v1/user/login', {
                username: data.username,
                password: data.password,
            });

            
            if (response.status === 200) {
              
                localStorage.setItem('token', response.data.token);
              
                navigate('/home');
            }
        } catch (error) {
           
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message || 'Login failed');
            } else {
                setErrorMessage('An unexpected error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 ,x:0}}
            animate={{ opacity: 1, x: 50 }}
            exit={{ opacity: 0 }}
            className="signin-container">
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input
                        type="text"
                        placeholder="Username"
                        {...register('username')}
                    />
                    {errors.username && <p className="error">{errors.username.message}</p>}
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        {...register('password')}
                    />
                    {errors.password && <p className="error">{errors.password.message}</p>}
                </div>
                {errorMessage && <p className="error">{errorMessage}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign In'}
                </button>
            </form>
        </motion.div>
    );
};

export default Signin;