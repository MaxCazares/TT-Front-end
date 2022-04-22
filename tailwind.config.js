module.exports = {
	content: ["./src/templates/**/*.{html,js}"],
	theme: {
		extend:{
			fontFamily: {
				Nunito: ['Nunito']
			},
		}
	},
	plugins: [
		require("@tailwindcss/forms")
	],
}