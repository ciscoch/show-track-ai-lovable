
import type { Config } from "tailwindcss";

export default {
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
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom app colors
				"livestock-green": {
					50: "#f0fdf4",
					100: "#dcfce7",
					200: "#bbf7d0",
					300: "#86efac",
					400: "#4ade80",
					500: "#22c55e",
					600: "#16a34a",
					700: "#15803d",
					800: "#166534",
					900: "#14532d",
					950: "#052e16",
				},
				"barn-red": {
					50: "#fef2f2",
					100: "#fee2e2",
					200: "#fecaca",
					300: "#fca5a5",
					400: "#f87171",
					500: "#ef4444",
					600: "#dc2626",
					700: "#b91c1c",
					800: "#991b1b",
					900: "#7f1d1d",
					950: "#450a0a",
				},
				"earthy-brown": {
					50: "#fefce8",
					100: "#fff9c2",
					200: "#fef08a",
					300: "#fde047",
					400: "#facc15",
					500: "#eab308",
					600: "#ca8a04",
					700: "#a16207",
					800: "#854d0e",
					900: "#713f12",
					950: "#422006",
				},
				// New rodeo theme colors
				"rodeo-leather": {
					50: "#fbf7f0",
					100: "#f5ead9",
					200: "#ead6b5",
					300: "#dfc190",
					400: "#d3a96c",
					500: "#c49050",
					600: "#b47941",
					700: "#a06438",
					800: "#835232",
					900: "#6d442b",
				},
				"western-turquoise": {
					50: "#edfffe",
					100: "#d5fffc",
					200: "#aff5f5",
					300: "#7ce7ea",
					400: "#40cfda",
					500: "#20b2c2",
					600: "#198fa4",
					700: "#187286",
					800: "#185c6d",
					900: "#194c5c",
				},
				"desert-sand": {
					50: "#fdf8ef",
					100: "#f9edd9",
					200: "#f2d9b0",
					300: "#eabe7d",
					400: "#e39e4b",
					500: "#db7e30",
					600: "#ca6126",
					700: "#a84924",
					800: "#883a23",
					900: "#70321f",
				},
			},
			backgroundImage: {
				'rodeo-pattern': "url('/public/assets/rodeo-pattern.png')",
				'leather-texture': "linear-gradient(to bottom, rgba(164, 116, 73, 0.2), rgba(120, 80, 50, 0.3)), url('/public/assets/leather-texture.png')",
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				wiggle: {
					'0%, 100%': { transform: 'rotate(-3deg)' },
					'50%': { transform: 'rotate(3deg)' },
				},
				'lasso-spin': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				wiggle: 'wiggle 1s ease-in-out infinite',
				'lasso-spin': 'lasso-spin 3s linear infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
