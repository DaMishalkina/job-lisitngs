export const getTags = (object: {[key: string]: string | string[]}) => {
    const tags: string[] = []
    Object.values(object).map((value) => {
        Array.isArray(value) ? tags.push(...value) : tags.push(value);
    })

    return tags;
}