import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { supabase } from '@/utils/supabaseClient';
import { useTranslation } from "next-i18next"
import * as yup from 'yup'
import { Formik } from 'formik'

export default function ChangePassword() {
  const { t, i18n } = useTranslation()
  const router = useRouter();

  const ChangePasswordFunction = async ({ newPassword,confirmPassword }) => {
    try {
      if( newPassword !== confirmPassword ) {
          return toast.error("Passwords do not match", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          });
      }
      const { error } = await supabase.auth.update({password: newPassword })
      if (error) {
        toast.error(error.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
        return
      }
      toast.success("Signed in successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      return router.push('/')
    } catch (e) {
        console.log(e)
    }
  }
  return (
    <div>
      <div>
        <p className="text-3xl font-bold font-title text-[#ffd601]">{t('change-password')}</p>
        <div className="">
          <Formik
            initialValues={{
              oldPassword: '',
              newPassword: '',
              confirmPassword: ''
            }}
            onSubmit={values => ChangePasswordFunction(values)}
            validationSchema={yup.object().shape({
              newPassword: yup
                .string()
                .min(6, 'Password should be atleast 6 chars.')
                .max(15, 'Password should not excced 15 chars.')
                .required('Password is required'),
              confirmPassword: yup
                .string()
                .min(6, 'Password should be atleast 6 chars.')
                .max(15, 'Password should not excced 15 chars.')
                .required('Password is required'),
            })}
          >
            {({ values, handleChange, errors, touched, isValid, setFieldTouched, handleSubmit }) => (
              <div className="flex flex-col">
                <input
                  placeholder="New Password"
                  type="password"
                  className={`text-white placeholder:text-xs placeholder:text-[#bebebe] text-lg bg-[#2c2c2c] ${i18n.language === 'ar' ? 'pr-3 ml-3' : 'pl-3 mr-3'} w-full lg:w-[26rem] mt-4 outline-none rounded-[5px] h-14`}
                  value={values.newPassword}
                  onChange={handleChange('newPassword')}
                  onBlur={() => setFieldTouched('newPassword')}
                />
                {touched.newPassword && errors.newPassword &&
                  <p className="text-xs text-red-600">{errors.newPassword}</p>
                }
                <input
                  placeholder="Confirm Password"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange('confirmPassword')}
                  onBlur={() => setFieldTouched('confirmPassword')}
                  className={`text-white placeholder:text-xs placeholder:text-[#bebebe] text-lg bg-[#2c2c2c] ${i18n.language === 'ar' ? 'pr-3 ml-3' : 'pl-3 mr-3'} w-full lg:w-[26rem] mt-4 outline-none rounded-[5px] h-14`}
                />
                {touched.confirmPassword && errors.confirmPassword &&
                  <p className="text-xs text-red-600">{errors.confirmPassword}</p>
                }
                <button onClick={isValid ? handleSubmit : null} type="submit" className="bg-[#ffd601] mt-4 font-semibold hover:bg-[#ceb32f] text-black w-full lg:w-48 h-12 text-center rounded-[10px]">
                  {t('change-password')}
                </button>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
