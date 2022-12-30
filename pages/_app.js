import "../styles/globals.css";
import { MainLayout } from "../components/Files";
export default function App({ Component, pageProps }) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
}
