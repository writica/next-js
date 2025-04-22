'use client';
import { getBridgeContract } from "@/lib/contracts";
import { connect } from "@/lib/web3-call";
import { getChainById } from "@/lib/chains";
import { parseEther } from "viem";

const generateRandomId = () => {
    const randomId = Math.floor(Math.random() * 1000000); // Generates a random number between 0 and 999999
    return randomId.toString(); // Convert to string if needed
};

/* eslint-disable @next/next/no-async-client-component */
const BridgeHandler = async ({
    isConnected,
    fromChain,
    toChain,
    amount,
    recipientAddress,
    toast,
    chainId,
    address
}) => {
    if (!isConnected) {
        toast({
            title: "Wallet not connected",
            description: "Please connect your wallet",
            variant: "destructive",
        });
        return;
    }

    if (fromChain.toString() != chainId.toString()) {
        const tgt_chain = getChainById(fromChain);
        toast({
            title: "Wrong network",
            description: `Please switch to ${tgt_chain?.name} network`,
            variant: "destructive",
        });
        return;
    }

    try {
        const walletClient = await connect({
            chainId: fromChain,
        });

        console.log(fromChain, toChain, amount, recipientAddress);
        const contract = await getBridgeContract(fromChain, toChain);

        console.log(contract.abi[0]?.name);
        let hash = null;

        switch (contract.abi[0]?.name) {
            case "depositEth":
                console.log("depositEth function called");
                hash = await walletClient.writeContract({
                    address: contract.address,
                    abi: contract.abi,
                    functionName: "depositEth",
                    value: parseEther(amount), // Convert to Wei
                    account: address,
                });
                break;

            case "deposit":
                const randomId = generateRandomId();
                console.log("deposit function called");
                const targetNetwork =  fromChain.toString() == "666"? "balibeans": "gayoroll"
                console.log(randomId, recipientAddress, targetNetwork, parseEther(amount));
                hash = await walletClient.writeContract({
                    address: contract.address,
                    abi: contract.abi,
                    functionName: "deposit",
                    args: [randomId, recipientAddress, targetNetwork],
                    value: parseEther(amount), // Convert to Wei
                    account: address,
                });
                break;
        }

        console.log("Transaction hash:", hash);
        return hash;
    } catch (error) {
        console.error("Error in onClickContinue:", error.message);
        toast({
            title: "Transaction failed",
            description: error.message,
            variant: "destructive",
        });
    }
}

export default BridgeHandler;