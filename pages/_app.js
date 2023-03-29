// import 'tailwindcss/tailwind.css'
import "keen-slider/keen-slider.min.css";
import { AppWrapper } from "../context/state";
import Head from "next/head";
import "../styles/global.css";

if (process.env.NODE_ENV === "production") {
  globalThis.console.log = () => {};
}

function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
      <Head>
        <title>Content Authoring | Playlist App.</title>
        <meta
          name="description"
          content="Demo website for Hands-on activity during training"
        />
      </Head>
      <Component {...pageProps} />
    </AppWrapper>
  );
}

export default MyApp;
