/**
 *  04/12/2017
 *  ----------
 *  ToggleElement by @Shad0wflame
 *  http://twitter.com/shad0wflame
 *
 */
var ToggleElement = (function(){

    var _TYPES = {
        'string': '[object String]',
        'function': '[object Function]',
        'object': '[object Object]',
        'null': '[object Null]',
        'array': '[object Array]'
    };

    /**
     * @param {string} id
     * @param {function} rightFn (true position)
     * @param {function} [leftFn] (false position)
     * @constructor
     */
    function ToggleElement(id, rightFn, leftFn){
        leftFn = leftFn || null;
        _handleTypeCoherency.call(this,
        [
            {obj: id, type: [_TYPES.string]},
            {obj: rightFn, type: [_TYPES.function]},
            {obj: leftFn, type: [_TYPES.function, _TYPES.null]}
        ], function(){

            this.id = id;
            this.domElement = _createDomElement(this);
            this.position = false;

            this.actionArray = [];
            this.actionArray.push(leftFn, rightFn);

        }, function(err){
            throw new TypeError(err);
        });
    }

    ToggleElement.prototype.toggle = toggle;

    return ToggleElement;


    /**
     *
     * ==== FUNCTION DEFINITIONS ====
     *
     */

    /**
     * Toggles the toggle element.
     * @public
     */
    function toggle(){
        this.domElement.querySelector('input[type="checkbox"]').checked = this.position;
        this.position = !this.position;

        if(this.position){
            this.actionArray[1]();
        } else if(_isType(this.actionArray[0], _TYPES.function).result){
            this.actionArray[0]();
        }
    }

    /**
     *
     * @param {ToggleElement} toggleElement
     * @returns {Element|null}
     * @private
     */
    function _createDomElement(toggleElement){
        var domElement = null;

        if(toggleElement !== null && toggleElement.hasOwnProperty('id')) {
            domElement = document.createElement('toggle');
            domElement['toggleElement'] = toggleElement;
            domElement.id = toggleElement.id;

            var label = document.createElement('label');
            label.className = 'switch';

            var input = document.createElement('input');
            input.type = 'checkbox';

            var span = document.createElement('span');
            span.className = 'slider round';
            span.onclick = toggleElement.toggle.bind(toggleElement);

            label.appendChild(input);
            label.appendChild(span);

            domElement.appendChild(label);

        }

        return domElement;
    }

    /**
     * Makes sure every object in the array is the type it should be.
     * @param {array} objArray
     * @param {function} next
     * @param {function} err
     * @private
     */
    function _handleTypeCoherency(objArray, next, err){
        objArray.forEach(function(element){
           if(element.hasOwnProperty('obj') &&
              element.hasOwnProperty('type') &&
              _isType(element.type, _TYPES.array).result){

               var type = _isType(element.obj).type;
               if(element.type.indexOf(type) === -1){
                   err.call(this, 'Expected types: '+ element.type.join(', ') +'. Actual type: '+ type);
               }

           } else {
               err.call(this, 'Provided object coulnd\'t be read. Provide one with the proper structure.');
           }
        });

        next.apply(this);
    }

    /**
     * Auxiliary function that evaluates types.
     * @param {*} obj
     * @param {string} [expectedType]
     * @returns {{result: boolean, type: *}}
     * @private
     */
    function _isType(obj, expectedType){
        expectedType = expectedType || undefined;
        var type = Object.prototype.toString.call(obj);
        return {result: type === expectedType, type: type};
    }

}());