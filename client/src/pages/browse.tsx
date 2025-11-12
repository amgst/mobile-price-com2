import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SearchBar } from "@/components/search-bar";
import { DeviceCard } from "@/components/device-card";
import { FilterPanel } from "@/components/filter-panel";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

export default function Browse() {
  const [location, setLocation] = useLocation();
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    const brand = params.get("brand");
    if (q) setSearchQuery(q);
    if (brand) setSearchQuery(brand);
  }, [location]);

  const { data: devices, isLoading } = useQuery<any[]>({
    queryKey: [`/api/devices/search?name=${encodeURIComponent(searchQuery || "Samsung")}&limit=20`],
    enabled: searchQuery.length > 0 || true,
  });

  const convertImageToUrl = (base64: string | undefined) => {
    if (!base64) return "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=600&fit=crop";
    return `data:image/jpeg;base64,${base64}`;
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setLocation(`/browse?q=${query}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Browse Devices</h1>
          <SearchBar onSearch={handleSearch} placeholder={`Search devices...`} />
        </div>

        <div className="flex gap-8">
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <FilterPanel onFilterChange={(filters) => console.log("Filters changed:", filters)} />
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
              <p className="text-muted-foreground">
                {isLoading ? (
                  <Skeleton className="h-5 w-32" />
                ) : (
                  <>
                    Showing <span className="font-semibold text-foreground">{devices?.length || 0}</span> devices
                    {searchQuery && <span className="ml-2">for "{searchQuery}"</span>}
                  </>
                )}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40" data-testid="select-sort">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="name">Name (A-Z)</SelectItem>
                    <SelectItem value="relevance">Relevance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="aspect-[3/4] w-full" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            ) : devices && devices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {devices.map((device) => (
                  <DeviceCard
                    key={device.id}
                    id={device.id.toString()}
                    name={device.name}
                    brand={device.manufacturer_name || device.brand || ""}
                    image={convertImageToUrl(device.image_b64)}
                    screenSize={device.screen_resolution?.split(",")[0] || "N/A"}
                    camera={device.camera || "N/A"}
                    battery={device.battery_capacity || "N/A"}
                    onClick={() => setLocation(`/device/${device.id}`)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg mb-4">No devices found</p>
                <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
