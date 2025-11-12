import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SearchBar } from "@/components/search-bar";
import { DeviceCard } from "@/components/device-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Tablet, Watch, Search, Filter, Scale } from "lucide-react";
import { Link, useLocation } from "wouter";
import heroImage from "@assets/generated_images/Hero_image_flagship_devices_276d2ba8.png";

export default function Home() {
  const [, setLocation] = useLocation();

  const featuredDevices = [
    {
      id: "1",
      name: "iPhone 15 Pro Max",
      brand: "Apple",
      image: "https://images.unsplash.com/photo-1696446702052-1fbb43c00af0?w=400&h=600&fit=crop",
      screenSize: '6.7"',
      camera: "48MP",
      battery: "4422mAh",
      price: "$1,199",
    },
    {
      id: "2",
      name: "Galaxy S24 Ultra",
      brand: "Samsung",
      image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=600&fit=crop",
      screenSize: '6.8"',
      camera: "200MP",
      battery: "5000mAh",
      price: "$1,299",
    },
    {
      id: "3",
      name: "Pixel 8 Pro",
      brand: "Google",
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=600&fit=crop",
      screenSize: '6.7"',
      camera: "50MP",
      battery: "5050mAh",
      price: "$999",
    },
    {
      id: "4",
      name: "OnePlus 12",
      brand: "OnePlus",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=600&fit=crop",
      screenSize: '6.82"',
      camera: "50MP",
      battery: "5400mAh",
      price: "$799",
    },
  ];

  const brands = [
    { name: "Apple", logo: "🍎" },
    { name: "Samsung", logo: "📱" },
    { name: "Google", logo: "🔍" },
    { name: "OnePlus", logo: "1+" },
    { name: "Xiaomi", logo: "📲" },
    { name: "Huawei", logo: "📳" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background z-10" />
          <img
            src={heroImage}
            alt="Mobile devices showcase"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Explore 15,000+ Devices
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-foreground/90 max-w-3xl mx-auto">
            Complete specifications, professional images, and pricing for phones, tablets, and wearables
          </p>
          <div className="max-w-2xl mx-auto mb-8">
            <SearchBar onSearch={(query) => setLocation(`/browse?q=${query}`)} />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-foreground/80">
            <Badge variant="secondary" className="text-sm px-4 py-1.5">
              15,000+ Devices
            </Badge>
            <Badge variant="secondary" className="text-sm px-4 py-1.5">
              200+ Brands
            </Badge>
            <Badge variant="secondary" className="text-sm px-4 py-1.5">
              Updated Daily
            </Badge>
          </div>
        </div>
      </section>

      <main className="flex-1 container mx-auto px-4">
        <section className="py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">Latest Releases</h2>
            <p className="text-muted-foreground">
              Discover the newest flagship devices from top brands
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredDevices.map((device) => (
              <DeviceCard
                key={device.id}
                {...device}
                onClick={() => setLocation(`/device/${device.id}`)}
              />
            ))}
          </div>
          <div className="text-center">
            <Link href="/browse">
              <Button size="lg" data-testid="button-view-all">
                View All Devices
              </Button>
            </Link>
          </div>
        </section>

        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">Browse by Brand</h2>
            <p className="text-muted-foreground">
              Find devices from your favorite manufacturers
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brands.map((brand) => (
              <button
                key={brand.name}
                onClick={() => setLocation(`/browse?brand=${brand.name}`)}
                className="p-6 rounded-lg border bg-card hover-elevate active-elevate-2 transition-all"
                data-testid={`button-brand-${brand.name.toLowerCase()}`}
              >
                <div className="text-4xl mb-2">{brand.logo}</div>
                <div className="font-medium">{brand.name}</div>
              </button>
            ))}
          </div>
        </section>

        <section className="py-16 bg-muted/30 -mx-4 px-4 rounded-lg">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">Why Choose MobileHub?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Powerful Search</h3>
              <p className="text-muted-foreground text-sm">
                Lightning-fast search with autocomplete and fuzzy matching across all devices
              </p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <Filter className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Smart Filtering</h3>
              <p className="text-muted-foreground text-sm">
                Filter by brand, price, specs, and release date to find exactly what you need
              </p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <Scale className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Easy Comparison</h3>
              <p className="text-muted-foreground text-sm">
                Compare up to 4 devices side-by-side to make informed decisions
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">15,000+</div>
              <div className="text-muted-foreground">Devices</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">200+</div>
              <div className="text-muted-foreground">Brands</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-muted-foreground">Uptime</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">Daily</div>
              <div className="text-muted-foreground">Updates</div>
            </div>
          </div>
        </section>

        <section className="py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Start Exploring Today
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Access complete device specifications, professional images, and pricing information for 15,000+ smartphones, tablets, and wearables
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/browse">
              <Button size="lg" data-testid="button-browse-devices">
                Browse Devices
              </Button>
            </Link>
            <Link href="/compare">
              <Button size="lg" variant="outline" data-testid="button-compare-devices">
                Compare Devices
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
