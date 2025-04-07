import { Controller, Get, Inject } from '@nestjs/common';
import { DbconService } from './dbcon.service';

@Controller('dbcon')
export class DbconController {
  constructor(private readonly dbconService: DbconService) {}

  @Get('tables')
  async getDatabaseTables(): Promise<string> {
    return this.dbconService.getTableList();
  }
}
