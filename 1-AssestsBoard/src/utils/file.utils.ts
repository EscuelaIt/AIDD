import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

export class FileUtils {
  private static dataDir = join(process.cwd(), 'data');

  static async readJsonFile<T>(filename: string): Promise<T[]> {
    try {
      const filePath = join(this.dataDir, filename);
      const data = await readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.warn(`File ${filename} not found, creating empty array`);
      return [];
    }
  }

  static async writeJsonFile<T>(filename: string, data: T[]): Promise<void> {
    const filePath = join(this.dataDir, filename);
    await writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
  }
} 