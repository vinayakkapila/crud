import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { Users } from "./userModel.js";
export const Addresses=sequelize.define("Addresses",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
     user_id: {
        type: DataTypes.INTEGER,
        references: {
            model:Users,
            key:'id'
        }
    },
    street: {type : DataTypes.STRING, allowNull: false},
    city: {type : DataTypes.STRING, allowNull: false},
    state: {type:DataTypes.STRING,allowNull:false},
    pincode: {type:DataTypes.STRING,allowNull:false},
    created_at:{type:DataTypes.TIME,defaultValue:DataTypes.NOW},
    updated_at:{type:DataTypes.TIME,defaultValue:DataTypes.NOW}

}
,{
    timestamps:false
})
Users.hasMany(Addresses,{
    foreignKey:'user_id'
});
Addresses.belongsTo(Users,{
    foreignKey:'user_id'
})

