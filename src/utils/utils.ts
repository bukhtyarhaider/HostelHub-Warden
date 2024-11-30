import { Timestamp } from "firebase/firestore";

export const generateWardenId = () => {
  // Generate a unique ID in the format "EFH238"
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomLetters = Array.from({ length: 3 }, () =>
    letters.charAt(Math.floor(Math.random() * letters.length))
  ).join("");
  const randomDigits = Math.floor(100 + Math.random() * 900); // Generates a 3-digit number

  return `${randomLetters}${randomDigits}`;
};

export const formatTimestamp = (timestamp: Timestamp): string => {
  const date = timestamp.toDate();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const getMonthName = (dateString: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format");
  }
  return date.toLocaleString("default", { month: "long" });
};

export const addMonths = (date: Date, months: number): Date => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);

  // Handle edge case for dates at the end of the month
  if (result.getDate() !== date.getDate()) {
    result.setDate(0); // Roll back to the last valid date of the previous month
  }

  return result;
};

export const abbreviateNumber = (input: number | string): string => {
  const num = typeof input === "string" ? parseFloat(input) : input;

  if (isNaN(num)) {
    throw new Error(
      "Invalid input: Please provide a valid number or numeric string."
    );
  }

  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`;
  } else if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)}K`;
  }
  return num.toString();
};
