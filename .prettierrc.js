module.exports = {
  // 인용문(quote)를 작은따옴표로 사용
  singleQuote: true,

  // 단락의 끝나면 세미콜론을 붙이도록 함 (기본값 사용)
  semi: true,

  // 객체의 key에 필요한 경우에만 따옴표를 붙힘 (기본값 사용)
  quoteProps: 'as-needed',

  // 콤파의 마지막에 붙힐지 아닐지 (기본값 사용)
  trailingComma: 'es5',

  // Vue파일 안의 <script>와 <style>의 들여쓰기를 할지 않할지 (기본값 사용)
  vueIndentScriptAndStyle: false,

  printWidth: 120,

  // html에서 공백에 민간한 엘리먼트를 CSS표시값을 따라 정의 합 (기본갑 사용)
  htmlWhitespaceSensitivity: 'css',

  // arrow function의 param은 항상 괄호는 가능하면 생략
  arrowParens: 'avoid',
};
