import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

const MOBILEAPI_BASE_URL = "https://api.mobileapi.dev";
const API_KEY = process.env.MOBILEAPI_KEY;
const USE_MOCK_DATA = !API_KEY;

if (!API_KEY) {
  console.warn("⚠️  MOBILEAPI_KEY not found - using mock data");
  console.warn("⚠️  Add your API key to use real device data from MobileAPI.dev");
}

async function fetchFromMobileAPI(endpoint: string, params: Record<string, string> = {}) {
  const url = new URL(endpoint, MOBILEAPI_BASE_URL);
  url.searchParams.append("key", API_KEY || "");
  
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.append(key, value);
    }
  });

  const response = await fetch(url.toString(), {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`MobileAPI error: ${response.status} - ${errorText}`);
  }

  return response.json();
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/devices/search", async (req, res) => {
    try {
      const { name, manufacturer, limit } = req.query;
      
      if (!name) {
        return res.status(400).json({ error: "name parameter is required" });
      }

      let data;
      if (USE_MOCK_DATA) {
        data = await storage.searchDevices({
          name: name as string,
          manufacturer: manufacturer as string | undefined,
          limit: limit ? parseInt(limit as string) : undefined,
        });
      } else {
        const params: Record<string, string> = { name: name as string };
        if (manufacturer) params.manufacturer = manufacturer as string;
        if (limit) params.limit = limit as string;
        data = await fetchFromMobileAPI("/devices/search/", params);
      }

      res.json(data);
    } catch (error) {
      console.error("Error searching devices:", error);
      res.status(500).json({ 
        error: "Failed to search devices",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  app.get("/api/devices/autocomplete", async (req, res) => {
    try {
      const { q, limit } = req.query;
      
      if (!q) {
        return res.status(400).json({ error: "q parameter is required" });
      }

      let data;
      if (USE_MOCK_DATA) {
        data = await storage.autocompleteDevices(
          q as string,
          limit ? parseInt(limit as string) : undefined
        );
      } else {
        const params: Record<string, string> = { q: q as string };
        if (limit) params.limit = limit as string;
        data = await fetchFromMobileAPI("/devices/autocomplete/", params);
      }

      res.json(data);
    } catch (error) {
      console.error("Error fetching autocomplete:", error);
      res.status(500).json({ 
        error: "Failed to fetch autocomplete suggestions",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  app.get("/api/devices/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({ error: "Device ID is required" });
      }

      let device;
      if (USE_MOCK_DATA) {
        device = await storage.getDeviceById(parseInt(id));
        if (!device) {
          return res.status(404).json({ error: "Device not found" });
        }
      } else {
        device = await fetchFromMobileAPI(`/devices/${id}/`);
      }

      res.json(device);
    } catch (error) {
      console.error("Error fetching device:", error);
      res.status(500).json({ 
        error: "Failed to fetch device details",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  app.get("/api/devices/by-manufacturer/:manufacturer", async (req, res) => {
    try {
      const { manufacturer } = req.params;
      const { limit } = req.query;
      
      if (!manufacturer) {
        return res.status(400).json({ error: "Manufacturer is required" });
      }

      let devices;
      if (USE_MOCK_DATA) {
        devices = await storage.getDevicesByManufacturer(
          manufacturer as string,
          limit ? parseInt(limit as string) : undefined
        );
      } else {
        const params: Record<string, string> = { manufacturer: manufacturer as string };
        if (limit) params.limit = limit as string;
        devices = await fetchFromMobileAPI("/devices/by-manufacturer/", params);
      }

      res.json(devices);
    } catch (error) {
      console.error("Error fetching devices by manufacturer:", error);
      res.status(500).json({ 
        error: "Failed to fetch devices by manufacturer",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  app.get("/api/devices/by-year/:year", async (req, res) => {
    try {
      const { year } = req.params;
      const { limit } = req.query;
      
      if (!year) {
        return res.status(400).json({ error: "Year is required" });
      }

      let devices;
      if (USE_MOCK_DATA) {
        devices = await storage.getDevicesByYear(
          year as string,
          limit ? parseInt(limit as string) : undefined
        );
      } else {
        const params: Record<string, string> = { year: year as string };
        if (limit) params.limit = limit as string;
        devices = await fetchFromMobileAPI("/devices/by-year/", params);
      }

      res.json(devices);
    } catch (error) {
      console.error("Error fetching devices by year:", error);
      res.status(500).json({ 
        error: "Failed to fetch devices by year",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
