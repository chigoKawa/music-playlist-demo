// import 'tailwindcss/tailwind.css'
import { AppWrapper } from "../context/state";
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
      <Component {...pageProps} />{" "}
    </AppWrapper>
  );
}

export default MyApp;
