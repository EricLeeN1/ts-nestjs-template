import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getPagination } from 'src/utils';
import { Repository } from 'typeorm';
import { ArticleCreateDTO } from './dto/article-create.dto';
import { ArticleEditDTO } from './dto/article-edit.dto';
import { IdDTO } from './dto/id.dto';
import { ListDTO } from './dto/list.dto';
import { Article } from './entity/article.entity';

@Injectable()
export class ArticleService {
  list: any[]; // 存放临时数据

  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {
    console.log(this.articleRepository);
    this.list = [];
  }

  // 获取列表
  async getMore(listDTO: ListDTO) {
    const { page = 1, pageSize = 10 } = listDTO;
    const getList = this.articleRepository
      .createQueryBuilder('article')
      .where({ isDelete: false })
      .select([
        'article.id',
        'article.title',
        'article.description',
        'article.createTime',
        'article.updateTime',
      ])
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();
    const [list, total] = await getList;
    const pagination = getPagination(total, pageSize, page);
    return {
      list,
      pagination,
    };
  }

  // 获取单条
  async getOne(idDto: IdDTO) {
    const { id } = idDto;
    const articleDetial = await this.articleRepository
      .createQueryBuilder('article')
      .where('article.id = :id', { id })
      .getOne();
    if (!articleDetial) {
      throw new NotFoundException('找不到文章');
    }
    return {
      info: articleDetial,
    };
  }

  // 创建文章
  async create(articleCreateDTO: ArticleCreateDTO) {
    const article = new Article();
    article.title = articleCreateDTO.title;
    article.description = articleCreateDTO.description;
    article.content = articleCreateDTO.content;
    const result = await this.articleRepository.save(article);
    return {
      info: result,
    };
  }

  // 更新文章
  async update(articleEditDTO: ArticleEditDTO) {
    const { id } = articleEditDTO;
    const articleToUpdate = await this.articleRepository.findOne({
      where: [{ id }],
    });
    articleToUpdate.title = articleEditDTO.title;
    articleToUpdate.description = articleEditDTO.description;
    articleToUpdate.content = articleEditDTO.content;
    const result = await this.articleRepository.save(articleToUpdate);
    return {
      info: result,
    };
  }

  // 删除文章
  async delete(idDTO: IdDTO) {
    const { id } = idDTO;
    const articleToUpdate = await this.articleRepository.findOne({
      where: [{ id }],
    });
    articleToUpdate.isDelete = true;
    const result = await this.articleRepository.save(articleToUpdate);
    return {
      info: result,
    };
  }
}
