import '../styles/globals.css'
import { appWithTranslation } from 'next-i18next'
import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion"
import { ToastContainer } from 'react-toastify';
import { animations } from "@/utils/animation"
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css'
import CartContext from '@/contexts/cart/CartContext';
import UserProvider from '@/contexts/user/UserContext';

function MyApp({ Component, pageProps, router }) {

  return (
    <UserProvider>
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
    </UserProvider>
  )
}

export default appWithTranslation(MyApp)