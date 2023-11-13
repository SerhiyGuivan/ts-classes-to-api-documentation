import { Project, SourceFile, ClassDeclaration, PropertyDeclaration, GetAccessorDeclaration, MethodDeclaration, Scope } from 'ts-morph';
import { ClassesDataMap, ClassDataMap, PropertiesMap, AccessorsMap, MethodsMap } from '../types';

/**
 * Class for parsing TypeScript files and extracting class information.
 */
export class TsFileParser {
  private sourceFile: SourceFile;
  private readonly classesDataMap: ClassesDataMap

  /**
   * Creates a new TsFileParser instance.
   * @constructor
   * @param {string} filePath - The path to the TypeScript file to be parsed.
   */
  constructor(filePath: string) {
    this.sourceFile = new Project().addSourceFileAtPath(filePath);
    this.classesDataMap = {}
  }

  /**
   * Retrieves the data for a specific class.
   * @param {string} className - The name of the class to retrieve data for.
   * @returns {ClassDataMap} The data for the specified class.
   */
  getClassData(className: string): ClassDataMap {
    if (!this.classesDataMap[className]) {
      this.setClassData(className);
    }
    return this.classesDataMap[className]
  }

  /**
   * Sets the data for a specific class.
   * @param {string} className - The name of the class to set data for.
   */
  private setClassData(className: string): void {
    const classDeclaration = this.sourceFile
      .getClasses()
      .find((classDeclaration) => classDeclaration.getName() === className);

    if (!classDeclaration) {
      throw new Error('className not found!')
    }

    const key = classDeclaration.getName() as string;

    this.classesDataMap[key] = {
      title: this.getTypedClassName(classDeclaration),
      description: classDeclaration.getJsDocs()?.[0]?.getCommentText(),
      constructor: {
        title: classDeclaration.getConstructors()?.[0]?.getText(),
        description: classDeclaration.getConstructors()?.[0]?.getJsDocs()?.[0]?.getCommentText()
      },
      properties: this.getPublicProperties(classDeclaration),
      accessors: this.getPublicAccessors(classDeclaration),
      methods: this.getPublicMethods(classDeclaration)
    };
  }

  /**
   * Gets the typed class name, including type parameters if any.
   * @param {ClassDeclaration} c - The class declaration.
   * @returns {string} - The typed class name.
   */
  private getTypedClassName = (c: ClassDeclaration): string => {
    const className  = c.getName() as string;
    const typeParameters: string[] = c
      .getTypeParameters()
      .map((t) => t.getText())

    return typeParameters.length ? `${className}<${typeParameters.join(', ')}>` : `${className}`;
  }

  /**
   * Gets public properties of a class.
   * @param {ClassDeclaration} c - The class declaration.
   * @param {PropertiesMap} map - The existing properties map.
   * @returns {PropertiesMap} The map of public properties.
   */
  private getPublicProperties = (c: ClassDeclaration, map: PropertiesMap = {}): PropertiesMap => {
    const propertiesMap = c
      .getProperties()
      .reduce(this.propertiesReduceFn, map)

    const parentClass = c.getBaseClass();

    if (parentClass) {
      return this.getPublicProperties(parentClass, propertiesMap);
    }

    return propertiesMap;
  }

  /**
   * Gets public accessors of a class.
   * @param {ClassDeclaration} c - The class declaration.
   * @param {AccessorsMap} map - The existing properties map.
   * @returns {AccessorsMap} - The map of public properties.
   */
  private getPublicAccessors = (c: ClassDeclaration, map: AccessorsMap = {}): AccessorsMap => {
    const accessorsMap = c
      .getGetAccessors()
      .reduce(this.accessorsReduceFn, map);

    const parentClass = c.getBaseClass();

    if (parentClass) {
      return this.getPublicAccessors(parentClass, accessorsMap);
    }

    return accessorsMap;
  }

  /**
   * Gets public methods of a class.
   * @param {ClassDeclaration} c - The class declaration.
   * @param {MethodsMap} map - The existing properties map.
   * @returns {MethodsMap} - The map of public properties.
   */
  private getPublicMethods = (c: ClassDeclaration, map: MethodsMap = {}): MethodsMap => {
    const methodsMap = c
      .getMethods()
      .reduce(this.methodsReduceFn, map);

    const parentClass = c.getBaseClass();

    if (parentClass) {
      return this.getPublicMethods(parentClass, methodsMap);
    }

    return methodsMap;
  }

  /**
   * Reducer function for accumulating properties of a class.
   * @param {PropertiesMap} acc - The accumulator for properties.
   * @param {PropertyDeclaration} p - The property declaration.
   * @returns {PropertiesMap} - The updated properties map.
   */
  private propertiesReduceFn = (acc: PropertiesMap, p: PropertyDeclaration): PropertiesMap => {
    const { name, type, scope, isStatic } = p.getStructure();

    if (!acc[name] && (scope === Scope.Public || !scope)) {
      acc[name] = {
        title: p.getText(),
        type: type ? String(type) : 'unknown',
        description: p.getJsDocs()?.[0]?.getCommentText(),
        isStatic: Boolean(isStatic)
      };
    }

    return acc;
  }

  /**
   * Reducer function for accumulating accessors of a class.
   * @param {AccessorsMap} acc - The accumulator for properties.
   * @param {GetAccessorDeclaration} g - The accessor declaration.
   * @returns {AccessorsMap} - The updated accessors map.
   */
  private accessorsReduceFn = (acc: AccessorsMap, g: GetAccessorDeclaration): AccessorsMap => {
    const { name, returnType, scope, isStatic } = g.getStructure();

    if (!acc[name] && (scope === Scope.Public || !scope)) {
      acc[name] = {
        title: g.getText(),
        returnType: returnType ? String(returnType) : 'unknown',
        description: g.getJsDocs()?.[0]?.getCommentText(),
        isStatic: Boolean(isStatic)
      }
    }

    return acc;
  }

  /**
   * Reducer function for accumulating methods of a class.
   * @param {MethodsMap} acc - The accumulator for properties.
   * @param {MethodDeclaration} m - The method declaration.
   * @returns {MethodsMap} - The updated methods map.
   */
  private methodsReduceFn = (acc: MethodsMap, m: MethodDeclaration): MethodsMap => {
    // @ts-expect-error name is present
    const { name, returnType, scope, isStatic } = m.getStructure();

    if (!acc[name] && (scope === Scope.Public || !scope)) {
      acc[name] = {
        title: m.getText(),
        returnType: returnType ? String(returnType) : 'unknown',
        description: m.getJsDocs()?.[0]?.getCommentText(),
        isStatic: Boolean(isStatic)
      }
    }

    return acc;
  }
}