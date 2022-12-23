export const GRID = 'grid';
export const LIST = 'list';
export const TIME = 'time';
export const ALPHA = 'alpha';
export function isBold(item) {
    return typeof item === 'object' && item !== null && 'bold' in item;
}
export function isItalics(item) {
    return typeof item === 'object' && item !== null && 'italics' in item;
}
export function isLink(item) {
    return typeof item === 'object' && item !== null && 'link' in item;
}
export function isStrikethrough(item) {
    return typeof item === 'object' && item !== null && 'strike' in item;
}
export function isBlockquote(item) {
    return typeof item === 'object' && item !== null && 'blockquote' in item;
}
export function isInlineCode(item) {
    return typeof item === 'object' && item !== null && 'inline-code' in item;
}
export function isBreak(item) {
    return typeof item === 'object' && item !== null && 'break' in item;
}
export const LINK = 'link';
export const TEXT = 'text';
