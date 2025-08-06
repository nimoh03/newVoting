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
			fontFamily: {
				'inter': ['Inter', 'sans-serif'],
				'heading': ['Playfair Display', 'serif'],
				'body': ['Inter', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))',
					dark: 'hsl(var(--primary-dark))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
					dark: 'hsl(var(--secondary-dark))'
				},
				festival: {
					green: 'hsl(var(--festival-green))',
					gold: 'hsl(var(--festival-gold))',
					emerald: 'hsl(var(--festival-emerald))',
					teal: 'hsl(var(--festival-teal))',
					purple: 'hsl(var(--festival-purple))',
					'light-green': 'hsl(var(--festival-light-green))'
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
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'festival-float': {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
					'25%': { transform: 'translateY(-15px) rotate(5deg)' },
					'50%': { transform: 'translateY(-10px) rotate(0deg)' },
					'75%': { transform: 'translateY(-20px) rotate(-5deg)' }
				},
				'festival-glow': {
					'0%, 100%': { 
						boxShadow: '0 0 30px hsl(var(--festival-green) / 0.4), 0 0 60px hsl(var(--festival-green) / 0.2)',
						transform: 'scale(1)' 
					},
					'50%': { 
						boxShadow: '0 0 50px hsl(var(--festival-green) / 0.6), 0 0 100px hsl(var(--festival-green) / 0.4)',
						transform: 'scale(1.05)' 
					}
				},
				'gold-shimmer': {
					'0%': { backgroundPosition: '-200% center' },
					'100%': { backgroundPosition: '200% center' }
				},
				'aurora-dance': {
					'0%, 100%': { 
						background: 'linear-gradient(135deg, hsl(var(--festival-purple)) 0%, hsl(var(--festival-teal)) 25%, hsl(var(--festival-green)) 50%, hsl(var(--festival-gold)) 100%)',
						transform: 'rotate(0deg) scale(1)'
					},
					'25%': { 
						background: 'linear-gradient(135deg, hsl(var(--festival-teal)) 0%, hsl(var(--festival-green)) 25%, hsl(var(--festival-gold)) 50%, hsl(var(--festival-purple)) 100%)',
						transform: 'rotate(90deg) scale(1.1)'
					},
					'50%': { 
						background: 'linear-gradient(135deg, hsl(var(--festival-green)) 0%, hsl(var(--festival-gold)) 25%, hsl(var(--festival-purple)) 50%, hsl(var(--festival-teal)) 100%)',
						transform: 'rotate(180deg) scale(1)'
					},
					'75%': { 
						background: 'linear-gradient(135deg, hsl(var(--festival-gold)) 0%, hsl(var(--festival-purple)) 25%, hsl(var(--festival-teal)) 50%, hsl(var(--festival-green)) 100%)',
						transform: 'rotate(270deg) scale(1.1)'
					}
				},
				'pulse-glow': {
					'0%, 100%': { 
						boxShadow: '0 0 20px hsl(var(--festival-gold) / 0.5)' 
					},
					'50%': { 
						boxShadow: '0 0 40px hsl(var(--festival-gold) / 0.8), 0 0 80px hsl(var(--festival-gold) / 0.3)' 
					}
				},
				'float-up': {
					'0%': {
						transform: 'translateY(100vh) rotate(0deg)',
						opacity: '0'
					},
					'10%': { opacity: '0.7' },
					'90%': { opacity: '0.7' },
					'100%': {
						transform: 'translateY(-100px) rotate(360deg)',
						opacity: '0'
					}
				},
				'levitate': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-30px)' }
				},
				'rotate-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'scale-pulse': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.1)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'festival-float': 'festival-float 4s ease-in-out infinite',
				'festival-glow': 'festival-glow 3s ease-in-out infinite',
				'gold-shimmer': 'gold-shimmer 3s linear infinite',
				'aurora-dance': 'aurora-dance 10s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'float-up': 'float-up 10s infinite linear',
				'levitate': 'levitate 6s ease-in-out infinite',
				'rotate-slow': 'rotate-slow 20s linear infinite',
				'scale-pulse': 'scale-pulse 2s ease-in-out infinite'
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-gold': 'var(--gradient-gold)',
				'gradient-hero': 'var(--gradient-hero)',
				'gradient-aurora': 'var(--gradient-aurora)',
				'gradient-luxury': 'var(--gradient-luxury)',
				'gradient-glass': 'var(--gradient-glass)'
			},
			boxShadow: {
				'primary': 'var(--shadow-primary)',
				'gold': 'var(--shadow-gold)',
				'elegant': 'var(--shadow-elegant)',
				'glass': 'var(--shadow-glass)',
				'glow': 'var(--shadow-glow)',
				'aurora': 'var(--shadow-aurora)'
			},
			backdropBlur: {
				'xs': '2px',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;