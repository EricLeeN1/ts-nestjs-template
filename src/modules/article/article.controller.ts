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
import { IdDTO } from 'src/common/dto/id.dto';
import { PageDTO } from 'src/common/dto/page.dto';
import { ArticleService } from './article.service';
import { ArticleCreateDTO } from './dto/article-create.dto';
import { ArticleEditDTO } from './dto/article-edit.dto';
import { ArticleInfoSuccessVO, ArticleInfoVO } from './vo/article-info.vo';
import { ArticleListSuccessVO, ArticleListVO } from './vo/article-list.vo';

@ApiTags('文章模块')
@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @ApiOkResponse({ description: '文章列表', type: ArticleListSuccessVO })
  @Get('list')
  getMore(@Query() pageDTO: PageDTO): Promise<ArticleListVO> {
    return this.articleService.getMore(pageDTO);
  }

  @ApiOkResponse({ description: '文章详情', type: ArticleInfoSuccessVO })
  @Get('info')
  getOne(@Query() idDto: IdDTO): Promise<ArticleInfoVO> {
    return this.articleService.getOne(idDto);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: '创建文章', type: ArticleInfoSuccessVO })
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() articleCreateDTO: ArticleCreateDTO): Promise<ArticleInfoVO> {
    return this.articleService.create(articleCreateDTO);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: '编辑文章', type: ArticleInfoSuccessVO })
  @UseGuards(AuthGuard('jwt'))
  @Put('edit')
  update(@Body() articleEditDTO: ArticleEditDTO): Promise<ArticleInfoVO> {
    return this.articleService.update(articleEditDTO);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: '删除文章', type: ArticleInfoSuccessVO })
  @UseGuards(AuthGuard('jwt')
  @Delete('remove')
   delete(@Body() idDto: IdDTO): Promise<ArticleInfoVO> {
    return this.articleService.delete(idDto);
  }
}
