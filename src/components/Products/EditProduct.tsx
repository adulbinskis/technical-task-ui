import React from 'react';
import './EditProduct.css';
import { observer } from 'mobx-react-lite';
import ProductService from './services/ProductService';
import { ProductDetail } from './models/ProductDetail';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

type Props = {
    product: ProductDetail;
    onClose: () => void;
};

const EditProduct: React.FC<Props> = ({ product, onClose }) => {
    const initialValues = {
        name: product.name,
        quantity: product.quantity,
        pricePerUnit: product.pricePerUnit
    };

    const validationSchema = Yup.object({
        name: Yup.string()
            .required('Name is required.')
            .max(100, 'Name must not exceed 100 characters.'),
        quantity: Yup.number()
            .required('Quantity is required.')
            .min(0, 'Quantity must be greater than or equal to 0.'),
        pricePerUnit: Yup.number()
            .required('Price per unit is required.')
            .moreThan(0, 'Price per unit must be greater than 0.'),
    });

    const handleUpdate = async (values: { name: string; quantity: number; pricePerUnit: number}) => {
        try {
            const response = await ProductService.updateProduct(product.id, values.name, values.quantity, values.pricePerUnit);
            product.name = response.data.name;
            product.quantity = response.data.quantity;
            product.pricePerUnit = response.data.pricePerUnit;
            product.priceWithVAT = response.data.priceWithVAT;
            onClose();
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div className='editProduct'>
            <h2>Edit Product</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => handleUpdate(values)}
            >
                {({ isValid, dirty, values, initialValues }) => {
                    const isValuesChanged = JSON.stringify(values) !== JSON.stringify(initialValues);
                    return (
                        <Form>
                            <div>
                                <label htmlFor='name'>Name</label>
                                <Field
                                    type='text'
                                    name='name'
                                    placeholder='Name'
                                />
                                <ErrorMessage name='name' component='div' className='error' />
                            </div>
                            <div>
                                <label htmlFor='quantity'>Quantity</label>
                                <Field
                                    type='number'
                                    name='quantity'
                                    placeholder='Quantity'
                                />
                                <ErrorMessage name='quantity' component='div' className='error' />
                            </div>
                            <div>
                                <label htmlFor='pricePerUnit'>Price Per Unit</label>
                                <Field
                                    type='number'
                                    name='pricePerUnit'
                                    placeholder='Price Per Unit'
                                />
                                <ErrorMessage name='pricePerUnit' component='div' className='error' />
                            </div>
                            <div>
                                <label htmlFor='priceWithVAT'>Price With VAT</label>
                                <Field
                                    type='number'
                                    name='priceWithVAT'
                                    placeholder='Price With VAT'
                                />
                                <ErrorMessage name='priceWithVAT' component='div' className='error' />
                            </div>
                            <button type='submit' disabled={!(isValid && dirty && isValuesChanged)}>
                                Save
                            </button>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default observer(EditProduct);
