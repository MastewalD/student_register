import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    dateOfBirth: yup.date().required('Date of birth is required').nullable(),
    phoneNumber: yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required('Phone number is required'),
    address: yup.object().shape({
        street: yup.string(),
        city: yup.string(),
        state: yup.string(),
        zip: yup.string().matches(/^[0-9]{5}$/, 'ZIP code must be 5 digits'),
    }),
    emergencyContact: yup.object().shape({
        name: yup.string().required('Emergency contact name is required'),
        phoneNumber: yup.string().matches(/^[0-9]{10}$/, 'Emergency contact phone number must be 10 digits').required('Emergency contact phone number is required'),
        relationship: yup.string().required('Relationship is required'),
    }),
});

const StudentRegistration = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div>
            <h2>Student Registration</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>First Name</label>
                    <input {...register('firstName')} />
                    {errors.firstName && <p>{errors.firstName.message}</p>}
                </div>
                <div>
                    <label>Last Name</label>
                    <input {...register('lastName')} />
                    {errors.lastName && <p>{errors.lastName.message}</p>}
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" {...register('email')} />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" {...register('password')} />
                    {errors.password && <p>{errors.password.message}</p>}
                </div>
                <div>
                    <label>Date of Birth</label>
                    <input type="date" {...register('dateOfBirth')} />
                    {errors.dateOfBirth && <p>{errors.dateOfBirth.message}</p>}
                </div>
                <div>
                    <label>Phone Number</label>
                    <input {...register('phoneNumber')} />
                    {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
                </div>
                <div>
                    <h3>Address</h3>
                    <label>Street</label>
                    <input {...register('address.street')} />
                    
                    <label>City</label>
                    <input {...register('address.city')} />
                    
                    <label>State</label>
                    <input {...register('address.state')} />
                    
                    <label>ZIP Code</label>
                    <input {...register('address.zip')} />
                    {errors.address?.zip && <p>{errors.address.zip.message}</p>}
                </div>
                <div>
                    <h3>Emergency Contact</h3>
                    <label>Name</label>
                    <input {...register('emergencyContact.name')} />
                    {errors.emergencyContact?.name && <p>{errors.emergencyContact.name.message}</p>}
                    
                    <label>Phone Number</label>
                    <input {...register('emergencyContact.phoneNumber')} />
                    {errors.emergencyContact?.phoneNumber && <p>{errors.emergencyContact.phoneNumber.message}</p>}
                    
                    <label>Relationship</label>
                    <input {...register('emergencyContact.relationship')} />
                    {errors.emergencyContact?.relationship && <p>{errors.emergencyContact.relationship.message}</p>}
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default StudentRegistration;