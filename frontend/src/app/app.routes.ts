import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { TaskFormComponent } from './components/task-form/task-form.component';

export const appRoutes: Routes = [
  { path: '', component: TaskListComponent }, // Page d'accueil
  { path: 'task/:id', component: TaskDetailComponent },
  { path: 'add-task', component: TaskFormComponent },
  { path: 'task/edit/:id', component: TaskFormComponent }
];
