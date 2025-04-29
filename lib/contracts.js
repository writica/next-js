'use client';
import { erc20Abi } from "viem";
import factoryCampaign from "@/lib/abi/FactoryCampaign.json";
import campaignManager from "@/lib/abi/CampaignManager.json";

// 84532 base sepolia
// 50002 pharos
// arb 421614
const contracts = {
    421614: {
        blog:{
            address:"0xc9879251c8EEb2Afa332798DC864b882745fe4d1",
            abi:erc20Abi
        },
        factoryCampaign:{
            address:"0xf7c604945b0562f3e1e167173d6cea51cffe3c90",
            abi: factoryCampaign
        },
        campaignManager:{
            address:"0x238cd4664703c7ca1a9a28f853d9a28ba260e310",
            abi: campaignManager
        }    
    },
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
            address:"0x79b4f48276bdd90098b81d331287216ccff5ed69",
            abi:erc20Abi
        },
        factoryCampaign:{
            address:"0x613ee8e6467dfea27b59cfffbc174a9a47f72972",
            abi: factoryCampaign
        },
        campaignManager:{
            address:"0x23a63231ae12a4e2e66b230dde0a235a47ebccb6",
            abi: campaignManager
        }
    }
};

export default contracts;