import { FC, useContext, useEffect, useState } from 'react';
import './Product.css';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import ProductService from './services/ProductService';
import Modal from '../../modal/modal';
// import EditProduct from './EditProduct';
import { Context } from '../../store/rootContextProvider';
import { useProducts } from './state/ProductProvider';
import EditProduct from './EditProduct';

const Product: FC = () => {
    const { id } = useParams<{ id: string }>();
    const { store } = useContext(Context);
    const { product, setProduct } = useProducts();
    
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
          if (id) {
            const response = await ProductService.getProduct(id);
            setProduct(response.data);
          }
        };
        fetchData();
    }, [id, setProduct]);

    const handleDeleteProduct = async (productId: string) => {
        const response = await ProductService.deleteProduct(productId);
        setProduct(response.data);
    }

    if (!product) {
        return null;
    }

    return (
      <div className='product'>
        {
            <div 
                className='product__post' 
                key={product.id} 
            >
                {store.user.role === 'Admin' ?
                <>
                    <button className='button button--outline-light' onClick={() => {handleDeleteProduct(product.id); window.location.href = `/` }}>
                        Delete
                    </button>
                    <button className='button button--outline-light' onClick={() => setEditMode(true)}
                    >
                        Edit
                    </button>
                </>: null
                }
                
                <div 
                    className='mainBoard__post' 
                    key={product.id} 
                    onClick={() => window.location.href = `/product/${product.id}`
                }>
                    <h5 className='mainBoard__post__user'>
                        {"Quantity: " + product.quantity}
                    </h5>
                    <h2 className='mainBoard__post__title'>
                        {product.name}
                    </h2>
                    <div className='product__post__content' >
                        {"Price VAT: " + product.priceWithVAT}
                    </div>
                    <h6 className='mainBoard__post__date'>
                    {"Price per unit: " + product.pricePerUnit}
                    </h6>
                </div>
            </div>
        }
        <Modal modalOpen={editMode} onClose={() => setEditMode(false)}>
            <EditProduct product={product} onClose={() => setEditMode(false)}/>
        </Modal>
        </div>
    );
}

export default observer(Product);
