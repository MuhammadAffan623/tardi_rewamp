import React from "react";
import bg from "../Assets/bg.png";
import Footer from "./Footer";
import Header from "./Header";

// Main Layout Component
const PGLayout: React.FC<{
  children: React.ReactNode;
  bgImage?: string;
  className?: string;
  removeBg?: boolean;
  isHeader?: boolean;
}> = ({
  children,
  bgImage = bg,
  className,
  removeBg = false,
  isHeader = false,
}) => {
  return (
    <div className="min-h-screen flex  flex-col ">
      {isHeader ? null : <Header />}
      <main
        className={`flex-1 bg-cover bg-center ${className}`}
        style={removeBg ? {} : { backgroundImage: `url(${bgImage})` }}
      >
        {children}
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default PGLayout;
