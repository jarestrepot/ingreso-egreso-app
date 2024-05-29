import { IcomeEgressInterface } from "../utils/interfaces/icomeEgress.interface";

export class IcomeEgress {

  constructor(
    private uid: string | null,
    private description: string,
    private amount: number,
    private type: string,
  ){}

  public static fromFirebase({ description, amount, type }: IcomeEgressInterface, uid: string){
    return new IcomeEgress(uid, description, amount, type);
  }

  getId(): string|null { return this.uid };
  getDescription(): string { return this.description };
  setDescription(description: string):void { this.description = description; }
  getAmount(): number { return this.amount;}
  setAmount(amount: number):void { this.amount = amount}
  getType(): string { return this.type; };
  setType(type: string):void { this.type = type; };
}

