// ============================================================
// 🎊 WEDDING WEBSITE — CENTRAL DATA CONFIGURATION
// Edit ONLY this file to customise all content on the site.
// ============================================================

// ── Couple Info ──────────────────────────────────────────────
export const coupleConfig = {
  bride: {
    name: "Gayathiri",
    fullName: "Gayathiri Elambooranan",
    bio: "Daughter of Mr. T. Elambooranan & Mrs. E. Punithavathi. An AI Engineer at ZS Company, Toronto, Canada — she carries the warmth of Trichy in her heart and the spark of curiosity in everything she does.",
    photo: "/assets/couple/bride.jpg",
    background: "Trichy, Tamil Nadu",
  },
  groom: {
    name: "Pranay",
    fullName: "Pranay Sood",
    bio: "Son of Mr. Jitender Pal Sood & Mrs. M. Dhana Lakshmi. A Reliability Product Data Analyst at Minesense, Vancouver, Canada — adventurous, warm-hearted, and always ready to celebrate life to the fullest.",
    photo: "/assets/couple/groom.jpg",
    background: "Punjab",
  },
  heroImage: "/assets/couple/hero.jpg",
  hashtag: "#GPSLockedIn",
  hashtag2: "#DosaSaidYesToBriyani",
  welcomeMessage:
    "With the Divine Blessings of Arulmighu Kamatchi Amman and the joyful blessings of our families, we invite you to celebrate the union of Pranay & Gayathiri — a beautiful journey where Punjab's warmth meets Tamil Nadu's grace. We eagerly await your presence as they embark on this beautiful journey together.",
};

// ── Event Year ───────────────────────────────────────────────
// ← Change this single value to update all event years
export const EVENT_YEAR = 2026;

// ── Venue ────────────────────────────────────────────────────
export const venueConfig = {
  name: "The Royal Mahal",
  address: "Kumaraiyar, Tiruchirappalli, Tamil Nadu – 620 102",
  googleMapsUrl: "https://maps.google.com/?q=The+Royal+Mahal+Tiruchirappalli",
  nearestAirport: "Tiruchirappalli International Airport (TRZ)",
  hotels: [
    { name: "Hotel Ramyas",   website: "https://ramyashotels.com/", stars: 4 },
    { name: "Hotel Shaans",   website: "http://www.hotelshaans.com/", stars: 4 },
    { name: "Marriott Hotel",  website: "https://www.marriott.com/en-us/hotels/trzcy-courtyard-tiruchirappalli/overview/?scid=f2ae0541-1279-4f24-b197-a979c79310b0", stars: 5 },
    { name: "My place 🏠",   website: "#",                           stars: 5 },
  ],
  travelTips: [
    "Trichy is well-connected by rail from Chennai, Bengaluru, and Hyderabad.",
    "Auto-rickshaws and cabs (Ola/Uber) are easily available in the city.",
    "The Royal Mahal is approximately 15 minutes from Tiruchirappalli Airport.",
    "Pre-book accommodation early as the city can get busy during wedding season.",
  ],
};

// ── Livestream ───────────────────────────────────────────────
export const livestreamConfig = {
  youtubeUrl: "YOUTUBE_LIVE_URL",     // ← Replace with actual YouTube Live URL (or leave as-is for "Coming Soon")
  zoomUrl:    "ZOOM_OR_STREAM_URL",   // ← Replace with Zoom/other stream URL
  note: "Live stream links will be active closer to the event time. Bookmark this page and check back — we'd love you to celebrate with us from wherever you are in the world! 🌍",
};

// ── RSVP ─────────────────────────────────────────────────────
export const rsvpConfig = {
  googleFormUrl:    "GOOGLE_FORM_RSVP_URL",
  email:            "gayathritela99@gmail.com",
  whatsappNumber:   "+919876543210",
  whatsappMessage:  "Hi! I'd like to RSVP for Pranay & Gayathiri's wedding 🎊",
  deadline:         "July 1, 2026",
};

// ── FAQ ──────────────────────────────────────────────────────
export const faqItems = [
  {
    question: "What should I wear?",
    answer:
      "We'd love to see you dressed in traditional Indian attire — sarees, salwar suits, kurtas, or sherwanis are all perfect. Wear yellows and greens for Haldi & Mehendi. The wedding ceremony calls for festive colours. Please avoid white or black as those are generally reserved for other occasions.",
  },
  {
    question: "Where are the events happening?",
    answer:
      "Haldi & Mehendi is at home in Trichy. The Engagement & Sangeet and Wedding Muhurtham are at The Royal Mahal, Kumaraiyar, Tiruchirappalli. The Reception is at Moksh Banquets, Necklace Road, Hyderabad. Check each event card for details.",
  },
  {
    question: "Will there be live streaming?",
    answer:
      "Yes! We are setting up live streams for the wedding ceremony and reception. Links will be shared in the Livestream section of this website closer to the event dates. Bookmark this page!",
  },
  {
    question: "Can I bring my family?",
    answer:
      "Absolutely — this is a family celebration! If you're bringing additional guests, please let us know when you RSVP so we can ensure appropriate seating and catering arrangements.",
  },
  {
    question: "Who do I contact for help?",
    answer:
      "Please reach out at gayathritela99@gmail.com. We'll be happy to assist with any questions about travel, accommodation, or the event schedule.",
  },
];

// ── Events ───────────────────────────────────────────────────
export interface WeddingEvent {
  id: string;
  name: string;
  shortName: string;
  date: string;          // ISO: "YYYY-MM-DD"
  time: string;          // Display string e.g. "6:00 PM IST"
  timeISO: string;       // For ICS: "T180000"
  endTimeISO: string;    // For ICS: "T210000"
  location: string;      // Venue / address display string
  description: string;
  theme: string;
  icon: string;          // Emoji icon
  mapUrl: string;
  livestreamUrl: string; // Empty string → "Coming Soon"
  accentColor: string;   // Tailwind bg colour class (for card accent)
  textColor: string;     // Tailwind text colour class
  dressCode: string;     // Guest dress code / colour theme
}

export const weddingEvents: WeddingEvent[] = [
  {
    id: "haldi",
    name: "Haldi",
    shortName: "Haldi",
    date: `${EVENT_YEAR}-07-14`,
    time: "Tuesday, July 14, 2026",
    timeISO: "T100000",
    endTimeISO: "T130000",
    location: "Trichy",
    description:
      "Flowers, laughter, colours, and a little pre-wedding madness. No one is leaving spotless!",
    theme: "Happy Vibes",
    icon: "🌼",
    mapUrl: "https://maps.google.com/?q=Trichy+Tiruchirappalli",
    livestreamUrl: "",
    accentColor: "bg-yellow-500",
    textColor: "text-yellow-700",
    dressCode: "Yellow shades, white",
  },
  {
    id: "mehendi",
    name: "Mehendi",
    shortName: "Mehendi",
    date: `${EVENT_YEAR}-07-14`,
    time: "Tuesday, July 14, 2026",
    timeISO: "T140000",
    endTimeISO: "T170000",
    location: "Trichy",
    description:
      "Henna on our hands, music in the background, and so much tea to catch up on. Come sit with us, laugh with us, and get your hands done.",
    theme: "Henna & Tea",
    icon: "🌿",
    mapUrl: "https://maps.google.com/?q=Trichy+Tiruchirappalli",
    livestreamUrl: "",
    accentColor: "bg-green-500",
    textColor: "text-green-700",
    dressCode: "Greens, light green shades, and florals",
  },
  {
    id: "engagement-sangeet",
    name: "Engagement & Sangeet",
    shortName: "Sangeet",
    date: `${EVENT_YEAR}-07-15`,
    time: "Wednesday, July 15, 2026 — 6:00 PM onwards",
    timeISO: "T180000",
    endTimeISO: "T220000",
    location: "The Royal Mahal, Trichy",
    description:
      "Rings, music, dancing, and a night full of fun. No language rules, no shy faces, just good vibes. Come show us the talent you have been hiding!",
    theme: "Rings, Music & Masti",
    icon: "💍",
    mapUrl: venueConfig.googleMapsUrl,
    livestreamUrl: "",
    accentColor: "bg-pink-500",
    textColor: "text-pink-700",
    dressCode: "Anything sparkly, glittery, or festive. Coats and suits for men are welcome.",
  },
  {
    id: "wedding",
    name: "The Kalyanam",
    shortName: "Wedding",
    date: `${EVENT_YEAR}-07-16`,
    time: "Thursday, July 16, 2026 — 8:50 AM to 10:20 AM",
    timeISO: "T085000",
    endTimeISO: "T102000",
    location: "The Royal Mahal,Trichy",
    description:
      "Join us for our wedding muhurtham and bless us as we begin our life together surrounded by the people we love.",
    theme: "The Big Day",
    icon: "🪔",
    mapUrl: venueConfig.googleMapsUrl,
    livestreamUrl: livestreamConfig.youtubeUrl,
    accentColor: "bg-red-800",
    textColor: "text-red-800",
    dressCode: "Pastel pinks for women, and light green or pastel shades for men.",
  },
  {
    id: "reception",
    name: "Reception",
    shortName: "Reception",
    date: `${EVENT_YEAR}-07-23`,
    time: "Thursday, July 23, 2026 — 7:00 PM onwards",
    timeISO: "T190000",
    endTimeISO: "T230000",
    location: "Moksh Banquets,Hyderabad",
    description:
      "What's a celebration without Hyderabadi biryani? Come dressed up and come hungry.",
    theme: "Food & Celebration",
    icon: "🌸",
    mapUrl: "https://maps.google.com/?q=Moksh+Banquets+Necklace+Road+Hyderabad",
    livestreamUrl: "",
    accentColor: "bg-amber-500",
    textColor: "text-amber-700",
    dressCode: "Silver, black, or evening glam.",
  },
];

// ── Gallery Images ────────────────────────────────────────────
// Add or remove images here. Place photo files in /public/assets/gallery/
export const galleryImages = [
  // Couple
  { id: 1,  src: "/assets/gallery/image-1.jpg",  alt: "Couple photo 1",        category: "Couple" },
  { id: 2,  src: "/assets/gallery/image-2.jpg",  alt: "Couple photo 2",        category: "Couple" },
  { id: 3,  src: "/assets/gallery/image-3.jpg",  alt: "Couple photo 3",        category: "Couple" },
  // Families
  { id: 4,  src: "/assets/gallery/image-4.jpg",  alt: "Family photo 1",        category: "Families" },
  { id: 5,  src: "/assets/gallery/image-5.jpg",  alt: "Family photo 2",        category: "Families" },
  // Pre-wedding
  { id: 6,  src: "/assets/gallery/image-6.jpg",  alt: "Pre-wedding photo 1",   category: "Pre-wedding" },
  { id: 7,  src: "/assets/gallery/image-7.jpg",  alt: "Pre-wedding photo 2",   category: "Pre-wedding" },
  { id: 8,  src: "/assets/gallery/image-8.jpg",  alt: "Pre-wedding photo 3",   category: "Pre-wedding" },
  // Venue
  { id: 9,  src: "/assets/gallery/image-9.jpg",  alt: "Venue photo 1",         category: "Venue" },
  { id: 10, src: "/assets/gallery/image-10.jpg", alt: "Venue photo 2",         category: "Venue" },
  // Celebrations
  { id: 11, src: "/assets/gallery/image-11.jpg", alt: "Celebration photo 1",   category: "Celebrations" },
  { id: 12, src: "/assets/gallery/image-12.jpg", alt: "Celebration photo 2",   category: "Celebrations" },
];

export const GALLERY_CATEGORIES = ["All", "Couple", "Families", "Pre-wedding", "Venue", "Celebrations"] as const;
export type GalleryCategory = typeof GALLERY_CATEGORIES[number];
