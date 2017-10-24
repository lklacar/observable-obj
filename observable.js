class Observable {

    constructor(sharedCallback) {
        this.globalListener = sharedCallback;
    }

    listen(localCallback) {
        this.localCallback = localCallback;
    }

    notify(prop, oldValue, newValue) {
        if (this.globalListener)
            this.globalListener(prop, oldValue, newValue);

        if (this.localCallback)
            this.localCallback(prop, oldValue, newValue);
    }
}


export function observable(obj, deep = false, onChange) {
    const observableObject = new Observable(onChange);

    for (const prop in obj) {
        if (!obj.hasOwnProperty(prop))
            continue;

        if (typeof(obj[prop]) === "object") {
            observableObject[prop] = !deep ? obj[prop] : observable(obj[prop], deep, onChange);
            continue;
        }

        Object.defineProperty(observableObject, "_" + prop, {
            enumerable: false,
            value: obj[prop],
            writable: true,
            configurable: true
        });


        Object.defineProperty(observableObject, prop, {
            set: function (value) {
                const oldValue = observableObject["_" + prop];
                observableObject["_" + prop] = value;
                observableObject.notify(prop, oldValue, value)
            },
            get: function () {
                return observableObject["_" + prop]
            },
            enumerable: true
        });
    }

    return observableObject;
}

/*
const observableObj = observable({a: "b", b: {c: "D"}}, true, function (prop, oldValue, newValue) {
    console.log({prop, oldValue, newValue});
});

observable.listen(function (prop, oldValue, newValue) {
    console.log({prop, oldValue, newValue});
});


observable.a = "c";
console.log(observable);
*/