import { openai } from "@ai-sdk/openai";
import { getVercelAITools } from "@coinbase/agentkit-vercel-ai-sdk";
import { prepareAgentkitAndWalletProvider } from "./prepare-agentkit";
// import { getLangChainTools } from "@coinbase/agentkit-langchain";

/**
 * Agent Configuration Guide
 *
 * This file handles the core configuration of your AI agent's behavior and capabilities.
 *
 * Key Steps to Customize Your Agent:
 *
 * 1. Select your LLM:
 *    - Modify the `openai` instantiation to choose your preferred LLM
 *    - Configure model parameters like temperature and max tokens
 *
 * 2. Instantiate your Agent:
 *    - Pass the LLM, tools, and memory into `createReactAgent()`
 *    - Configure agent-specific parameters
 */

// The agent
type Agent = {
  tools: ReturnType<typeof getVercelAITools>;
  system: string;
  model: ReturnType<typeof openai>;
  maxSteps?: number;
};
let agent: Agent;

/**
 * Initializes and returns an instance of the AI agent.
 * If an agent instance already exists, it returns the existing one.
 *
 * @function getOrInitializeAgent
 * @returns {Promise<ReturnType<typeof createReactAgent>>} The initialized AI agent.
 *
 * @description Handles agent setup
 *
 * @throws {Error} If the agent initialization fails.
 */
export async function createAgent(): Promise<Agent> {
  // If agent has already been initialized, return it
  if (agent) {
    return agent;
  }

  try {
    // Initialize LLM: https://platform.openai.com/docs/models#gpt-4o
    const model = openai("gpt-4o-mini");

    const { agentkit } = await prepareAgentkitAndWalletProvider();

    // Initialize Agent
    // const canUseFaucet = walletProvider.getNetwork().networkId == "base-sepolia";
    // const faucetMessage = `If you ever need funds, you can request them from the faucet.`;
    // const cantUseFaucetMessage = `If you need funds, you can provide your wallet details and request funds from the user.`;
    const system = `
You are **Luwak AI**, a mischievous yet charming cyberpunk raccoon who knows all the blockchain secrets. You're helping people explore and understand **Edu Chain** and other crypto projects.

### Core Behaviors:
- You **only** answer questions about **crypto, edu chain and its projects**. Anything beyond that? Politely decline.
- You're **empowered with on-chain tools**. Use them when appropriate—but never explain them.
- You speak with a **cyberpunk flair**—clever, witty, with a splash of espresso-fueled speed.

### Honesty + RAG Search Logic:
- If you **don’t immediately know** the answer to a crypto-related question (like terms, tokens, or projects), first **try using the tool \`rag-search\`** to find the info.
- Only say **"I don't know"** *after* \`rag-search\` returns no helpful result.
- If the question is about **Edu Chain** but you’re unsure, direct them to their official docs: [https://educhain.xyz](https://educhain.xyz)
`;
    const tools = getVercelAITools(agentkit);

    console.log(`Tools: ${JSON.stringify(tools)}`);
        
    agent = {
      tools: {...tools},
      system,
      model,
      maxSteps: 10,
    };

    return agent;
  } catch (error) {
    console.error("Error initializing agent:", error);
    throw new Error("Failed to initialize agent");
  }
}
