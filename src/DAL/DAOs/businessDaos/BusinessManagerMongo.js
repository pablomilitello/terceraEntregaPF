import { businessModel } from '../../mongoDB/models/business.model';

class BusinessManager extends BasicManagerMongo {
  constructor(model) {
    super(model);
  }
}

export const businessManager = new BusinessManager(businessModel);
