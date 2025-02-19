import { inject, bindable } from 'aurelia-framework';
import moment from 'moment';
import { Service, CoreService } from './service';
import { Router } from 'aurelia-router';

var UnitLoader = require('../../../../loader/garment-units-loader');

@inject(Router, Service, CoreService)
export class List {

    @bindable KtgrItem;
    @bindable selectedUnit;

    KategoriItem = ['','BAHAN BAKU','BAHAN PENDUKUNG', 'BAHAN EMBALACE'];
    unitOption = ['','CENTRAL 2A', 'CENTRAL 2B','CENTRAL 2C/EX. K4','CENTRAL 1A/EX. K3','CENTRAL 1B'];

    KtgrItemChanged(newvalue){
        if (newvalue) {
            if (newvalue === "BAHAN BAKU") {
                this.category = "BB";
                this.categoryname = "BAHAN BAKU";
                this.productcode = "";
            }
            else if (newvalue === "BAHAN PENDUKUNG") { 
                this.category = "BP";
                this.categoryname = "BAHAN PENDUKUNG";
                this.productcode = "";
            }
            else if (newvalue === "BAHAN EMBALACE") {
                this.category = "BE"; 
                this.categoryname = "BAHAN EMBALACE";
                this.productcode = "";
            }
            // else if(newvalue === "INTERLINING"){

            //     this.category = "BP";
            //     this.productcode = "INT";
            //     this.categoryname = "PROSES";
            // }
        }
    }

    async bind(context) {
        this.context = context;
        if (!this.unit) {
            var units = await this.coreService.getUnit({ size: 1, keyword: 'GMT', filter: JSON.stringify({}) });
            this.selectedUnit = units.data[0];
            this.unit = this.selectedUnit;
        }
    }

    selectedUnitChanged(newValue) {
        if (newValue) {
            this.unit = newValue;
        } else {
            this.unit = null;
        }
    }

    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`
    }
  
    get unitLoader() {
        return UnitLoader;
    }

    constructor(router, service, coreService) {
        this.service = service;
        this.coreService = coreService;
        this.router = router;
    }

    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    };

    search() {
        let args = {
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : null,
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            dateFromCreate : this.dateFromCreate ? moment(this.dateFromCreate).format("YYYY-MM-DD") : null,
            dateToCreate : this.dateToCreate ? moment(this.dateToCreate).format("YYYY-MM-DD") : "",
            category : this.category ? this.category : "",
            unit : this.unit ? this.unit.Code : "",
            productcode : this.productcode != "" ? this.productcode : "",
          }

          this.service.search(args)
            .then(result => {

                this.AmountTotal1 = 0;
                this.AmountTotal2 = 0;
                this.data=[];

                for (var i of result) {

                    this.AmountTotal1 += i.Quantity;
                    this.AmountTotal2 += i.Total;
                    i.Total = i.Total.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

                    this.data.push(i);
              }

              this.AmountTotal1 = this.AmountTotal1.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
              this.AmountTotal2 = this.AmountTotal2.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
          })
    }

    reset() {
        this.category = undefined;
        this.KtgrItem ="";
        this.dateFrom = undefined;
        this.dateTo = undefined;
    }

    xls() {
        let filter = {};

        if (this.category) {
            filter.category = this.category;
            filter.categoryname = this.categoryname;
        }

        if (this.productcode) {
            filter.productcode = this.productcode;
        }

        if (this.unit){
          filter.unit = this.unit.Code;
          filter.unitname = this.unit.Name;
        }

        if (this.dateFrom && this.dateFrom != 'Invalid Date') {
            filter.dateFrom = this.dateFrom;
            filter.dateTo = this.dateTo;

            filter.dateFrom = moment(filter.dateFrom).format("MM/DD/YYYY");
            filter.dateTo = moment(filter.dateTo).format("MM/DD/YYYY");
        }

        if (this.dateFromCreate && this.dateFromCreate != 'Invalid Date') {
            filter.dateFromCreate = this.dateFromCreate;
            filter.dateToCreate = this.dateToCreate;

            filter.dateFromCreate = moment(filter.dateFromCreate).format("MM/DD/YYYY");
            filter.dateToCreate = moment(filter.dateToCreate).format("MM/DD/YYYY");
        }

        this.service.xls(filter);
    }

    xlsMII() {
        let filter = {};

        if (this.category) {
            filter.category = this.category;
            filter.categoryname = this.categoryname;
        }
        
        if (this.productcode) {
            filter.productcode = this.productcode;
        }

        if (this.unit) {
            filter.unit = this.unit.Code;
            filter.unitname = this.unit.Name;
        }

        if (this.dateFrom && this.dateFrom != 'Invalid Date') {
            filter.dateFrom = this.dateFrom;
            filter.dateTo = this.dateTo;

            filter.dateFrom = moment(filter.dateFrom).format("MM/DD/YYYY");
            filter.dateTo = moment(filter.dateTo).format("MM/DD/YYYY");
        }

        if (this.dateFromCreate && this.dateFromCreate != 'Invalid Date') {
            filter.dateFromCreate = this.dateFromCreate;
            filter.dateToCreate = this.dateToCreate;

            filter.dateFromCreate = moment(filter.dateFromCreate).format("MM/DD/YYYY");
            filter.dateToCreate = moment(filter.dateToCreate).format("MM/DD/YYYY");
        }

        this.service.xlsMII(filter);
    }    
}
