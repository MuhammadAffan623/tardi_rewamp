import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import routes from "./routes";
import { useMemo } from "react";
// import {
//   ConnectionProvider,
//   WalletProvider,
// } from "@solana/wallet-adapter-react";
// import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
// import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
// import { clusterApiUrl } from "@solana/web3.js";
// import '@solana/wallet-adapter-react-ui/styles.css';
import { WalletProvider } from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css';

const PrivateRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("token"); // Replace with your actual authentication logic

  return isAuthenticated ? element : <Navigate to="/" replace />;
};


function App() {
  // const wallets = useMemo(
  //   () => [
  //     new PhantomWalletAdapter(),
  //     // new SolflareWalletAdapter(),
  //     // new GlowWalletAdapter(),
  //     // new MathWalletAdapter(),
  //   ],
  //   []
  // );

  // Set the network to devnet, testnet, or mainnet-beta
  // const endpoint = useMemo(() => clusterApiUrl("mainnet-beta"), []);
  return (
    <>
      <WalletProvider>
        <Routes>
          {routes.map(({ path, component: Component }, index) => {
            const isPrivate = path === "/leaderboard";
            return (
              <Route
                key={index}
                path={path}
                element={
                  isPrivate ? <PrivateRoute element={<Component />} /> : <Component />
                }
              />
            );
          })}
        </Routes>
      </WalletProvider>

    </>
  );
}

export default App;
