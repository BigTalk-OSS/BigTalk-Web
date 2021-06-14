/**
 * This function is for delaying the code for a while.
 * @param {number} ms - Time to delay in milliseconds
 * @returns {Promise<unknown>}
 *
 * @example
 * delay(3000)
 * //  Code delays for 3 seconds
 *
 * @author amannirala13
 */
export const delay = ms => new Promise(res => setTimeout(res, ms));

/**
 * Thus function is used to sort post list according to the timestamp in "descending" order.
 * @param {Post[]} list - List of all the posts
 * @returns {Post[]}
 *
 * @example
 * let sortedList = sortByNewTimeStampFirst(list)
 * // returns sorted list by timestamp
 *
 * @see Post
 */
export function sortByNewTimeStampFirst(list){
    list.sort(function(x, y){
        return y.timestamp - x.timestamp;
    })
    return list;
}
