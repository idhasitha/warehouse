import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { AppWrapper } from "~/utils/lib/context/app-context";
import { ToastContainer } from "react-toastify";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <AppWrapper>
      <Component {...pageProps} />
      <ToastContainer />
    </AppWrapper>
  );
};

export default api.withTRPC(MyApp);
