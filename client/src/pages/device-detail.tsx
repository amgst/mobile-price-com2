import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Monitor, Camera, Battery, Cpu, HardDrive, Smartphone } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";

export default function DeviceDetail() {
  const [, params] = useRoute("/device/:id");
  const deviceId = params?.id;

  const { data: device, isLoading } = useQuery<any>({
    queryKey: [`/api/devices/${deviceId}`],
    enabled: !!deviceId,
  });

  const [selectedImage, setSelectedImage] = useState(0);

  const convertImageToUrl = (base64: string | undefined) => {
    if (!base64) return "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=1000&fit=crop";
    return `data:image/jpeg;base64,${base64}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <Skeleton className="aspect-[4/5] w-full mb-4" />
              <div className="flex gap-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="w-20 h-24" />
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-12 w-64" />
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-48 w-full" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!device) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Device Not Found</h1>
            <p className="text-muted-foreground">The device you're looking for doesn't exist.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const images = device.main_image_b64 ? [convertImageToUrl(device.main_image_b64)] : [convertImageToUrl(device.image_b64)];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div>
            <div className="aspect-[4/5] bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg mb-4 flex items-center justify-center p-8">
              <img
                src={images[selectedImage]}
                alt={device.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto">
                {images.map((image, idx) => (
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
            )}
          </div>

          <div>
            <Badge className="mb-3">{device.manufacturer_name || device.brand?.name || "Unknown"}</Badge>
            <h1 className="text-4xl font-bold mb-4" data-testid="text-device-name">
              {device.name}
            </h1>

            <Card className="mb-6">
              <CardContent className="p-6 space-y-4">
                {device.description && (
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Description</div>
                    <div className="text-sm">{device.description}</div>
                  </div>
                )}
                {device.colors && (
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Colors</div>
                    <div className="font-medium">{device.colors}</div>
                  </div>
                )}
                {device.storage && (
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Storage Options</div>
                    <div className="font-medium">{device.storage}</div>
                  </div>
                )}
                {device.release_date && (
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Release Date</div>
                    <div className="font-medium">{device.release_date}</div>
                  </div>
                )}
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
            <TabsTrigger value="details" data-testid="tab-details">Details</TabsTrigger>
          </TabsList>

          <TabsContent value="specs" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {device.screen_resolution && (
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Monitor className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-lg">Display</h3>
                    </div>
                    <dl className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Resolution</dt>
                        <dd className="font-mono">{device.screen_resolution}</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              )}

              {device.camera && (
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Camera className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-lg">Camera</h3>
                    </div>
                    <dl className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Camera</dt>
                        <dd className="font-mono">{device.camera}</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              )}

              {device.hardware && (
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Cpu className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-lg">Performance</h3>
                    </div>
                    <dl className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Hardware</dt>
                        <dd className="font-mono">{device.hardware}</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              )}

              {device.battery_capacity && (
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Battery className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-lg">Battery</h3>
                    </div>
                    <dl className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Capacity</dt>
                        <dd className="font-mono">{device.battery_capacity}</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              )}

              {(device.weight || device.thickness) && (
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Smartphone className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-lg">Design</h3>
                    </div>
                    <dl className="space-y-2 text-sm">
                      {device.weight && (
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Weight</dt>
                          <dd className="font-mono">{device.weight}</dd>
                        </div>
                      )}
                      {device.thickness && (
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Thickness</dt>
                          <dd className="font-mono">{device.thickness}</dd>
                        </div>
                      )}
                    </dl>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="details" className="mt-8">
            <Card>
              <CardContent className="p-6">
                <div className="prose dark:prose-invert max-w-none">
                  {device.description ? (
                    <p>{device.description}</p>
                  ) : (
                    <p className="text-muted-foreground">No additional details available.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
