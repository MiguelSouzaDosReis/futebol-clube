import { DataTypes, Model } from 'sequelize';
import db from '.';

class Teams extends Model {
  id!: number;

  teamName!: string;
}

Teams.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  teamName: DataTypes.STRING,
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

export default Teams;
