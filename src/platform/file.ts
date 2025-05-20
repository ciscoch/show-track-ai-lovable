export async function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) =>
      e.target?.result
        ? resolve(e.target.result as string)
        : reject(new Error("Failed to read file"));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

