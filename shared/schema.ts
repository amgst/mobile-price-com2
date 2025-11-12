import { z } from "zod";

export type User = {
  id: string;
  username: string;
  password: string;
};

export type InsertUser = {
  username: string;
  password: string;
};

export const deviceSchema = z.object({
  id: z.number(),
  name: z.string(),
  brand: z.string().optional(),
  manufacturer_name: z.string().optional(),
  image_b64: z.string().optional(),
  main_image_b64: z.string().optional(),
  device_type: z.string().optional(),
  description: z.string().optional(),
  colors: z.string().optional(),
  storage: z.string().optional(),
  screen_resolution: z.string().optional(),
  weight: z.string().optional(),
  thickness: z.string().optional(),
  release_date: z.string().optional(),
  camera: z.string().optional(),
  battery_capacity: z.string().optional(),
  hardware: z.string().optional(),
  match_certainty: z.string().optional(),
});

export const deviceAutocompleteSchema = z.object({
  id: z.number(),
  name: z.string(),
  brand: z.string(),
  full_name: z.string(),
});

export type Device = z.infer<typeof deviceSchema>;
export type DeviceAutocomplete = z.infer<typeof deviceAutocompleteSchema>;
