import "./Home.css";
import { useState } from "react";

// Language pack
let lang = navigator.language || "";
lang = "en-GB"; // 测试用，实际使用时应根据用户浏览器语言设置
const textList = {
  "en-GB": {
    title: "COLD COFFEE",
    search: "search",
  },
  "en-US": {
    title: "COLD COFFEE",
    search: "search",
  },
  "zh-CN": {
    title: "咖啡起始页",
    search: "搜索",
  },
  "zh-HK": {
    title: "咖啡起始頁",
    search: "搜尋",
  },
  "zh-TW": {
    title: "咖啡起始頁",
    search: "搜尋",
  },
};
const links = [
  [
    { name: "Google", address: "https://www.google.co.uk/" },
    { name: "Moodle", address: "https://moodle.gla.ac.uk/my/courses.php/" },
    {
      name: "MyCampus",
      address:
        "https://uogstudents.mycampus.gla.ac.uk/psc/campus/EMPLOYEE/SA/c/PT_FLDASHBOARD.PT_FLDASHBOARD.GBL?DB=UOG_STUDENT_HOMEPAGE_DB&/",
    },
  ],
  [
    { name: "ChatGPT", address: "https://chatgpt.com//" },
    { name: "Microsoft 365", address: "https://m365.cloud.microsoft/?auth=2/" },
    { name: "OneDrive", address: "https://m365.cloud.microsoft/?auth=2/" },
  ],
  [
    { name: "Leet Code", address: "https://www.google.co.uk/" },
    { name: "Github", address: "https://github.com/colarm?tab=repositories/" },
    {
      name: "Gitlab",
      address:
        "https://stgit.dcs.gla.ac.uk/team-project-m/2024/group-6/turn-based-card-game/",
    },
  ],
];
const defaultValue = textList["en-GB"];
const handler = {
  get: function (target, prop, receiver) {
    return target[prop] || defaultValue;
  },
};
let text = new Proxy(textList, handler);

// Search engine
const searchEngineList = {
  Google: "https://www.google.com/search?q=",
};
const searchEngine = "Google";

function onClick(event) {
  window.location.href = "/";
}

function search(inputValue) {
  window.open(searchEngineList[searchEngine] + encodeURIComponent(inputValue));
}

function visit(address) {
  window.open(address);
}

function onKeyUp(event, inputValue) {
  if (event.keyCode === 13) {
    search(inputValue);
  }
}

function Home() {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="home">
      <h1 className="title" onClick={(e) => onClick(e)}>
        {text[lang].title}
      </h1>
      <div>
        <input
          className="search"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={(e) => onKeyUp(e, inputValue)}
        />
        <button className="searchButton" onClick={() => search(inputValue)}>
          {text[lang].search}
        </button>
      </div>
      <div className="links">
        <table>
          <tbody>
            {links.map((row, rowIndex) => (
              <tr key={rowIndex} className="links-row">
                {row.map((item, colIndex) => (
                  <td
                    key={colIndex}
                    className="links-column"
                    onClick={(e) => visit(item.address)}
                  >
                    <div className="links-column-item">{item.name}</div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
