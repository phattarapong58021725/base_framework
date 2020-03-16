import { Component, OnInit, Input } from '@angular/core';
import { AjaxService } from 'src/app/_service/ajax.service';
import { ResponseData } from 'src/app/common/models/response-data.model';
import { FormArray } from '@angular/forms';
import { Utils } from 'src/app/common/helper';

const URL = {
  save: "gl/save",
  saveAction: "gl/save-action",
  get: "gl/get",
  getMaster: "common/getGlAccount",
  GET_DROPDOWN_LOV: "lov/list-data-detail"
};

@Component({
  selector: 'app-gl',
  templateUrl: './gl.component.html',
  styleUrls: ['./gl.component.css']
})

export class GLComponent implements OnInit {
  glList: any[] = [];
  @Input() moduleCode: string = '';
  public data: any = {
    glAccount: ""
    , glAccountDesc: ""
    , taxCode: ""
    , withholdingTax: ""
    , specialGl: ""
    , paMain: ""
    , paService: ""
    , reqId: ""
    , moduleCode: ""
    , glAction: null
  };

  public glAction: any = [{
    actionId: ""
    , actionCode: "Request"
    , actionName: "ขอใช้บริการ"
    , taxCode: ""
    , specialGl: ""
    , manageId: ""
  },
  {
    actionId: ""
    , actionCode: "Cancel"
    , actionName: "ขอยกเลิกบริการ"
    , taxCode: ""
    , specialGl: ""
    , manageId: ""
  },
  {
    actionId: ""
    , actionCode: "Monthly"
    , actionName: "บริการรายเดือน"
    , taxCode: ""
    , specialGl: ""
    , manageId: ""
  }];
  public glAccountList: any = [];
  public lovList: any = [];
  constructor(private ajax: AjaxService) {
  }

  ngOnInit() {

    this.getGlAccount();
    this.getTrashPaymentType();

  }

  getGlAccount() {
    this.ajax.doPost(URL.getMaster, {}).subscribe((res: ResponseData<any>) => {
      this.glAccountList = res.data;
      // console.log("glAccountList :",this.glAccountList);
    });
  }



  getVal(reqId, moduleCode) {
    this.ajax.doPost(URL.get, { reqId: reqId, moduleCode: moduleCode }).subscribe((res: ResponseData<any>) => {
      console.log("res.data", res.data);
      if (res.data) {
        this.data.glAccount = res.data.glAccount;
        this.data.taxCode = res.data.taxCode;
        this.data.withholdingTax = res.data.withholdingTax;
        this.data.specialGl = res.data.specialGl;
        this.data.paMain = res.data.paMain;
        this.data.paService = res.data.paService;
        this.data.reqId = res.data.reqId;
        this.data.moduleCode = res.data.moduleCode;
        this.data.glAccountDesc = res.data.glAccountDesc;
        this.glList = res.data.glAction
        if (this.glList != null) {
          if (this.glList.length != 0) {
            this.glAction[0].actionId = this.glList[0].actionId;
            this.glAction[1].actionId = this.glList[1].actionId;
            this.glAction[2].actionId = this.glList[2].actionId;

            this.glAction[0].specialGl = this.glList[0].specialGl;
            this.glAction[1].specialGl = this.glList[1].specialGl;
            this.glAction[2].specialGl = this.glList[2].specialGl;

            this.glAction[0].taxCode = this.glList[0].taxCode;
            this.glAction[1].taxCode = this.glList[1].taxCode;
            this.glAction[2].taxCode = this.glList[2].taxCode;
            console.log("glList :", this.glAction[0].specialGl);
          }
        }
      }
    });
  }
  save(reqId, moduleCode) {
    this.data.reqId = reqId;
    this.data.moduleCode = moduleCode;
    this.data.glAction = this.glAction
    console.log(this.data);
    
    this.ajax.doPost(URL.save, this.data).subscribe((res: ResponseData<any>) => {

    });
  }
  callGlAccount(val) {
    var globj = this.glAccountList.filter(function (valfil) {
      return valfil.value === val;
    });

    this.data.glAccountDesc = globj[0].label;


  }


  getTrashPaymentType() {
    this.ajax
      .doPost(`${URL.GET_DROPDOWN_LOV}`, { lovKey: "WHT_TAX_PERCENT" })
      .subscribe((res: ResponseData<any>) => {
        this.lovList = res.data;
      });
  }

  callLov(e) {
    var withholdingTax = this.lovList.filter(function (valfil) {
      return valfil.lovCode === e.target.value;
    });
    this.data.withholdingTax = withholdingTax[0].lovCode;
  }

}