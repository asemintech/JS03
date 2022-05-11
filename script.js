Array.prototype.myFilter = function(fn) {
    const filtered = [];

    for (let i = 0; i < this.length; i++) {
        if (fn(this[i], i, this)) {
            filtered.push(this[i]);
        }
    }

    return filtered;
};

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