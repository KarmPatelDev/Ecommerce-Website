import { useState, useEffect, createContext, useContext} from "react";

const CartContext = createContext();

const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const existCartProducts = localStorage.getItem('cart');
        if(existCartProducts) setCart(JSON.parse(existCartProducts));
    }, []);

    return(
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    );
};

// Custom Hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };