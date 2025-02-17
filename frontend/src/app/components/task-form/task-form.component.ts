import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService, Task } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html'
})
export class TaskFormComponent implements OnInit {
  task: Task = { title: '', description: '', status: false };

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.taskService.getTaskById(id).subscribe(task => this.task = task);
    }
  }

  saveTask() {
    if (this.task.id) {
      this.taskService.updateTask(this.task.id, this.task).subscribe(() => this.router.navigate(['/']));
    } else {
      this.taskService.createTask(this.task).subscribe(() => this.router.navigate(['/']));
    }
  }
}
