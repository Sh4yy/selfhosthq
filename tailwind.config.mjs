import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontFamily: {
			mono: ['JetBrains Mono', 'monospace'],
		},
		extend: {
			colors: {
				gray: colors.neutral,
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}
