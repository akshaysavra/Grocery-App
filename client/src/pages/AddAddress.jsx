import React, { useEffect, useState } from "react";
import { assets } from "./../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const InputField = ({ name, address, placeholder, handleChange, type }) => (
  <input
    className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition"
    type={type}
    name={name}
    placeholder={placeholder}
    onChange={handleChange}
    value={address[name]}
    required
  />
);


const AddAddress = () => {
  const {axios,navigate,user} = useAppContext()
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zipCode: 0,
    phone: "",
  });

  const handleChange = (e) => {
    const {name,value}= e.target;
    setAddress((prevAddress)=>({
        ...prevAddress,
        [name] : value

    }))  };
  const onSubmithandler = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post("/api/address/add",{address})
      console.log("data address",data)
      navigate("/cart")
      if(data.success){
        toast.success(data.message)
      }
    } catch (error) {
      toast.error(error)
    }
  };
  useEffect(()=>{
    if(!user){
      navigate('/cart')
    }
  },[])

    // console.log("ADDRESS : " ,address)

  return (
    <div className="mt-16 pb-16">
      <p className="text-2xl md:text-3xl text-gray-500">
        Add Shipping <span className="font-semibold text-primary">Address</span>
      </p>
      <div className="flex flex-col-reverse md:flex-row justify-between mt-10">
        <div className="flex-1 max-w-md">
          <form action={onSubmithandler} className="space-y-3 mt-6 t    ext-sm">
            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="firstName"
                placeholder="Enter Farst Name"
                type="text"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="lastName"
                placeholder="Enter Last Name"
                type="text"
              />
            </div>
            <InputField
              handleChange={handleChange}
              address={address}
              name="email"
              placeholder="Enter Email"
              type="text"
            />
            <InputField
              handleChange={handleChange}
              address={address}
              name="street"
              placeholder="Street"
              type="text"
            />
            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="city"
                placeholder="Enter Your city"
                type="text"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="state"
                placeholder="Enter Your State"
                type="text"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="zipCode"
                placeholder="Enter Your Zip Code"
                type="number"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="country"
                placeholder="Enter Your Country"
                type="text"
              />
            </div>
            <InputField
              handleChange={handleChange}
              address={address}
              name="phone"
              placeholder="Enter Your Number"
              type="number"
            />

            <button onClick={onSubmithandler} className="w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull cursor-pointer uppercase transition">
                Save Address
            </button>
          </form>
        </div>
        <img
          className="md:mr-16 mb-16 md:mt-0"
          src={assets.add_address_iamge}
          alt=""
        />
      </div>
    </div>
  );
};

export default AddAddress;
