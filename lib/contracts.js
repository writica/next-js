'use client';
import { erc20Abi } from "viem";
import factoryCampaign from "@/lib/abi/FactoryCampaign.json";
import campaignManager from "@/lib/abi/CampaignManager.json";

// 84532 base sepolia
// 50002 pharos
const contracts = {
    84532: {
        blog:{
            address:"0x0e3e31c813b23cee22e1c1643ab974c8e2cc5769",
            abi:erc20Abi
        },
        factoryCampaign:{
            address:"0x1dbef158d3d238fdb8d1cd1f3648170e20bf5655",
            abi: factoryCampaign
        },
        campaignManager:{
            address:"0x20d39d65bf09af1703417fedb2b69f1de9325b4e",
            abi: campaignManager
        }
    },
    50002: {
        blog:{
            address:"0x0e3e31c813b23cee22e1c1643ab974c8e2cc5769",
            abi:erc20Abi
        },
        factoryCampaign:{
            address:"0x1dbef158d3d238fdb8d1cd1f3648170e20bf5655",
            abi: factoryCampaign
        },
        campaignManager:{
            address:"0x20d39d65bf09af1703417fedb2b69f1de9325b4e",
            abi: campaignManager
        }
    }
};

export default contracts;