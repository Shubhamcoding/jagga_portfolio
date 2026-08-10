import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Work from './components/Work';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Work />
        <About />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
