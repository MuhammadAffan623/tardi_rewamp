import { useEffect, useState } from "react";
import CardOfCheckboxes from "../components/CardOfCheckboxes";
import PGLayout from "../components/PGLayout";
import ErrorCard from "../components/ErrorCard";
import Heading from "../components/Heading";
import ShapeButton from "../components/ShapeButton";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";

const HomePage = () => {
  const { connected, publicKey } = useWallet();
  console.log(publicKey?.toString(), connected);
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

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setCheckboxes((prev) =>
      prev.map((checkbox) =>
        checkbox.id === id ? { ...checkbox, checked } : checkbox
      )
    );
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
        const response = await axios.post(
          "http://localhost:5000/api/v1/users/isWhiteList",
          {
            walletAddress: publicKey?.toString(),
          }
        );
        console.log("response", response);
        if (response?.data?.data?.isWhitelist) {
          //success
          console.log("user is white listed");
          setIswhitelisted(true);
        } else {
          console.log("user is not white listed");
          // give error and say user not white listed
          setIswhitelisted(false);
        }
      } catch (err) {
        console.error("Failed to fetch leaderboard data.", err);
      }
    };
    if (publicKey?.toString()?.length) {
      checkWhitelist();
    }
  }, [publicKey?.toString()]);

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
            buttonText={<WalletMultiButton>Connect Wallet</WalletMultiButton>}
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
        {connected && (
          <CardOfCheckboxes
            className=" w-full"
            checkboxes={checkboxes}
            onCheckboxChange={handleCheckboxChange}
            onButtonClick={handleButtonClick}
          />
        )}
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
