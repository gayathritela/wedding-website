// Event illustrations — images live in /public/assets/events/
// scale zooms into the face; transformOrigin anchors where the zoom centres.

function EventImage({ src, alt, yOffset = "15%", scale = 1 }: {
  src: string; alt: string; yOffset?: string; scale?: number;
}) {
  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover"
      style={{
        objectPosition: `50% ${yOffset}`,
        transform: `scale(${scale})`,
        transformOrigin: `50% ${yOffset}`,
      }}
      draggable={false}
    />
  );
}

export function MehndiIllustration() {
  return <EventImage src="/assets/events/mehndi.png" alt="Mehendi" yOffset="12%" scale={1} />;
}

export function HaldiIllustration() {
  return <EventImage src="/assets/events/haldi.png" alt="Haldi" yOffset="12%" scale={1} />;
}

export function SangeetIllustration() {
  return <EventImage src="/assets/events/sangeet.png" alt="Engagement & Sangeet" yOffset="8%" scale={1} />;
}

export function WeddingIllustration() {
  return <EventImage src="/assets/events/wedding.png" alt="Wedding Muhurtham" yOffset="8%" scale={1} />;
}

export function ReceptionIllustration() {
  return <EventImage src="/assets/events/reception.png" alt="Wedding Reception" yOffset="12%" scale={1} />;
}
