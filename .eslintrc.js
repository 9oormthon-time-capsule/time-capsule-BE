module.exports = {
	parser: '@typescript-eslint/parser', // TypeScript 구문을 파싱할 파서 설정
	parserOptions: {
		project: './tsconfig.json', // TypeScript 프로젝트 설정 파일 경로
	},
	extends: [
		'airbnb',
		'airbnb-typescript',
		'plugin:@typescript-eslint/recommended',
		'prettier',
	],
	plugins: [
		'@typescript-eslint', // TypeScript 관련 ESLint 플러그인
	],
	rules: {
		// 규칙 추가
	},
};
