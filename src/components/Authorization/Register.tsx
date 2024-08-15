import React, { FC, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import './Register.css';
import { Context } from '../../store/rootContextProvider';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

type Props = {
    onClose: () => void;
    openLogin: () => void;
};

const Register: FC<Props> = ({ onClose, openLogin }) => {
    const { store } = useContext(Context);

    return (
        <main className="register-form">
            <Formik
                initialValues={{
                    email: '',
                    userName: '',
                    password: ''
                }}
                validationSchema={Yup.object({
                    email: Yup.string().email('Invalid email address').required('Required'),
                    userName: Yup.string()
                        .required('Required')
                        .min(3, 'Password must be at least 3 characters long')
                        .max(254, 'Password must be at most 254 characters long'),
                    password: Yup.string()            
                        .required('Password is required')   
                        .min(6, 'Password must be at least 6 characters long')
                        .max(254, 'Password must be at most 254 characters long')
                        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
                })}
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                    try {
                        await store.registration(values.email, values.userName, values.password);
                        onClose();
                        openLogin();
                    } catch (error) {
                        setErrors({ password: 'Registration failed. Please try again.' });
                    }
                    setSubmitting(false);
                }}
            >
                <Form>
                    <h1 className="register-form__title">Please register</h1>

                    <div className="register-form__field">
                        <Field type="email" name="email" placeholder="name@example.com" className="register-form__input" />
                        <ErrorMessage name="email" component="div" className="register-form__error" />
                    </div>

                    <div className="register-form__field">
                        <Field type="text" name="userName" placeholder="User name" className="register-form__input" />
                        <ErrorMessage name="userName" component="div" className="register-form__error" />
                    </div>

                    <div className="register-form__field">
                        <Field type="password" name="password" placeholder="Password" className="register-form__input" />
                        <ErrorMessage name="password" component="div" className="register-form__error" />
                    </div>

                    <ErrorMessage name="submit" component="div" className="register-form__error" />

                    <button className="register-form__button" type="submit">
                        Register
                    </button>
                </Form>
            </Formik>
        </main>
    );
};

export default observer(Register);
