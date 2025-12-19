import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Expertise from './Expertise';
import Industries from './Industries';
import Products from './Products';
import Insights from './Insights';
import Contact from './Contact';
import Footer from './Footer';

function Home() {
  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-electric-violet selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Expertise />
        <Industries />
        <Products />
        <Insights />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
