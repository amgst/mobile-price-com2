import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useState } from "react";

export default function Compare() {
  const [devices] = useState([
    {
      id: "1",
      name: "iPhone 15 Pro Max",
      brand: "Apple",
      image: "https://images.unsplash.com/photo-1696446702052-1fbb43c00af0?w=400&h=600&fit=crop",
      price: "$1,199",
      display: '6.7" OLED',
      camera: "48MP",
      battery: "4422mAh",
      processor: "A17 Pro",
      ram: "8GB",
      storage: "256GB",
    },
    {
      id: "2",
      name: "Galaxy S24 Ultra",
      brand: "Samsung",
      image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=600&fit=crop",
      price: "$1,299",
      display: '6.8" AMOLED',
      camera: "200MP",
      battery: "5000mAh",
      processor: "Snapdragon 8 Gen 3",
      ram: "12GB",
      storage: "256GB",
    },
    {
      id: "3",
      name: "Pixel 8 Pro",
      brand: "Google",
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=600&fit=crop",
      price: "$999",
      display: '6.7" OLED',
      camera: "50MP",
      battery: "5050mAh",
      processor: "Tensor G3",
      ram: "12GB",
      storage: "128GB",
    },
  ]);

  const specs = [
    { label: "Price", key: "price" },
    { label: "Display", key: "display" },
    { label: "Camera", key: "camera" },
    { label: "Battery", key: "battery" },
    { label: "Processor", key: "processor" },
    { label: "RAM", key: "ram" },
    { label: "Storage", key: "storage" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Compare Devices</h1>
          <p className="text-muted-foreground">
            Compare specifications side-by-side to find the perfect device for you
          </p>
        </div>

        {devices.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground mb-4">
              No devices selected for comparison yet
            </p>
            <Button data-testid="button-browse-to-add">Browse Devices</Button>
          </Card>
        ) : (
          <div className="overflow-x-auto">
            <div className="inline-flex gap-6 min-w-full">
              {devices.map((device) => (
                <Card key={device.id} className="flex-1 min-w-[280px]">
                  <CardContent className="p-6">
                    <div className="relative mb-4">
                      <button
                        className="absolute -top-2 -right-2 p-1 rounded-full bg-destructive text-destructive-foreground hover-elevate"
                        data-testid={`button-remove-${device.id}`}
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <div className="aspect-[3/4] bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg mb-4 flex items-center justify-center p-6">
                        <img
                          src={device.image}
                          alt={device.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <Badge className="mb-2">{device.brand}</Badge>
                      <h3 className="font-semibold text-lg" data-testid={`text-compare-device-${device.id}`}>
                        {device.name}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {devices.length < 4 && (
                <Card className="flex-1 min-w-[280px] border-dashed">
                  <CardContent className="p-6 h-full flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-muted-foreground mb-4">Add another device</p>
                      <Button variant="outline" data-testid="button-add-device">
                        + Add Device
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-6">Specifications</h2>
              <div className="space-y-4">
                {specs.map((spec) => (
                  <div
                    key={spec.key}
                    className="grid gap-6"
                    style={{
                      gridTemplateColumns: `repeat(${Math.min(devices.length + 1, 5)}, 1fr)`,
                    }}
                  >
                    <div className="font-medium text-muted-foreground py-3">
                      {spec.label}
                    </div>
                    {devices.map((device) => (
                      <div
                        key={`${device.id}-${spec.key}`}
                        className="py-3 px-4 rounded-md bg-muted/30 font-mono text-sm"
                        data-testid={`spec-${device.id}-${spec.key}`}
                      >
                        {device[spec.key as keyof typeof device]}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
