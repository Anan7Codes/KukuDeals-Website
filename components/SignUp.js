import { useState } from "react";
import { nhost } from "@/utils/nhost";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nationality, setNationality] = useState();
  const [countryOfResidence, setCountryOfResidence] = useState();
  const [gender, setGender] = useState(true);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        toast.error("passwords doesn't match", {
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
      const res = await nhost.auth.signUp({
        email: email,
        password: password,
        options: {
          displayName: firstname + " " + lastname,
        },
      });
      if (res.error) {
        toast.error(res.error.message, {
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
      toast.success(
        "Signed Up Succesfully. Please verify your email before continuing",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      router.push("/login");
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
  return (
    <>
      <div className="flex justify-center pt-20 pb-20">
        <div className="w-1/2  rounded-[25px]  bg-white mb-6 mt-10">
          <div className="ml-28 pt-4">
            <p className="text-3xl text-gray-700 font-bold">Sign Up</p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex justify-center pb-6 pt-2"
          >
            <div className="flex flex-col">
              <input
                type="text"
                className="border placeholder:text-xs text-xs pl-3 mr-3 w-full lg:w-96  mt-4 outline-none  rounded-[5px]  h-14  border-gray-300 "
                placeholder="FirstName"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                className="border placeholder:text-xs text-xs pl-3 mr-3 w-full lg:w-96  mt-4 outline-none  rounded-[5px]  h-14  border-gray-300 "
                placeholder="LastName"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
              />
              <input
                type="text"
                className="border placeholder:text-xs text-xs pl-3 mr-3 w-full lg:w-96 mt-4 outline-none  rounded-[5px]  h-14  border-gray-300 "
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="border placeholder:text-xs text-xs pl-3 mr-3 w-full lg:w-96 mt-4 outline-none  rounded-[5px]  h-14  border-gray-300 "
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                className="border placeholder:text-xs text-xs pl-3 mr-3 w-full lg:w-96 mt-4 outline-none  rounded-[5px]  h-14  border-gray-300 "
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <div className="pt-4">
                <p className="text-3xl text-gray-700 font-bold">
                  Personal Details
                </p>
              </div>
              <div>
                <div className=" cursor-pointer pt-4">
                  {gender ? (
                    <div className="flex justify-between ">
                      <div>
                        <p
                          className="bg-white rounded-l-lg h-8  w-48 text-center drop-shadow-sm	 text-blue-600 "
                          onClick={() => setGender(true)}
                        >
                          Male
                        </p>
                      </div>
                      <div className="mr-4">
                        <p
                          className="bg-gray-300 opacity-20 rounded-r-lg h-8  w-48 text-center drop-shadow-md	 "
                          onClick={() => setGender(false)}
                        >
                          Female
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between">
                      <div>
                        <p
                          className="bg-gray-300 opacity-20 rounded-l-lg h-8  w-48 text-center drop-shadow-md	 "
                          value={true}
                          onClick={(e) => setGender(true)}
                        >
                          Male
                        </p>
                      </div>
                      <div className="mr-4">
                        <p
                          className="bg-white rounded-r-lg h-8  w-48 text-center drop-shadow-sm	 text-blue-600 "
                          value={false}
                          onClick={(e) => setGender(false)}
                        >
                          Female
                        </p>
                      </div>
                    </div>
                  )}

                  {/* 
          <RadioGroup
            className="mt-3 justify-start"
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            defaultValue={gender}
          >
            <FormControlLabel
              value={true}

              control={<Radio />}
              label={
                <span style={{ fontSize: "14px", color: "gray" }}>Male</span>
              }
            />
            <FormControlLabel
              value={false}
              control={<Radio />}
              label={
                <span style={{ fontSize: "14px", color: "gray" }}>Female</span>
              }
            />
          </RadioGroup> */}
                </div>
                <div className="lg:flex ">
                  <CountryDropdown
                    defaultOptionLabel="Nationality"
                    className="border border-gray-300  text-xs text-gray-400 pl-3 mr-3 w-full  mt-4 outline-none   rounded-[5px]  h-14 "
                    value={nationality}
                    onChange={(val) => setNationality(val)}
                  />
                </div>
                <div className="lg:flex ">
                  <CountryDropdown
                    defaultOptionLabel="Country of Residence"
                    className="border border-gray-300  text-xs text-gray-400 pl-3 mr-3 w-full  mt-4 outline-none   rounded-[5px]  h-14 "
                    value={countryOfResidence}
                    onChange={(val) => setCountryOfResidence(val)}
                  />
                </div>
              </div>
              <div className="pb-6 flex justify-between">
                <p
                  className="text-blue-500  mr-3  pt-4 mt-4 w-full h-14 font-semibold text-base cursor-pointer "
                  onClick={() => router.push("/login")}
                >
                  Existing User Login
                </p>
                <button className="bg-blue-500 mr-3  mt-4 w-full outline-none  rounded-[5px]  h-14 text-white font-bold text-base  ">
                  Sign Up
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
