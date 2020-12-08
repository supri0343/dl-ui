import { inject, bindable, computedFrom } from 'aurelia-framework';
import { SalesService } from "../service";
var CostCalculationLoader = require("../../../../loader/cost-calculation-garment-loader");
var UomLoader = require("../../../../loader/uom-loader");
var UnitLoader = require("../../../../loader/unit-loader");

@inject(SalesService)
export class Item {
    @bindable selectedRO;

    constructor(salesService) {
        this.salesService = salesService;
    }

    get filter() {
        let section = this.context.context.options.header.section || {};

        var filter = {
            BuyerCode: this.data.BuyerCode,
            Section: section.code || section.Code,
            "SCGarmentId!=null": true
        };
        return filter;
    }

    detailsColumns = [
        { header: "Carton 1" },
        { header: "Carton 2" },
        { header: "Style" },
        { header: "Colour" },
        { header: "Jml Carton" },
        { header: "Qty" },
        { header: "Total Qty" },
        { header: "GW" },
        { header: "NW" },
        { header: "NNW" },
        { header: "" },
    ];

    get roLoader() {
        return CostCalculationLoader;
    }

    roView = (costCal) => {
        return `${costCal.RO_Number}`
    }

    get uomLoader() {
        return UomLoader;
    }

    uomView = (uom) => {
        return `${uom.Unit || uom.unit}`
    }

    get unitLoader() {
        return UnitLoader;
    }

    get unitFilter() {
        return { "(Code == \"C2A\" || Code == \"C2B\" || Code == \"C2C\" || Code == \"C1A\" || Code == \"C1B\")": true };
    }

    unitView = (unit) => {
        return `${unit.Code || unit.code}`
    }

    toggle() {
        if (!this.isShowing)
            this.isShowing = true;
        else
            this.isShowing = !this.isShowing;
    }

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.readOnly = this.options.readOnly;
        this.isCreate = context.context.options.isCreate;
        this.isEdit = context.context.options.isEdit;
        this.itemOptions = {
            error: this.error,
            isCreate: this.isCreate,
            readOnly: this.readOnly,
            isEdit: this.isEdit,
            header: context.context.options.header
        };
        if (this.data.roNo) {
            this.selectedRO = {
                RO_Number: this.data.RONo || this.data.roNo
            };
        }

        this.isShowing = false;
        if (this.error && this.error.Details && this.error.Details.length > 0) {
            this.isShowing = true;
        }
    }

    selectedROChanged(newValue) {
        if (newValue) {
            this.salesService.getCostCalculationById(newValue.Id)
                .then(result => {
                    this.salesService.getSalesContractById(result.SCGarmentId)
                        .then(sc => {
                            this.salesService.getPreSalesContractById(result.PreSCId)
                                .then(psc => {
                                    this.data.roNo = result.RO_Number;
                                    this.data.article = result.Article;
                                    this.data.buyerAgent = result.Buyer;
                                    this.data.buyerBrand = result.BuyerBrand;
                                    this.data.sectionName = result.SectionName;
                                    this.data.section = {
                                        id: psc.SectionId,
                                        code: result.Section,
                                    };
                                    this.data.comodityDescription = (result.Comodity || {}).Name;
                                    this.data.unit = result.Unit;
                                    this.data.uom = result.UOM;
                                    this.data.valas = "USD";
                                    this.data.quantity = result.Quantity;
                                    this.data.scNo = sc.SalesContractNo;
                                    //this.data.amount=sc.Amount;
                                    this.data.price = sc.Price;
                                    this.data.priceRO = sc.Price;
                                    this.data.comodity = result.Comodity;
                                    this.data.amount = sc.Amount;

                                    this.context.context.options.header.section = this.data.section;
                                });
                        })
                });
        }
    }

    get subGrossWeight() {
        return this.data.details.reduce((acc, cur) => acc += cur.grossWeight, 0);
    }

    get subNetWeight() {
        return this.data.details.reduce((acc, cur) => acc += cur.netWeight, 0);
    }

    get addDetails() {
        return (event) => {
            const i = this.context.context.items.indexOf(this.context);

            let lastDetail;
            if (this.data.details.length > 0) {
                lastDetail = this.data.details[this.data.details.length - 1];
            } else if (i > 0) {
                const lastItem = this.context.context.items[i - 1];
                lastDetail = lastItem.data.details[lastItem.data.details.length - 1];
            }

            this.data.details.push({
                carton1: lastDetail ? lastDetail.carton2 + 1 : 0
            });
        };
    }

    get removeDetails() {
        return (event) => {
            this.error = null;
        };
    }

    get totalQty() {
        let qty = 0;
        if (this.data.details) {
            for (var detail of this.data.details) {
                if (detail.cartonQuantity && detail.quantityPCS) {
                    qty += detail.cartonQuantity * detail.quantityPCS;
                }
            }
        }
        return qty;
    }

    get totalCtn() {
        let qty = 0;
        if (this.data.details) {
            for (var detail of this.data.details) {
                if (detail.cartonQuantity) {
                    qty += detail.cartonQuantity;
                }
            }
        }
        return qty;
    }

    get amount() {
        this.data.amount = 0;
        if (this.data.quantity && this.data.price) {
            this.data.amount = this.data.quantity * this.data.price
        }
        return this.data.amount;
    }
}