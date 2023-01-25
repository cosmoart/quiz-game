import '@/styles/globals.css'
import { Rubik } from "@next/font/google"
import { useEffect } from 'react';

const rubik = Rubik({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  useEffect(() => document.body.classList.add(rubik.className), []);

  return <Component {...pageProps} className={rubik.className} />
}
