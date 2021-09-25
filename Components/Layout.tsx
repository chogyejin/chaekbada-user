import Header from './Header';
import Footer from './Footer';

const styles = {
  layout: {
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  },
  Header: {
    height: 60,
  },
  main: {
    flex: 1,
  },
  Footer: {
    height: 60,
  },
};

export default function Layout(props: any) {
  return (
    <>
      <Header></Header>
      {props.children}
      <Footer></Footer>
    </>
  );
}
