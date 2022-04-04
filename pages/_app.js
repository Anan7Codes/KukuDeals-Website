import '../styles/globals.css'
import Head from 'next/head'
import { useEffect } from 'react';
import TagManager from 'react-gtm-module';
import { appWithTranslation } from 'next-i18next'
import { ToastContainer } from 'react-toastify';
import { useTranslation } from "next-i18next";
import NextNProgress from "nextjs-progressbar";
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css'
import CartContext from '@/contexts/cart/CartContext';
import UserProvider from '@/contexts/user/UserContext';

function MyApp({ Component, pageProps }) {
  const { i18n } = useTranslation()
  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-TX2G7LG' });
  }, []);

  return (
    <UserProvider>
      <CartContext>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
        </Head>
        <NextNProgress color="#ffd601" height={1}/>
        <Component {...pageProps} />
        {i18n.language === 'ar' ? <ToastContainer theme='dark' rtl/> : <ToastContainer theme='dark'/> }
      </CartContext>
    </UserProvider>
  )
}

export default appWithTranslation(MyApp)