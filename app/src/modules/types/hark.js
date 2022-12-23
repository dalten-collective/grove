export function isYarnShip(obj) {
    return typeof obj !== 'string' && 'ship' in obj;
}
