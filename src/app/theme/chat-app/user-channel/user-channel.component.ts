import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppChatService} from '../../../services/app-chat/app-chat.service';
import { environment } from 'src/environments/environment';
import { io } from "socket.io-client";
import {message} from '../../../models/message.model';
import {transition, trigger, style, animate} from '@angular/animations';
import {FileUploader} from 'ng2-file-upload';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ClipboardService } from 'ngx-clipboard';


@Component({
  selector: 'app-user-channel',
  templateUrl: './user-channel.component.html',
  styleUrls: 
  [
  './user-channel.component.scss',
  
  ],
  animations: [
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({opacity: 0}),
        animate('400ms ease-in-out', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({transform: 'translate(0)'}),
        animate('400ms ease-in-out', style({opacity: 0}))
      ])
    ])
  ]
})






export class UserChannelComponent implements OnInit {
  userID: string;
  channelID: string;
  channels: any[];
  messages: any[];
  message: message
  socket: any;
  username: string;
  getMessages: string;
  isYou : boolean = false;
  extensions_img = ["jpeg","png", "jpg"];
  extensions_video = ["mp4", "avi"];
  error_loadfile : String;
  file_name: string ;
  file_size: string;
  file_extension: string;
  file_location: string;
  file_type: string;
  is_video: boolean = false;
  file: File;
  classname: string;
  current_picked : any;
  loading: boolean = false;
  user_online : any[] = [];
  invite_message: string;
  formInput: any;
  formCreate: any;
  UserInformation: any;
  loaddata: boolean = false
  uploadUserInfo: boolean = false;
  default_img = "assets/images/avatar-blank.jpg";
  user_email: string;
  userAvatar: any;
  uploader: FileUploader = new FileUploader({
   
    isHTML5: true
  });

  someMin = -10;
  someMax = 10;
  someStep = 1;
  someValue = 5
  constructor(
    private router: Router,  
    private route: ActivatedRoute , 
    private services: AppChatService,
    private clipboardApi: ClipboardService
    
    ) 
  {
    this.userID = this.route.snapshot.paramMap.get("userID");   
    this.formInput = {
      name: ""
    }
   this.formCreate = {
     name: ""
   }
   this.UserInformation = {
     name: "",
     phone: "",
     email: "",
     address:"",
     avatar:""
   }

  
  }

  async ngOnInit(){
    this.loading = true
    this.channels = <any> await this.services.getUserChannel(this.userID, 0);
    // this.UserInformation = <any> await this.services.getUserInfo(this.userID);
    this.current_picked = 0;
   
    this.userAvatar = <any[]> await this.services.getChannelUserInfo(this.channels[0].channelID);
    // console.log("user avatar", this.userAvatar);
    this.channels[0].is_picked = true;
    this.channelID = this.channels[0].channelID;
    this.invite_message = `${environment.domain}/auth/invite/${this.channelID}`
    
    this.formInput.name = this.channels[this.current_picked].channels[0].name
    // console.log("name", this.channels[this.current_picked].channels[0].name)
    const local = localStorage.getItem("currentUser");
    const userInfo = JSON.parse(local);

    this.username = userInfo["name"];
    this.user_email= userInfo["email"];
    this.messages = [];
    this.socket = io(environment.apiUrl);
    this.socket.on("connect", () => {
    
    });



   this.socket.emit("join-room", this.userID, this.username, this.channelID, (response)=>{
   })
   this.socket.on("received-room-messages", (message)=>{
     this.messages = message
   })

   this.socket.on("receive-messages", async(messages: message)=>{ 
     if(messages.author === this.username)
     {
       this.isYou = true;
     }
     else
     {
       this.isYou = false;
     }
     
     this.messages.push(messages)
   })

   this.socket.emit("get_user_online", this.channelID, (respone)=>{
      
  });
  this.socket.on("received_user_online", (userOnline)=>{
    
    this.user_online = userOnline;
    })

   this.socket.on("user-off-browser", (socketID: string)=>{
     for(let i = 0  ; i < this.user_online.length; i++)
     {
       if(this.user_online[i]["socketID"] === socketID){
         this.user_online.splice(i, 1);
       }
     }
   })
   this.loading = false
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
    this.file_size = `${check_size} ${this.getFileUnit(this.file.size)}`
    
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

  


  getDateTime()
  {
    const d = new Date();
    let current_month = d.getMonth();
    if(current_month < 12){
      current_month ++;
    }

    const date = `${d.getDay()}/${current_month}/${d.getFullYear()}`;
    const time = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    return time+ " " + date;
  }


  sendMessage(value: any)
  {
    
    let date_time : string = this.getDateTime();
    if(this.file_location && !this.is_video)
    {
      this.message = new message(this.username, value, date_time, this.userID, this.channelID, this.file_location)

    }
    else
    {
      if(this.file_location && this.is_video)
      {
        this.message = new message(this.username, value, date_time, this.userID, this.channelID, this.file_location, true)
      }
      else
      {
        this.message = new message(this.username, value, date_time, this.userID, this.channelID)
      }
     

    }
    
    this.messages.push(this.message);
    this.isYou = true;
    this.socket.emit("send-messages", this.message);
    this.getMessages =""
    
  }

  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }

  closeMyModal(event) {
    document.querySelector('#' + event).classList.remove('md-show');
   
  }
  async uploadfile()
  {
    if(!this.file_name)
    {
      return;
    }
    const data = new FormData();
    data.append("file", this.file);
    try {
      this.loading = true;
       const response = <any> await this.services.updateFile(this.userID, this.username, this.channelID, this.file_extension, data);
       if(response)
       {
        this.is_video =  (this.file_type === "video") ? true : false;
        this.file_location = response.file
        this.sendMessage("");
        this.file_name = "";
        this.file_size = "";
        this.loading = false;
       }
     
    } catch (error) {
      console.log(error);
    }
  }

  async ChangeChannel(i: any)
  {
    this.channels[this.current_picked].is_picked = false;
    this.current_picked = i;
    this.invite_message = `${environment.domain}/auth/invite/${this.channels[this.current_picked].channelID}`
    this.channels[this.current_picked].is_picked = false;
    this.channels[i].is_picked = true;
    this.formInput.name = this.channels[this.current_picked].channels[0].name;
    try {
      this.loading = true
      this.messages = <any>await this.services.getConversation(this.channels[i].channelID);
      this.user_online = <any[]> await this.services.getChannelUserInfo(this.channels[this.current_picked]["channelID"])
      this.loading = false;
     
    } catch (error) {
      
    }

  }
  Copy()
  {
    this.clipboardApi.copyFromContent(this.invite_message);
  }


  async UpdateChannel()
  {
    const channelID = <any>this.channels[this.current_picked]["channels"][0]._id;
   
    try {
    
        const response = <any>await this.services.updateChannel(channelID, this.formInput);
        this.channels[this.current_picked]["channels"][0] = response.data;
    } catch (error) {
      
    }
  }

  DeleteChannel()
  {

  }

  save()
  {

  }


  async createChannel()
  {
    if(this.formCreate.name === "")
    {
      return;
    }
    else
    {
      const body = {
        ...this.formCreate,
        owner: this.userID
      }
      try {
      
        const new_channel = <any> await this.services.CreateChannel(body);
        const join_channel = {
          email: this.user_email,
          channelID: new_channel.data._id
        }
        const respone  = <any>await this.services.joinchanel(join_channel);
        let channelUser = 
        {
          ...respone.channelUser
        }
        let channelInfo :any[] = [];
        channelInfo.push(new_channel.data);
        channelUser["channels"] = channelInfo;
        this.channels.push(channelUser)
        this.closeMyModal('effect-4')
      } catch (error) {
        console.log(error);
      }
     
    }
  }


  confirmAlert() {
    Swal.fire({
      title: 'Are you sure?',
      type: 'warning',
      showCloseButton: true,
      showCancelButton: true
    }).then( async (willDelete) => {
      if (willDelete.dismiss) {
        Swal.fire('', 'Thanks for staying with us!', 'error');
      } else {
        try {
          const current_channel = this.channels[this.current_picked]["channels"][0];
          const respone = <any>await this.services.deleteChannel(this.userID, current_channel["_id"]);
          this.channels.splice(this.current_picked  , 1);
          this.messages = [];
          this.user_online = [];
          this.socket.emit("disconnected",this.userID, this.channels, (respone)=>{
            console.log("respone", respone)
          } )
          Swal.fire('', 'Success! You has been left this channel!', 'success');
        } catch (error) {
          console.log(error);
        }
      
      }
    });
  }

  async UserInfo(modal: any, user: any)
  {
    // this.openMyModal(modal);
    
    try {
        this.UserInformation = <any>await this.services.getUserInfo(user.userID);
        if(this.UserInformation)
        {
          this.openMyModal(modal);
        }  
    } catch (error) {
      
    }
  }

  async uploadAvatar(user: any, i: any)
  {
      
      const data = new FormData();
      data.append("file", this.file);
      try {
          this.uploadUserInfo = true;
          if(this.file_name)
          {
            const respone = <any> await this.services.updateFile(user.userID, user.name, user.channelID, this.file_extension, data);
            this.UserInformation.avatar = respone.file;
            this.user_online[i]["userinfo"][0]["avatar"] = respone.file;
          }
          await this.services.updateUserInfo(user.userID, this.UserInformation);
          this.uploadUserInfo = false;
      } catch (error) {
        this.loading = false;
      }
  }

   getAvatar(userID : string)
  {
    
    for(let i = 0; i < this.userAvatar.length ; i++)
    {
      if(this.userAvatar[i].userID === userID && this.userAvatar[i]["userInfo"][0]["avatar"])
      {
        return this.userAvatar[i]["userInfo"][0]["avatar"]
      }
    }
    return "https://appchatbucket.s3.us-east-2.amazonaws.com/avatar-blank.jpg-1635606433186.jpeg";
  }
}

