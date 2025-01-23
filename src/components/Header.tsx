// import React from "react";
// import logo from "../Assets/Frame.svg"
// import bgImg from "../Assets/header_background.png"


// type NavLinkProps = {
//   href: string;
//   children: React.ReactNode;
// };

// const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
//   return (
//     <a
//       href={href}
//       className=" text-[18.64px] text-[#75FF86] font-normal px-[10px]"
//     >
//       {children}
//     </a>
//   );
// };

// const Header: React.FC = () => {
//   const navLinks: { href: string; label: string }[] = [
//     { href: "#tardinators", label: "tardinators" },
//     { href: "#news", label: "news" },
//     { href: "#manifesto", label: "manifesto" },
//     { href: "#tokenomics", label: "tokenomics" },
//     { href: "#how-to-buy", label: "how to buy" },
//   ];

//   return (
//     <header className="bg-[#051707] border-b-[3px] border-[#75FF86] pt-[15px] pb-[21px] px-[3%] font-inter bg-cover bg-no-repeat"  style={{ backgroundImage: `url(${bgImg})`  }}>
//       <div className="max-w-[1383px] mx-auto flex justify-between items-center ">
        
//         <div className="flex items-center space-x-2">
//          <img src={logo} />
         
         
//         </div>
//         <span className="text-[#75FF86] text-[18.64px]">
//             ////
//           </span>
        
        
//           <span className="text-[#75FF86] text-[18.64px] ">
//             11:26:04 UT. MOON
//           </span>
          
//           <span className="text-[#75FF86]  text-[18.64px] ">
//             ///
//           </span>
//         <div className="flex items-center ">
         
//           <nav className="flex items-center ">
//             {navLinks.map((link, index) => (
//               <div key={index} className="flex items-center">
//                 <NavLink href={link.href}>{link.label}</NavLink>
//                 {index < navLinks.length - 1 && (
//                   <span className="text-[#75FF86] text-[18.64px]">|</span>
//                 )}
//               </div>
//             ))}
//              <button>
//           <a
//             href="#buy"
//             className="font-semibold text-[20px] leading-[24px] bg-[#75FF86] text-[#0d0d0d]  uppercase py-2 px-6  "
//           >
//             BUY NOW
//           </a>
//         </button>
//           </nav>
//         </div>

       
//       </div>
//     </header>
//   );
// };

// export default Header;
import React, { useState } from "react";
import logo from "../Assets/Frame.svg";
import bgImg from "../Assets/header_background.png";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
};

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  return (
    <a
      href={href}
      className="whitespace-nowrap text-md xl:text-[18.64px] text-[#75FF86] font-normal px-[10px]"
    >
      {children}
    </a>
  );
};

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks: { href: string; label: string }[] = [
    { href: "#tardinators", label: "tardinators" },
    { href: "#news", label: "news" },
    { href: "#manifesto", label: "manifesto" },
    { href: "#tokenomics", label: "tokenomics" },
    { href: "#how-to-buy", label: "how to buy" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header
      className="bg-[#000] border-b-[3px] border-[#75FF86] pt-[15px] pb-[21px] px-3 xl:px-[3%] font-['Inter'] bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="max-w-[1383px] mx-auto flex justify-between items-center">
      
        <div className="flex items-center space-x-2 w-auto  xl:min-w-[150px] ">
          <img src={logo} alt="Logo" />
        </div>

      
        <div className="hidden lg:flex items-center space-x-1  lg:space-x-2 whitespace-nowrap">
          <span className="text-[#75FF86] text-md xl:text-[18.64px]">////</span>
          <span className="text-[#75FF86] text-md xl:text-[18.64px]">11:26:04 UT. MOON</span>
          <span className="text-[#75FF86] text-md xl:text-[18.64px]">////</span>
        </div>

   
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-4  lg:pt-0 pt-[40px]">
          {navLinks.map((link, index) => (
            <div key={index} className="flex items-center">
              <NavLink href={link.href}>{link.label}</NavLink>
              {index < navLinks.length - 1 && (
                <span className="bg-[#75FF86] text-sm xl:text-[18.64px] h-5 pl-[1px]"></span>
              )}
            </div>
          ))}
          <a
            href="#buy"
            className="font-semibold whitespace-nowrap text-md xl:text-[20px] leading-[24px] bg-[#75FF86] text-[#000] uppercase py-2 px-1 xl:px-6"
          >
            BUY NOW
          </a>
        </nav>

        {/* Hamburger Menu */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-[#75FF86] text-[24px] focus:outline-none"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden mt-4">
          <nav className="flex flex-col items-start space-y-4 pt-5 pl-1 h-[100vh]">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-[24px] text-[#75FF86] font-normal"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#buy"
              className="font-semibold text-[20px] bg-[#75FF86] text-[#000000] uppercase py-2 px-4 mt-2 w-full text-center"
            >
              BUY NOW
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
