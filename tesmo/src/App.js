import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Fullpage from './Fullpage';
import Footer from './Footer';

function App() {
  return (
    <div className="w-full text-white bg-red-700">
      <Fullpage />
      <Footer/>
    </div>
  );
}

export default App;
