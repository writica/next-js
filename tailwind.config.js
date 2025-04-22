const config = {
  darkMode: ["class"],
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './lib/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './app/chat/**/*.{js,jsx,ts,tsx}',
    './app/chat/components/**/*.{js,jsx,ts,tsx}',
  ],
  safelist: [
    "from-[#F08A24]", "to-[#E67E22]", "hover:from-[#E67E22]", "hover:to-[#D35400]",
    "from-[#F08A24]/50", "to-[#E67E22]/50", "from-[#F08A24]", "to-[#E67E22]",
    "from-[#D9BEA7]", "to-[#CAAF9B]", "md:hidden",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Add JavaBridge brown theme colors
        java: {
          "50": "#f5f0ec",
          "100": "#ebe0d9",
          "200": "#d7c2b3",
          "300": "#c3a38e",
          "400": "#af8568",
          "500": "#9b6642",
          "600": "#7c5235",
          "700": "#5d3d28",
          "800": "#3e291a",
          "900": "#1f140d"
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "steam": {
          "0%": { transform: "translateY(0) scale(1)", opacity: "0" },
          "50%": { transform: "translateY(-10px) scale(1.2)", opacity: "0.5" },
          "100%": { transform: "translateY(-20px) scale(0.8)", opacity: "0" }
        },
        "pulse-gentle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "25%": { transform: "translateY(-15px) translateX(15px)" },
          "50%": { transform: "translateY(-25px) translateX(-10px)" },
          "75%": { transform: "translateY(-10px) translateX(15px)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "steam": "steam 2s ease-out infinite",
        "pulse-gentle": "pulse-gentle 3s ease-in-out infinite",
        "float": "float 15s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        "gradient": "gradientShift 8s ease infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config

