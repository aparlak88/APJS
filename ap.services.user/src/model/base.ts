export abstract class Base {
  public id: number;
  public lastModified: number = Date.now();
  public isActive: boolean = false;
}
