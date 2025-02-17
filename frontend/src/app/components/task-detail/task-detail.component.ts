import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { RouterModule } from '@angular/router'; // ✅ Importer RouterModule

@Component({
  selector: 'app-task-detail',
  standalone: true, // ✅ Composant standalone
  imports: [RouterModule], // ✅ Importer RouterModule
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  task: Task | undefined;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTaskById(id).subscribe(task => {
      this.task = task;
    });
  }

  saveTask(): void {
    if (this.task) {
      this.taskService.updateTask(this.task.id!, this.task).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }

  deleteTask(): void {
    if (this.task) {
      this.taskService.deleteTask(this.task.id!).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
