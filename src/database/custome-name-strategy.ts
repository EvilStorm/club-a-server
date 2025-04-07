import { NamingStrategyInterface, DefaultNamingStrategy, Table } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';

export class CustomNamingStrategy
  extends DefaultNamingStrategy
  implements NamingStrategyInterface
{
  tableName(className: string, customName?: string): string {
    return customName ? customName : snakeCase(className) + 's';
  }

  columnName(
    propertyName: string,
    customName?: string,
    embeddedPrefixes: string[] = [],
  ): string {
    return snakeCase(
      embeddedPrefixes.concat(customName ? customName : propertyName).join('_'),
    );
  }

  relationName(propertyName: string): string {
    return snakeCase(propertyName);
  }

  joinColumnName(relationName: string, referencedColumnName: string): string {
    return snakeCase(relationName + '_' + referencedColumnName);
  }

  joinTableName(
    firstTableName: string,
    secondTableName: string,
    firstPropertyName: string,
    secondPropertyName: string,
  ): string {
    return snakeCase(firstTableName + '_' + secondTableName);
  }

  primaryKeyName(tableName: string, columnNames: string[]): string {
    return `pk_${tableName}_${columnNames.join('_')}`;
  }

  foreignKeyName(
    tableOrName: string | Table,
    columnNames: string[],
    referencedTablePath?: string,
    referencedColumnNames?: string[],
  ): string {
    const tableName =
      typeof tableOrName === 'string' ? tableOrName : tableOrName.name;
    const referencedTableName = referencedTablePath?.split('.').pop() ?? ''; // undefined일 경우 빈 문자열 사용
    const fkNameParts = [
      'fk',
      snakeCase(tableName),
      columnNames.map(snakeCase).join('_'),
      snakeCase(referencedTableName),
      referencedColumnNames
        ? referencedColumnNames.map(snakeCase).join('_')
        : '',
    ];
    return fkNameParts.filter((part) => part).join('_');
  }

  indexName(tableName: string, columns: string[], where?: string): string {
    const name = `idx_${tableName}_${columns.join('_')}`;
    return where ? `${name}_where` : name;
  }

  uniqueConstraintName(tableName: string, columns: string[]): string {
    return `uq_${tableName}_${columns.join('_')}`;
  }

  relationConstraintName(
    tableOrName: string | Table,
    columnNames: string[],
    where?: string,
  ): string {
    const tableName =
      typeof tableOrName === 'string' ? tableOrName : tableOrName.name;
    const nameParts = [
      'rel',
      snakeCase(tableName),
      columnNames.map(snakeCase).join('_'),
    ];
    if (where) {
      nameParts.push(snakeCase(where));
    }
    return nameParts.join('_');
  }

  defaultConstraintName(tableName: string, columnName: string): string {
    return `default_${tableName}_${columnName}`;
  }

  checkConstraintName(tableName: string, expression: string): string {
    return `chk_${tableName}_${expression}`;
  }

  exclusionConstraintName(tableName: string, expression: string): string {
    return `excl_${tableName}_${expression}`;
  }

  closureJunctionTableName(originalClosureTableName: string): string {
    return snakeCase(originalClosureTableName);
  }

  closureJunctionTableColumnName(
    entityName: string,
    columnName: string,
  ): string {
    return snakeCase(entityName + '_' + columnName);
  }

  closureJunctionTableInverseColumnName(
    referencedEntityName: string,
    columnName: string,
  ): string {
    return snakeCase(referencedEntityName + '_' + columnName);
  }

  generationStrategyName(
    generationStrategy: 'uuid' | 'rowid' | 'increment' | 'identity',
  ): string {
    return snakeCase(generationStrategy);
  }

  joinTableColumnName(
    entityName: string,
    propertyName: string,
    columnName?: string,
  ): string {
    return snakeCase(
      entityName + '_' + (columnName ? columnName : propertyName),
    );
  }

  joinTableInverseColumnName(
    entityName: string,
    propertyName: string,
    columnName?: string,
  ): string {
    return snakeCase(
      entityName + '_' + (columnName ? columnName : propertyName),
    );
  }

  joinTableColumnDuplicationPrefix(columnName: string, index: number): string {
    return columnName + index;
  }
}
