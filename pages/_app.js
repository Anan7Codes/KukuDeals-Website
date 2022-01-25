import '../styles/globals.css'
import { useState } from 'react'
import { LanguageContext } from '@/contexts/language'

function MyApp({ Component, pageProps }) {
  const [ english, setEnglish ] = useState(true)
  return (
    <LanguageContext.Provider value={{english, setEnglish}}>
      <Component {...pageProps} />
    </LanguageContext.Provider>
  )
}

export default MyApp
