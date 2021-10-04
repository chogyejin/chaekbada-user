import Header from 'D:/chaekbada-user2/Components/Header';
import Footer from 'D:/chaekbada-user2/Components/Footer';
import styles from 'D:/chaekbada-user2/styles/Layout.module.scss';

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
