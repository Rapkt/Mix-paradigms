import { Data } from "./csv_Data";
import { Course } from "@/types";
export const MAJORS = [
  "CSE",
  "EE",
  "ME",
  "CE",
  "PE",
  "Architecture",
  "Basic and Applied Sciences",
  "Humanities",
];

const parseCSV = (csv: string) => {
  const lines = csv.trim().split("\n");
  const headers = lines[0].split(",").map((h) => h.trim());

  return lines.slice(1).map((line) => {
    const values = line.split(",");
    const obj: any = {};
    headers.forEach((header, index) => {
      obj[header] = values[index] ? values[index].trim() : "";
    });
    return obj;
  });
};

const parsedData = parseCSV(Data);

// 3. Map it out dynamically!
export const DUMMY_COURSES = parsedData.map(
  (row: any, index: number): Course => ({
    id: `${row.department}-${index}`,
    name: row.course_name,
    major: row.department,
    difficulty: row.difficulty,
    year: parseInt(row.year_of_study) || 1,
  }),
);
