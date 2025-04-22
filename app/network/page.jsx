"use client";
import { Button } from "@/components/ui/button";
import chainList from "@/lib/chains";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronRight, ExternalLink, Globe, Shield } from "lucide-react";
import Image from "next/image";

const handleAddNetworkk = async (chain, setLoading, setAdded) => {
  try {
    setLoading(true);
    if (
      !chain ||
      !chain.id ||
      !chain.rpcUrls?.default?.https ||
      !chain.name ||
      !chain.nativeCurrency
    ) {
      throw new Error("Invalid chain data provided.");
    }

    const chainIdHex = `0x${Number(chain.id).toString(16)}`;
    console.log(chainIdHex);

    let o = {
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: chainIdHex,
          rpcUrls: [chain.rpcUrls.default.https[0]],
          chainName: chain.name,
          nativeCurrency: {
            name: chain.nativeCurrency.name,
            symbol: chain.nativeCurrency.symbol,
            decimals: Number(chain.nativeCurrency.decimals),
          },
        },
        null,
      ],
    };

    await window.ethereum?.request(o).then((res) => {
      console.log(res);
      setAdded(true);
      setTimeout(() => setAdded(false), 3000);
    });
  } catch (error) {
    console.error("Failed to add network:", error);
  } finally {
    setLoading(false);
  }
};

export default function Chain() {
  const [loadingChain, setLoadingChain] = useState(null);
  const [addedChain, setAddedChain] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [imageErrors, setImageErrors] = useState({});

  // Filter chains based on search query
  const filteredChains = searchQuery.trim() === "" 
    ? chainList 
    : chainList.filter(chain => 
        chain.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        chain.network?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chain.id?.toString().includes(searchQuery)
      );

  // Animation variants for staggered children
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300 } }
  };

  // Get a color based on chain name for network icons
  const getChainColor = (name) => {
    const colors = [
      "from-blue-500 to-purple-600",
      "from-green-400 to-cyan-500",
      "from-orange-400 to-rose-500",
      "from-indigo-400 to-fuchsia-500",
      "from-emerald-400 to-blue-500",
      "from-amber-400 to-red-500"
    ];
    
    const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  // Handle image error by setting the chain ID in the imageErrors object
  const handleImageError = (chainId) => {
    setImageErrors(prev => ({
      ...prev,
      [chainId]: true
    }));
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen ">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-java-100 rounded-full filter blur-3xl opacity-30" />
        <div className="absolute top-1/2 -left-24 w-80 h-80 bg-java-200 rounded-full filter blur-3xl opacity-20" />
        <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-java-100 rounded-full filter blur-3xl opacity-30" />
      </div>

      <div className="relative z-10 w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero section with animation */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="inline-block mb-2 px-3 py-1 bg-java-50 rounded-full text-java-700 text-sm font-medium">
            <div className="flex items-center">
              <Shield size={16} className="mr-1" />
              <span>Blockchain Networks</span>
            </div>
          </div>
          <h1 className="text-5xl font-extrabold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-java-500 via-java-600 to-java-800 animate-gradient">
              Add Networks to Your Wallet
            </span>
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600 max-w-2xl mx-auto text-lg"
          >
            Connect to your favorite blockchain networks with a single click. Instantly add any supported chain to your wallet.
          </motion.p>

        </motion.div>

        {/* Search box */}
        <div className="mb-10 flex justify-center">
          <div className="relative max-w-lg w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-java-500 focus:border-java-500 transition-shadow duration-300 shadow-sm hover:shadow-md focus:shadow-lg"
              placeholder="Search networks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Grid section with 3 columns */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredChains.map((chain, index) => (
            <motion.div
              key={`chain-${chain.id}`}
              variants={item}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="relative overflow-hidden rounded-2xl bg-white border border-gray-100 hover:border-java-200 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Gradient background accent */}
              <div className="absolute right-0 top-0 h-20 w-20 opacity-10 rounded-bl-3xl bg-gradient-to-br from-java-400 to-java-600" />
              
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-lg ${
                    !chain.iconUrl || imageErrors[chain.id] 
                      ? `bg-gradient-to-br ${getChainColor(chain.name)} flex items-center justify-center shadow-md` 
                      : 'bg-white flex items-center justify-center shadow-sm border border-gray-100'
                  }`}>
                    {!chain.iconUrl || imageErrors[chain.id] ? (
                      <Globe className="h-6 w-6 text-white" />
                    ) : (
                      <Image 
                        src={chain.iconUrl}
                        alt={`${chain.name} icon`}
                        width={32}
                        height={32}
                        className="object-contain"
                        onError={() => handleImageError(chain.id)}
                      />
                    )}
                  </div>
                  <div className="ml-4">
                    <h2 className="text-xl font-bold text-gray-800">{chain.name}</h2>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm rounded-lg bg-gray-50 px-4 py-2">
                    <span className="text-gray-500">Chain ID</span>
                    <span className="font-mono font-medium text-gray-800">{chain.id}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm rounded-lg bg-gray-50 px-4 py-2">
                    <span className="text-gray-500">Currency</span>
                    <span className="font-medium text-gray-800">{chain.nativeCurrency?.symbol}</span>
                  </div>
                  
                  <div className="text-sm rounded-lg bg-gray-50 px-4 py-2 overflow-hidden">
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-500">RPC URL</span>
                      <ExternalLink size={14} className="text-java-500" />
                    </div>
                    <p className="text-xs truncate text-gray-600 font-mono">
                      {chain.rpcUrls?.default?.https[0]}
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <Button
                    className={`w-full rounded-xl font-medium text-sm relative overflow-hidden group ${
                      addedChain === chain.id 
                        ? "bg-green-500 hover:bg-green-600" 
                        : "bg-gradient-to-r from-java-500 to-java-600 hover:from-java-600 hover:to-java-700"
                    }`}
                    disabled={loadingChain === chain.id}
                    onClick={() => {
                      handleAddNetworkk(chain, 
                        (isLoading) => setLoadingChain(isLoading ? chain.id : null),
                        (isAdded) => setAddedChain(isAdded ? chain.id : null)
                      );
                    }}
                  >
                    {loadingChain === chain.id ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </div>
                    ) : addedChain === chain.id ? (
                      <div className="flex items-center justify-center">
                        <Check size={16} className="mr-1" /> Added Successfully
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        Add to Wallet <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredChains.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-10"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-1">No networks found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </motion.div>
        )}
        
        {/* Footer section */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm">
            Need help connecting to these networks? <a href="#" className="text-java-600 hover:text-java-700 font-medium">Check our guide</a>
          </p>
        </div>
      </div>
    </div>
  );
}
