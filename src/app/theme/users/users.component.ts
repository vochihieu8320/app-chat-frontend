import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users/users.service'
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  totalItems: number;
  valueKey: string;
  pagesize : number = 5;
  maxSize :number = 4;
  currentPage: number = 0;
  loading: boolean = false;
  users:any
  constructor(private services: UsersService) { }

  async ngOnInit()
  {
    this.users = await this.services.index(0, 5);
    const result = <any>await this.services.length();
    this.totalItems = result.data
  }

  async seller_to_bider(userId: any)
  {
    try {
      this.loading = true;
      const body = {
        user_type: "1"
      }
      await this.services.seller_to_bider(userId, body);
      Swal.fire('', '!OK ', 'success');
      this.loading = false;
    } catch (error) {
        console.log(error);
        this.loading = false;
    }
  }

  async onPageChange(pageNum: number)
  {
    let skip = (pageNum-1) * 5; 
    const result = <any[]> await this.services.index(skip, 5);
    console.log(result)
  }

  async resetPassword(userId:any)
  {
    try {
      this.loading =true;
      await this.services.reset_password(userId);
      this.loading = false;
      Swal.fire('', '!OK ', 'success');
    } catch (error) {
      
    }
  }
}
