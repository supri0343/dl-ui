import { inject, bindable } from 'aurelia-framework';
import { Service, CoreService } from "./service";
import { Router } from 'aurelia-router';
var moment = require('moment');
const UnitLoader = require('../../../../loader/garment-unit-loader');

@inject(Router, Service, CoreService)
export class List {
    @bindable selectedUnit;
    constructor(router, service, coreService) {
        this.service = service;
        this.coreService = coreService;
        this.router = router;
        this.today = new Date();
    }

    async bind(context) {
        this.context = context;
        if (!this.unit) {
            var units = await this.coreService.getUnit({ size: 1, keyword: 'GMT', filter: JSON.stringify({ Code: 'GMT' }) });
            this.selectedUnit = units.data[0];
        }
    }

    selectedUnitChanged(newValue) {
        if (newValue) {
            this.unit = newValue;
        } else {
            this.unit = null;
        }
    }

    info = { page: 1, size: 50 };

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 4
        }
    };

    @bindable UnitItem;
    @bindable KtgrItem;

    KategoriItems = ['', 'BAHAN BAKU', 'BAHAN EMBALANCE', 'BAHAN PENDUKUNG']
    UnitItems = ['', 'KONVEKSI GARMENT', 'SAMPLE']

    search() {
        this.info.page = 1;
        this.info.total = 0;
        this.searching();
    }

    activate() {

    }

    get unitLoader(){
        return UnitLoader;
    }

    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`;
    }

    tableData = []
    searching() {
        var args = {
            page: this.info.page,
            size: this.info.size,
            dateFrom: this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            unitcode: this.unit ? this.unit.Code : "",
            category: this.category ? this.category : "",
            //suppliertype : this.Tipe
        };
        this.service.search(args)
            .then(result => {
                this.data = [];
                // this.AmountTotal1 = 0;
                // this.AmountTotal2 = 0;
                // this.AmountTotal3 = 0;
                // this.AmountTotal4 = 0;
                // this.AmountTotal5 = 0;
                for (var _data of result.data) {
                    // console.log(_data)

                    // this.AmountTotal1 += _data.BeginningBalanceQty;
                    // this.AmountTotal2 += _data.ReceiptQty;
                    // this.AmountTotal3 += _data.ReceiptCorrectionQty;
                    // this.AmountTotal4 += _data.ExpendQty;
                    // this.AmountTotal5 += _data.EndingBalanceQty;

                    // //Old Query
                    // _data.BeginningBalanceQty = _data.BeginningBalanceQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    // _data.ReceiptQty = _data.ReceiptQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    // _data.ReceiptCorrectionQty = _data.ReceiptCorrectionQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    // _data.ExpendQty = _data.ExpendQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    // _data.EndingBalanceQty = _data.EndingBalanceQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

                    //New Query
                    
                    _data.ReceiptPurchaseQty = _data.ReceiptPurchaseQty,
                    _data.ReceiptPurchasePrice = _data.ReceiptPurchasePrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    _data.BeginningBalancePrice = _data.BeginningBalancePrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    _data.EndingBalancePrice = _data.EndingBalancePrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    _data.ExpendProcessPrice = _data.ExpendProcessPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    _data.ExpendRestPrice = _data.ExpendRestPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    _data.ExpendReturPrice = _data.ExpendReturPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    _data.ExpendSamplePrice = _data.ExpendSamplePrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    _data.ExpendSubconPrice = _data.ExpendSubconPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    _data.ReceiptCorrectionPrice = _data.ReceiptCorrectionPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    _data.ReceiptProcessPrice = _data.ReceiptProcessPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    _data.ReceiptSubconPrice = _data.ReceiptSubconPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    _data.ReceiptPurchasePrice = _data.ReceiptPurchasePrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    _data.ReceiptRestPrice = _data.ReceiptRestPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    _data.ReceiptSamplePrice = _data.ReceiptSamplePrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

                    // if(info.unitcode == "C2A"){
                    //     _data.ReceiptPurchaseQty = _data.ReceiptPurchaseQty + _data.ReceiptKon2AQty,
                    //     _data.ReceiptPurchasePrice = _data.ReceiptPurchasePrice + _data.ReceiptKon2APrice
                    // }else if (info.unitcode == "C2B"){
                    //     _data.ReceiptPurchaseQty = _data.ReceiptPurchaseQty + _data.ReceiptKon2BQty,
                    //     _data.ReceiptPurchasePrice = _data.ReceiptPurchasePrice + _data.ReceiptKon2BPrice
                    // }else if (info.unitcode == "C2C"){
                    //     _data.ReceiptPurchaseQty = _data.ReceiptPurchaseQty + _data.ReceiptKon2CQty,
                    //     _data.ReceiptPurchasePrice = _data.ReceiptPurchasePrice + _data.ReceiptKon2CPrice
                    // }else if (info.unitcode == "C1A"){
                    //     _data.ReceiptPurchaseQty = _data.ReceiptPurchaseQty + _data.ReceiptKon1MNSQty,
                    //     _data.ReceiptPurchasePrice = _data.ReceiptPurchasePrice + _data.ReceiptKon1MNSPrice
                    // }else{
                    //     _data.ReceiptPurchaseQty = _data.ReceiptPurchaseQty + _data.ReceiptKon2DQty,
                    //     _data.ReceiptPurchasePrice = _data.ReceiptPurchasePrice + _data.ReceiptKon2DPrice
                    // }
                    this.data.push(_data);

                }
                // this.AmountTotal1 = this.AmountTotal1.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                // this.AmountTotal2 = this.AmountTotal2.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                // this.AmountTotal3 = this.AmountTotal3.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                // this.AmountTotal4 = this.AmountTotal4.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                // this.AmountTotal5 = this.AmountTotal5.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

                this.info.total = result.info.total
            })
    }

    reset() {
        this.dateFrom = "",
        this.dateTo = "",
        this.KtgrItem = ""
        //this.UnitItem = ""
    }

    ExportToExcel() {
        let args = {
            dateFrom: this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            unitcode: this.unit ? this.unit.Code : "",
            unitname: this.unit ? this.unit.Name : "",
            category: this.category ? this.category : "",
            categoryname: this.categoryname ? this.categoryname : ""
        };

        this.service.generateExcel(args);
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);
        this.dateMin = moment(_startDate).format("YYYY-MM-DD");

        if (_startDate > _endDate || !this.dateTo) {
            this.dateTo = e.srcElement.value;
        }
    }

    // UnitItemChanged(newvalue) {

    //     if (newvalue) {
    //         console.log(newvalue)
    //         // if (newvalue === "KONFEKSI 2A") {
    //         //     this.unit = "C2A";
    //         //     this.unitname = "KONFEKSI 2A";
    //         // }
    //         // else if (newvalue === "KONFEKSI 2B") {
    //         //     this.unit = "C2B";
    //         //     this.unitname = "KONFEKSI 2B";
    //         // }
    //         // else if (newvalue === "KONFEKSI 2C") {
    //         //     this.unit = "C2C";
    //         //     this.unitname = "KONFEKSI 2C";
    //         // } else if (newvalue === "KONFEKSI 1A") {
    //         //     this.unit = "C1A";
    //         //     this.unitname = "KONFEKSI 1A";
    //         // } else if (newvalue === "KONFEKSI 1B") {
    //             // this.unit = "C1B";
    //             // this.unitname = "KONFEKSI 1B";
    //         //} 
    //         if (newvalue === "KONVEKSI GARMENT") {
    //             this.unit = "GMT";
    //             this.unitname = "KONVEKSI GARMENT";
    //         }
    //         else if (newvalue === "SAMPLE") {
    //             this.unit = "SMP1";
    //             this.unitname = "SAMPLE";

    //         } else {
    //             this.unit = "";
    //             this.unitname = "";
    //         }
    //     } else {
    //         this.unit = "";
    //         this.unitname = "";
    //     }
    // }

    KtgrItemChanged(newvalue) {
        if (newvalue) {
            if (newvalue === "BAHAN BAKU") {
                this.category = "BB";
                this.categoryname = "BAHAN BAKU";
            }
            else if (newvalue === "BAHAN PENDUKUNG") {
                this.category = "BP";
                this.categoryname = "BAHAN PENDUKUNG";
            }
            else if (newvalue === "BAHAN EMBALANCE") {
                this.category = "BE";
                this.categoryname = "BAHAN EMBALANCE";
            } else {
                this.category = "";
                this.categoryname = "";
            }
        } else {
            this.unit = "";
            this.unitname = "";
        }
    }

    changePage(e) {
        var page = e.detail;
        this.info.page = page;
        this.searching();
    }
}
