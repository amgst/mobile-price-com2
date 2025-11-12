import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface FilterPanelProps {
  onFilterChange?: (filters: any) => void;
}

export function FilterPanel({ onFilterChange }: FilterPanelProps) {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 2000]);

  const brands = ["Apple", "Samsung", "Google", "OnePlus", "Xiaomi", "Huawei"];

  const toggleBrand = (brand: string) => {
    const newBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];
    setSelectedBrands(newBrands);
    onFilterChange?.({ brands: newBrands, priceRange });
  };

  const handleClearAll = () => {
    setSelectedBrands([]);
    setPriceRange([0, 2000]);
    onFilterChange?.({ brands: [], priceRange: [0, 2000] });
  };

  return (
    <Card className="sticky top-20">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <CardTitle className="text-lg">Filters</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearAll}
          data-testid="button-clear-filters"
        >
          Clear All
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-3">Brand</h3>
          <div className="space-y-2">
            {brands.map((brand) => (
              <div key={brand} className="flex items-center gap-2">
                <Checkbox
                  id={`brand-${brand}`}
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={() => toggleBrand(brand)}
                  data-testid={`checkbox-brand-${brand.toLowerCase()}`}
                />
                <Label
                  htmlFor={`brand-${brand}`}
                  className="text-sm cursor-pointer"
                >
                  {brand}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Price Range</h3>
          <div className="space-y-4">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={2000}
              step={50}
              className="w-full"
              data-testid="slider-price-range"
            />
            <div className="flex justify-between text-sm text-muted-foreground font-mono">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Release Year</h3>
          <div className="space-y-2">
            {["2025", "2024", "2023", "2022"].map((year) => (
              <div key={year} className="flex items-center gap-2">
                <Checkbox id={`year-${year}`} data-testid={`checkbox-year-${year}`} />
                <Label htmlFor={`year-${year}`} className="text-sm cursor-pointer">
                  {year}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
