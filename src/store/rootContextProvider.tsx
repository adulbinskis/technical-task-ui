import React, { FC, createContext } from 'react';
// import { QuestionsProvider } from '../components/Question/state/QuestionsProvider';
// import { AnswersProvider } from '../components/Answers/state/AnswersContext';
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
            {/* <QuestionsProvider> */}
                {/* <AnswersProvider> */}
                    {children}
                {/* </AnswersProvider> */}
            {/* </QuestionsProvider> */}
        </Context.Provider>
    );
};

export default RootContextProvider;