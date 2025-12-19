import { Helmet } from 'react-helmet-async';
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
      <Helmet>
        {/* Primary Meta Tags */}
        <title>CloudGeeks | AI Engineering & Cloud Consultancy Bella Vista</title>
        <meta name="description" content="Ganda Tech Services (GTS) presents CloudGeeks. Specialist AI Engineering, Custom App Development, and Cloud Infrastructure services in Bella Vista & Norwest Business Park." />
        <meta name="keywords" content="Software Engineer Bella Vista, AI Consultancy Sydney, Cloud Services Norwest, Custom App Development, Ganda Tech Services, ContentSage, Saya, Digital Transformation Hills District" />
        <link rel="canonical" href="https://cloudgeeks.com.au/" />

        {/* Open Graph / Facebook / LinkedIn */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cloudgeeks.com.au/" />
        <meta property="og:title" content="CloudGeeks | Engineering the Future of Your Business" />
        <meta property="og:description" content="We build intelligent ecosystems using Data Science, NLP, and Cloud Infrastructure. Located in Norwest Business Park." />
        <meta property="og:image" content="https://cloudgeeks.com.au/assets/gts-logo-light.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://cloudgeeks.com.au/" />
        <meta property="twitter:title" content="CloudGeeks | AI & Cloud Engineering" />
        <meta property="twitter:description" content="Expert software engineering and digital transformation for SMBs in Sydney's Hills District." />
        <meta property="twitter:image" content="https://cloudgeeks.com.au/assets/gts-logo-light.png" />

        {/* Geo-Tagging (Crucial for Local SEO) */}
        <meta name="geo.region" content="AU-NSW" />
        <meta name="geo.placename" content="Bella Vista" />
        <meta name="geo.position" content="-33.7296;150.9575" />
        <meta name="ICBM" content="-33.7296, 150.9575" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "CloudGeeks",
            "image": "https://cloudgeeks.com.au/assets/cloudgeek-logo.png",
            "parentOrganization": {
              "@type": "Organization",
              "name": "Ganda Tech Services"
            },
            "description": "Boutique engineering consultancy specializing in AI, Cloud Infrastructure, and Digital Transformation for SMBs.",
            "@id": "https://cloudgeeks.com.au",
            "url": "https://cloudgeeks.com.au",
            "telephone": "+61400000000",
            "priceRange": "$$",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "U608, 8 Elizabeth Macarthur Dr",
              "addressLocality": "Bella Vista",
              "addressRegion": "NSW",
              "postalCode": "2153",
              "addressCountry": "AU"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": -33.7296,
              "longitude": 150.9575
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
              ],
              "opens": "09:00",
              "closes": "17:00"
            },
            "sameAs": [
              "https://www.linkedin.com/company/ganda-tech-services",
              "https://github.com/ashishgurprit"
            ],
            "serviceArea": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": -33.7296,
                "longitude": 150.9575
              },
              "geoRadius": "25000"
            }
          })}
        </script>
      </Helmet>

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
