import { Component } from '@angular/core';
import { MyWorker, MyWorkersDatabase, MyWorkerType } from './shared/worker.models';
import { HttpWorkerService } from './shared/services/http-worker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Список сотрудников';
  workers: MyWorker[] = MyWorkersDatabase;
  MyWorkerType = MyWorkerType;

  constructor(private HttpWorkerService: HttpWorkerService) {}

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    try {
      this.workers = await this.HttpWorkerService.getWorkers();
    } catch(err) {
      console.error(err);
    }
  }

  getByType(type: number) {
    return this.workers.filter(worker => worker.type === type);
  }

  async onDeleteWorker(id: number) {
    try {
      await this.HttpWorkerService.deleteWorkers(id);
    } catch(err) {
      console.error(err);
    } finally {
      this.getData();
    }
  }

  async onAddWorker(worker: MyWorker) {
    try {
      let id = this.workers.length > 0 ? this.workers[this.workers.length - 1].id + 1 : 0;
      worker.id = id;
      await this.HttpWorkerService.postWorkers(worker);
    } catch(err) {
      console.error(err);
    } finally {
      this.getData();
    }
  }

  async onSaveWorker(worker: MyWorker) {
    try {
      let id = worker.id;
      await this.HttpWorkerService.saveWorkers(worker, id);
    } catch(err) {
      console.error(err);
    } finally {
      this.getData();
    }
  }
}
