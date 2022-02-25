import { supabase } from "@/utils/supabaseClient";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";
import { Formik } from "formik";

export default function ShippingAddress() {
  const [shippingAddress, setShippingAddress] = useState({});
  const [reload, setReload] = useState();

  useEffect(() => {
    const InitialCall = async () => {
      const userInfo = await supabase.auth.user();
      const { apartmentNo, buildingName, location } = userInfo.user_metadata;
      await setShippingAddress({ apartmentNo, buildingName, location });
    };
    InitialCall();
  }, [reload]);

  const UpdateShippingAddress = async (values) => {
    if (JSON.stringify(shippingAddress) === JSON.stringify(values)) {
      toast.info("No change in Shipping Address", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    try {
      const { user, error } = await supabase.auth.update({
        data: values,
      });
      if (error) {
        toast.error(error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }
      toast.success("Succesfully Updated", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setReload(user);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <p className="text-3xl  font-bold mt-4 font-title text-[#ffd601]">
        Shipping Address
      </p>
      <p className="text-2xl font-bold mt-4 font-title text-white">
        Current Address:
      </p>
      <div className="flex flex-col">
        <div className="text-white text-md flex">
          Aparment No:{" "}
          <p className="font-bold text-white">{shippingAddress.apartmentNo}</p>
        </div>
        <div className="text-white text-md flex">
          Building Name:{" "}
          <p className="font-bold text-white">{shippingAddress.buildingName}</p>
        </div>
        <div className="text-white text-md flex">
          Location:{" "}
          <p className="font-bold text-white">{shippingAddress.location}</p>
        </div>
      </div>
      <div>
        <Formik
          initialValues={{
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          }}
          onSubmit={(values) => UpdateShippingAddress(values)}
          validationSchema={yup.object().shape({
            apartmentNo: yup
              .string()
              .min(2, "Aparment No should be min 2 chars.")
              .max(10, "Aparment No should not excced 10 chars.")
              .required("Apartment No is a Required Field"),
            buildingName: yup
              .string()
              .min(6, "Building Name should be min 6 chars.")
              .max(30, "Building Name should not excced 30 chars.")
              .required("Building Name is a Required Field"),
            location: yup
              .string()
              .min(6, "Location should be min 6 chars.")
              .max(30, "Location should not excced 30 chars.")
              .required("Location is a Required Field"),
          })}
        >
          {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            touched,
            isValid,
            handleSubmit,
          }) => (
            <div className="flex flex-col">
              <input
                placeholder="Apartment No"
                type="text"
                className=" placeholder:text-xs placeholder:text-[#bebebe]   pl-3 mr-3 w-full lg:w-[36rem] mt-4 outline-none  text-xs rounded-[5px]  h-14  bg-[#2c2c2c] text-white "
                value={values.apartmentNo}
                onChange={handleChange("apartmentNo")}
                onBlur={() => setFieldTouched("apartmentNo")}
              />
              {touched.apartmentNo && errors.apartmentNo && (
                <p className="text-xs text-red-600">{errors.apartmentNo}</p>
              )}
              <input
                placeholder="Building Name"
                type="text"
                className=" placeholder:text-xs placeholder:text-[#bebebe]   pl-3 mr-3 w-full lg:w-[36rem] mt-4 outline-none  text-xs rounded-[5px]  h-14  bg-[#2c2c2c] text-white "
                value={values.buildingName}
                onChange={handleChange("buildingName")}
                onBlur={() => setFieldTouched("buildingName")}
              />
              {touched.buildingName && errors.buildingName && (
                <p className="text-xs text-red-600">{errors.buildingName}</p>
              )}
              <input
                placeholder="Location "
                type="text"
                className=" placeholder:text-xs placeholder:text-[#bebebe]   pl-3 mr-3 w-full lg:w-[36rem] mt-4 outline-none  text-xs rounded-[5px]  h-14  bg-[#2c2c2c] text-white "
                value={values.location}
                onChange={handleChange("location")}
                onBlur={() => setFieldTouched("location")}
              />
              {touched.location && errors.location && (
                <p className="text-xs text-red-600">{errors.location}</p>
              )}
              <button
                onClick={isValid ? handleSubmit : null}
                type="submit"
                className="bg-[#ffd601] text-black mt-4 font-semibold hover:bg-[#cfb327] w-full lg:w-52 h-14 text-center  rounded-[10px]"
              >
                Save Address
              </button>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
}
