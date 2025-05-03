// import { arbitrumSepolia } from "viem/chains";

const pharos = {
    id: 50002,
    name: 'Pharos Network',
    network: 'pharos',
    // iconUrl: '/img/coffee-3.png',
    // iconBackground: '#fff',
    nativeCurrency: { name: 'PTT', symbol: 'PPT', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://devnet.dplabs-internal.com'] },
    },
    blockExplorers: {
        default: { name: 'Pharos Explorer', url: 'https://pharosscan.xyz/' },
    },
    contracts: {
    },
}
// const arb = {...arbitrumSepolia, name:'Pharos Network', network: 'Pharos', nativeCurrency: { name: 'PTT', symbol: 'PPT', decimals: 18 }}

// console.log(arb);

const chainList = [
    // {...arb},
    // {...baseSepolia},
    { ...pharos },
];
// console.log(arbitrumSepolia)

export const getChainById = (id) => {
    id = typeof id !== 'string' ? id?.toString() : id;
    return chainList.find((chain) => chain.id?.toString() === id);
};


// console.log(rollups);

export default chainList;