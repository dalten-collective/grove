export function isDiaryImage(item) {
    return typeof item === 'object' && item !== null && 'image' in item;
}
