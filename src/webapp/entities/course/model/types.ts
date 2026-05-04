export interface CourseSyllabusItem {
  title: string;
  lessons: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  progress: number;
  duration: string;
  lessons: number;
  level: string;
  rating: number;
  students: number;
  price: number;
  category: string;
  thumbnail: string;
  enrolled: boolean;
  requirements: string[];
  outcomes: string[];
  syllabus: CourseSyllabusItem[];
}
