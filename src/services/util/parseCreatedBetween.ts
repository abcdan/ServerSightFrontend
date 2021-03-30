import type {CreatedBetweenDTO} from "../../dto/createdBetweenDTO";

export function parseCreatedBetweenToIsoString(createdBetween: CreatedBetweenDTO): {to: string, from: string} {
    return {
        to: createdBetween.to.toISOString(),
        from: createdBetween.from.toISOString()
    }
}
