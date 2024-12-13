import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Item } from '../entities/Item';
import { config } from './config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  synchronize: true,
  logging: false,
  entities: [Item],
  migrations: [],
  subscribers: [],
});

export const initializeDataSource = async () => {
  if (config.db.host && config.db.port && config.db.username && config.db.password && config.db.database) {
    await AppDataSource.initialize();
  } else {
    console.log('Database connection is not configured.');
  }
};