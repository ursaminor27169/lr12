import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MyWorker, MyWorkerType } from 'src/app/shared/worker.models';

@Component({
  selector: 'app-table-workers',
  templateUrl: './table-workers.component.html',
  styleUrls: ['./table-workers.component.css']
})
export class TableWorkersComponent implements OnInit {

  changingWorkerId = -1;
  changingWorker: MyWorker;
  MyWorkerType = MyWorkerType;
  name: string;
  surname: string;
  type = 0;

  @Input() title: string;
  @Input() workers: MyWorker[] = [];
  @Output() deleteWorker = new EventEmitter<number>();
  @Output() saveWorker = new EventEmitter<MyWorker>();

  constructor() { }

  ngOnInit(): void {
  }

  onDeleteWorker(id: number) {
    this.deleteWorker.emit(id);
  }

  onChangeWorker(id: number) {
    this.changingWorker = this.workers.find(item => item.id == id);
    this.changingWorkerId = id;  
    this.name = this.changingWorker.name; //вводим данные в инпуты изначально
    this.surname = this.changingWorker.surname;
    this.type = this.changingWorker.type;
  }

  onSaveWorker() {
    let worker: MyWorker = {
      id: this.changingWorkerId,
      name: ((this.name !== undefined) && (this.name != "")) ? this.name : this.changingWorker.name, //если введено некорректное имя, то вставляется первоначальное имя
      surname: ((this.surname !== undefined) && (this.surname != "")) ? this.surname : this.changingWorker.surname, //также с фамилией
      type: this.type
    }
    this.changingWorkerId = -1; //закрываем блок
    this.name = ''; //очистка поля
    this.surname = ''; //очистка поля
    this.saveWorker.emit(worker);
  }

  onClose() {
    this.changingWorkerId = -1; //закрываем блок
  }
}
