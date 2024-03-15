export const groupArrayByKey = (arr = [], key = 'sectionName') => {

    const groupBySection = arr.reduce((acc, cur) => {
        if (!acc[cur[key]]) {
            acc[cur[key]] = [];
        }
        acc[cur[key]].push(cur);
        return acc;
    }, {});

    return Object.values(groupBySection)
}
