import { Employee } from "@/interfaces";
import { HappinessLevels } from "@/types";

export const setHappinessEmoji = (levelOfHappiness: string | number) => {
  if (!levelOfHappiness) throw new Error("Enter a Happiness level");
  if (Number(levelOfHappiness) < 1 || Number(levelOfHappiness) > 100)
    throw new Error("Enter a valid range of happiness between 1-100");

  const ranges = {
    happy: [70, 100],
    neutral: [46, 69],
    sad: [0, 45],
  };

  const getHappinesLevel = (levelOfHappiness: string | number) => {
    let levelOfHappinessAsNumber: number;

    if (typeof levelOfHappiness === "string") {
      levelOfHappinessAsNumber = Number(levelOfHappiness);
    } else {
      levelOfHappinessAsNumber = levelOfHappiness;
    }

    const isHappines = (ranges: number[]) => {
      const max = Math.max(...ranges);
      const min = Math.min(...ranges);

      if (levelOfHappinessAsNumber >= min && levelOfHappinessAsNumber <= max)
        return true;

      return false;
    };

    return {
      happy: isHappines(ranges.happy),
      neutral: isHappines(ranges.neutral),
      sad: isHappines(ranges.sad),
    };
  };

  const { happy, neutral, sad } = getHappinesLevel(levelOfHappiness);

  if (happy) return HappinessLevels.happy;
  if (neutral) return HappinessLevels.neutral;
  if (sad) return HappinessLevels.sad;
};

export const selectByCategories = (employees: Employee[]): string[] => {
  let categories: string[] = [];
  employees.forEach((employee) => {
    if (!categories.includes(employee.category)) {
      categories = [...categories, employee.category];
    }
  });

  return categories;
};

export const selectByCompanies = (employees: Employee[]): string[] => {
  let companies: string[] = [];
  employees.forEach((employee) => {
    if (!companies.includes(employee.company)) {
      companies = [...companies, employee.company];
    }
  });

  return companies;
};
