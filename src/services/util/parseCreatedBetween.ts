import type {CreatedBetweenDTO} from "../../dto/createdBetweenDTO";

export function parseCreatedBetweenToIsoString(createdBetween: CreatedBetweenDTO): {to: string, from: string} {
    // else wrong timestamp.
    return {
        to: toISOLocal(createdBetween.to),
        from: toISOLocal(createdBetween.from)
    }
}

function toISOLocal(dateToConvert) {
    let tzoffset = (new Date).getTimezoneOffset() * 60000; //offset in milliseconds
    return new Date(dateToConvert - tzoffset).toISOString().slice(0, -1);
}
