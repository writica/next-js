'use client';
import factoryCampaign from "@/lib/abi/FactoryCampaign.json";
import campaignManager from "@/lib/abi/CampaignManager.json";
import Blog from "@/lib/abi/Blog.json";

// 84532 base sepolia
// 50002 pharos
// arb 421614
const contracts = {
    421614: {
        blog:{
            address:"0x2f8a3FecEB2480B6c7299d178f73310Bc16dF16D",
            abi:Blog
        },
        factoryCampaign:{
            address:"0x442cde483715194cfb1d2b0a32ff7ab7d089215a",
            abi: factoryCampaign
        },
        campaignManager:{
            address:"0x65cbc25fb8f720597a99de221c020bc5c7b9cc5b",
            abi: campaignManager
        }    
    },
    84532: {
        blog:{
            address:"0x0e3e31c813b23cee22e1c1643ab974c8e2cc5769",
            abi:Blog
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
            address:"0xb4b741e3d1239b6dd7b7131c60c48a1029efb4aa",
            abi:Blog
        },
        factoryCampaign:{
            address:"0xae03063fe750ebbe171754445d82a73dfe15957a",
            abi: factoryCampaign
        },
        campaignManager:{
            address:"0x0efa9e28cbea1e15c530016140a0ef8110ab81bc",
            abi: campaignManager
        }
    }
};

export default contracts;