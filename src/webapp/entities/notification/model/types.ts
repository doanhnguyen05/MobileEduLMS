export type NotificationType = 'course' | 'achievement' | 'reminder';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: NotificationType;
}
