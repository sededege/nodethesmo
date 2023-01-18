import "./App.css";
import Dropdown from "./components/Dropdown";
import Info from "./components/Info";
import Logo from "./components/assets/logo_sinfondo_rojo.png";


function App() {
  return (
    <div className="w-[100vw] flex-col h-[100vh] items-center justify-center flex">
      <img src={Logo} className="w-[600px]" alt="logo" />
      <Dropdown />
      <Info/>
    </div>
  );
}

export default App;
