import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClubMemberService } from './club-member.service';
import { CreateClubMemberDto } from './dto/create-club-member.dto';
import { UpdateClubMemberDto } from './dto/update-club-member.dto';

@Controller('clubs')
export class ClubMemberController {
  constructor(private readonly clubMemberService: ClubMemberService) {}

  @Post('member/join')
  create(@Body() createClubMemberDto: CreateClubMemberDto) {
    return this.clubMemberService.create(createClubMemberDto);
  }

  @Get('members/:id')
  findOne(@Param('id') id: string) {
    return this.clubMemberService.findOne(+id);
  }

  @Get('members/:id/count')
  findCount(@Param('id') id: string) {
    return this.clubMemberService.findOne(+id);
  }

  @Patch('members/:id')
  update(
    @Param('id') id: string,
    @Body() updateClubMemberDto: UpdateClubMemberDto,
  ) {
    return this.clubMemberService.update(+id, updateClubMemberDto);
  }

  @Delete('members/:id')
  remove(@Param('id') id: string) {
    return this.clubMemberService.remove(+id);
  }
}
