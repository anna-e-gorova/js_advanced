const init = () => {

   let changeQuoMarks = /[^а-я,^a-z]'|'[^а-я,^a-z]/gi;
   let str = `Я тебе приказываю: 'Оставь брата в пок'ое, пусть сам разбирается со своей жизнью'.`;
   let newStr = str.replace(changeQuoMarks, '"');
   console.log(newStr);

}

window.onload = init;