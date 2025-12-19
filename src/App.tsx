import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Expertise from './components/Expertise';
import Products from './components/Products';
import Insights from './components/Insights';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-charcoal min-h-screen text-white font-sans selection:bg-electric-violet selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Expertise />
        <Products />
        <Insights />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
