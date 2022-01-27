import { Component, OnInit } from '@angular/core';
import {InboxService} from '../../services/inbox/inbox.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {

  totalItems: number;
  pagesize : number = 5;
  maxSize :number = 4;
  currentPage: number = 0;
  inboxes :any;  
  loading: boolean = false;
  class0:any;
  class1:any;
  class2:any;
  class3:any;
  previous:any;
  constructor(private service: InboxService) { }

  async ngOnInit() {
    this.inboxes = await this.service.index(0, 5);
    console.log(this.inboxes)
    const result = <any> await this.service.length();
    this.totalItems = result.data
  }

  async onPageChange(pageNum: number)
  {
    let skip = (pageNum-1) * 5; 
    this.inboxes = <any[]> await this.service.index(skip, 5);
  }

  async search(status: any){
    switch(status){
      case 0:
        this.inboxes = await this.service.index(0,5);
        this.class0 = 'active'
        break;
      case 1:
        this.inboxes = await this.service.search(0, 5, status);
        this.class1 = 'active'
        break;
      case 2:
        this.inboxes = await this.service.search(0,5, status);
        this.class2 = 'active';
        break;
      case 3:
        this.inboxes = await this.service.search(0, 5, status)
        this.class3 = 'active'
        break;
    }
  }

  async update(inboxID: any){
    const data = {
      status: "2"
    }
    try {
      this.loading = true
      await this.service.update(inboxID, data);
      this.inboxes = <any[]> await this.service.index(0, 5);
      this.loading = false;
      Swal.fire('', 'OK! ', 'success');
    } catch (error) {
      
    }
  }
}
