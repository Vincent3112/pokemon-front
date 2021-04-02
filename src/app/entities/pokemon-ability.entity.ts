export interface PokemonAbility {
    isHidden: boolean;
    slot: number;
    ability: {
        name: string;
        url: string
    }
}