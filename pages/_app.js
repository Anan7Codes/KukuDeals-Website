import '../styles/globals.css'
import { useState } from 'react'
import { LanguageContext } from '@/contexts/language'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CartContext from '@/contexts/cart/CartContext';
import UserProvider from '@/contexts/user/UserContext';

function MyApp({ Component, pageProps }) {
  const [english, setEnglish] = useState(true)
  return (
    <UserProvider>
      <LanguageContext.Provider value={{ english, setEnglish }}>
        <CartContext>
          <Component {...pageProps} />
          <ToastContainer />
        </CartContext>
      </LanguageContext.Provider>
    </UserProvider>
  )
}

export default MyApp