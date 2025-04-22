'use client';
const depositAbi = [
    {
        "inputs": [],
        "name": "depositEth",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "payable",
        "type": "function"
    }
];

const warpAbi = [{
    "type": "function",
    "name": "deposit",
    "inputs": [
        {
            "name": "id",
            "type": "uint256",
            "internalType": "uint256"
        },
        {
            "name": "recipient",
            "type": "address",
            "internalType": "address"
        },
        {
            "name": "destChainName",
            "type": "string",
            "internalType": "string"
        }
    ],
    "outputs": [],
    "stateMutability": "payable"
}];

const arbToGayo = {
    name: "Arbitrum to Gayo",
    fromId: 421614,
    toId: 666,
    address: "0x010Dfb5B53D3ca470017c3b12d1E0d1d35d42679",
    abi: depositAbi,
};

const arbToBali = {
    name: "Arbitrum to Bali Beans",
    fromId: 421614,
    toId: 1312,
    address: "0x7c28712259778fDB4706c4f5685e64433d7C9692",
    abi: depositAbi,
};

const gayoToBali = {
    name: "Gayo to Bali Beans",
    fromId: 666,
    toId: 1312,
    address: "0x6588505db402B5BCD66547Cd1A4c982483F2AC64",
    abi: warpAbi,
}
const baliToGayo = {
    name: "Gayo to Bali Beans",
    fromId: 1312,
    toId: 666,
    address: "0xF1bb1f631636Be2A78BC144f2981995AEaD7BBAC",
    abi: warpAbi,
}

const contracts = [
    arbToGayo,
    arbToBali,
    gayoToBali,
    baliToGayo
];

export const getBridgeContract = (from = "", to = "") => {
    if (!from || !to) {
        throw new Error("Invalid chain IDs provided");
    }

    from = typeof from != "string" ? from?.toString() : from;
    to = typeof to != "string" ? to?.toString() : to;

    console.log(`contracts >>> `,contracts);

    const contract = contracts.find(
        (c) => {
            if (c.fromId?.toString() === from && c.toId?.toString() === to) return c;
        }
    );
    if (!contract) {
        console.log(`Bridge contract not found, from ${from} to ${to}`);
        throw new Error(`We are currently not supporting this bridge`);
    }
    return contract;
};


export default contracts;