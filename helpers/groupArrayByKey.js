export const groupArrayByKey = (arr = [], key = 'sectionName') => {

    const groupedBySection = arr.reduce((acc, cur) => {
        // If the section doesn't exist in the accumulator, create it
        if (!acc[cur[key]]) {
            acc[cur[key]] = [];
        }
        // Push the current object into the appropriate section
        acc[cur[key]].push(cur);
        return acc;
    }, {});

    // Extract the groups into an array of subarrays
    const result = Object.values(groupedBySection);
    return result
}
