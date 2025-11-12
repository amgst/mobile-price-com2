import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/devices/search", async (req, res) => {
    try {
      const { name, manufacturer, limit } = req.query;
      
      if (!name) {
        return res.status(400).json({ error: "name parameter is required" });
      }

      const devices = await storage.searchDevices({
        name: name as string,
        manufacturer: manufacturer as string | undefined,
        limit: limit ? parseInt(limit as string) : undefined,
      });

      res.json(devices);
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

      const suggestions = await storage.autocompleteDevices(
        q as string,
        limit ? parseInt(limit as string) : undefined
      );

      res.json(suggestions);
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

      const device = await storage.getDeviceById(parseInt(id));
      
      if (!device) {
        return res.status(404).json({ error: "Device not found" });
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

      const devices = await storage.getDevicesByManufacturer(
        manufacturer as string,
        limit ? parseInt(limit as string) : undefined
      );

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

      const devices = await storage.getDevicesByYear(
        year as string,
        limit ? parseInt(limit as string) : undefined
      );

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
