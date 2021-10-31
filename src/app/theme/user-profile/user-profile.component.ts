import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppChatService} from '../../services/app-chat/app-chat.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {FileUploader} from 'ng2-file-upload';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
   userID: any;
   UserInformation: any;
   file: any;
   file_name: any;
   file_extension: any;
   file_type: any;
   file_size: any;
   preview_image: any
   extensions_img = ["jpeg","png", "jpg"];
   extensions_video = ["mp4", "avi"];
   isSubmit: boolean = false;
   loading: boolean = false;
   uploadProfile: boolean = false
   uploader: FileUploader = new FileUploader({
   
    isHTML5: true
  });
  constructor(
    private router: Router,  
    private route: ActivatedRoute , 
    private services: AppChatService
  ) { }

  async ngOnInit() {
    this.loading = true
    this.userID = this.route.snapshot.paramMap.get("userID"); 
    this.UserInformation = await this.services.getUserInfo(this.userID);
    this.preview_image = this.UserInformation.avatar
    this.loading = false;
  }

  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }

  closeMyModal(event) {
    document.querySelector('#' + event).classList.remove('md-show');
   
  }

  getFileSize(fileSize: number): number {
    let size = fileSize / 1000 / 1000;
    if (size < 1) {
      size = size * 1000;
    }
    return size;
  };

  getFileUnit(fileSize: number): string {
    let size = fileSize / 1000 / 1000;
    let unit = 'MB'
    if (size < 1) {
      unit = "kB"
    }
    return unit;
  };


  validateFiles(event: any, modal: any){
    
    this.file= event.target.files[0];
    var reader = new FileReader();
    // this.imagePath = files;
    reader.readAsDataURL(this.file); 
    reader.onload = (_event) => { 
      this.UserInformation.avatar = reader.result; 
    }



    this.file_name = this.file.name;
    const check_file = this.file.type.split('/');
    this.file_extension = check_file[1];
    this.file_type = check_file[0];

    const check_size = this.getFileSize(this.file.size);
    const check_fileunit = this.getFileUnit(this.file.size);
    this.file_size = `${check_size} ${check_fileunit}`
    console.log("file size", this.file_size) 
    if((this.file_type === "images" && !this.extensions_img.includes(this.file_extension)) || (this.file_type === "video" && !this.extensions_video.includes(this.file_extension)))
    {

      this.closeMyModal(modal);
      Swal.fire('Invalid file type!', '', 'error');
       return;
    }
    if(check_size > 8 && check_fileunit === "MB")
    {

      this.closeMyModal(modal);
      Swal.fire('Your file is too powerful', 'Max file size is 8.00MB please', 'error');
      return;
    }
    
  }
  async Update(){
    try {
        this.uploadProfile = true;
        const data = new FormData();
        data.append("file", this.file);
        if(this.file_name)
        {
          const respone = <any>await this.services.updateFile(this.userID, this.UserInformation.name, "", this.file_extension, data);
          this.UserInformation["avatar"] = respone["file"] 
        }
        await this.services.updateUserInfo(this.userID, this.UserInformation);
        this.uploadProfile = false;
    } catch (error) {
      
    }

  }

}
