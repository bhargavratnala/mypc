import "./App.css";
import SuspenseLoader from "./components/SuspenseLoader";
import pcBg from "./assets/images/pcBg.jpeg";
import Desktop from "./components/desktop";

function App() {
	const userAgent = navigator.userAgent || navigator.vendor;
	if (/android|iPad|iPhone|iPod|webOS|BlackBerry|Windows Phone/i.test(userAgent))
		return (
			<div className="mobileError">
				<h1>Mobile Not Supported</h1>
				<p>This website is not supported on mobile devices. Please open this website on a desktop or laptop.</p>
			</div>
		);
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
