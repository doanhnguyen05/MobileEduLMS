export type LessonType = 'video' | 'quiz' | 'assignment' | 'document';

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  duration: string;
  type: LessonType;
  completed: boolean;
  videoUrl: string;
}
