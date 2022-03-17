import React, { useEffect, useState } from "react";
import { CountryDropdown } from "react-country-region-selector";
import { supabase } from "@/utils/supabaseClient";
import { toast } from "react-toastify";
import { useTranslation } from "next-i18next"

export default function PersonalDetails() {  
  const { t, i18n } = useTranslation()
  const [email, setEmail] = useState()
  const [gender, setGender] = useState()
  const [personalDetails, setPersonalDetails] = useState({})
  const [newPersonalDetails, setNewPersonalDetails] = useState({})

  useEffect(() => {
    const GetUserData = async () => {
      const userInfo = await supabase.auth.user()
      const { nationality, countryOfResidence } = userInfo.user_metadata
      const { name, gender } = userInfo.user_metadata
      const { email } = userInfo
      const [firstname, lastname] = name.split(' ');
      setPersonalDetails({ nationality, countryOfResidence, firstname, lastname ,name })
      setNewPersonalDetails({ nationality, countryOfResidence, firstname, lastname, name})
      setGender(gender)
      setEmail(email)
    }
    GetUserData()
  }, [])

  async function InsertPersonalDetails(e) {
    e.preventDefault()
    if (JSON.stringify(personalDetails) === JSON.stringify(newPersonalDetails)) {
      toast.info(t("no-change-in-personal"), {
        position: i18n.language === 'ar' ? "top-left" : "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      return
    }
    try{
      const { user, error } = await supabase.auth.update({ 
        data: { 
          countryOfResidence: newPersonalDetails.countryOfResidence,        
        } 
      })

      if(error) {
        return toast.error(error, {
          position: i18n.language === 'ar' ? "top-left" : "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
      toast.success(t("update-success"), {
        position: i18n.language === 'ar' ? "top-left" : "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }catch(e){
      console.log(e);
    }
  }
  return (
    <div>
        <p className="text-3xl font-bold font-title text-[#ffd601]">
          {t('personal-details')}
        </p>
        <div>
          <div className="lg:flex text-lg">
            <div className="flex flex-row items-center lg:w-[98%] w-full mt-4 bg-[#2c2c2c] rounded-[5px] h-14">
              <p className={`text-[#bebebe] text-xs ${i18n.language === 'ar' ? 'mr-2' : 'ml-2'} font-semibold`}>{t('firstname')}:</p>
              <div className="flex-1">
                <input className="bg-[#2c2c2c] border-8 border-[#2c2c2c] text-[#bebebe] text-xs outline-none lg:w-[98%] w-full"
                  value={newPersonalDetails.firstname} disabled/>
              </div>
            </div>
            <div className="flex flex-row items-center lg:w-[98%] w-full mt-4 bg-[#2c2c2c] rounded-[5px] h-14 mx-2">
              <p className={`text-[#bebebe] text-xs ${i18n.language === 'ar' ? 'mr-2' : 'ml-2'} font-semibold`}>{t('lastname')}:</p>
              <div className="flex-1">
                <input className="bg-[#2c2c2c] border-8 border-[#2c2c2c] text-[#bebebe] text-xs outline-none lg:w-[98%] w-full"
                  value={newPersonalDetails.lastname} disabled/>
              </div>
            </div>
          </div>
          <div className="lg:flex text-lg">
            <div className="flex flex-row items-center lg:w-[98%] w-full mt-4 bg-[#2c2c2c] rounded-[5px] h-14">
              <p className={`text-[#bebebe] text-xs ${i18n.language === 'ar' ? 'mr-2' : 'ml-2'} font-semibold`}>{t('email')}:</p>
              <div className="flex-1">
                <input className="bg-[#2c2c2c] border-8 border-[#2c2c2c] text-[#bebebe] text-xs outline-none lg:w-[98%] w-full"
                  value={email} disabled/>
              </div>
            </div>
            <div className="flex flex-row items-center lg:w-[98%] w-full mt-4 bg-[#2c2c2c] rounded-[5px] h-14 mx-2">
              <p className={`text-[#bebebe] text-xs ${i18n.language === 'ar' ? 'mr-2' : 'ml-2'} font-semibold`}>{t('gender')}:</p>
              <div className="flex-1">
                <input className="bg-[#2c2c2c] border-8 border-[#2c2c2c] text-[#bebebe] text-xs outline-none lg:w-[98%] w-full"
                  value={gender ? 'Male' : 'Female'} disabled/>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div div className="flex flex-row items-center lg:w-[98%] w-full mt-4 bg-[#2c2c2c] rounded-[5px] h-14">
              <p className={`text-[#bebebe] text-xs ${i18n.language === 'ar' ? 'mr-2' : 'ml-2'} font-semibold`}>{t('nationality')}:</p>
              <div className="flex-1">
                <input className="bg-[#2c2c2c] border-8 border-[#2c2c2c] text-[#bebebe] text-xs outline-none lg:w-[98%] w-full"
                  value={newPersonalDetails.nationality} disabled/>
              </div>
            </div>
            <div className="flex flex-row items-center lg:w-[98%] w-full mt-4 bg-[#2c2c2c] rounded-[5px] h-14">
              <p className={`text-[#bebebe] text-xs ${i18n.language === 'ar' ? 'mr-2' : 'ml-2'} font-semibold`}>{t('countryofresidence')}:</p>
              <div className="flex-1">
                <CountryDropdown
                  defaultOptionLabel=""
                  className="bg-[#2c2c2c] border-8 border-[#2c2c2c] text-white text-xs outline-none lg:w-[98%] w-full"
                  value={newPersonalDetails.countryOfResidence} onChange={e => setNewPersonalDetails({ ...newPersonalDetails, countryOfResidence: e })}
                /> 
              </div>
            </div>
          </div>
          <button onClick={InsertPersonalDetails} className="bg-[#ffd601] lg:justify-start w-full lg:w-40 h-12 mt-3 text-black hover:bg-[#dabd2c] font-semibold rounded-[15px]">
            {t('update')}
          </button>
        </div>
    </div>
  );
}
