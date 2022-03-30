import { useTranslation } from "next-i18next";

export default function Banner() {
  const  { i18n } = useTranslation()

  return (
    <div className="py-2">
      <div className={`bg-white mx-auto w-full h-96 bg-cover rounded-[10px] ${i18n.language === 'ar' ? "bg-[url('https://jipvpsiwfwiyqyxpssli.supabase.co/storage/v1/object/public/banners/arabic-mob.webp')] md:bg-[url('https://jipvpsiwfwiyqyxpssli.supabase.co/storage/v1/object/public/banners/arabic-web.webp')]" : "bg-[url('https://jipvpsiwfwiyqyxpssli.supabase.co/storage/v1/object/public/banners/english-mob.webp')] md:bg-[url('https://jipvpsiwfwiyqyxpssli.supabase.co/storage/v1/object/public/banners/english-web.webp')]"} `}>
      </div>
    </div>
  );
}