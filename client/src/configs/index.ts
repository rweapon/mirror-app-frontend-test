import { Settings } from "@/types";

export const API_BASE_URL = import.meta.env.VITE_API_URL;

export const defaultSettings: Settings = {
  layout: {
    current: "grid",
    params: {
      grid: { rows: 1, columns: 3 },
      masonry: { rows: 1, columns: 3 }
    },
  },
  template: "classic",
  navigation: "load-more",
}

export const itemSize: number = 260 

export const defaultLayout = "grid";
