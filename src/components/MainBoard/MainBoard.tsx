import { FC, useEffect, useState } from 'react';
import './MainBoard.css'
import { observer } from 'mobx-react-lite';
import MainBoardService from './services/MainBoardService';
import { useProducts } from '../Products/state/ProductProvider';

const MainBoard: FC =()=> {
  const { products, setProducts } = useProducts();
  const [searchCriteria, setSearchCriteria] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
       const response = await MainBoardService.getProductsList(searchCriteria, currentPage);
       setProducts(response.data.products);
       setTotalPages(response.data.totalPages);
    }
    fetchData();
  }, [currentPage, searchCriteria, setProducts]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className='mainBoard'>
      <div className='mainBoard__search'>
          <input 
            className='mainBoard__input' 
            onChange={(e) => {setSearchCriteria(e.target.value); setCurrentPage(1)}}
            placeholder='Search...'
          >
        </input>
      </div>

      <div className='pagination'>
        <span className='pagination__counter'>Page {currentPage} of {totalPages}</span>
        {currentPage !== totalPages?<button className='button button--outline-light' onClick={handleNextPage} >Next</button>:null}
        {currentPage !== 1?<button className='button button--outline-light' onClick={handlePrevPage}>Previous</button>: null}
      </div>

      {
        products.map((product) => 
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
        )
      }
    </div>
  );
}

export default observer(MainBoard)