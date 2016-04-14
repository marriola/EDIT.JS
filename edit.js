var _settings = {
    body: {
        "background-color": "#000088",
        "color": "#888888"
    },
    
    menu: {
        "background-color": "#888888",
        "color": "#000000"
    },
    
    "menu-top": {
        "background-color": "transparent",
        "color": "#000000"
    },
    
    "menu-top-selected": {
        "background-color": "#000000",
        "color": "#888888",
    }
};

var _menuItems = ["File", "Edit", "Search", "Options", "Help"];

$.fn.applyProperties = function(type) {
    var props = _settings[type];
    
    for (var key in props) {
        if (props.hasOwnProperty(key)) {
            this.css(key, props[key]);
        }
    }
    
    return this;
}

var $menu = function() {
    var $lastFocus;
    var i = 0;
    
    function menuItem_onClick(e) {
        setTimeout(() => {
            var $elt = $(e.target);
            $elt.applyProperties("menu-top-selected");
            $lastFocus = $(e.target);
        }, 1);
    }
    
    function menuItem_onFocusOut(e) {
        if ($lastFocus) {
            $lastFocus.applyProperties("menu-top");
        }    
        $lastFocus = null;
    }
    
    function addMenuItem($m, item) {
        var id = "__m_" + i++;
        
        $("<span>")
            .attr("id", id)
            .on("click", menuItem_onClick)
            .addClass("menu-top")
            .text(item)
            .appendTo($m);

    }
    
    $(document).on("click", menuItem_onFocusOut)

    var $m = $("<div>")
        .attr("id", "top-nav")
        .applyProperties("menu");
    
    var $left = $("<span>").css("float", "left").appendTo($m);
    var $right = $("<span>").css("float", "right").appendTo($m);
    
    for (let item of _menuItems.slice(0, -1)) {
        addMenuItem($left, item);
    }
    
    addMenuItem($right, _menuItems[_menuItems.length - 1]);
    
    return $m;
}();

var $window = function() {
    let $w = $("<div>");
    
    return $w;
}

var $body = function() {
    var handlers = {};

    function runHandlers(type, e) {
        if (!handlers[type])
            return;

        for (let handler of handlers[type]) {
            handler(e);
        }
    }
    
    $("body")
        .applyProperties("body")
        .on("click", e => runHandlers("click", e))
        .append($menu);

    return {
        on: function(event, handler) {
            if (!handlers[event])
                handlers[event] = [];
            handlers[event].push(handler);
        }
    };
}();
