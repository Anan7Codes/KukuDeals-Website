import '../styles/globals.css'
import { useState } from 'react'
import { LanguageContext } from '@/contexts/language'
import { nhost } from '@/utils/nhost'
import { NhostAuthProvider } from "@nhost/react-auth";

function MyApp({ Component, pageProps }) {
  const [ english, setEnglish ] = useState(true)
  return (
    <NhostAuthProvider nhost={nhost}>
      <LanguageContext.Provider value={{english, setEnglish}}>
        <Component {...pageProps} />
      </LanguageContext.Provider>
    </NhostAuthProvider>
  )
}

export default MyApp