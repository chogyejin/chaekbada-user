import Header from './Header';
import Footer from './Footer';

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="container">{props.children}</main>
      <Footer />
      <style jsx>
        {`
        .container{
          min-height: 100vh;
        `}
      </style>
    </>
  );
};

export default Layout;
