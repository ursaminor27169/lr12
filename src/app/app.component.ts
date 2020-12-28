import { Component } from '@angular/core';
import { MyWorker, MyWorkersDatabase, MyWorkerType } from './shared/worker.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Список сотрудников';
  workers: MyWorker[] = MyWorkersDatabase;
  MyWorkerType = MyWorkerType;

  getByType(type: number) {
    return this.workers.filter(worker => worker.type === type);
  }

  onDeleteWorker(id: number) {
    let index = this.workers.findIndex((worker) => worker.id === id);
    if (index !== -1) {
      this.workers.splice(index, 1);
    }
  }

  onAddWorker(worker: MyWorker) {
    worker.id = this.workers.length + 1;
    this.workers.push(worker);
  }

  onSaveWorker(worker: MyWorker) {
    let id = worker.id;
    let index = this.workers.findIndex((worker) => worker.id === id);
    this.workers.splice(index, 1, worker);
    
  }
}
