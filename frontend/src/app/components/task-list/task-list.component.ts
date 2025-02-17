import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from '../../services/task.service';
import { RouterModule } from '@angular/router'; // ✅ Importer RouterModule
import { CommonModule } from '@angular/common';  // Import de CommonModule

@Component({
  selector: 'app-task-list',
  standalone: true, // ✅ Marquer le composant comme standalone
  imports: [RouterModule, CommonModule], // ✅ Importer RouterModule pour routerLink
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe({
      next: (data) => (this.tasks = data),
      error: (err) => console.error('Erreur lors du chargement des tâches', err)
    });
  }

  deleteTask(id?: number): void {
    if (id && confirm('Voulez-vous vraiment supprimer cette tâche ?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(task => task.id !== id);
        },
        error: (err) => console.error('Erreur lors de la suppression', err)
      });
    }
  }
}
