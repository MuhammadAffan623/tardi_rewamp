import { Route, Routes } from "react-router-dom";
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
          <Route>
            <Route index element={<HomePage />} />
            {routes.map((routes, index) => {
              const { path, component: Component } = routes;
              return (
                <Route key={index} path={path} element={<Component />} />
              );
            })}
          </Route>
        </Routes>
      </WalletProvider>

    </>
  );
}

export default App;
