"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAccount, useChainId } from "wagmi";
import chainList from "@/lib/chains";
import SelectChain from "@/components/SelectChain";
import { fetchBalance } from "@/lib/web3-call";
import { useToast } from "@/hooks/use-toast";
import { formatNiceNumber } from "@/lib/utils";
import BridgeHandler from "./BridgeHandler";
import { useSearchParams } from "next/navigation";

// Component that uses useSearchParams hook
function CryptoTransferWithSearchParams() {
  const searchParams = useSearchParams();
  const initialFromChain = searchParams.get("fromChainId") || chainList[0]?.id;
  const initialToChain = searchParams.get("toChainId") || chainList[1]?.id;
  const initialAmount = searchParams.get("amount") || "0";
  const initialRecipientAddress = searchParams.get("targetAddress") || null;

  return (
    <CryptoTransfer 
      initialFromChain={initialFromChain}
      initialToChain={initialToChain}
      initialAmount={initialAmount}
      initialRecipientAddress={initialRecipientAddress}
    />
  );
}

export function CryptoTransfer({ 
  initialFromChain = chainList[0]?.id, 
  initialToChain = chainList[1]?.id, 
  initialAmount = "0", 
  initialRecipientAddress = null 
}) {
  const chainId = useChainId();
  const [amount, setAmount] = useState(initialAmount ?? 0);
  const [recipientAddress, setRecipientAddress] = useState(
    initialRecipientAddress ?? null
  );
  // Add state for from and to chains
  const [fromChain, setFromChain] = useState(
    initialFromChain ?? chainList[0]?.id
  );
  const [toChain, setToChain] = useState(initialToChain ?? chainList[1]?.id);

  const [fromBalance, setFromBalance] = useState(0);
  const [toBalance, setToBalance] = useState(0);
  const { toast } = useToast();

  // Modified handlers to update state
  const onFromChange = (value) => {
    setFromChain(value);
    console.log("Selected from chain:", value);
  };

  const onToChange = (value) => {
    setToChain(value);
    console.log("Selected to chain:", value);
  };

  // Add switch function
  const handleSwitchChains = () => {
    const tempFrom = fromChain;
    setFromChain(toChain);
    setToChain(tempFrom);
  };

  // Get the connected account
  const { address, isConnected } = useAccount();

  const onClickSelf = () => {
    setRecipientAddress(address);
  };

  const onClickMax = () => {
    setAmount(formatNiceNumber(fromBalance));
  };

  // Function to handle the continue button click
  const onClickContinue = useCallback(async () => {
    // await window.ethereum.request({ method: "wallet_requestPermissions", params: [{ eth_accounts: {} }] });
    console.log(
      `from ${fromChain} to ${toChain} amount: ${amount}, recipient ${recipientAddress}`
    );
    try {
      const txHash = await BridgeHandler({
        isConnected,
        fromChain,
        toChain,
        amount,
        recipientAddress,
        toast,
        chainId,
        address,
      });
      if (txHash) {
        toast({
          title: "Transaction sent",
          description: `Transaction hash: ${txHash}`,
          variant: "success",
        });
      }
    } catch (error) {
      console.error("Error in onClickContinue:", error.message);
      toast({
        title: "Transaction failed",
        description: error.message,
        variant: "destructive",
      });
    }
  }, [
    fromChain,
    toChain,
    amount,
    recipientAddress,
    chainId,
    isConnected,
    address,
  ]);

  // Log the balance when it changes
  useEffect(() => {
    console.log(chainId);
    const fetchUserBalance = async () => {
      if (!isConnected) {
        console.log("Wallet not connected or balance not available");
        return;
      }
      try {
        const x = await fetchBalance(address, chainId);
        console.log(`x > `, x);
        if (!address) {
          setRecipientAddress(address); // Set recipient address to the connected account address
        }
      } catch (error) {
        console.error("Error fetching balance:", error.message);
      }
    };

    fetchUserBalance();
  }, [isConnected, chainId, address]);

  useEffect(() => {
    const getUserBalance = async (chainId) => {
      if (!isConnected) return 0;
      try {
        return await fetchBalance(address, chainId);
      } catch (error) {
        console.error("Error fetching balance:", error.message);
        return 0;
      }
    };

    console.log(`fromChain > `, fromChain);
    getUserBalance(fromChain).then((res) => {
      console.log(fromChain, res);
      setFromBalance(formatNiceNumber(res));
    });
    getUserBalance(toChain).then((res) => {
      setToBalance(res);
    });
  }, [fromChain, toChain, isConnected, address]);

  useEffect(() => {
    console.log(`fromBalance > `, fromBalance);
    console.log(`toBalance > `, toBalance);
    // Here you can handle the logic when balances change
    // For example, you can update the UI or trigger some actions based on the new balances
  }, [fromBalance, toBalance]);

  return (
    <div className="flex justify-center p-4">
      <Card className="w-full max-w-md rounded-3xl shadow-lg">
        <CardContent className="pb-6 pt-2">
          <div className="flex items-end justify-between gap-2 mb-4">
            <div>
              <SelectChain
                id="from"
                defaultValue={fromChain}
                options={chainList}
                onValueChange={onFromChange}
                excludeValue={toChain} // Pass to chain as excluded value
                label="From"
              />
            </div>
            <div id="switch">
              <Button
                variant="secondary"
                className="bg-gray-200 hover:bg-gray-300 text-gray-800"
                onClick={handleSwitchChains}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
            <div>
              <SelectChain
                id="to"
                defaultValue={toChain}
                options={chainList}
                onValueChange={onToChange}
                excludeValue={fromChain} // Pass from chain as excluded value
                label="To"
              />
            </div>
          </div>

          {/* Token section */}
          <div className="mb-4">
            <Label htmlFor="token" className="text-sm mb-1">
              Token
            </Label>
            <Select defaultValue="eth">
              <SelectTrigger id="token" className="w-full bg-gray-100">
                <div className="flex items-center">
                  <span className="text-white text-xs">
                    <img
                      src="https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
                      alt="Sepolia"
                      className="w-4 h-4 rounded-full mr-2"
                    />
                  </span>
                  <SelectValue placeholder="eth" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="eth">ETH</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Amount section */}
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <Label htmlFor="amount" className="text-sm">
                Amount
              </Label>
              <span className="text-sm text-muted-foreground">
                My balance: {fromBalance}
              </span>
            </div>
            <div className="flex gap-2">
              <Input
                type="text"
                id="amount"
                value={amount ?? 0}
                onChange={(e) => setAmount(e.target.value)}
                className="rounded-md"
              />
              <Button
                variant="secondary"
                className="bg-java-500 hover:bg-java-400 text-white"
                onClick={onClickMax}
              >
                Max
              </Button>
            </div>
          </div>

          {/* Recipient address section */}
          <div className="mb-6">
            <div className="flex justify-between mb-1">
              <Label htmlFor="recipient" className="text-sm">
                Recipient address
              </Label>
              <span className="text-sm text-muted-foreground">
                Remote balance: {toBalance}
              </span>
            </div>
            <div className="flex gap-2">
              <Input
                type="text"
                id="recipient"
                value={recipientAddress ?? ""}
                onChange={(e) => setRecipientAddress(e.target.value)}
                className="rounded-md text-xs"
              />
              <Button
                variant="secondary"
                className="bg-java-500 hover:bg-java-400 text-white"
                onClick={onClickSelf}
              >
                Self
              </Button>
            </div>
          </div>

          {/* Continue button */}

          <Button
            className="w-full bg-primary text-white font-bold uppercase py-6 rounded-xl h-12"
            onClick={onClickContinue}
          >
            Continue
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

const Bridge = () => {
  return (
    <>
      <Suspense fallback={null}>
        <CryptoTransferWithSearchParams />
      </Suspense>
    </>
  );
  // return (<><Card className="border-java-700/30 bg-java-500 backdrop-blur-md overflow-hidden shadow-[0_0_15px_rgba(200,140,50,0.15)]">

  // </Card></>);
};

export default Bridge;
