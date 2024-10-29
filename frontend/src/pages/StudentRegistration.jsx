import React from 'react';
import { useForm } from 'react-hook-form';
import "./studentRegister.css";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    middleName: yup.string().required('Middle name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    dateOfBirth: yup.date().required('Date of birth is required').nullable(),
    phoneNumber: yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required('Phone number is required'),
    address: yup.object().shape({
        street: yup.string(),
        city: yup.string(),
        country: yup.string(),
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
        console.log(data); // This should log the form data
    };

    return (
        <div className='register'>
            <h2>Student Registration</h2>
            <div className="form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <h3>Student Information</h3>
                        <div className='one'>
                            <div>
                                <input placeholder='First Name' {...register('firstName')} />
                                {errors.firstName && <p>{errors.firstName.message}</p>}
                            </div>

                            <div>
                                <input placeholder='Middle Name' {...register('middleName')} />
                                {errors.middleName && <p>{errors.middleName.message}</p>}
                            </div>

                            <div>
                                <input placeholder='Last Name' {...register('lastName')} />
                                {errors.lastName && <p>{errors.lastName.message}</p>}
                            </div>
                        </div>
                        
                        <div className='one'>
                            <div>
                                <input placeholder='Email' type="email" {...register('email')} />
                                {errors.email && <p>{errors.email.message}</p>}
                            </div>
                    
                            <div>
                                <input placeholder='Phone Number' {...register('phoneNumber')} />
                                {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
                            </div>
                            <div>
                                <input placeholder='Birth Date' type="date" {...register('dateOfBirth')} />
                                {errors.dateOfBirth && <p>{errors.dateOfBirth.message}</p>}
                            </div>
                        </div>
                        
                        <div>
                            <h3>Address</h3>
                            <input placeholder='Street Address' {...register('address.street')} />
                            <input placeholder='City' {...register('address.city')} />
                            <input placeholder='Country' {...register('address.country')} />
                        </div>
                    
                        <div>
                            <h3>Emergency Contact</h3>
                            <input placeholder='Name' {...register('emergencyContact.name')} />
                            {errors.emergencyContact?.name && <p>{errors.emergencyContact.name.message}</p>}
                            
                            <input placeholder='Phone Number' {...register('emergencyContact.phoneNumber')} />
                            {errors.emergencyContact?.phoneNumber && <p>{errors.emergencyContact.phoneNumber.message}</p>}
                                  
                            <input placeholder='Relation' {...register('emergencyContact.relationship')} />
                            {errors.emergencyContact?.relationship && <p>{errors.emergencyContact.relationship.message}</p>}
                        </div>
                        <div>
                            <h3>Courses</h3>
                        </div>
                        <button type="submit">Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StudentRegistration;