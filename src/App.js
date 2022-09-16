import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import MainContent from "./layout/MainContent";
import {Overlay} from "./components";

function App() {
  return (
    <div className="App app-layout">
      <Overlay/>
      <MainContent />
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={true}
      />
    </div>
  );
}

export default App;
