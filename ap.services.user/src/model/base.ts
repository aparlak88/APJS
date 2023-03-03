export abstract class Base {
  public id: number = 0;
  public lastModified: number = Date.now();
  public isActive: boolean = false;
}
