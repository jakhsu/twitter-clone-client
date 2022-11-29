import Dropdown from "../assets/dropdown.svg";
import axios from "../utils/axios";
import CryptoJS from "crypto-js";
import { useState } from "react";
import { login } from "../store/user";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/requests/requests";

function App() {
  const testFunc = () => {
    callTest();
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState(null);
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const [mail, setMail] = useState(null);
  const [loading, setLoading] = useState(false);

  const createAccount = () => {
    if (!username || !name || !password || !mail || loading) return;
    const cryptedPassword = CryptoJS.AES.encrypt(
      password,
      import.meta.env.VITE_SECRET_KEY
    ).toString();
    let sendToData = {
      password: cryptedPassword,
      username,
      name,
      mail,
    };
    const response = (data) => {
      if (!data || !data?.username) return;
      dispatch(login(data));
      navigate("/home");
    };

    registerUser(sendToData, response, setLoading);
  };

  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[300px] flex flex-col items-center justify-center gap-6">
        <span className="text-3xl font-bold">Create my account</span>
        <input
          type="text"
          onInput={(e) => setName(e.target.value)}
          className="outline-none rounded h-14 text-lg w-full bg-transparent transition-all focus-within:border-[#1d9bf0] border-2 border-gray-600 border-opacity-50 px-4"
          placeholder="name"
        />
        <input
          type="text"
          onInput={(e) => setUsername(e.target.value)}
          className="outline-none rounded h-14 text-lg w-full bg-transparent transition-all focus-within:border-[#1d9bf0] border-2 border-gray-600 border-opacity-50 px-4"
          placeholder="user handle"
        />
        <input
          type="text"
          onInput={(e) => setMail(e.target.value)}
          className="outline-none rounded h-14 text-lg w-full bg-transparent transition-all focus-within:border-[#1d9bf0] border-2 border-gray-600 border-opacity-50 px-4"
          placeholder="email"
        />
        <input
          type="Password"
          onInput={(e) => setPassword(e.target.value)}
          className="outline-none rounded h-14 text-lg w-full bg-transparent transition-all focus-within:border-[#1d9bf0] border-2 border-gray-600 border-opacity-50 px-4"
          placeholder="password"
        />
        <div className="my-4 flex items-start justify-center flex-col w-full">
          <span className="font-bold mb-2">About Password</span>
          <span className="text-sm text-[#71767B] ">
            This app is a demo, please don't use your real passwords
          </span>
        </div>
        <div className="flex w-full gap-3 items-center justify-start">
          <div className="flex flex-col items-start justify-center !w-32 min-w-[7rem] h-14 bg-black px-1 relative border-2 border-gray-600 border-opacity-50 rounded transition-all focus-within:border-[#1d9bf0] group">
            <span className="text-[#71767B] text-sm px-2 group-focus-within:text-[#1d9bf0] ">
              Month
            </span>
            <select className="bg-transparent outline-none appearance-none text-xl w-full h-full cursor-pointer pl-1 z-10">
              <option className="bg-black w-full"></option>
              <option value="January" className="bg-black w-full">
                January
              </option>
              <option value="February" className="bg-black w-full">
                February
              </option>
              <option value="March" className="bg-black w-full">
                March
              </option>
              <option value="April" className="bg-black w-full">
                April
              </option>
              <option value="May" className="bg-black w-full">
                May
              </option>
              <option value="June" className="bg-black w-full">
                June
              </option>
              <option value="July" className="bg-black w-full">
                July
              </option>
              <option value="August" className="bg-black w-full">
                August
              </option>
              <option value="September" className="bg-black w-full">
                September
              </option>
              <option value="October" className="bg-black w-full">
                October
              </option>
              <option value="November" className="bg-black w-full">
                November
              </option>
              <option value="December" className="bg-black w-full">
                December
              </option>
            </select>
            <img
              src={Dropdown}
              width="30"
              className="absolute right-[0.25rem] "
              alt=""
            />
          </div>
          <div className="flex flex-col items-start justify-center w-full h-14 bg-black px-1 relative border-2 border-gray-600 border-opacity-50 rounded transition-all focus-within:border-[#1d9bf0] group">
            <span className="text-[#71767B] text-sm px-2 group-focus-within:text-[#1d9bf0] ">
              Day
            </span>
            <select className="bg-transparent outline-none appearance-none text-xl w-full h-full cursor-pointer pl-1 z-10">
              <option className="bg-black w-full"></option>
              {Array.from(Array(31).keys())
                .reverse()
                .map((item) => {
                  return (
                    <option
                      key={item}
                      value={item + 1}
                      className="bg-black w-full"
                    >
                      {" "}
                      {item + 1}
                    </option>
                  );
                })}
            </select>
            <img
              src={Dropdown}
              width="30"
              className="absolute right-[0.25rem] "
              alt=""
            />
          </div>
          <div className="flex flex-col items-start justify-center w-full h-14 bg-black px-1 relative border-2 border-gray-600 border-opacity-50 rounded transition-all focus-within:border-[#1d9bf0] group">
            <span className="text-[#71767B] text-sm px-2 group-focus-within:text-[#1d9bf0] ">
              Year
            </span>
            <select className="bg-transparent outline-none appearance-none text-xl w-full h-full cursor-pointer pl-1 z-10">
              {Array.from(Array(100).keys())
                .reverse()
                .map((item) => {
                  return (
                    <option
                      key={item}
                      value={item + getCurrentYear() - 100}
                      className="bg-black w-full"
                    >
                      {" "}
                      {item + getCurrentYear() - 100}
                    </option>
                  );
                })}
            </select>
            <img
              src={Dropdown}
              width="30"
              className="absolute right-[0.25rem] "
              alt=""
            />
          </div>
        </div>
        <button
          onClick={createAccount}
          className="w-full h-10 flex items-center justify-center gap-4 bg-white text-black rounded-3xl transition-all hover:bg-[#E6E6E6] "
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-gray-600 animate-spin rounded-full border-t-[#1d9bf0]"></div>
          ) : (
            <span>Next</span>
          )}
        </button>
      </div>
    </div>
  );
}

export default App;
