import React, { FC, createContext } from 'react';
import { ProductsProvider } from '../components/Products/state/ProductProvider';
import Store from './store';

interface State {
    store: Store,
  }
  
export const store = new Store();
  
export const Context = createContext<State>({
    store,
})
  

type Props = { children: React.ReactNode };

const RootContextProvider: FC<Props> = ({ children }) => {
    return (
        <Context.Provider value={{ store }}>
            <ProductsProvider>
                    {children}
            </ProductsProvider>
        </Context.Provider>
    );
};

export default RootContextProvider;