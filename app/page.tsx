import Image from "next/image";
import WalletComponent from "./Walletcomponent";
import Providers from "./providers";

export default function Home() {
  return (
    <Providers>
      <WalletComponent />
    </Providers>
  );
}
