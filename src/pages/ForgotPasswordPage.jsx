import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "../styles/style.js";
import { server } from "../server.js";

const ForgotPasswordPage = () => {
  const navigate = useNavigate("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${server}/user/password-forgot`,
        {
          email,
        }
      )
      .then((res) => {
        toast.success(`Please check your email ${email} for new passsowrd`);
        navigate("/forgot-password");
        setEmail("");
        // window.location.reload(true);
        
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Forgot Password
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6 " onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Adress
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <br />
            To Please recover your account, Please enter your email associated with account  
            <div className="flex flex-col items-center justify-between ">
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Recover
              </button>
              <span className="m-3">OR</span>
              <Link to = "/" className="group relative w-full h-[40px] flex justify-center py-2 border-transparent text-sm font-medium rounded-md text-[#484848] stroke-blue-200 hover:bg-blue-100 hover:text-[#1a1c4d]">
              <button
                type="submit"
                className=" "
              >
                Login
              </button>
              </Link>
 

            </div>
            <div className={`${styles.noramlFlex} w-full`}>
              <h4>Don't have any account?</h4>
              <Link to="/sign-up" className="text-blue-600 pl-2">
                Register Now!
              </Link>
            </div>
          </form>
        </div>
        
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
