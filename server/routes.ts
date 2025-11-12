import type { Express } from "express";
import { createServer, type Server } from "http";

const MOBILEAPI_BASE_URL = "https://api.mobileapi.dev";
const API_KEY = process.env.MOBILEAPI_KEY;

if (!API_KEY) {
  console.warn("⚠️  MOBILEAPI_KEY not found in environment variables");
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
      const { name, manufacturer, limit, exact } = req.query;
      
      if (!name) {
        return res.status(400).json({ error: "name parameter is required" });
      }

      const params: Record<string, string> = {
        name: name as string,
      };

      if (manufacturer) params.manufacturer = manufacturer as string;
      if (limit) params.limit = limit as string;
      if (exact) params.exact = exact as string;

      const data = await fetchFromMobileAPI("/devices/search/", params);
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

      const params: Record<string, string> = {
        q: q as string,
      };

      if (limit) params.limit = limit as string;

      const data = await fetchFromMobileAPI("/devices/autocomplete/", params);
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

      const data = await fetchFromMobileAPI(`/devices/${id}/`);
      res.json(data);
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

      const params: Record<string, string> = {
        manufacturer: manufacturer as string,
      };

      if (limit) params.limit = limit as string;

      const data = await fetchFromMobileAPI("/devices/by-manufacturer/", params);
      res.json(data);
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

      const params: Record<string, string> = {
        year: year as string,
      };

      if (limit) params.limit = limit as string;

      const data = await fetchFromMobileAPI("/devices/by-year/", params);
      res.json(data);
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
