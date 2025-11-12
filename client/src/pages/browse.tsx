import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SearchBar } from "@/components/search-bar";
import { DeviceCard } from "@/components/device-card";
import { FilterPanel } from "@/components/filter-panel";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocation } from "wouter";
import { useState } from "react";

export default function Browse() {
  const [, setLocation] = useLocation();
  const [sortBy, setSortBy] = useState("newest");

  const devices = [
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
    {
      id: "5",
      name: "Xiaomi 14 Pro",
      brand: "Xiaomi",
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=600&fit=crop",
      screenSize: '6.73"',
      camera: "50MP",
      battery: "4880mAh",
      price: "$899",
    },
    {
      id: "6",
      name: "iPhone 15",
      brand: "Apple",
      image: "https://images.unsplash.com/photo-1696446702052-1fbb43c00af0?w=400&h=600&fit=crop",
      screenSize: '6.1"',
      camera: "48MP",
      battery: "3877mAh",
      price: "$799",
    },
    {
      id: "7",
      name: "Galaxy Z Fold 5",
      brand: "Samsung",
      image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=600&fit=crop",
      screenSize: '7.6"',
      camera: "50MP",
      battery: "4400mAh",
      price: "$1,799",
    },
    {
      id: "8",
      name: "Pixel 8",
      brand: "Google",
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=600&fit=crop",
      screenSize: '6.2"',
      camera: "50MP",
      battery: "4575mAh",
      price: "$699",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Browse Devices</h1>
          <SearchBar />
        </div>

        <div className="flex gap-8">
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <FilterPanel onFilterChange={(filters) => console.log("Filters changed:", filters)} />
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
              <p className="text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{devices.length}</span> devices
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40" data-testid="select-sort">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="name">Name (A-Z)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {devices.map((device) => (
                <DeviceCard
                  key={device.id}
                  {...device}
                  onClick={() => setLocation(`/device/${device.id}`)}
                />
              ))}
            </div>

            <div className="mt-12 flex justify-center gap-2">
              <Button variant="outline" disabled data-testid="button-prev-page">
                Previous
              </Button>
              <Button variant="outline" data-testid="button-page-1">1</Button>
              <Button variant="outline" data-testid="button-page-2">2</Button>
              <Button variant="outline" data-testid="button-page-3">3</Button>
              <Button variant="outline" data-testid="button-next-page">
                Next
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
