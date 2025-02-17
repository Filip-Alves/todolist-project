import { Task } from './task';

describe('Task', () => {
  it('should create a Task object', () => {
    const task: Task = { title: 'Title', description: 'Description', status: true };
    expect(task).toBeTruthy();
  });
});
