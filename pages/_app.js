import { ToastContainer } from 'react-toastify'
import '../styles/globals.css'
import ProgressBar from '@badrap/bar-of-progress';
import { Router } from 'next/router';
import 'react-toastify/dist/ReactToastify.css';


const progress = new ProgressBar({
  size: 4,
  color: "#f7771c",
  className: 'z-50',
  delay: 100
});

Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);
Router.events.on('routeChangeError', progress.finish);

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ToastContainer />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
