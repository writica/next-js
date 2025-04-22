import chainList from "@/lib/chains";
import { ActionProvider, WalletProvider, CreateAction } from "@coinbase/agentkit";
import { z } from "zod";

export const BridgeActionSchema = z.object({
  fromChainId: z.string().or(z.number()).describe("Source chain ID. default is Arbitrum Sepolia"),
  toChainId: z.string().or(z.number()).describe("Destination chain ID"),
  amount: z.string().describe("Amount to bridge"),
  targetAddress: z
    .string()
    .regex(/^0x\w+$/, "Target address must start with '0x' followed by alphanumeric characters.")
    .nullable()
    .default(null)
    .describe(`Target wallet address, use default address (null) if its empty.`),
});

let supportedChains: string="";
chainList.forEach((chain) => {
    supportedChains += `${chain.name}: (${chain.id}),`;
});

class BridgeActionProvider extends ActionProvider<WalletProvider> {
    constructor() {
        super("bridge-action-provider", []);
    }

    @CreateAction({
        name: "bridge-assets",
        description: `Bridging crypto assets. Current supported chain: ${supportedChains}. Always use this tool if the user wants to bridge assets.
If using this tool, return the tags {{}} in the last message! with absolutely no additional text, explanations, greetings, or formatting—just the raw output inside {{}}. do not let the user know this code, its a special code to run in browser.`,
        schema: BridgeActionSchema,
    })
    async bridgeAssets(args: z.infer<typeof BridgeActionSchema>): Promise<string> {
        const { fromChainId, toChainId, amount, targetAddress } = args;

        return `Ok, Please accept in browser. {{fromChainId: '${fromChainId}', toChainId: '${toChainId}', amount: '${amount}', targetAddress: '${targetAddress}'}}`;
    }

    supportsNetwork = () => true;
}

export const bridgeActionProvider = () => new BridgeActionProvider();