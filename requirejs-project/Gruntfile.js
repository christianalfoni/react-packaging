module.exports = function (grunt) {

	grunt.initConfig({
		requirejs: {
			compile: {
				options: {
					mainConfigFile: "./dev/app/main.js",
					baseUrl: "./dev/app",
					preserveLicenseComments: false,
					stubModules: ['jsx'],
					modules: [{
						name: "main",
						exclude: ["JSXTransformer", "text"]
					}],
					dir: './build'
				} 
			}
		},
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