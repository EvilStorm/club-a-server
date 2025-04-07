import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClubNoticeService } from './club-notice.service';
import { CreateClubNoticeDto } from './dto/create-club-notice.dto';
import { UpdateClubNoticeDto } from './dto/update-club-notice.dto';

@Controller('clubs')
export class ClubNoticeController {
  constructor(private readonly clubNoticeService: ClubNoticeService) {}

  @Post('notice')
  create(@Body() createClubNoticeDto: CreateClubNoticeDto) {
    return this.clubNoticeService.create(createClubNoticeDto);
  }

  @Get('notices')
  findAll() {
    return this.clubNoticeService.findAll();
  }

  @Get('notice/:id')
  findOne(@Param('id') id: string) {
    return this.clubNoticeService.findOne(+id);
  }

  @Patch('notice/:id')
  update(
    @Param('id') id: string,
    @Body() updateClubNoticeDto: UpdateClubNoticeDto,
  ) {
    return this.clubNoticeService.update(+id, updateClubNoticeDto);
  }

  @Delete('notice/:id')
  remove(@Param('id') id: string) {
    return this.clubNoticeService.remove(+id);
  }
}
