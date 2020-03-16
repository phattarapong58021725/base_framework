import { Component, OnInit } from '@angular/core';
import { AjaxService } from 'src/app/_service/ajax.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/_service/common.service';
import { ResponseData } from 'src/app/common/models/response-data.model';
import { MessageService } from 'src/app/_service/message.service';
import { Router } from '@angular/router';
import { DateStringPipe } from 'src/app/common/pipes/date-string.pipe';
import { Utils } from 'src/app/common/helper';
declare var $: any;

const URL = {
  LIST: "users/listAll",
  GET_USER: "users/find_user"
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  dataList: any[]=[];
  dataTable: any;
  fromSearch: FormGroup;
  constructor(
    private ajax: AjaxService,
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private router: Router,
     ) { }
  breadcrumb: any = [
    {
      label: "ตั้งค่าผู้ใช้งาน",
      link: "/home",
    },
    {
      label: "ผู้เข้าใช้งาน",
      link: "#",
    }
  ];
  ngOnInit() {
    this.setFormGroup();
    this.getList();
  }

  setFormGroup() {
    this.fromSearch = this.formBuilder.group({
      userName: [""]
    
    })
  }

  getFindList() {
    if( Utils.isNotNull(this.fromSearch.value.userName)){
      this.ajax.doPost(URL.GET_USER, this.fromSearch.value).subscribe((res: ResponseData<any>) => {
        this.dataList = res.data;
        console.log("DATA : ",this.dataList);
        this.initDataTable();
      },
      (err) => {
        this.commonService.unLoading();
      }
    );
    }else{
      this.getList();
    }
    
  }

  getList() {
    this.commonService.loading();
      this.ajax.doPost(URL.LIST,{}).subscribe((res: ResponseData<any>) => {
       //console.log("this.dataList : ",res.data);
        this.dataList = res.data;
         //console.log("this.dataList : ",this.dataList);     
        this.initDataTable();
      this.commonService.unLoading();
    });
  }

  initDataTable = () => {
    if (this.dataTable != null) {
      this.dataTable.destroy();
    }
    this.dataTable = $('#datatable').DataTable({
      lengthChange: false,
      searching: false,
      ordering: false,
      processing: true,
      serverSide: false,
      paging: true,
      data: this.dataList,
      columns: [
        {
          className: "text-center",
          render: function (data, type, row, meta) {
            return meta.row + meta.settings._iDisplayStart + 1;
          }
        }, {
          data: 'name', className: 'text-left'
        }, {
          data: 'surname', className: 'text-left'
        },{
          data: 'userName', className: 'text-center'
        },{
          data: 'createdDate', className: 'text-center',
          render(data) {
           return new DateStringPipe().transform(data);
          }
        },{
          className: 'text-center',
          render(data, type, row, meta) {
            let button =  '<button-icon class="btn btn-sm btn-info" ><i class="fa fa-edit" aria-hidden="true"></i></button-icon>';
            button  +=  '<button-icon class="btn btn-sm btn-danger" ><i class="fa fa-trash" aria-hidden="true"></i></button-icon>';
            return button;
          }
        },
      ],
    });

    this.dataTable.on('click', 'td > button-icon.btn-info', (event) => {
      const data = this.dataTable.row($(event.currentTarget).closest('tr')).data();
       //console.log(data);
      this.router.navigate(['user/userDetail'], {
        queryParams: {
          id: data.userId
        }
      });
    });
  }

}
