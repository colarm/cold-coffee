import './Home.css';
import { useState } from 'react';

// Language pack
let lang = navigator.language || '';
lang = 'zh-TW'; // 测试用，实际使用时应根据用户浏览器语言设置
const textList = {
  'en-GB': {
    title: 'COFFEE',
    search: 'search',
  },
  'en-US': {
    title: 'COFFEE',
    search: 'search',
  },
  'zh-CN': {
    title: '咖啡起始页',
    search: '搜索',
  },
  'zh-TW': {
    title: '咖啡起始頁',
    search: '搜尋',
  },
};
const defaultValue = textList['en-GB'];
const handler = {
  get: function (target, prop, receiver) {
    return target[prop] || defaultValue;
  },
};
let text = new Proxy(textList, handler);

// Search engine
const searchEngineList = {
  Google: 'https://www.google.com/search?q=',
};
const searchEngine = 'Google';

function search(inputValue) {
  window.location.href =
    searchEngineList[searchEngine] + encodeURIComponent(inputValue);
}

function onKeyUp(event, inputValue) {
  if (event.keyCode === 13) {
    search(inputValue);
  }
}

function Home() {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="home">
      <h1>{text[lang].title}</h1>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={(e) => onKeyUp(e, inputValue)}
        />
        <button onClick={() => search(inputValue)}>{text[lang].search}</button>
      </div>
    </div>
  );
}

export default Home;
