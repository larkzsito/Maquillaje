import Bag from './components/Bag'
import Brand from './components/Brand'
import Defs from './components/Defs'
import Footer from './components/Footer'
import Header from './components/Header'
import Shop from './components/Shop'
import Story from './components/Story'
import Toast from './components/Toast'
import { StoreProvider } from './hooks/useStore'

export default function App() {
  return (
    <StoreProvider>
      <Defs />
      <Header />
      <main>
        <Story />
        <Brand />
        <Shop />
      </main>
      <Footer />
      <Bag />
      <Toast />
    </StoreProvider>
  )
}
