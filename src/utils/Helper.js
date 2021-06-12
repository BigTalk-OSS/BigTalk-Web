export const delay = ms => new Promise(res => setTimeout(res, ms));


export function sortByNewTimeStampFirst(list){
    list.sort(function(x, y){
        return y.timestamp - x.timestamp;
    })
    return list;
}
