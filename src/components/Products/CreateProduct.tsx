import './CreateProduct.css';
import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import ProductService from './services/ProductService';
import { useProducts } from './state/ProductProvider';

type Props = {
    onClose: () => void;
};

const ProductCreate: FC<Props> = ({ onClose }) => {
    const { products, setProducts } = useProducts();

    const initialValues = {
        name: '',
        quantity: 0,
        pricePerUnit: 0,
    };

    const validationSchema = Yup.object({
        name: Yup.string()
            .required('Name is required.')
            .max(100, 'Name must be at most 100 characters long.'),
        quantity: Yup.number()
            .required('Quantity is required.')
            .min(0, 'Quantity must be greater than or equal to 0.'),
        pricePerUnit: Yup.number()
            .required('Price per unit is required.')
            .moreThan(0, 'Price per unit must be greater than 0.'),
    });

    const handleCreate = async (values: { name: string; quantity: number; pricePerUnit: number; }) => {
        try {
            const response = await ProductService.createProduct(values.name, values.quantity, values.pricePerUnit);
            if (response && response.data) {
                setProducts([response.data, ...products]);
                onClose();
            }
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    return (
        <div className='createProduct'>
            <h2>Create New Product</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                    handleCreate(values);
                    resetForm();
                }}
            >
                {({ isValid, dirty }) => (
                    <Form>
                        <div className='form-group'>
                            <label htmlFor='name'>Name</label>
                            <Field
                                type='text'
                                name='name'
                                id='name'
                                placeholder='Name'
                            />
                            <ErrorMessage name='name' component='div' className='error' />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='quantity'>Quantity</label>
                            <Field
                                type='number'
                                name='quantity'
                                id='quantity'
                                placeholder='Quantity'
                            />
                            <ErrorMessage name='quantity' component='div' className='error' />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='pricePerUnit'>Price Per Unit</label>
                            <Field
                                type='number'
                                name='pricePerUnit'
                                id='pricePerUnit'
                                placeholder='Price Per Unit'
                            />
                            <ErrorMessage name='pricePerUnit' component='div' className='error' />
                        </div>
                        <button type='submit' disabled={!(isValid && dirty)}>
                            Save
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default observer(ProductCreate);
