import '@/styles/globals.css'
import { StateProvider } from '@/context/StateContext';

import {Toaster} from "react-hot-toast"

export default function App({ Component, pageProps }) {
  return(

    <StateProvider>
      <Toaster/>
      <Component {...pageProps} />
    </StateProvider>
    
  )
}
