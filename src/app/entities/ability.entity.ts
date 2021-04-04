import { EffectEntry } from "./effect-entry.entity";

export interface Ability {
    id: number;
    name: string;
    effect_entries: EffectEntry[]
}
