export const generateWardenId = () => {
  // Generate a unique ID in the format "EFH238"
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomLetters = Array.from({ length: 3 }, () =>
    letters.charAt(Math.floor(Math.random() * letters.length))
  ).join("");
  const randomDigits = Math.floor(100 + Math.random() * 900); // Generates a 3-digit number

  return `${randomLetters}${randomDigits}`;
};
