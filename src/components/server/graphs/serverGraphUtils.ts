interface ObjectFillerCallback {
    (generatedDate: Date): any;
}

/**
 * Will fill a resource if there is a resource missing from a given minute.
 * For example you want to fetch the last 30 minutes of cpu usages but there are only 28 cpu usages.
 * this method will then fill these missing 2 so that there is a cpu usage of every minute.
 * @param existingArray
 * @param startDate
 * @param endDate
 * @param creationCallback - This callback will be called if a date needs to be filled and you can set how you want to handle that.
 */
export function fillEmptyTimestamps (existingArray: { createdAt: Date } [], startDate: Date, endDate: Date,
                                     creationCallback: ObjectFillerCallback): {}[] {
    let arrayToFill: {}[] = []

    _generateAllDatesBetweenDates(startDate, endDate).forEach((generatedDate) => {
        let item = existingArray.find((item) => _dateMatches(item.createdAt, generatedDate))
        if (item) {
            arrayToFill.push(item)
        } else {
            arrayToFill.push(creationCallback(generatedDate))
        }
    })

    return arrayToFill
}

function _dateMatches(date1: Date, date2: Date) {
    // because we don't want to compare it to the second
    return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getHours() === date2.getHours() &&
        date1.getMinutes() === date2.getMinutes()
}

function _generateAllDatesBetweenDates(startDate: Date, endDate: Date): Date[] {
    let generatedDates: Date[] = []
    const dateMove = new Date(startDate);

    while (dateMove < endDate) {
        generatedDates.push(new Date(dateMove));

        // increase minute by 1
        dateMove.setMinutes(dateMove.getMinutes() + 1);
    }

    return generatedDates
}
