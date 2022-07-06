import { Employee } from "@/interfaces";
import { setHappinessEmoji } from "@/utilities";

export const transformedData = async (data: Employee[]) => {
  return data.map((employee) => {
    const happiness = setHappinessEmoji(employee.levelOfHappiness);
    return { ...employee, isFavorite: false, happiness };
  });
};
