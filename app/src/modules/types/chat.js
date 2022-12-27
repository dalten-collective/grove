export function isChatImage(item) {
    return typeof item === 'object' && item !== null && 'image' in item;
}
