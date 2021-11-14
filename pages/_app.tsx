import Head from 'next/head';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../Components/Layout';
import 'bootstrap/scss/bootstrap.scss';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>책바다</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
export default MyApp;

//책바다 쿠키가 있는 지 확인
//있으면 그대로 사용
//없으면 토큰을 발급하게
