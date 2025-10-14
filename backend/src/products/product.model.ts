import {
	AutoIncrement,
	Column,
	DataType,
	Model,
	PrimaryKey,
	Table,
    Unique,
} from "sequelize-typescript";

@Table
export class Product extends Model<Product> {
	@PrimaryKey
    @AutoIncrement
	@Column (DataType.INTEGER)
	declare id: number;

    @Unique
	@Column ({type: DataType.STRING})
	productToken: string;

	@Column ({type: DataType.STRING})
	name: string;

	@Column ({type: DataType.DECIMAL})
	price: number;

	@Column ({type: DataType.INTEGER})
	stock: number;
}
