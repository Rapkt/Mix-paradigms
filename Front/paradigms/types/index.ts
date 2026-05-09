export interface Course {
  id: string;
  name: string;
  major: string;
  difficulty: string;
  year: number;
}
export interface StudentPreferences {
  major: string;
  takenCourses: string[];
  desiredCourses: string[];
}
