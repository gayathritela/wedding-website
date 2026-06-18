import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import EventTimeline from "./components/EventTimeline";
import LivestreamSection from "./components/LivestreamSection";
import TravelSection from "./components/TravelSection";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="font-sans antialiased overflow-x-hidden" style={{ background: "#FAF7F4" }}>
      <Navbar />
      <main>
        <Hero />
        <EventTimeline />
        <LivestreamSection />
        <TravelSection />
      </main>
      <Footer />
    </div>
  );
}
