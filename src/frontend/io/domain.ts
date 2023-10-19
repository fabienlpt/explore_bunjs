export class Domain {
    private values: Set<number>;

    constructor(initialValues?: number[]) {
        this.values = new Set(initialValues);
    }

    addValue(value: number): void {
        this.values.add(value);
    }

    hasValue(value: number): boolean {
        return this.values.has(value);
    }

    delValue(value: number): void {
        this.values.delete(value);
    }

    copy(): Domain {
        return new Domain(Array.from(this.values));
    }

    toJSON(): number[] {
        return Array.from(this.values);
    }

    static fromJSON(jsonArray: number[]): Domain {
        return new Domain(jsonArray);
    }
}
