import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import RequestScrap from './RequestScrap';

class Adverts extends Model {
  declare id: number;
  declare searchTerm: string;
  declare platform: string;
  declare category: string;
}

Adverts.init({
  id: {
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    type: INTEGER
  },
  requestId: {
    allowNull: false,
    type: STRING,
  },
  title: {
    allowNull: false,
    type: STRING,
  },
  price: {
    allowNull: false,
    type: INTEGER,
  },
  description: {
    allowNull: false,
    type: STRING,
  },
  image: {
    allowNull: false,
    type: STRING, 
  },
  link: {
    allowNull: false,
    type: STRING,
  }
}, {
  underscored: true,
  sequelize: db,
  modelName: 'adverts',
  timestamps: false,
});

Adverts.belongsTo(RequestScrap, { foreignKey: 'requestId', as: 'requestId' });
RequestScrap.hasOne(Adverts, { foreignKey: 'RequestId', as: 'RequestId' });


export default Adverts;