import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Monitor, Camera, Battery, Cpu, HardDrive, Smartphone } from "lucide-react";
import { useState } from "react";

export default function DeviceDetail() {
  const [selectedImage, setSelectedImage] = useState(0);

  const device = {
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    images: [
      "https://images.unsplash.com/photo-1696446702052-1fbb43c00af0?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1695048133082-1ee722d7a0fe?w=800&h=1000&fit=crop",
    ],
    price: "$1,199",
    colors: "Natural Titanium, Blue Titanium, White Titanium, Black Titanium",
    storage: "256GB, 512GB, 1TB",
    releaseDate: "September 2023",
    specs: {
      display: {
        size: '6.7"',
        resolution: "2796 x 1290 pixels",
        type: "Super Retina XDR OLED",
        refresh: "120Hz ProMotion",
      },
      camera: {
        main: "48MP",
        ultrawide: "12MP",
        telephoto: "12MP (5x optical zoom)",
        front: "12MP TrueDepth",
      },
      performance: {
        chip: "A17 Pro",
        ram: "8GB",
        storage: "256GB / 512GB / 1TB",
      },
      battery: {
        capacity: "4422 mAh",
        charging: "20W wired, 15W MagSafe wireless",
        video: "Up to 29 hours",
      },
      connectivity: {
        network: "5G",
        wifi: "Wi-Fi 6E",
        bluetooth: "5.3",
        usb: "USB-C (USB 3.2)",
      },
      design: {
        weight: "221g",
        thickness: "8.25mm",
        material: "Titanium frame, Ceramic Shield glass",
        waterproof: "IP68",
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div>
            <div className="aspect-[4/5] bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg mb-4 flex items-center justify-center p-8">
              <img
                src={device.images[selectedImage]}
                alt={device.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="flex gap-4 overflow-x-auto">
              {device.images.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`flex-shrink-0 w-20 h-24 rounded-md border-2 overflow-hidden ${
                    selectedImage === idx
                      ? "border-primary"
                      : "border-border hover-elevate"
                  }`}
                  data-testid={`button-image-${idx}`}
                >
                  <img
                    src={image}
                    alt={`${device.name} ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <Badge className="mb-3">{device.brand}</Badge>
            <h1 className="text-4xl font-bold mb-4" data-testid="text-device-name">
              {device.name}
            </h1>
            <div className="text-3xl font-bold text-primary mb-6" data-testid="text-device-price">
              {device.price}
            </div>

            <Card className="mb-6">
              <CardContent className="p-6 space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Colors</div>
                  <div className="font-medium">{device.colors}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Storage Options</div>
                  <div className="font-medium">{device.storage}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Release Date</div>
                  <div className="font-medium">{device.releaseDate}</div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button size="lg" className="flex-1" data-testid="button-add-to-compare">
                Add to Compare
              </Button>
              <Button size="lg" variant="outline" data-testid="button-share">
                Share
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="specs" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2" data-testid="tabs-device-info">
            <TabsTrigger value="specs" data-testid="tab-specs">Specifications</TabsTrigger>
            <TabsTrigger value="images" data-testid="tab-images">All Images</TabsTrigger>
          </TabsList>

          <TabsContent value="specs" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Monitor className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-lg">Display</h3>
                  </div>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Size</dt>
                      <dd className="font-mono">{device.specs.display.size}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Resolution</dt>
                      <dd className="font-mono">{device.specs.display.resolution}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Type</dt>
                      <dd className="font-mono">{device.specs.display.type}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Refresh Rate</dt>
                      <dd className="font-mono">{device.specs.display.refresh}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Camera className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-lg">Camera</h3>
                  </div>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Main</dt>
                      <dd className="font-mono">{device.specs.camera.main}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Ultrawide</dt>
                      <dd className="font-mono">{device.specs.camera.ultrawide}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Telephoto</dt>
                      <dd className="font-mono">{device.specs.camera.telephoto}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Front</dt>
                      <dd className="font-mono">{device.specs.camera.front}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Cpu className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-lg">Performance</h3>
                  </div>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Chip</dt>
                      <dd className="font-mono">{device.specs.performance.chip}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">RAM</dt>
                      <dd className="font-mono">{device.specs.performance.ram}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Storage</dt>
                      <dd className="font-mono">{device.specs.performance.storage}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Battery className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-lg">Battery</h3>
                  </div>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Capacity</dt>
                      <dd className="font-mono">{device.specs.battery.capacity}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Charging</dt>
                      <dd className="font-mono">{device.specs.battery.charging}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Video Playback</dt>
                      <dd className="font-mono">{device.specs.battery.video}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <HardDrive className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-lg">Connectivity</h3>
                  </div>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Network</dt>
                      <dd className="font-mono">{device.specs.connectivity.network}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Wi-Fi</dt>
                      <dd className="font-mono">{device.specs.connectivity.wifi}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Bluetooth</dt>
                      <dd className="font-mono">{device.specs.connectivity.bluetooth}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">USB</dt>
                      <dd className="font-mono">{device.specs.connectivity.usb}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Smartphone className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-lg">Design</h3>
                  </div>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Weight</dt>
                      <dd className="font-mono">{device.specs.design.weight}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Thickness</dt>
                      <dd className="font-mono">{device.specs.design.thickness}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Material</dt>
                      <dd className="font-mono">{device.specs.design.material}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Water Resistance</dt>
                      <dd className="font-mono">{device.specs.design.waterproof}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="images" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {device.images.map((image, idx) => (
                <div
                  key={idx}
                  className="aspect-[4/5] bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg p-8 flex items-center justify-center"
                >
                  <img
                    src={image}
                    alt={`${device.name} ${idx + 1}`}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
