import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MyWorker, MyWorkerType } from 'src/app/shared/worker.models';

@Component({
  selector: 'app-addform-worker',
  templateUrl: './addform-worker.component.html',
  styleUrls: ['./addform-worker.component.css']
})
export class AddformWorkerComponent implements OnInit {

  name: string;
  surname: string;
  type = 0;
  MyWorkerType = MyWorkerType;
  @Output() addWorker = new EventEmitter<MyWorker>();

  constructor() { }

  ngOnInit(): void {
  }

  onAddWorker() {
    let worker: MyWorker = {
      name: this.name,
      surname: this.surname,
      type: this.type
    }
    
    if ((worker.name != undefined)  && (worker.surname != undefined) && (worker.name != "")  && (worker.surname != "")) {
      this.addWorker.emit(worker);
    }
  }
}
