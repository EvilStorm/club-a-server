import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClubMeetingParticipantService } from './club-meeting-participant.service';
import { CreateClubMeetingParticipantDto } from './dto/create-club-meeting-participant.dto';
import { UpdateClubMeetingParticipantDto } from './dto/update-club-meeting-participant.dto';

@Controller('clubs')
export class ClubMeetingParticipantController {
  constructor(
    private readonly clubMeetingParticipantService: ClubMeetingParticipantService,
  ) {}

  @Post('meeting/participant')
  create(
    @Body() createClubMeetingParticipantDto: CreateClubMeetingParticipantDto,
  ) {
    return this.clubMeetingParticipantService.create(
      createClubMeetingParticipantDto,
    );
  }

  @Get('meeting/participant')
  findAll() {
    return this.clubMeetingParticipantService.findAll();
  }

  @Get('meeting/participant/:id')
  findOne(@Param('id') id: string) {
    return this.clubMeetingParticipantService.findOne(+id);
  }

  @Get('meeting/participant/members/:id')
  findMemberList(@Param('id') id: string) {
    return this.clubMeetingParticipantService.findMemberList(+id);
  }

  @Patch('meeting/participant/:id')
  update(
    @Param('id') id: string,
    @Body() updateClubMeetingParticipantDto: UpdateClubMeetingParticipantDto,
  ) {
    return this.clubMeetingParticipantService.update(
      +id,
      updateClubMeetingParticipantDto,
    );
  }

  @Delete('meeting/participant/:id')
  remove(@Param('id') id: string) {
    return this.clubMeetingParticipantService.remove(+id);
  }
}
