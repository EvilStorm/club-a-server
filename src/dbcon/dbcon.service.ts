import { Injectable, Inject } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class DbconService {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async getTableList(): Promise<string> {
    try {
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();

      // PostgreSQL 시스템 테이블에서 사용자 정의 테이블 목록 조회
      const tableInfos = await queryRunner.query(`
            SELECT table_name
            FROM information_schema.tables
            WHERE table_schema = 'public' -- 기본 스키마 이름
            AND table_type = 'BASE TABLE'
          `);

      await queryRunner.release();

      if (tableInfos && tableInfos.length > 0) {
        const tableNames = tableInfos.map((info) => info.table_name);
        return tableNames.join('\n'); // 테이블 이름을 줄바꿈으로 연결
      } else {
        return '데이터베이스에 테이블이 없습니다.';
      }
    } catch (error) {
      console.error('테이블 목록 조회 실패:', error);
      return '테이블 목록을 가져오는 데 실패했습니다.';
    }
  }
}
