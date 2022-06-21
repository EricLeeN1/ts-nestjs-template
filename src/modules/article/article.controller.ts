import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { ArticleCreateDTO } from './dto/article-create.dto';
import { ArticleEditDTO } from './dto/article-edit.dto';
import { IdDTO } from './dto/id.dto';
import { ListDTO } from './dto/list.dto';
import { ArticleInfoResponse, ArticleInfoVO } from './vo/article-info.vo';
import { ArticleListResponse, ArticleListVO } from './vo/article-list.vo';

@ApiTags('文章模块')
@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get('list')
  @ApiOkResponse({ description: '文章列表', type: ArticleListResponse })
  getMore(@Query() listDTO: ListDTO): Promise<ArticleListVO> {
    return this.articleService.getMore(listDTO);
  }

  @Get('info')
  @ApiOkResponse({ description: '文章详情', type: ArticleInfoResponse })
  getOne(@Query() idDto: IdDTO): Promise<ArticleInfoVO> {
    return this.articleService.getOne(idDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  @ApiBearerAuth()
  @ApiOkResponse({ description: '创建文章', type: ArticleInfoResponse })
  create(@Body() articleCreateDTO: ArticleCreateDTO): Promise<ArticleInfoVO> {
    return this.articleService.create(articleCreateDTO);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('edit')
  @ApiBearerAuth()
  @ApiOkResponse({ description: '编辑文章', type: ArticleInfoResponse })
  update(@Body() articleEditDTO: ArticleEditDTO): Promise<ArticleInfoVO> {
    return this.articleService.update(articleEditDTO);
  }

  @UseGuards(AuthGuard('jwt')
  @Delete('remove')
  @ApiBearerAuth()
  @ApiOkResponse({ description: '删除文章', type: ArticleInfoResponse })
  delete(@Body() idDto: IdDTO): Promise<ArticleInfoVO> {
    return this.articleService.delete(idDto);
  }
}
