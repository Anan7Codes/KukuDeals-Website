import React, { useState, useEffect } from 'react'
import moment from 'moment';
import { useTranslation } from "next-i18next";

const EarlyBird = ({ expiryTimestamp, value, freq }) => {
    const  { t, i18n } = useTranslation()
    const [currentTime, setCurrentTime] = useState(moment(new Date(expiryTimestamp)));
    const timeBetween = moment.duration(moment(new Date(expiryTimestamp)).add(value, freq).diff(currentTime))

    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentTime(moment());
        }, 1000);
    
        return () => clearInterval(interval);
    }, []);

    if(timeBetween > 0) {
        return (
            <>   
                <p className='text-white text-base font-semibold animate-pulse'>{t('early-bird-offer')}: <span className='text-[#ffd601]'>{timeBetween.days()}d {timeBetween.hours()}h {timeBetween.minutes()}m {timeBetween.seconds()}s</span></p>
                <p className='text-white text-xs animate-pulse'>{t("early-bird-desc")}</p>
            </>
        )
    }
    return null    
}

export default EarlyBird