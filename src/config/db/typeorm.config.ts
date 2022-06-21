import { TypeOrmModule } from '@nestjs/typeorm';

export const typeOrmConfig = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'nHg@Gkdi.F6D28H',
  database: 'hanlinhui',
  entities: ['dist/modules/**/*.entity{.ts,.js}'],
  synchronize: true,
});
