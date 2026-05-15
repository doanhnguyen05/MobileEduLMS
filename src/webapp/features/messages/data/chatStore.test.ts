import { describe, expect, it } from 'vitest';
import { getConversationSummaries, getDemoReplyText, sendChatMessage } from './chatStore';

describe('chatStore', () => {
  it('provides seeded conversations for the current role', () => {
    const studentConversations = getConversationSummaries('student');
    const teacherConversations = getConversationSummaries('teacher');

    expect(studentConversations.length).toBeGreaterThan(0);
    expect(teacherConversations.length).toBeGreaterThan(0);
    expect(studentConversations[0].role).toBe('Giảng viên');
    expect(teacherConversations[0].role).toBe('Học viên');
  });

  it('adds an outgoing message and marks the conversation as read', () => {
    const updatedConversation = sendChatMessage('student', '1', '  Em đã hiểu bài rồi  ');
    const lastMessage = updatedConversation?.messages.at(-1);

    expect(updatedConversation?.unread).toBe(false);
    expect(lastMessage?.sender).toBe('me');
    expect(lastMessage?.text).toBe('Em đã hiểu bài rồi');
  });

  it('uses different demo replies for students and teachers', () => {
    expect(getDemoReplyText('student')).toContain('đoạn code');
    expect(getDemoReplyText('teacher')).toContain('Em sẽ kiểm tra');
  });
});
