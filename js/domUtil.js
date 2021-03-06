var UTIL = (function(u){
    //set up sub module
    var sub = u.dom = u.dom || {};

    //Dependencies
    const strU = u.string;

    const doc = document,
        $ = function(domElement) {
            if (!singleSelector(domElement)) {
                try {
                    return doc.querySelectorAll(domElement);
                } catch(e) {
                    console.log(e);
                }
            } else {
                if (domElement.indexOf('#') === 0) {
                    try {
                        return (doc.getElementById(domElement.substring(1,domElement.length)));
                    } catch(e) {
                        console.log(e);
                    }
                } else if (domElement.indexOf('.') === 0){
                    try {
                        return doc.getElementsByClassName(domElement.substring(1,domElement.length));
                    } catch(e) {
                        console.log(e);
                    }
                } else {
                    try {
                        return doc.getElementsByTagName(domElement);
                    } catch(e) {
                        console.log(e);
                    }
                }
            }
        },
        singleSelector = function(str) {
            var arr;
            arr = str.split(" ");
            if (arr.length === 1 && strU.numChar(str, "#") <= 1 && strU.numChar(str, ".") <= 1) {
                return true;
            } else {   
                return false;
            } 
        },
        assignEvent = function(nodeList, event, funct) {
            //use for loop since node list is not an array
            try {
                for(let i = 0; i < nodeList.length; i++) {
                    nodeList[i].addEventListener(event, funct);
                }
            } catch(e) {
                console.log(e);
            }
        },
        setHTML = function(de, html) {
            try {
                for (let i = 0; i < de.length; i++) {
                    de[i].innerHTML = html;
                }
            } catch(e) {
                console.log(e);
            }
        },
        addClass = function(de, cls) {
            for (let i = 0; i < de.length; i++) {
                if (de[i].classList) {
                    de[i].classList.add(cls);
                } else {
                    de[i].className += ' ' + cls;
                }
            }
        },
        removeClass = function(de, cls) {
            for (let i = 0; i < de.length; i++) {
                if (de[i].classList) {
                    de[i].classList.remove(cls);
                } else {
                    de[i].className.replace(/\bcls\b/,'');
                }
            }
        };

        //public method and properties
        sub.$ = $;
        sub.setHTML = setHTML;
        sub.addClass = addClass;
        sub.assignEvent = assignEvent;
        sub.removeClass = removeClass;

        return u;

})(UTIL || {});