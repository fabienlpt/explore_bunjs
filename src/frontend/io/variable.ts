import { Domain } from "./domain";

export class Variable {
    private value: number | null = null;
    private domain: Domain;

    constructor(domain: Domain) {
        this.domain = domain;
    }

    setValue(value: number): void {
        if (this.domain.hasValue(value)) {
            this.value = value;
        }
    }

    unsetValue(): void {
        this.value = null;
    }

    toJSON(): object {
        return {
            value: this.value,
            domain: this.domain.toJSON(),
        };
    }

    static fromJSON(jsonObject: { value: number | null, domain: number[] }): Variable {
        const variable = new Variable(Domain.fromJSON(jsonObject.domain));
        if (jsonObject.value !== null) {
            variable.setValue(jsonObject.value);
        }
        return variable;
    }
}