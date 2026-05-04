export type TeacherCourseStatus = 'active' | 'draft' | 'archived';

export interface TeacherCourse {
  id: string;
  title: string;
  students: number;
  lessons: number;
  avgRating: number;
  revenue: string;
  status: TeacherCourseStatus;
}
