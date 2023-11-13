import fs from 'fs';
import { TsFileParser } from '../ts-file-parser';
import { AccessorsMap, MethodsMap, PropertiesMap } from '../types';

/**
 * Class for writing API documentation to Markdown files.
 */
export class MdWriter {
  tsFileParser: TsFileParser
  mdPath: string

  /**
   * Creates a new MdWriter instance.
   * @param {string} tsPath - Path to the TypeScript file.
   * @param {string} mdPath - Path to the Markdown file.
   */
  constructor(tsPath: string, mdPath: string) {
    this.tsFileParser = new TsFileParser(tsPath);
    this.mdPath = mdPath
  }

  /**
   * Asynchronously writes API class content to the Markdown file.
   * @param {string} className - Name of the class.
   * @returns {Promise<void>} A Promise that resolves when the write operation is complete.
   */
  async writeApiClassContent(className: string): Promise<void> {
    // Read the content of the file asynchronously
    const data = await this.readFileAsync(this.mdPath);

    // Define start and end comments based on the class name
    const startComment = `<!-- START CLASS API: ${className} -->`;
    const endComment = `<!-- END CLASS API: ${className} -->`;

    // Find the indices of start and end comments
    const startIndex = data.indexOf(startComment);
    const endIndex = data.indexOf(endComment) + endComment.length;

    // Check if both start and end comments are found
    if (startIndex !== -1 && endIndex !== -1) {
      // Create updated content by appending API class content after the start comment
      const updatedContent =
        data.slice(0, startIndex + startComment.length) +
        '\n' +
        this.getApiClassContent(className) +
        data.slice(endIndex - endComment.length);

      // Write the updated content back to the file asynchronously
      await this.writeFileAsync(this.mdPath, updatedContent);

      console.log(`Content for ${className} inserted successfully.`);
    } else {
      // Handle case where start and/or end comments are not found
      console.error(`Start and/or end comments not found for ${className} in the file.`);
    }
  }

  /**
   * Gets formatted API class content based on class name.
   * @param {string} className - Name of the class.
   * @returns {string} Formatted API class content.
   */
  private getApiClassContent(className: string): string {
    const classData = this.tsFileParser.getClassData(className);
    return '' +
      this.printH3(classData.title) +
      this.printDescription(classData.description) +
      this.printH4('Constructor') +
      this.printListItem(classData.constructor.title, classData.constructor.description) +
      this.printMap('Properties', classData.properties) +
      this.printMap('Accessors', classData.accessors) +
      this.printMap('Methods', classData.methods);
  }

  /**
   * Prints an H3 heading.
   * @param {string} label - Heading label.
   * @returns {string} Formatted H3 heading.
   */
  private printH3 = (label: string): string =>{
    return `### ${label}\n`
  }

  /**
   * Prints an H4 heading.
   * @param {string} label - Heading label.
   * @returns {string} Formatted H3 heading.
   */
  private printH4 = (label: string): string =>{
    return `#### ${label}\n`
  }

  /**
   * Prints a description.
   * @param {string | undefined} description - Description text.
   * @returns {string} Formatted description.
   */
  private printDescription = (description: string | undefined): string => {
    return description ? `${description}\n` : '\n';
  }

  /**
   * Prints a list item.
   * @param {string} title - Item title.
   * @param {string | undefined} description - Item description.
   * @returns {string} Formatted list item.
   */
  private printListItem = (title: string, description: string | undefined): string => {
    return `- \`${title}\`: ${description}\n`;
  }

  /**
   * Prints a map of properties, accessors, or methods.
   * @param {string} title - Map title.
   * @param {PropertiesMap | AccessorsMap | MethodsMap} properties - Map of properties, accessors, or methods.
   * @returns {string} Formatted map.
   */
  private printMap(title: string, properties: PropertiesMap | AccessorsMap | MethodsMap): string {
    const keyList: string[] = Object.keys(properties);

    if (keyList.length) {
      return this.printH4(title) +
        Object
        .keys(properties)
        .sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }))
        .map((key) => {
          return this.printListItem(properties[key].title, properties[key].description);
        }).join('') + '\n';
    }
    return '\n'
  }

  /**
   * Helper function to read a file asynchronously
   * @param {string} filePath - Path to the file.
   * @returns {Promise<string>} A Promise that resolves with the file content.
   */
  private readFileAsync(filePath: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Helper function to write to a file asynchronously
   * @param {string} filePath - Path to the file.
   * @param {string} content - Content to be written to the file.
   * @returns {Promise<void>} A Promise that resolves when the write operation is complete.
   * @private
   */
  private writeFileAsync(filePath: string, content: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      fs.writeFile(filePath, content, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}