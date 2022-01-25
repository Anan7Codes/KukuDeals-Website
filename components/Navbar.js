import { useRouter,useEffect } from "next/router";
import { useState } from "react";
import Nav from "./Nav";
import cookies from 'js-cookie'
import en from '../locales/en';
import ar from '../locales/ar';



function Navbar() {
  const [direction, setDirection] = useState(true);
  const [language,setLanguage] = useState('en-US');
  const router = useRouter();
  const { locale } = router;
  const languages = [
      {
          code: 'en-US',
          name: 'English',
          dir: 'ltr'

      },
      {
          code: 'ar',
          name: 'العربية',
          dir: 'rtl'
      }
  ]
  const currentLanguageCode = cookies.get('i18next') || 'en-US';
  const currentLanguage = languages.find(l => l.code === currentLanguageCode)

  locale === 'en-US' ? en : ar

  useEffect(() => {
      document.body.dir = currentLanguage.dir || 'ltr'
      console.log("currentLanguage", currentLanguage);
      console.log("currentLanguageCode", currentLanguageCode);
      console.log(props);
  }, [currentLanguage])

  const handleDirection = (e) => {
    e.preventDefault();
    setDirection(!direction);
    setLanguage('ar')
    console.log("direction", direction);
    console.log("language", language);


  };

  return (
    <>
      <nav className="pb-3">
        {direction ? (
          <Nav handleDirection={handleDirection} 
          setDirection={setDirection}  />
        ) : (
          <div dir="rtl">
            <Nav
              handleDirection={handleDirection}
              setDirection={setDirection} 
            />
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
// export {
//   MyContext
// }
