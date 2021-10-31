import Header from './Header';
import Footer from './Footer';
import styles from '/styles/Layout.module.scss';
import Link from 'next/link';

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />

      <main className={styles.main}>{props.children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
