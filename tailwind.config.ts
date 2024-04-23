import type { Config } from "tailwindcss";

const config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
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
            fontFamily: {
                rg: ["var(--font-rebond)"],
                "rg-bold": ["var(--font-rebond-bold)"],
                "rg-italic": ["var(--font-rebond-italic)"],
                "rg-bold-italic": ["var(--font-rebond-bold-italic)"],
                "rg-light": ["var(--font-rebond-light)"],
                "rg-light-italic": ["var(--font-rebond-light-italic)"],
                "rg-medium": ["var(--font-rebond-medium)"],
                "rg-medium-italic": ["var(--font-rebond-medium-italic)"],
                "rg-semi-bold": ["var(--font-rebond-semi-bold)"],
                "rg-semi-bold-italic": ["var(--font-rebond-semi-bold-italic)"],
                "rg-thin": ["var(--font-rebond-thin)"],
                "rg-thin-italic": ["var(--font-rebond-thin-italic)"],
                "rg-hairline": ["var(--font-rebond-hairline)"],
                "rg-hairline-italic": ["var(--font-rebond-hairline-italic)"],
                "rg-extra-light": ["var(--font-rebond-extra-light)"],
                "rg-extra-light-italic": [
                    "var(--font-rebond-extra-light-italic)",
                ],
                "rg-extra-bold": ["var(--font-rebond-extra-bold)"],
                "rg-extra-bold-italic": [
                    "var(--font-rebond-extra-bold-italic)",
                ],
                ro: ["var(--font-roobert-regular)"],
                "ro-bold": ["var(--font-roobert-bold)"],
                "ro-italic": ["var(--font-roobert-medium-italic)"],
                "ro-bold-italic": ["var(--font-roobert-bold-italic)"],
                "ro-semibold": ["var(--font-roobert-semi-bold)"],
                "ro-semibold-italic": ["var(--font-roobert-semibold-italic)"],
                "ro-medium": ["var(--font-roobert-medium)"],
                "ro-medium-italic": ["var(--font-roobert-medium-italic)"],
                "ro-light": ["var(--font-roobert-light)"],
                "ro-light-italic": ["var(--font-roobert-light-italic)"],
                "ro-heavy": ["var(--font-roobert-heavy)"],
                "ro-heavy-italic": ["var(--font-roobert-heavy-italic)"],
            },
            colors: {
                leaf: "#114232",
                "leaf-hover": "#0e3a2b",
                "leaf-dark": "#0c3426",
                black: "#000000",
                white: "#ffffff",
                gray: "#EDEEEC",
                stone: "#F4F4F4",
                rouge: "#E35555",
                "rouge-hover": "#d14f4f",
                "white-hover": "#FAFAFA",
                bordeaux: "#421111",
                "bordeaux-hover": "#3a0e0e",
                yellow: "#FFF5DC",
                "yellow-dark": "#423411",
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
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
