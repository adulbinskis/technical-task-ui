import {FC, useState, useContext} from 'react';
import { observer } from 'mobx-react-lite';
import Modal from "../../modal/modal";
import Login from "../Authorization/Login";
import Register from "../Authorization/Register";
import "./Header.css"
import { Context } from '../../store/rootContextProvider';
import CreateProduct from '../Products/CreateProduct';

const Header: FC = () =>{
    const {store} = useContext(Context);

    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [registerModalOpen, setRegisterModalOpen] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);

    const handleOpenLogin = () => {
        setLoginModalOpen(true);
        setRegisterModalOpen(false);
    };

    const handleOpenRegister = () => {
        setRegisterModalOpen(true);
        setLoginModalOpen(false);
    };

    const handleCloseModal = () => {
        setLoginModalOpen(false);
        setRegisterModalOpen(false);
    };

    const handleLogout = async () => {
        await store.logout();
    };

    const handleOpenCreate = () => {
        setCreateOpen(true);
    }

    return(
        <header className="header">
            <div className="header__container">
                <div className="header__content">
                    <div className='header__content__buttons'>
                    <button 
                        type='button' 
                        className="button button--outline-light"
                        onClick={() => window.location.href = `../`}
                    >
                        <i className="fa fa-home"></i> Home
                    </button>
                    {store.user.role === 'Admin' ?
                        <button className="button button--outline-light" onClick={handleOpenCreate}>Create Product</button>: null
                    }
                    
                    </div>
                    <div className="header__content__email">{store.user.userName}</div>
                    <div className="header__content__buttons">
                        {!store.isAuth ?
                            <>
                                <button type="button" className="button button--outline-light" onClick={handleOpenLogin}>Login</button>
                                <button type="button" className="button button--warning" onClick={handleOpenRegister}>Sign-up</button>
                            </> : 
                            <>
                                <button type="button" className="button button--outline-light" onClick={handleLogout}>Logout</button>
                            </>
                        }
                    </div>
                </div>
            </div>
            
            <Modal modalOpen={loginModalOpen} onClose={handleCloseModal}>
                <Login onClose={handleCloseModal}/>
            </Modal>
            <Modal modalOpen={registerModalOpen} onClose={handleCloseModal}>
                <Register onClose={handleCloseModal} openLogin={handleOpenLogin} />
            </Modal>
            <Modal modalOpen={createOpen} onClose={()=>setCreateOpen(false)}>
                <CreateProduct onClose={() => setCreateOpen(false)}/>     
            </Modal>
        </header>

    )
}

export default observer(Header)
