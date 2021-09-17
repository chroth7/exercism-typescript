export class DnDCharacter {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  hitpoints: number;

  constructor() {
    this.strength = DnDCharacter.generateAbilityScore();
    this.dexterity = DnDCharacter.generateAbilityScore();
    this.constitution = DnDCharacter.generateAbilityScore();
    this.intelligence = DnDCharacter.generateAbilityScore();
    this.wisdom = DnDCharacter.generateAbilityScore();
    this.charisma = DnDCharacter.generateAbilityScore();
    this.hitpoints = 10 + DnDCharacter.getModifierFor(this.constitution);
  }

  private static rollDie(): number {
    return 1 + Math.floor(6 * Math.random());
  }

  private static rollDice(): number[] {
    const all = [
      this.rollDie(),
      this.rollDie(),
      this.rollDie(),
      this.rollDie(),
    ];
    return all.sort().slice(1);
  }

  public static generateAbilityScore(): number {
    return this.rollDice().reduce((a, v) => a + v, 0);
  }

  public static getModifierFor(abilityValue: number): number {
    return Math.floor((abilityValue - 10) / 2);
  }
}
