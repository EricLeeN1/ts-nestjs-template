import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IdDTO } from 'src/common/dto/id.dto';
import { PageDTO } from 'src/common/dto/page.dto';
import { getPagination } from 'src/utils';
import { Repository } from 'typeorm';
import { ArticleCreateDTO } from './dto/article-create.dto';
import { ArticleEditDTO } from './dto/article-edit.dto';
import { Article } from './entity/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  // 获取列表
  async getMore(pageDTO: PageDTO) {
    const { page = 1, pageSize = 10 } = pageDTO;
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

  /**
   * 创建文章
   * @param articleCreateDTO
   * @returns
   */
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

  /**
   * 更新文章
   * @param articleEditDTO
   * @returns
   */
  async update(articleEditDTO: ArticleEditDTO) {
    const { id } = articleEditDTO;
    const articleToUpdate = await this.articleRepository.findOne({
      where: [{ id }],
    });

    articleToUpdate.title = articleEditDTO.title;
    articleToUpdate.description = articleEditDTO.description;
    articleToUpdate.content = articleEditDTO.content;

    // for (let key in articleEditDTO) {
    //   if (key !== 'id') {
    //     articleToUpdate[key] = articleEditDTO[key]
    //   }
    // }
    TODO; // 更新

    const result = await this.articleRepository.save(articleToUpdate);
    return {
      info: result,
    };
  }

  /**
   * 删除文章
   * @param idDTO
   * @returns
   */
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
