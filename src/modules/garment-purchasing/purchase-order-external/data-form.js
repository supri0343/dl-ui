import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";
var SupplierLoader = require('../../../loader/garment-supplier-loader');
var CurrencyLoader = require('../../../loader/currency-loader');
var IncomeTaxLoader = require('../../../loader/income-tax-loader');
import moment from 'moment';

@containerless()
@inject(Service, BindingEngine)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable title;
    @bindable selectedSupplier;
    @bindable selectedCurrency;
    @bindable selectedIncomeTax;
    @bindable options = { isUseIncomeTax: false };
    keywords = ''
    @bindable kurs = {};


    termPaymentImportOptions = ['T/T PAYMENT', 'CMT', 'FREE FROM BUYER', 'SAMPLE'];
    termPaymentLocalOptions = ['DAN LIRIS', 'CMT', 'FREE FROM BUYER', 'SAMPLE'];
    typePaymentOptions = ['T/T AFTER', 'FREE', 'CASH', 'T/T BEFORE'];
    categoryOptions = ['FABRIC', 'ACCESSORIES']
    qualityStandardTypeOptions = ['JIS', 'AATCC', 'ISO']

    label = "Periode Tgl. Shipment"
    freightCostByOptions = ['Penjual', 'Pembeli'];
    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    

    constructor(service, bindingEngine) {
        this.service = service;
        this.bindingEngine = bindingEngine;
    }

    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.isItem = false;

        if(!this.data.OrderDate){
            this.data.OrderDate=new Date().toLocaleDateString();
        }

        if (this.data.Category) {
            if (this.data.Category === "FABRIC") {
                this.isFabric = true;
            }
            else {
                this.isFabric = false;
            }
        }
        else {
            this.isFabric = true;
        }
        if(this.data.Items)
            if (this.data.Items.length > 0) {
                this.isItem = true;
            }

        this.options.readOnly = this.readOnly;
        if (this.data.useVat) {
            this.options.isUseVat = true;
        }
        if (this.data.paymentMethod === "CMT") {
            this.options.checkOverBudget = false;
        }
        else if (this.data.paymentMethod === "FREE FROM BUYER") {
            this.options.checkOverBudget = false;
        }
        else {
            this.options.checkOverBudget = true;
        }
        this.options.resetOverBudget = false;

        if(this.data.Currency){
            this.data.CurrencyRate=this.data.Currency.Rate;
        }
        //var kurs = await this.service.getKurs(this.data.Currency.Code, new Date(this.data.OrderDate).toLocaleDateString());
        //this.kurs=kurs[0];
        if (Object.getOwnPropertyNames(this.kurs).length > 0) {
            this.options.kurs = this.kurs;
        } else {
            this.options.kurs = { Rate: 1 };
        }
    }

    @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }

    @computedFrom("data.SupplierId")
    get supplierType() {
        if (this.data.Supplier) {
            if (this.data.Supplier.Import)
                return "Import"
            else
                return "Lokal"
        }
        else
            return "Lokal"
    }

    @computedFrom("data.SupplierId")
    get supplierIsImport() {
        if (this.data.Supplier) {
            if (this.data.Supplier.Import)
                return true
            else
                return false
        }
        else
            return false
    }

    selectedSupplierChanged(newValue) {
        var _selectedSupplier = newValue;
        if (_selectedSupplier.Id) {
            console.log(_selectedSupplier);
            this.data.Supplier = _selectedSupplier;
            this.data.Supplier.Import=_selectedSupplier.import;
            this.data.Supplier.Code=_selectedSupplier.code;
            this.data.Supplier.Name=_selectedSupplier.name;
            this.data.Supplier.Id=_selectedSupplier.Id;
            this.data.SupplierId = _selectedSupplier.Id ? _selectedSupplier.Id : "";
            this.data.IsUseVat = _selectedSupplier.useVat;
            this.data.IncomeTax=_selectedSupplier.IncomeTaxes;
            this.data.IncomeTax.Name=_selectedSupplier.IncomeTaxes.name;
            this.data.IncomeTax.Rate=_selectedSupplier.IncomeTaxes.rate;
        }
    }

    async selectedCurrencyChanged(newValue) {
        this.data.Items=[];
        var _selectedCurrency = newValue;
        if (_selectedCurrency) {
            if (_selectedCurrency.Id) {
                var CurrencyRate = parseInt(_selectedCurrency.Rate ? _selectedCurrency.Rate : 1, 10);
                this.data.Currency = _selectedCurrency;
                this.data.CurrencyRate = CurrencyRate;
                //var today=new Date();
                var kurs = await this.service.getKurs(this.data.Currency.Code, this.data.OrderDate);
                this.kurs=kurs[0];
                if (Object.getOwnPropertyNames(this.kurs).length <= 0) {
                    alert(`Kurs untuk mata uang ${this.data.Currency.Code} belum ditambahkan.`);
                    this.selectedCurrency = null;
                }
                this.options.kurs = this.kurs;

                console.log(this.options.kurs);
            }
            else {
                this.data.Currency = null;
                this.data.CurrencyRate = 0;
            }
        }
        else {
            this.data.Currency = null;
            this.data.CurrencyRate = 0;
        }
    }

    categoryChanged(e) {
        var selectedCategory = e.srcElement.value;
        if (selectedCategory) {
            this.data.Category = selectedCategory;

            this.data.Shrinkage = '';
            this.data.WetRubbing = '';
            this.data.DryRubbing = '';
            this.data.Washing = '';
            this.data.DarkPrespiration = '';
            this.data.LightMedPrespiration = '';
            this.data.PieceLength = '';
            this.data.QualityStandardType = 'JIS';

            if (this.data.Category === "FABRIC") {
                this.isFabric = true;
            }
            else {
                this.isFabric = false;
            }
            this.data.Items = [];
        }
    }

    paymentMethodChanged(e) {
        var selectedPayment = e.srcElement.value;
        if (selectedPayment) {
            this.data.paymentMethod = selectedPayment;
        }
        if (this.data.paymentMethod === "CMT") {
            this.options.checkOverBudget = false;
            this.resetIsOverBudget();
        }
        else if (this.data.paymentMethod === "FREE FROM BUYER") {
            this.options.checkOverBudget = false;
            this.resetIsOverBudget();
        }
        else {
            this.options.resetOverBudget = false;
            this.options.checkOverBudget = true;
        }
    }

    resetIsOverBudget() {
        if (this.data.Items) {
            this.data.Items.map(items => {
                items.IsOverBudget = false;
                items.OverBudgetRemark = "";
            })
            this.options.resetOverBudget = true;
            this.context.DetailsCollection.bind();
        }
    }
    paymentTypeChanged(e) {
        var selectedPayment = e.srcElement.value;
        if (selectedPayment) {
            this.data.PaymentType = selectedPayment;
            if (this.data.PaymentType == "CASH" || this.data.PaymentType == "T/T BEFORE") {
                this.data.PaymentDueDays = 0;
            }
        }
    }

    selectedIncomeTaxChanged(newValue) {
        var _selectedIncomeTax = newValue;
        if (!_selectedIncomeTax) {
            this.data.IncomeTaxRate = 0;
            this.data.UseIncomeTax = false;
            this.data.IncomeTax = {};
        } else if (_selectedIncomeTax.Id) {
            this.data.IncomeTaxRate = _selectedIncomeTax.rate ? _selectedIncomeTax.rate : 0;
            this.data.UseIncomeTax = true;
            this.data.IncomeTax = _selectedIncomeTax;
        }
    }

    useVatChanged(e) {
        var selectedUseVat = e.srcElement.checked || false;
        if (!selectedUseVat) {
            this.options.isUseVat = false;
            for (var poItem of this.data.Items) {
                poItem.UseVat = false;
            }
        } else {
            this.options.isUseVat = true;
        }
    }

    get supplierLoader() {
        return SupplierLoader;
    }

    get currencyLoader() {
        return CurrencyLoader;
    }

    get incomeTaxLoader() {
        return IncomeTaxLoader;
    }

    supplierView = (supplier) => {
        var code=supplier.code? supplier.code : supplier.Code;
        var name=supplier.name? supplier.name : supplier.Name;
        return `${code} - ${name}`
    }

    currencyView = (currency) => {
        return currency.Code
    }

    incomeTaxView = (incomeTax) => {
        var rate=incomeTax.rate? incomeTax.rate : incomeTax.Rate;
        var name=incomeTax.name? incomeTax.name : incomeTax.Name;
        return `${name} - ${rate}`
    }

    async search() {
        var result = await this.service.searchByTags(this.keywords, this.data.Category, this.context.shipmentDateFrom, this.context.shipmentDateTo);

        var items=[];
        var pr=[];
        var index=0;
        for(var data of result.data){
            for(var item of data.Items){
                if(pr.length==0){
                    pr[item.PRNo]=item.RemainingBudget;
                   // item.RemainingBudget=pr[item.PRNo];

                    items.push({
                        index:index++,
                        PONo: data.PONo,
                        POId: data.Id,
                        PRNo: data.PRNo,
                        PRId: data.PRId,
                        PO_SerialNumber: item.PO_SerialNumber,
                        RONo: data.RONo,
                        Article: data.Article,
                        Product: item.Product,
                        DefaultQuantity: Number(item.Quantity),
                        DefaultUom: item.Uom,
                        DealQuantity: Number(item.Quantity),
                        DealUom: item.Uom,
                        BudgetPrice: Number(item.BudgetPrice),
                        PriceBeforeTax: Number(item.BudgetPrice),
                        PricePerDealUnit: Number(item.BudgetPrice),
                        budgetUsed: item.BudgetPrice*item.Quantity,
                        remainingBudget:item.RemainingBudget,
                        IsOverBudget: false,
                        totalBudget: item.BudgetPrice*item.Quantity,
                        RemainingBudget:item.RemainingBudget,
                        Conversion: 1,
                        Remark: item.ProductRemark,
                        Initial:item.RemainingBudget
                    });
                }
                else{
                    var dup=items.find(a=>a.PRNo==item.PRNo && item.Product.Id==a.Product.Id);
                    if(dup){
                        item.RemainingBudget=pr[item.PRNo]-(item.BudgetPrice*item.Quantity);
                        pr[item.PRNo]=item.RemainingBudget;
                    }
                    else{
                        pr[item.PRNo]=item.RemainingBudget;
                        //item.RemainingBudget=pr[item.PRNo];
                    }

                    items.push({
                        PONo: data.PONo,
                        POId: data.Id,
                        PRNo: data.PRNo,
                        PRId: data.PRId,
                        PO_SerialNumber: item.PO_SerialNumber,
                        RONo: data.RONo,
                        Article: data.Article,
                        Product: item.Product,
                        DefaultQuantity: Number(item.Quantity),
                        DefaultUom: item.Uom,
                        DealQuantity: Number(item.Quantity),
                        DealUom: item.Uom,
                        BudgetPrice: Number(item.BudgetPrice),
                        PriceBeforeTax: Number(item.BudgetPrice),
                        PricePerDealUnit: Number(item.BudgetPrice),
                        budgetUsed: item.BudgetPrice*item.Quantity,
                        remainingBudget:item.RemainingBudget,
                        IsOverBudget: false,
                        totalBudget: item.BudgetPrice*item.Quantity,
                        Conversion: 1,
                        Remark: item.ProductRemark,
                        Initial:item.RemainingBudget
                    });
                }

            }

        }
        items = [].concat.apply([], items);
        this.data.Items=items;
        this.isItem = true;
    }

    items = {
        columns: [
            "Nomor PR - No. Referensi PR - Article",
            "Nomor RO",
            "Barang",
            "Jumlah Diminta",
            "Satuan Diminta",
            "Jumlah Beli",
            "Satuan Beli",
            "Jumlah Kecil",
            "Satuan Kecil",
            "Konversi",
            "Harga Satuan",
            "Include Ppn?",
            "Keterangan"],
        onRemove: function () {
            this.bind();
            if(this.items){
                console.log("bb")
                var pr=[];
                var remaining=[];
                var items=[];
                for(var a of this.items){
                    if(pr.length==0){
                        pr.push(a);
                        //a.budgetUsed=a.PricePerDealUnit*a.DealQuantity*this.kurs.Rate;
                        remaining[a.PRNo + a.Product.Id]=a.Initial;
                        a.remainingBudget=remaining[a.PRNo + a.Product.Id]-a.budgetUsed;
                        remaining[a.PRNo + a.Product.Id]=a.remainingBudget;
                    }
                    else{
                        var dup=pr.find(b=> b.PRNo == a.PRNo && b.Product.Id==a.Product.Id);
                        if(dup){
                            //a.budgetUsed=a.PricePerDealUnit*a.DealQuantity*this.kurs.Rate;
                            a.remainingBudget=remaining[a.PRNo + a.Product.Id]-a.budgetUsed;
                            remaining[a.PRNo + a.Product.Id]=a.remainingBudget;
                        }
                        else{
                            pr.push(a);
                            //a.budgetUsed=a.PricePerDealUnit*a.DealQuantity*this.kurs.Rate;
                            a.remainingBudget=remaining[a.PRNo + a.Product.Id]-a.budgetUsed;
                            remaining[a.PRNo + a.Product.Id]=a.Initial;
                        }
                    }
                    if(a.remainingBudget<0){
                        a.IsOverBudget=true;
                    }
                    else{
                        a.IsOverBudget=false;
                    }
                }
            }
        }
    };

    itemsChanged(e){
        if(this.data.Items){
            var pr=[];
            var remaining=[];
            var items=[];
            for(var a of this.data.Items){
                console.log(a);
                console.log(a.remainingBudget)
                if(pr.length==0){
                    pr.push(a);
                    //a.budgetUsed=a.PricePerDealUnit*a.DealQuantity*this.kurs.Rate;
                    remaining[a.PRNo + a.Product.Id]=a.Initial;
                    a.remainingBudget=remaining[a.PRNo + a.Product.Id]-a.budgetUsed;
                    remaining[a.PRNo + a.Product.Id]=a.remainingBudget;
                }
                else{
                    var dup=pr.find(b=> b.PRNo == a.PRNo && b.Product.Id==a.Product.Id);
                    if(dup){
                        //a.budgetUsed=a.PricePerDealUnit*a.DealQuantity*this.kurs.Rate;
                        a.remainingBudget=remaining[a.PRNo + a.Product.Id]-a.budgetUsed;
                        remaining[a.PRNo + a.Product.Id]=a.remainingBudget;
                    }
                    else{
                        pr.push(a);
                        //a.budgetUsed=a.PricePerDealUnit*a.DealQuantity*this.kurs.Rate;
                        a.remainingBudget=remaining[a.PRNo + a.Product.Id]-a.budgetUsed;
                        remaining[a.PRNo + a.Product.Id]=a.Initial;
                    }
                }
                if(a.remainingBudget<0){
                    a.IsOverBudget=true;
                }
                else{
                    a.IsOverBudget=false;
                }
            }
        }
    }

    

}