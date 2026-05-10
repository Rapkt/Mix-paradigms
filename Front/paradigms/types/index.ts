export interface Course {
  id: string;
  name: string;
  major: string;
  difficulty: string;
  year: number;
  preference: string;
}
export interface StudentPreferences {
  major: string;
  takenCourses: string[];
  desiredCourses: string[];
}
