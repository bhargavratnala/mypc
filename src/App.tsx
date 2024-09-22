import "./App.css";
import SuspenseLoader from "./components/SuspenseLoader";
import pcBg from "./assets/images/pcBg.jpeg";
import Desktop from "./components/desktop";

function App() {

  return (
	<>
		<SuspenseLoader>
			<img src={pcBg} alt="logo" className="PcBgImg" />
		</SuspenseLoader>
		<Desktop />
	</>
  );
}

export default App;
