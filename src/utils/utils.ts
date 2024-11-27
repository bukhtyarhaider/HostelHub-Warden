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
