const pharos = {
    id: 50002,
    name: 'Pharos Network',
    network: 'pharos',
    // iconUrl: '/img/coffee-3.png',
    // iconBackground: '#fff',
    nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: { https: ['https://devnet.dplabs-internal.com'] },
    },
    blockExplorers: {
        default: { name: 'Pharos Explorer', url: 'https://pharosscan.xyz/' },
    },
    contracts: {
    },
}

const chainList = [
    { ...pharos },
];

export const getChainById = (id) => {
    id = typeof id !== 'string' ? id?.toString() : id;
    return chainList.find((chain) => chain.id?.toString() === id);
};


// console.log(rollups);

export default chainList;