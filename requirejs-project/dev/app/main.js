require.config({
	paths: {
		'jsx': '../libs/jsx',
		'JSXTransformer': '../libs/JSXTransformer',
		'react': '../libs/react',
		'text': '../libs/text'
	},
	jsx: {
    fileExtension: '.jsx'
  }
});
require(['react', 'jsx!App'], function (React, App) {
	React.renderComponent(App(), document.body);
});