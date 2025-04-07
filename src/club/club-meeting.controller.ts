import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClubMeetingService } from './club-meeting.service';
import { CreateClubMeetingDto } from './dto/create-club-meeting.dto';
import { UpdateClubMeetingDto } from './dto/update-club-meeting.dto';

@Controller('clubs')
export class ClubMeetingController {
  constructor(private readonly clubMeetingService: ClubMeetingService) {}

  @Post('meeting')
  create(@Body() createClubMeetingDto: CreateClubMeetingDto) {
    return this.clubMeetingService.create(createClubMeetingDto);
  }

  @Get('meeting')
  findAll() {
    return this.clubMeetingService.findAll();
  }

  @Get('meeting/:id')
  findOne(@Param('id') id: string) {
    return this.clubMeetingService.findOne(+id);
  }

  @Patch('meeting/:id')
  update(
    @Param('id') id: string,
    @Body() updateClubMeetingDto: UpdateClubMeetingDto,
  ) {
    return this.clubMeetingService.update(+id, updateClubMeetingDto);
  }

  @Delete('meeting/:id')
  remove(@Param('id') id: string) {
    return this.clubMeetingService.remove(+id);
  }
}
