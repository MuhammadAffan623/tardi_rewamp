import { useEffect, useState } from "react";
import CardOfCheckboxes from "../components/CardOfCheckboxes";
import PGLayout from "../components/PGLayout";
import ErrorCard from "../components/ErrorCard";
import Heading from "../components/Heading";
import ShapeButton from "../components/ShapeButton";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@suiet/wallet-kit";
import Shapes from "../components/Shapes";
import successBG from "../../public/common/RedBox_Buttoncard.png";
import { apiRequest } from "../utils/axios";
import { useLocation, useNavigate } from "react-router-dom";
import {ConnectButton} from '@suiet/wallet-kit';

interface isWhiteList {
  data: {
    isWhitelist: boolean;
    token: string
    user: {
      telegramId?: string
      twitterId?: string
    }
  }
}

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const params = queryParams.get("twitterToken")
  console.log(params)
  const { connected, account } = useWallet();
  console.log(account?.address, "connected");
  const [isTelegram, setIsTelegram] = useState(false)
  const [isX, setIsX] = useState(false)
  const [telegramValue, setTelegramValue] = useState('')
  const [twitterValue, setTwitterValue] = useState('')
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [tempCounter, setTempCounter] = useState(0);

  const [isLoginError, setIsLoginError] = useState(false);
  const [isConnectionError, setIsConnectionError] = useState(false);
  const [isWhiteliested, setIswhitelisted] = useState(false);
  const [checkboxes, setCheckboxes] = useState([
    { id: "checkbox1", label: "Connect SUI Wallet", checked: false },
    { id: "checkbox2", label: "Connect Telegram", checked: false },
    { id: "checkbox3", label: "Connect X", checked: false },
  ]);

  useEffect(() => {
    const getUser = async (token: string) => {
      localStorage.setItem("token", token)
      await apiRequest<isWhiteList>("/users", "get", {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        setIsX(false)
        setTwitterValue(res.data.user.twitterId)
        setTelegramValue(res.data.user.telegramId)
        setCheckboxes((prev) =>
          prev.map((checkbox) =>
            checkbox.id === "checkbox3"
              ? { ...checkbox, checked: true }
              : checkbox
          )
        );
      })
      // if (response?.data?.isWhitelist && response?.data?.user?.telegramId && response?.data?.user?.twitterId) {
      //   navigate('/leaderboard')
      // }
    }
    if (params) {
      getUser(params)
    }


  }, [params])

  const handleCheckboxChange = (id: string, checked: boolean) => {
    if (id === 'checkbox2') {
      const telegram = checkboxes.find((item) => item.id === id)?.checked
      if (!telegram) {
        setIsTelegram(true)
      }
    }
    if (id === "checkbox3") {
      if (isX) {
        const baseUrl = import.meta.env.VITE_APP_BASE_URL;
        window.location.href = `${baseUrl}/users/twitterlogin`;
      }
      else {
        alert("wallet address is not whitelisted!!")
      }
    }
    // setCheckboxes((prev) =>
    //   prev.map((checkbox) =>
    //     checkbox.id === id ? { ...checkbox, checked } : checkbox
    //   )
    // );
  };

  const handleButtonClick = () => {
    // Handle button click logic here
    console.log("Button clicked");
    setIsLoginError((e) => !e);
  };

  useEffect(() => {
    if (connected) {
      setCheckboxes((prev) =>
        prev.map((checkbox) =>
          checkbox.id === "checkbox1"
            ? { ...checkbox, checked: true }
            : checkbox
        )
      );
    }
  }, [connected]);

  useEffect(() => {
    const checkWhitelist = async () => {
      try {
        const response = await apiRequest<isWhiteList>("/users/isWhiteList", "post", { walletAddress: account?.address, })
        // const response = await axios.post(
        //   "http://localhost:5000/api/v1/users/isWhiteList",
        //   {
        //     walletAddress: address,
        //   }
        // );
        console.log("response", response);
        if (response?.data?.isWhitelist) {
          localStorage.setItem("token", response?.data?.token)
          //success
          console.log("user is white listed");
          setIswhitelisted(true);
        } else {
          localStorage.setItem("token", response?.data?.token)
          console.log("user is not white listed");
          // give error and say user not white listed
          setIswhitelisted(false);
        }
        if (response?.data?.user?.telegramId) {
          setTelegramValue(response?.data?.user?.telegramId)
          setCheckboxes((prev) =>
            prev.map((checkbox) =>
              checkbox.id === "checkbox2"
                ? { ...checkbox, checked: true }
                : checkbox
            )
          );
          setIsTelegram(false)
          if (response?.data?.user?.telegramId && response?.data?.isWhitelist) {
            setIsX(true)
          }
        }
      } catch (err) {
        console.error("Failed to fetch leaderboard data.", err);
      }
    };  
    if (account?.address?.length) {
      checkWhitelist();
    }
  }, [account?.address]);

  const handleTelegram = async () => {
    const token = localStorage.getItem("token");
    await apiRequest('/users/addTelegram', 'post', {
      telegramId: telegramValue
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(() => {
      setCheckboxes((prev) =>
        prev.map((checkbox) =>
          checkbox.id === "checkbox2"
            ? { ...checkbox, checked: true }
            : checkbox
        )
      );
      setIsTelegram(false)
      if (isWhiteliested) {
        setIsX(true)
      }
    })
  }

  const handleLogin = async () => {
    if (isWhiteliested && telegramValue !== "" && twitterValue !== "") {
      await apiRequest("/users", "post", {
        walletAddress: account?.address,
        twitterId: twitterValue
      }).then(() => { 
        navigate('/leaderboard')
      })

    }
  }
  return (
    <PGLayout className=" bg-cover ">
      <div className=" mx-auto max-w-[1470px] w-[90%] flex flex-col items-center  min-h-screen">
        {!connected && (
          <ShapeButton
            // buttonText={
            //   isConnectionError ? (
            //     "ERROR... [RETRY]"
            //   ) : (
            //     <WalletMultiButton>Connect Wallet</WalletMultiButton>
            //   )
            // }
            buttonText={<ConnectButton>Connect Wallet</ConnectButton>}
            // onClick={() => {
            //   // temp logic
            //   const newCount = tempCounter + 1;
            //   setTempCounter(newCount);
            //   setIsConnectionError((x) => !x);
            //   if (newCount <= 2) return;
            //   // temp logic - ends

            //   setShowLoginForm(true);
            // }}
            containerClassName=" mt-[50px] ml-auto "
            isErrorBtn={isConnectionError}
          />
        )}

        <Heading
          text="TARDINATORS CORE COMMUNITY"
          className=" max-w-[500px] w-[50%] mt-40 "
        />
        {!isTelegram && connected && (
          <CardOfCheckboxes
            className=" w-full"
            checkboxes={checkboxes}
            onCheckboxChange={handleCheckboxChange}
            onButtonClick={handleLogin}
          />
        )}
        <>{isTelegram &&
          <Shapes
            bgShapeImg={successBG}
            className={` max-w-[400px] min-h-[310px]  pl-[80px] object-cover w-full`}
          >
            <div className="flex flex-col h-[90px] justify-between items-end w-[90%] mx-auto gap-5 ">
              <input className="rounded-0 py-1 text-white bg-black w-[97%] mr-auto  focus-visible:!border-0" type="text" onChange={(e) => setTelegramValue(e.target.value)} placeholder="Enter Telegram ID" />
              <button
                onClick={handleTelegram}
                className="w-full flex justify-end text-white font-['Source_Code_Pro'] mt-10 font-[800] text-[20px] py-2 px-4 "
              >
                [Submit]
              </button>
            </div>
          </Shapes>
        }</>
        {/* {!showLoginForm ? null : !isLoginError ? (
          <CardOfCheckboxes
            className=" w-full"
            checkboxes={checkboxes}
            onCheckboxChange={handleCheckboxChange}
            onButtonClick={handleButtonClick}
          />
        ) : (
          <ErrorCard
            className=" w-full"
            buttonText="[RETRY]"
            onClick={() => setIsLoginError((e) => !e)}
            errorMsg="ERROR WITH LOGIN"
          />
        )} */}
      </div>
    </PGLayout>
  );
};

export default HomePage;
