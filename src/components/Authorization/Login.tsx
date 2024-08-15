import React, { FC, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import './Login.css';
import { Context } from '../../store/rootContextProvider';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

type Props = {
    onClose: () => void;
};

const Login: FC<Props> = ({ onClose }) => {
    const { store } = useContext(Context);

    const handleSubmit = async (values: { email: string, password: string }) => {
        try {
            await store.login(values.email, values.password);
            onClose();
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string()
            .required('Password is required')   
            .min(6, 'Password must be at least 6 characters long')
            .max(254, 'Password must be at most 254 characters long')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
   
    });

    return (
        <div className="login-form">
            <h1 className="login-form__title">Please login</h1>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div className="login-form__field">
                        <Field
                            type="email"
                            name="email"
                            className="login-form__input"
                            placeholder="name@example.com"
                        />
                        <ErrorMessage name="email" component="div" className="login-form__error" />
                    </div>
                    <div className="login-form__field">
                        <Field
                            type="password"
                            name="password"
                            className="login-form__input"
                            placeholder="Password"
                        />
                        <ErrorMessage name="password" component="div" className="login-form__error" />
                    </div>
                    <button className="login-form__button" type="submit">Login</button>
                </Form>
            </Formik>
        </div>
    );
};

export default observer(Login);