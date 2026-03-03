import CircularGallery from "@/components/ui/circular-gallery";

const galleryItems = [
  { image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=80", text: "E-Ticaret" },
  { image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80", text: "Analitik" },
  { image: "https://images.unsplash.com/photo-1553729459-uj80b4gta56d?w=800&auto=format&fit=crop&q=80", text: "Finans" },
  { image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80", text: "Dashboard" },
  { image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&auto=format&fit=crop&q=80", text: "Ödeme" },
  { image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80", text: "Lojistik" },
  { image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=80", text: "Ekip" },
  { image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&auto=format&fit=crop&q=80", text: "Stok Yönetimi" },
];

const HeroGallerySection = () => (
  <section className="relative w-full" style={{ height: "600px", background: "hsl(258, 45%, 10%)" }}>
    <CircularGallery
      items={galleryItems}
      bend={3}
      textColor="#ffffff"
      borderRadius={0.05}
      font="bold 24px sans-serif"
    />
  </section>
);

export default HeroGallerySection;
