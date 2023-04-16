import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class RequestScrap extends Model {
  declare id: number;
  declare searchTerm: string;
  declare platform: string;
  declare category: string;
}

RequestScrap.init({
  id: {
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    type: INTEGER
  },
  searchTerm: {
    allowNull: false,
    type: STRING,
  },
  platform: {
    allowNull: false,
    type: STRING,
  },
  category: {
    allowNull: false,
    type: STRING,
  }
}, {
  underscored: true,
  sequelize: db,
  modelName: 'requestScrap',
  timestamps: false,
});

export default RequestScrap;