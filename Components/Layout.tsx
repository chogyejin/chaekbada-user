import Header from './Header';
import Footer from './Footer';
import styles from '/styles/Layout.module.scss';

const Layout = (props: {
  children: React.ReactNode
}) => {
  return (
    <div className={styles.layout}>
      <Header />

      <main className={styles.main}>
        {props.children}
      </main>
      
      <Footer />
    </div>
  )
}

export default Layout
