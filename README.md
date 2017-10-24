# observable-obj

Highly performant observable objects for javascript without using Proxy objects.


Example
```javascript

// Global listener will be called for every nested object
const observableObj = observable({a: "b", b: {c: "D"}}, true, function (prop, oldValue, newValue) {
    console.log({prop, oldValue, newValue});
});

// Local listener will be called only for that object
observableObj.listen(function (prop, oldValue, newValue) {
    console.log({prop, oldValue, newValue});
});


observableObj.a = "c";
console.log(observableObj);

```