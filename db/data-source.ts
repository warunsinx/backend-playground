import configuration from '../config/configuration';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = configuration().database;

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
