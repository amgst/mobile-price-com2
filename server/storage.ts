import { type User, type InsertUser, type Device, type DeviceAutocomplete } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  searchDevices(params: { name?: string; manufacturer?: string; limit?: number }): Promise<Device[]>;
  getDeviceById(id: number): Promise<Device | undefined>;
  getDevicesByManufacturer(manufacturer: string, limit?: number): Promise<Device[]>;
  getDevicesByYear(year: string, limit?: number): Promise<Device[]>;
  autocompleteDevices(query: string, limit?: number): Promise<DeviceAutocomplete[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private devices: Device[];

  constructor() {
    this.users = new Map();
    this.devices = this.initializeMockDevices();
  }

  private initializeMockDevices(): Device[] {
    return [
      {
        id: 1,
        name: "iPhone 15 Pro Max",
        brand: "Apple",
        manufacturer_name: "Apple",
        device_type: "Smartphone",
        description: "The ultimate iPhone with titanium design and A17 Pro chip",
        colors: "Natural Titanium, Blue Titanium, White Titanium, Black Titanium",
        storage: "256GB, 512GB, 1TB",
        screen_resolution: "6.7 inch, 2796x1290, Super Retina XDR",
        weight: "221g",
        thickness: "8.25mm",
        release_date: "2023-09-22",
        camera: "48MP main, 12MP ultra-wide, 12MP telephoto (5x)",
        battery_capacity: "4422 mAh",
        hardware: "A17 Pro chip, 8GB RAM",
      },
      {
        id: 2,
        name: "iPhone 15 Pro",
        brand: "Apple",
        manufacturer_name: "Apple",
        device_type: "Smartphone",
        description: "Pro performance in a more compact size",
        colors: "Natural Titanium, Blue Titanium, White Titanium, Black Titanium",
        storage: "128GB, 256GB, 512GB, 1TB",
        screen_resolution: "6.1 inch, 2556x1179, Super Retina XDR",
        weight: "187g",
        thickness: "8.25mm",
        release_date: "2023-09-22",
        camera: "48MP main, 12MP ultra-wide, 12MP telephoto (3x)",
        battery_capacity: "3274 mAh",
        hardware: "A17 Pro chip, 8GB RAM",
      },
      {
        id: 3,
        name: "Galaxy S24 Ultra",
        brand: "Samsung",
        manufacturer_name: "Samsung",
        device_type: "Smartphone",
        description: "Samsung's flagship with S Pen and AI features",
        colors: "Titanium Gray, Titanium Black, Titanium Violet, Titanium Yellow",
        storage: "256GB, 512GB, 1TB",
        screen_resolution: "6.8 inch, 3120x1440, Dynamic AMOLED 2X",
        weight: "232g",
        thickness: "8.6mm",
        release_date: "2024-01-24",
        camera: "200MP main, 12MP ultra-wide, 10MP telephoto (3x), 50MP telephoto (5x)",
        battery_capacity: "5000 mAh",
        hardware: "Snapdragon 8 Gen 3, 12GB RAM",
      },
      {
        id: 4,
        name: "Galaxy S24+",
        brand: "Samsung",
        manufacturer_name: "Samsung",
        device_type: "Smartphone",
        description: "Premium flagship with larger display",
        colors: "Onyx Black, Marble Gray, Cobalt Violet, Amber Yellow",
        storage: "256GB, 512GB",
        screen_resolution: "6.7 inch, 3120x1440, Dynamic AMOLED 2X",
        weight: "196g",
        thickness: "7.7mm",
        release_date: "2024-01-24",
        camera: "50MP main, 12MP ultra-wide, 10MP telephoto (3x)",
        battery_capacity: "4900 mAh",
        hardware: "Snapdragon 8 Gen 3, 12GB RAM",
      },
      {
        id: 5,
        name: "Pixel 8 Pro",
        brand: "Google",
        manufacturer_name: "Google",
        device_type: "Smartphone",
        description: "Google's flagship with advanced AI and photography",
        colors: "Obsidian, Porcelain, Bay",
        storage: "128GB, 256GB, 512GB",
        screen_resolution: "6.7 inch, 2992x1344, LTPO OLED",
        weight: "213g",
        thickness: "8.8mm",
        release_date: "2023-10-12",
        camera: "50MP main, 48MP ultra-wide, 48MP telephoto (5x)",
        battery_capacity: "5050 mAh",
        hardware: "Google Tensor G3, 12GB RAM",
      },
      {
        id: 6,
        name: "Pixel 8",
        brand: "Google",
        manufacturer_name: "Google",
        device_type: "Smartphone",
        description: "Compact flagship with Google AI features",
        colors: "Obsidian, Hazel, Rose",
        storage: "128GB, 256GB",
        screen_resolution: "6.2 inch, 2400x1080, OLED",
        weight: "187g",
        thickness: "8.9mm",
        release_date: "2023-10-12",
        camera: "50MP main, 12MP ultra-wide",
        battery_capacity: "4575 mAh",
        hardware: "Google Tensor G3, 8GB RAM",
      },
      {
        id: 7,
        name: "OnePlus 12",
        brand: "OnePlus",
        manufacturer_name: "OnePlus",
        device_type: "Smartphone",
        description: "Flagship killer with Hasselblad camera",
        colors: "Flowy Emerald, Silky Black",
        storage: "256GB, 512GB",
        screen_resolution: "6.82 inch, 3168x1440, AMOLED",
        weight: "220g",
        thickness: "9.15mm",
        release_date: "2024-01-23",
        camera: "50MP main, 48MP ultra-wide, 64MP telephoto (3x)",
        battery_capacity: "5400 mAh",
        hardware: "Snapdragon 8 Gen 3, 12GB/16GB RAM",
      },
      {
        id: 8,
        name: "Xiaomi 14 Pro",
        brand: "Xiaomi",
        manufacturer_name: "Xiaomi",
        device_type: "Smartphone",
        description: "Premium flagship with Leica optics",
        colors: "Black, White, Titanium",
        storage: "256GB, 512GB, 1TB",
        screen_resolution: "6.73 inch, 3200x1440, AMOLED",
        weight: "223g",
        thickness: "8.49mm",
        release_date: "2023-10-26",
        camera: "50MP main, 50MP ultra-wide, 50MP telephoto (3.2x)",
        battery_capacity: "4880 mAh",
        hardware: "Snapdragon 8 Gen 3, 12GB/16GB RAM",
      },
    ];
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async searchDevices(params: { name?: string; manufacturer?: string; limit?: number }): Promise<Device[]> {
    let results = this.devices;

    if (params.name) {
      const searchTerm = params.name.toLowerCase();
      results = results.filter(device => 
        device.name.toLowerCase().includes(searchTerm) ||
        (device.brand?.toLowerCase().includes(searchTerm)) ||
        (device.manufacturer_name?.toLowerCase().includes(searchTerm))
      );
    }

    if (params.manufacturer) {
      const manufacturerTerm = params.manufacturer.toLowerCase();
      results = results.filter(device =>
        device.manufacturer_name?.toLowerCase() === manufacturerTerm ||
        device.brand?.toLowerCase() === manufacturerTerm
      );
    }

    const limit = params.limit || 10;
    return results.slice(0, limit);
  }

  async getDeviceById(id: number): Promise<Device | undefined> {
    return this.devices.find(device => device.id === id);
  }

  async getDevicesByManufacturer(manufacturer: string, limit?: number): Promise<Device[]> {
    const manufacturerTerm = manufacturer.toLowerCase();
    const results = this.devices.filter(device =>
      device.manufacturer_name?.toLowerCase() === manufacturerTerm ||
      device.brand?.toLowerCase() === manufacturerTerm
    );
    return results.slice(0, limit || 10);
  }

  async getDevicesByYear(year: string, limit?: number): Promise<Device[]> {
    const results = this.devices.filter(device =>
      device.release_date?.startsWith(year)
    );
    return results.slice(0, limit || 10);
  }

  async autocompleteDevices(query: string, limit?: number): Promise<DeviceAutocomplete[]> {
    const searchTerm = query.toLowerCase();
    const results = this.devices
      .filter(device =>
        device.name.toLowerCase().includes(searchTerm) ||
        (device.brand?.toLowerCase().includes(searchTerm)) ||
        (device.manufacturer_name?.toLowerCase().includes(searchTerm))
      )
      .map(device => ({
        id: device.id,
        name: device.name,
        brand: device.brand || device.manufacturer_name || "",
        full_name: `${device.manufacturer_name || device.brand || ""} ${device.name}`,
      }));

    return results.slice(0, limit || 5);
  }
}

export const storage = new MemStorage();
