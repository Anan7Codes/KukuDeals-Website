import '../styles/globals.css'
import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion"
import { useState } from 'react'
import { LanguageContext } from '@/contexts/language'
import { ToastContainer } from 'react-toastify';
import { animations } from "@/utils/animation"
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css'
import CartContext from '@/contexts/cart/CartContext';
import UserProvider from '@/contexts/user/UserContext';

function MyApp({ Component, pageProps, router }) {
  const [english, setEnglish] = useState(true)
  return (
    <UserProvider>
      <LanguageContext.Provider value={{ english, setEnglish }}>
        <CartContext>
        <LazyMotion features={domAnimation}>
          <AnimatePresence exitBeforeEnter={true}>
            <m.div
              key={router.route.concat(animations[0].name)}
              className="page-wrap"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={animations[0].variants}
              transition={animations[0].transition}
            >
              <Component {...pageProps} />
              <ToastContainer />
            </m.div>
          </AnimatePresence>
        </LazyMotion>
        </CartContext>
      </LanguageContext.Provider>
    </UserProvider>
  )
}

export default MyApp