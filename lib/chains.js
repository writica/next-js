import { arbitrumSepolia } from "wagmi/chains";

// deploy: sepolia educhain

const gayoRoll = {
    id: 666,
    name: 'Gayo Roll',
    network: 'gayo-roll',
    iconUrl: '/img/coffee-1.png',
    iconBackground: '#fff',
    nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: { https: ['https://rpc-gayo-roll.javabridge.fun'] },
    },
    blockExplorers: {
    },
    contracts: {

    },
}

// const baliBeans = {
//     id: 1312,
//     name: 'Bali Beans',
//     network: 'bali-beans',
//     iconUrl: '/img/coffee-2.png',
//     iconBackground: '#fff',
//     nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
//     rpcUrls: {
//         default: { https: ['https://rpc-bali-beans.javabridge.fun'] },
//     },
//     blockExplorers: {
//     },
//     contracts: {

//     },
// }

const baliBeans = {
    id: 1312,
    name: 'EduChain',
    network: 'bali-beans',
    iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/24613.png',
    iconBackground: '#fff',
    nativeCurrency: { name: 'EDU', symbol: 'EDU', decimals: 18 },
    rpcUrls: {
        default: { https: ['https://rpc-bali-beans.javabridge.fun'] },
    },
    blockExplorers: {
    },
    contracts: {

    },
}

const chainList = [
    { ...arbitrumSepolia, iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/11841.png", rpcUrls: { default: { https: ['https://arbitrum-sepolia-rpc.publicnode.com'] } } },
    {...gayoRoll},
    {...baliBeans}
];

export const getChainById = (id) => {
    id = typeof id !== 'string' ? id?.toString() : id;
    return chainList.find((chain) => chain.id?.toString() === id);
};


// console.log(rollups);

export default chainList;