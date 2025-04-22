import { ActionProvider, WalletProvider, CreateAction } from "@coinbase/agentkit";
import { z } from "zod";

// Schema for multiply operation
export const MultiplySchema = z.object({
  a: z.number().describe("First number to multiply"),
  b: z.number().describe("Second number to multiply"),
});

// Schema for divide operation
export const DivideSchema = z.object({
  numerator: z.number().describe("Number to be divided (numerator)"),
  denominator: z.number().refine(val => val !== 0, {
    message: "Denominator cannot be zero",
  }).describe("Number to divide by (denominator)"),
});

class MathActionProvider extends ActionProvider<WalletProvider> {
    constructor() {
        super("math-action-provider", []);
    }

    @CreateAction({
        name: "multiply",
        description: "Multiply two numbers together",
        schema: MultiplySchema,
    })
    async multiply(args: z.infer<typeof MultiplySchema>): Promise<string> {
        console.log(`Multiplying ${args.a} and ${args.b}`);
        const result = args.a * args.b;
        return `${args.a} × ${args.b} = ${result}`;
    }

    @CreateAction({
        name: "divide",
        description: "Divide one number by another",
        schema: DivideSchema,
    })
    async divide(args: z.infer<typeof DivideSchema>): Promise<string> {
        console.log(`Dividing ${args.numerator} by ${args.denominator}`);
        const result = args.numerator / args.denominator;
        return `${args.numerator} ÷ ${args.denominator} = ${result}`;
    }

    supportsNetwork = () => true;
}

export const mathActionProvider = () => new MathActionProvider();