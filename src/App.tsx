import "./App.css";
import Calendar from "./components/Calendar";

import { GongsiSearch } from "./pages/GongsiSearch/GongsiSearch";

import { Regist } from "./pages/Regist/Regist_01";
import { Regist_02 } from "./pages/Regist/Regist_02";
// import { Main } from './pages/Main/Main';

function App() {
  return (
    <div>
      {/* <Main></Main> */}
      {/* <Regist /> */}
      {/* <Regist_02 /> */}
      <GongsiSearch />
    </div>
  );
}

export default App;
