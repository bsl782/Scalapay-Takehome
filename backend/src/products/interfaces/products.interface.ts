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
export class Product extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column(DataType.INTEGER)
	declare id: number;

	@Unique
	@Column({ type: DataType.STRING })
	declare productToken: string;

	@Column({ type: DataType.STRING })
	declare name: string;

	@Column({ type: DataType.DECIMAL })
	declare price: number;

	@Column({ type: DataType.INTEGER })
	declare stock: number;
}
