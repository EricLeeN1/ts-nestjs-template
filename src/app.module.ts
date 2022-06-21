import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './modules/article/article.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    // 使用 TypeORM 配置数据库
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'nHg@Gkdi.F6D28H',
      database: 'hanlinhui',
      entities: ['dist/modules/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ArticleModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
