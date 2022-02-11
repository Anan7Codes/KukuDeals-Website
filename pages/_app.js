import '../styles/globals.css'
import { useState } from 'react'
import { LanguageContext } from '@/contexts/language'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CartContext from '@/contexts/cart/CartContext';

function MyApp({ Component, pageProps }) {
  const [english, setEnglish] = useState(true)
  return (
    <LanguageContext.Provider value={{ english, setEnglish }}>
      <CartContext>
        <Component {...pageProps} />
        <ToastContainer />
      </CartContext>
    </LanguageContext.Provider>
  )
}

export default MyApp