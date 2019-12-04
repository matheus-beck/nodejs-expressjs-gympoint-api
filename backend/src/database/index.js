import Sequelize from 'sequelize';

import User from '../app/models/User';
import Plan from '../app/models/Plan';
import Student from '../app/models/Student';
import Checkin from '../app/models/Checkin';
import Subscription from '../app/models/Subscription';

import databaseConfig from '../config/database';
import HelpOrder from '../app/models/HelpOrder';

const models = [User, Student, Plan, Subscription, Checkin, HelpOrder];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
