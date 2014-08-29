module.exports = function (grunt) {

	// Only DEPLOY task for RequireJS as it does not
	// need a rebundler
	grunt.initConfig({
		requirejs: {
			compile: {
				options: {

					// Our config of requirejs is inside our main.js file
					mainConfigFile: "./dev/app/main.js",
					baseUrl: "./dev/app",

					// Just remove comments not needed
					preserveLicenseComments: false,
					stubModules: ['jsx'], // Put the JSX transform to sleep
					modules: [{
						name: "main",

						// Do not need JSXTransformer or text in the final build
						exclude: ["JSXTransformer", "text"]
					}],
					dir: './build'
				} 
			}
		},

		// Copies the main.js build to our
		// dist folder
		copy: {
			main: {
				files: [{
					expand: true,
					flatten: true,
					src: ['build/main.js', 'dev/libs/requirejs.js'], 
					dest: 'dist/', 
					filter: 'isFile'
				}]
    }
  }
});

	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('deploy', ['requirejs', 'copy']);

};