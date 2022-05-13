Array.prototype.myFilter = function(callback, thisArg) {
    const context = thisArg || this;
    const result = [];

    if (typeof context === 'undefined' || typeof context === 'null') {
        throw new Error('Cannot iterate over undefined or null.');
    }

    if (typeof callback !== 'function') {
        throw new Error('Callback is not a function.');
    }

    for (let i = 0; i < context.length; i++) {
        if (i in context) {
            const current = this[i];

            if (callback.call(context, current, i)) {
                result.push(current);
            }
        }
    }

    return result;
}

function createDebounceFunction(func, wait, immediate) {
    let timeout;

    return function executedFunction() {
        const context = this;
        const args = arguments;

        const later = function() {
            timeout = null;

            if (!immediate) {
                func.apply(context, args);
            }
        };

        const callNow = immediate && !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(later, wait);

        if (callNow) {
            func.apply(context, args);
        }
    };
};