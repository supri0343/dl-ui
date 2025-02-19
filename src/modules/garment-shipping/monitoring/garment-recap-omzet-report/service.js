import { buildQueryString } from 'aurelia-path';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = 'garment-shipping/monitoring/garment-recap-omzet';

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "packing-inventory");
    }

search(info) { 
       var endpoint = `${serviceUri}?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
       return super.get(endpoint);
        
    }
    
generateExcel(info) {
       var endpoint = `${serviceUri}/download?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
       return super.getXls(endpoint);
    }

    postToBalance(data) {
        var endpoint = `${serviceUri}/post-balance`;
        return super.post(endpoint, data);
    }

}