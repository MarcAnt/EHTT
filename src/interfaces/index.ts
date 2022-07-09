import { HappinessLevels } from "@/types";

export interface Employee {
  id: string | number;
  name: string;
  category: string;
  "category-image"?: string;
  company: string;
  "company-image": string;
  levelOfHappiness: string | number;
  happiness?: HappinessLevels;
  isFavorite?: boolean;
}
