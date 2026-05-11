import { Data } from "./csv_Data";
import { Course } from "@/types";

type CsvRow = {
  id: string;
  course_name: string;
  difficulty: string;
  prerequisite: string;
  preference: string;
  year_of_study: string;
  department: string;
};

const parseCSV = (csv: string): CsvRow[] => {
  const lines = csv.trim().split("\n");
  const headers = lines[0].split(",").map((h) => h.trim());

  return lines.slice(1).map((line) => {
    const values = line.split(",");
    const obj: Record<string, string> = {};
    headers.forEach((header, index) => {
      obj[header] = values[index] ? values[index].trim() : "";
    });
    return obj as CsvRow;
  });
};

const parsedData = parseCSV(Data);

export const COURSES: Course[] = parsedData.map((row: CsvRow, index) => ({
  id: row.id || `${row.department}-${index}`,
  name: row.course_name,
  major: row.department,
  difficulty: row.difficulty,
  year: Number(row.year_of_study) || 1,
  preference: row.preference,
}));

export const DEPARTMENTS = Array.from(
  new Set(COURSES.map((course) => course.major).filter(Boolean)),
).sort();

export const PREPARATORY_DEPARTMENT =
  DEPARTMENTS.find(
    (department) => department.toLowerCase() === "preparatory",
  ) || "";

export const MAJORS = DEPARTMENTS.filter(
  (department) => department !== PREPARATORY_DEPARTMENT,
);
