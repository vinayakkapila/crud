import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Users=sequelize.define("Users",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    first_name: {type : DataTypes.STRING, allowNull: false},
    last_name: {type:DataTypes.STRING,allowNull:false},
    email: {type:DataTypes.STRING,unique:true,allowNull:false,},
    created_at:{type:DataTypes.TIME,defaultValue:DataTypes.NOW},
    updated_at:{type:DataTypes.TIME,defaultValue:DataTypes.NOW}

},{
    timestamps:false
}

)