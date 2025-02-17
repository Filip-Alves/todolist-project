import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, provideRouter } from '@angular/router'; // Importer les modules nécessaires
import { TaskDetailComponent } from './task-detail.component'; // Composant TaskDetail
import { TaskService } from '../../services/task.service'; // Service TaskService
import { of } from 'rxjs'; // Pour créer des observables simulés
import { appRoutes } from '../../app.routes'; // Importer les routes depuis app.route.ts

describe('TaskDetailComponent', () => {
  let component: TaskDetailComponent;
  let fixture: ComponentFixture<TaskDetailComponent>;
  let mockTaskService: jasmine.SpyObj<TaskService>; // Créer un mock du service TaskService

  beforeEach(async () => {
    // Création du mock du service TaskService
    mockTaskService = jasmine.createSpyObj('TaskService', ['getTaskById', 'updateTask']);

    // Définir le comportement des méthodes mockées
    mockTaskService.getTaskById.and.returnValue(of({ id: 1, title: 'Test Task', description: 'Test Description', status: true }));

    await TestBed.configureTestingModule({
      imports: [
        TaskDetailComponent, // Composant TaskDetail à tester
        RouterModule.forRoot(appRoutes) // Configurer le routage via app.route.ts
      ],
      providers: [
        { provide: TaskService, useValue: mockTaskService }, // Fournir le mock du service TaskService
        provideRouter(appRoutes) // Fournir le routeur pour les tests
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Détecter les changements pour initialiser le composant
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch task details on init', () => {
    expect(component.task).toBeDefined();
    expect(component.task?.title).toBe('Test Task');
  });

  it('should call updateTask when saveTask is triggered', () => {
    // Simuler un appel à saveTask
    component.saveTask();
    expect(mockTaskService.updateTask).toHaveBeenCalled();
  });
});
