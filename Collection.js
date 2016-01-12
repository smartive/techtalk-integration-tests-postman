function Collection() {
    var objects = [],
        idCounter = 1;

    this.all = function () {
        return objects;
    };

    this.find = function (id) {
        var obj = null;
        objects.forEach(function (value) {
            if (value.id === id) {
                obj = value;
            }
        });
        return obj;
    };

    this.insert = function (object) {
        if (!object.id) {
            object.id = idCounter++;
        }
        objects.push(object);
        return object;
    };

    this.remove = function (id) {
        var obj = this.find(id);
        if (obj) {
            objects.splice(objects.indexOf(obj), 1);
        }
    };
}

exports = module.exports = Collection;