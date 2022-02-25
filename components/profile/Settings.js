import * as yup from 'yup'
import { Formik } from 'formik'

export default function Settings() {
  const ChangePassword = async ({ oldPassword,newPassword,confirmPassword }) => {

  }
  return (
    <div>
      <div>
        <p className="text-3xl font-bold font-title text-[#ffd601]">Change Password</p>
        <div className="">
          <Formik
            initialValues={{
              oldPassword: '',
              newPassword: '',
              confirmPassword: ''
            }}
            onSubmit={values => ChangePassword(values)}
            validationSchema={yup.object().shape({
              oldPassword: yup
                .string()
                .min(6, 'Password should be atleast 6 chars.')
                .max(15, 'Password should not excced 15 chars.')
                .required('Password is required'),
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
                  placeholder="Current Password"
                  type="password"
                  className="text-white placeholder:text-xs placeholder:text-[#bebebe] text-lg bg-[#2c2c2c] pl-3 mr-3 w-full lg:w-[26rem] mt-4 outline-none  rounded-[5px]  h-14 "
                  value={values.oldPassword}
                  onChange={handleChange('oldPassword')}
                  onBlur={() => setFieldTouched('oldPassword')}
                />
                {touched.oldPassword && errors.oldPassword &&
                  <p className="text-xs text-red-600">{errors.oldPassword}</p>
                }
                <input
                  placeholder="New Password"
                  type="password"
                  className="text-white placeholder:text-xs placeholder:text-[#bebebe] text-lg bg-[#2c2c2c] pl-3 mr-3 w-full lg:w-[26rem] mt-4 outline-none  rounded-[5px]  h-14 "
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
                  className="text-white placeholder:text-xs placeholder:text-[#bebebe] text-lg bg-[#2c2c2c] pl-3 mr-3 w-full lg:w-[26rem] mt-4 outline-none  rounded-[5px]  h-14 "
                />
                {touched.confirmPassword && errors.confirmPassword &&
                  <p className="text-xs text-red-600">{errors.confirmPassword}</p>
                }
                <button onClick={isValid ? handleSubmit : null} type="submit" className="bg-[#ffd601] mt-4 font-semibold hover:bg-[#ceb32f] text-black w-full lg:w-52 h-16 text-center  rounded-[10px]">
                  Update Password
                </button>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
