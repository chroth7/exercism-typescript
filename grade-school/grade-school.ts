interface DB {
  [key: number]: string[];
}
export class GradeSchool {
  private db: DB = {};
  private currentNames: Map<string, number> = new Map();

  roster(): DB {
    return JSON.parse(JSON.stringify(this.db));
  }

  add(name: string, grade: number): void {
    if (this.currentNames.has(name)) {
      const prevGrade = this.currentNames.get(name) || 0;
      const prev = this.db[prevGrade] || [];
      const updated = prev.filter((n: string) => n !== name).sort();
      this.db[prevGrade] = updated;
      return;
    }
    this.currentNames.set(name, grade);
    const prev = this.db[grade] || [];
    const updated = prev.concat(name).sort();
    this.db[grade] = updated;
  }

  grade(grade: number): string[] {
    const gd = this.db[grade];
    return gd ? [...gd] : [];
  }
}
