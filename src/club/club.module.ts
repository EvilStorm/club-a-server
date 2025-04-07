import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Club } from './entities/club.entity';
import { ClubController } from './club.controller';
import { ClubService } from './club.service';
import { ClubMember } from './entities/club-member.entity';
import { ClubNotice } from './entities/club-notice.entity';
import { ClubMeeting } from './entities/club-meeting.entity';
import { ClubMeetingParticipant } from './entities/club-meeting-participant.entity';
import { ClubMemberController } from './club-member.controller';
import { ClubMeetingController } from './club-meeting.controller';
import { ClubMeetingParticipantController } from './club-meeting-participant.controller';
import { ClubNoticeController } from './club-notice.controller';
import { ClubMemberService } from './club-member.service';
import { ClubMeetingService } from './club-meeting.service';
import { ClubMeetingParticipantService } from './club-meeting-participant.service';
import { ClubNoticeService } from './club-notice.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { Court } from 'src/court/entities/court.entity';
import { CourtService } from 'src/court/court.service';
import { UserExtendsInfo } from 'src/users/entities/user-extends-info.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Club,
      ClubMember,
      ClubMeeting,
      ClubMeetingParticipant,
      ClubNotice,
      User,
      Court,
      UserExtendsInfo,
    ]),
  ],
  controllers: [
    ClubController,
    ClubMemberController,
    ClubMeetingController,
    ClubMeetingParticipantController,
    ClubNoticeController,
  ],
  providers: [
    ClubService,
    ClubMemberService,
    ClubMeetingService,
    ClubMeetingParticipantService,
    ClubNoticeService,
    UsersService,
    CourtService,
  ],
})
export class ClubModule {}
