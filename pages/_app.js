import React, { useState } from 'react';
import '../styles/globals.css'

const MyContext = React.createContext()
function MyApp({ Component, pageProps }) {

  const [translator, setTranslator] = useState(true)
  const handleLanguages = (e) => {
    e.preventDefault();
    setTranslator(!translator)
    console.log("translator", translator);

  };

  return (
    <MyContext.Provider value={setTranslator}>
      <Component {...pageProps} />
    </MyContext.Provider>

  )
}

export default MyApp
export {
  MyContext
}
