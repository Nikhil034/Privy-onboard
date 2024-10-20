"use client";
import { useState, useEffect } from "react";
import { LogOut, Copy } from "lucide-react"; // Importing logout and copy icons from Lucide
import { usePrivy } from "@privy-io/react-auth";

const WalletComponent = () => {
  const [selectedChain, setSelectedChain] = useState("Ethereum");
  const { ready, authenticated, login, logout, user } = usePrivy();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  // Fetch wallet address when user is authenticated
  useEffect(() => {
    if (authenticated && user?.wallet?.address) {
      setWalletAddress(user.wallet.address); // Set the wallet address from Privy
    }
  }, [authenticated, user]);

  // Connect wallet function
  const connectWallet = () => {
    login(); // Use Privy's login function to authenticate
  };

  // Disconnect wallet function
  const disconnectWallet = () => {
    logout(); // Use Privy's logout function to disconnect
    setWalletAddress(null); // Clear the wallet address on logout
  };

  // Function to copy the wallet address to clipboard
  const copyToClipboard = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      alert("Wallet address copied to clipboard!");
    }
  };

  // Slice the wallet address for display (first 4 and last 4 characters)
  const getSlicedAddress = (address: string) =>
    `${address.slice(0, 4)}...${address.slice(-4)}`;

  // Dummy chain options for demonstration
  const chainOptions = ["Optimism", "Arbitrum", "Arbitrum Sepolia"];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white p-6 rounded-xl shadow-lg w-1/3">
        {!authenticated ? (
          <button
            onClick={connectWallet}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:shadow-xl hover:from-blue-600 hover:to-purple-600 transition duration-300"
          >
            Connect Wallet
          </button>
        ) : (
          <div className="flex items-center justify-between w-full bg-gray-100 p-3 rounded-lg shadow-sm">
            {/* Display the sliced wallet address and copy icon */}
            <div className="w-1/2 flex items-center">
              <span className="text-gray-800 font-semibold truncate">
                {walletAddress
                  ? `Wallet: ${getSlicedAddress(walletAddress)}`
                  : "No wallet connected"}
              </span>
              <Copy
                onClick={copyToClipboard}
                className="text-gray-500 text-xl ml-2 cursor-pointer hover:text-gray-700 transition duration-300"
              />
            </div>

            {/* Dropdown for chain/network selection */}
            <div className="w-1/3">
              <select
                className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                value={selectedChain}
                onChange={(e) => setSelectedChain(e.target.value)}
              >
                {chainOptions.map((chain) => (
                  <option key={chain} value={chain}>
                    {chain}
                  </option>
                ))}
              </select>
            </div>

            {/* Disconnect Icon */}
            <div className="w-1/6 flex justify-end">
              <LogOut
                onClick={disconnectWallet}
                className="text-red-500 text-2xl cursor-pointer hover:text-red-600 transition duration-300"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletComponent;
