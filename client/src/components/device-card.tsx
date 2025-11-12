import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Monitor, Camera, Battery } from "lucide-react";

interface DeviceCardProps {
  id: string;
  name: string;
  brand: string;
  image: string;
  screenSize: string;
  camera: string;
  battery: string;
  price?: string;
  onClick?: () => void;
}

export function DeviceCard({
  name,
  brand,
  image,
  screenSize,
  camera,
  battery,
  price,
  onClick,
}: DeviceCardProps) {
  return (
    <Card
      className="overflow-hidden hover-elevate active-elevate-2 cursor-pointer transition-all duration-300"
      onClick={onClick}
      data-testid={`card-device-${name.toLowerCase().replace(/\s/g, '-')}`}
    >
      <div className="aspect-[3/4] bg-gradient-to-br from-muted/30 to-muted/10 relative p-8 flex items-center justify-center">
        <Badge className="absolute top-3 left-3" variant="secondary">
          {brand}
        </Badge>
        {price && (
          <Badge className="absolute bottom-3 right-3 bg-primary text-primary-foreground">
            {price}
          </Badge>
        )}
        <img
          src={image}
          alt={name}
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-3" data-testid={`text-device-name-${name.toLowerCase().replace(/\s/g, '-')}`}>
          {name}
        </h3>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="flex flex-col items-center gap-1 p-2 rounded-md bg-muted/50">
            <Monitor className="h-4 w-4 text-muted-foreground" />
            <span className="font-mono text-muted-foreground">{screenSize}</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-2 rounded-md bg-muted/50">
            <Camera className="h-4 w-4 text-muted-foreground" />
            <span className="font-mono text-muted-foreground">{camera}</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-2 rounded-md bg-muted/50">
            <Battery className="h-4 w-4 text-muted-foreground" />
            <span className="font-mono text-muted-foreground">{battery}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
