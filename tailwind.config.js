module.exports = {
	content: ["./src/html/**/*.{html,js}"],
	theme: {
		extend:{
			fontFamily: {
				Nunito: ['Nunito']
			},
		}
	},
	plugins: [
		require('@tailwindcss/forms')
	],
}