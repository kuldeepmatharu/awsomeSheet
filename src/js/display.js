var display = (function() {

  var _displayState = (function() {
    var displayState = {
      basics: false,
      statistics: false,
      equipment: false,
      defense: false,
      offense: false,
      skills: false,
      spells: false,
      notes: false
    };
    var get = function(options) {
      var defaultOptions = {
        section: null,
        all: null
      };
      if (options) {
        defaultOptions = helper.applyOptions(defaultOptions, options);
      };
      if (defaultOptions.all != null) {
        var allCount = 0;
        var sectionCount = 0;
        for (key in displayState) {
          sectionCount++;
          if (displayState[key]) {
            allCount++;
          };
        };
        if (allCount == sectionCount) {
          return true;
        } else {
          return false;
        }
      } else if (defaultOptions.section != null) {
        return displayState[defaultOptions.section.id];
      };
    };
    var set = function(options) {
      var defaultOptions = {
        section: null,
        all: null
      };
      if (options) {
        defaultOptions = helper.applyOptions(defaultOptions, options);
      };
      if (defaultOptions.all != null) {
        for (key in displayState) {
          if (displayState[key]) {
            displayState[key] = true;
          };
        };
      } else if (defaultOptions.section != null) {
        if (displayState[defaultOptions.section.id]) {
          displayState[defaultOptions.section.id] = false;
        } else {
          displayState[defaultOptions.section.id] = true;
        };
      };
      console.log("displayState = ", displayState);
    };
    // exposed methods
    return {
      set: set,
      get: get
    };
  })();

  function bind() {
    _bind_fab();
  };

  function _bind_fab() {
    var fabButton = helper.e(".js-fab-button");
    fabButton.addEventListener("click", function() {
      _displayState.set({
        all: true
      });
      totalBlock.render();
      clear();
      render();
      toggle();
      themeColor.update();
    }, false);
  };

  function update() {
    // _render_displayState();
    // _render_all_placeholderDisplay();
  };

  function toggle(section) {
    if (section) {
      _toggle_section(section);
    } else {
      // _toggle_all_section();
      var all_section = helper.eA(".js-section");
      all_section.forEach(function(arrayItem) {
        _toggle_section(arrayItem);
      });
    };
  };

  function _toggle_section(section) {
    var icon = section.querySelector(".js-card-toggle-icon");
    var minimise = (section.dataset.minimise == "true");
    var edit = section.querySelector(".js-edit");
    var cardTabs = section.querySelector(".js-card-tabs");
    var all_display = section.querySelectorAll(".js-display");
    var _displayOn = function() {
      section.dataset.displayMode = true;
      helper.addClass(section, "is-display-mode");
      helper.addClass(edit, "is-hidden");
      helper.addClass(icon, "icon-edit");
      helper.removeClass(icon, "icon-reader");
      if (cardTabs && !minimise) {
        helper.addClass(cardTabs, "is-hidden");
      };
      for (var i = 0; i < all_display.length; i++) {
        helper.removeClass(all_display[i], "is-hidden");
      };
    };
    var _displayOff = function() {
      section.dataset.displayMode = false;
      helper.removeClass(section, "is-display-mode");
      helper.removeClass(edit, "is-hidden");
      helper.removeClass(icon, "icon-edit");
      helper.addClass(icon, "icon-reader");
      if (cardTabs && !minimise) {
        helper.removeClass(cardTabs, "is-hidden");
      };
      for (var i = 0; i < all_display.length; i++) {
        helper.addClass(all_display[i], "is-hidden");
      };
    };
    _displayState.set({
      section: section
    });
    if (_displayState.get({
        section: section
      })) {
      _displayOn();
      console.log("toggle on");
    } else {
      _displayOff();
      console.log("toggle off");
    };
    // _render_displayState();
  };

  function _toggle_all_section() {
    var fab = helper.e(".js-fab");
    var all_display = helper.eA(".js-display");

    all_display.forEach(function(arrayItem) {
      console.log(arrayItem);
    });

    if (fab.dataset.displayMode == "true") {
      fab.dataset.displayMode = false;
      for (var i = 0; i < all_display.length; i++) {
        _toggle_section(all_display[i], false);
      };
    } else if (fab.dataset.displayMode == "false" || !fab.dataset.displayMode) {
      fab.dataset.displayMode = true;
      for (var i = 0; i < all_display.length; i++) {
        _toggle_section(all_display[i], true);
      };
    };
    _render_displayState();
    _render_all_placeholderDisplay();
  };

  function clear(display) {
    var _removeAllChildren = function(parent) {
      while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
      };
    };
    if (display) {
      var all_displayBlock = display.querySelectorAll(".js-display-block");
    } else {
      var all_displayBlock = helper.eA(".js-display-block");
    };
    for (var i = 0; i < all_displayBlock.length; i++) {
      all_displayBlock[i].dataset.displayContent = false;
      _removeAllChildren(all_displayBlock[i]);
    };
  };

  function state(options) {
    var defaultOptions = {
      all: false
    };
    if (options) {
      defaultOptions = helper.applyOptions(defaultOptions, options);
    };
    var fab = helper.e(".js-fab");
    if (defaultOptions.all) {
      return (fab.dataset.displayModeAll == "true");
    } else {
      return (fab.dataset.displayMode == "true");
    };
  };








  function render(display) {
    _render_all_display(display);
    _render_all_placeholderDisplay(display);
    _render_displayState();
  };

  function _render_all_display(display) {
    if (display) {
      _render_display(display);
    } else {
      var all_display = helper.eA(".js-display");
      all_display.forEach(function(arrayItem) {
        _render_display(arrayItem);
      });
    };
  };

  function _render_display(display) {
    var all_displayArea = display.querySelectorAll(".js-display-area");
    all_displayArea.forEach(function(arrayItem) {
      _render_all_displayArea(arrayItem);
    });
  };

  function _render_all_displayArea(displayArea) {
    var all_displayBlock = displayArea.querySelectorAll(".js-display-block");
    all_displayBlock.forEach(function(arrayItem) {
      _render_displayBlock(arrayItem);
    });
  };

  function _render_displayBlock(displayBlock) {
    var options = helper.makeObject(displayBlock.dataset.displayOptions);
    var displayArea = helper.getClosest(displayBlock, ".js-display-area");
    var elementCount = 0;
    var all_element = [];

    var getElements = {
      snippet: function(options) {
        // console.log("snippet ----------------");
        options.path.forEach(function(arrayItem, index) {
          var config = {
            path: arrayItem
          };
          if ("valueType" in options) {
            if (options.valueType[index]) {
              config.valueType = options.valueType[index];
            } else {
              config.valueType = false;
            };
          };
          if ("prefix" in options) {
            if (options.prefix[index]) {
              config.prefix = options.prefix[index];
            } else {
              config.prefix = false;
            };
          };
          if ("suffix" in options) {
            if (options.suffix[index]) {
              config.suffix = options.suffix[index];
            } else {
              config.suffix = false;
            };
          };
          all_element.push(_create_element().snippet(config));
        });
      },
      block: function(options) {
        // console.log("block ----------------");
        options.path.forEach(function(arrayItem, index) {
          var config = {
            path: arrayItem
          };
          if ("prefix" in options) {
            if (options.prefix[index]) {
              config.prefix = options.prefix[index];
            } else {
              config.prefix = false;
            };
          };
          if ("suffix" in options) {
            if (options.suffix[index]) {
              config.suffix = options.suffix[index];
            } else {
              config.suffix = false;
            };
          };
          all_element.push(_create_element().block(config));
        });
      }
    };

    getElements[options.type](options);

    if (all_element.length > 0) {
      all_element.forEach(function(arrayItem, index) {
        if (arrayItem) {
          elementCount++;
          displayBlock.appendChild(arrayItem);
        };
      });
    };

    if (elementCount > 0) {
      displayArea.dataset.displayContent = true;
      helper.removeClass(displayArea, "is-hidden");
    } else {
      displayArea.dataset.displayContent = false;
      helper.addClass(displayArea, "is-hidden");
    };
  };

  function _create_element() {

    function snippet(config) {
      var data = helper.getObject({
        object: sheet.get(),
        path: config.path
      });
      var displaySnippet;
      if (typeof data != undefined && data != "") {
        displaySnippet = document.createElement("span");
        displaySnippet.setAttribute("class", "m-display-item-snippet");
        var displayValue = document.createElement("span");
        displayValue.setAttribute("class", "m-display-item-value");
        if (config.valueType == "bonus" && data > 0) {
          data = "+" + data;
        } else if (config.valueType == "currency" && data > 0) {
          data = parseFloat(data).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          });
          if (data.indexOf(".00") !== -1) {
            data = data.substr(0, data.indexOf("."));
          };
        } else if (config.valueType == "number" && data > 0) {
          data = parseFloat(data).toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          });
        } else if (config.valueType == "weight" && data > 0) {
          data = parseFloat(data).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          });
          if (data.indexOf(".00") !== -1) {
            data = data.substr(0, data.indexOf("."));
          };
        };
        if (config.dependency) {
          data = data + " / " + helper.getObject({
            object: sheet.get(),
            path: config.dependency
          });
        };
        displayValue.textContent = data;
        if (config.prefix) {
          var displayPrefix = document.createElement("span");
          displayPrefix.setAttribute("class", "m-display-item-prefix");
          displayPrefix.textContent = config.prefix;
          displaySnippet.appendChild(displayPrefix);
        };
        displaySnippet.appendChild(displayValue);
        if (config.suffix) {
          var displaySuffix = document.createElement("span");
          displaySuffix.setAttribute("class", "m-display-item-suffix");
          displaySuffix.textContent = config.suffix;
          displaySnippet.appendChild(displaySuffix);
        };
      } else {
        displaySnippet = false;
      };
      return displaySnippet;
    };

    function block(config) {
      var data = helper.getObject({
        object: sheet.get(),
        path: config.path
      });
      var displayBlock;
      if (typeof data != undefined && data != "") {
        displayBlock = document.createElement("span");
        displayBlock.setAttribute("class", "m-display-item-block");
        var displayValue = document.createElement("span");
        displayValue.setAttribute("class", "m-display-value");
        displayValue.innerHTML = data;
        if (config.prefix) {
          var displayPrefix = document.createElement("span");
          displayPrefix.setAttribute("class", "m-display-item-prefix");
          displayPrefix.textContent = config.prefix;
          displayBlock.appendChild(displayPrefix);
        };
        displayBlock.appendChild(displayValue);
        if (config.suffix) {
          var displaySuffix = document.createElement("span");
          displaySuffix.setAttribute("class", "m-display-item-suffix");
          displaySuffix.textContent = config.suffix;
          displayBlock.appendChild(displaySuffix);
        };
      } else {
        displayBlock = false;
      };
      return displayBlock;
    };

    return {
      snippet: snippet,
      block: block
    };
  };

  function _render_all_placeholderDisplay(display) {
    if (display) {
      _render_displayPlaceholder(display);
    } else {
      var all_display = helper.eA(".js-display");
      all_display.forEach(function(arrayItem) {
        _render_displayPlaceholder(arrayItem);
      });
    };
  };

  function _render_displayPlaceholder(display) {
    var placeholderDisplay = display.querySelector(".js-placeholder-display");
    var all_displayArea = display.querySelectorAll(".js-display-area");
    var contentFound = false;
    all_displayArea.forEach(function(arrayItem) {
      if (arrayItem.dataset.displayContent == "true") {
        contentFound = true;
      };
    });
    if (contentFound) {
      helper.addClass(placeholderDisplay, "is-hidden")
    } else {
      helper.removeClass(placeholderDisplay, "is-hidden")
    };
  };

  function _render_displayState() {
    var header = helper.e(".js-header");
    var nav = helper.e(".js-nav");
    var menuElement = helper.e(".js-menu");
    var menuItem = helper.e(".js-menu-link-display-mode");
    var characterSelect = helper.e(".js-character-select");
    var shade = helper.e(".js-shade");
    var fab = helper.e(".js-fab");
    var fabButton = helper.e(".js-fab-button");
    var fabIcon = helper.e(".js-fab-icon");
    var all_section = helper.eA(".js-section");
    var anySectionDisplay = false;
    var allSectionDisplay = 0;
    var _displayOn = function() {
      helper.addClass(fabIcon, "icon-edit");
      helper.removeClass(fabIcon, "icon-reader");
      helper.removeClass(fabButton, "button-primary");
      helper.addClass(fabButton, "button-secondary");
      helper.addClass(nav, "is-display-mode");
      helper.addClass(menuElement, "is-display-mode");
      helper.addClass(header, "is-display-mode");
      helper.addClass(characterSelect, "is-display-mode");
      if (shade) {
        helper.addClass(shade, "is-display-mode");
      };
    };
    var _displayOff = function() {
      helper.removeClass(fabIcon, "icon-edit");
      helper.addClass(fabIcon, "icon-reader");
      helper.addClass(fabButton, "button-primary");
      helper.removeClass(fabButton, "button-secondary");
      helper.removeClass(nav, "is-display-mode");
      helper.removeClass(menuElement, "is-display-mode");
      helper.removeClass(header, "is-display-mode");
      helper.removeClass(characterSelect, "is-display-mode");
      if (shade) {
        helper.removeClass(shade, "is-display-mode");
      };
    };
    all_section.forEach(function(arrayItem) {
      if (arrayItem.dataset.displayMode == "true") {
        anySectionDisplay = true;
        allSectionDisplay++;
      };
    });
    if (anySectionDisplay) {
      if (allSectionDisplay == all_section.length) {
        fab.dataset.displayMode = true;
        fab.dataset.displayModeAll = true;
        _displayOn();
        menu.toggleMenuItem({
          menuItem: menuItem,
          state: "active"
        });
      } else {
        fab.dataset.displayMode = true;
        fab.dataset.displayModeAll = false;
        _displayOff();
        menu.toggleMenuItem({
          menuItem: menuItem,
          state: "inactive"
        });
      };
    } else {
      fab.dataset.displayMode = false;
      fab.dataset.displayModeAll = false;
      _displayOff();
      menu.toggleMenuItem({
        menuItem: menuItem,
        state: "inactive"
      });
    };
  };




  function _______render_displayTarget(displayTarget) {
    // var options = helper.makeObject(displayTarget.dataset.displayOptions);
    // console.log("fire");
    // console.log(options);
    // console.log(getElements);
    // console.log(getElements[options.type]);


    // find all targets in this display blocks
    // var all_displayBlockTarget = all_displayBlock[i].querySelectorAll(".js-display-block-target");
    // // start a "no data found at path" count
    // var dataNotFoundAtPath = 0;
    // var totalNodeLength = 0;
    // var all_node = [];
    //
    // // loop over each target in this display blocks
    // for (var j = 0; j < all_displayBlockTarget.length; j++) {
    //
    //   // get all data from display blocks target
    //   var target = all_displayBlockTarget[j];
    //   // var display = helper.getClosest(all_displayBlockTarget[j], ".js-display");
    //   var displayType = all_displayBlockTarget[j].dataset.displayType;
    //   var all_displayPath;
    //   var all_displayDependency = false;
    //   var all_displayPrefix = false;
    //   var all_displaySuffix = false;
    //   var all_displayValueType = false;
    //   var all_displayScale = false;
    //   var all_displayPosition = false;
    //   var all_displayColor = false;
    //   var all_displaySpellLevel = false;
    //
    //   if (all_displayBlockTarget[j].dataset.displayPath) {
    //     all_displayPath = all_displayBlockTarget[j].dataset.displayPath.split(",");
    //   };
    //   if (all_displayBlockTarget[j].dataset.displayDependency) {
    //     all_displayDependency = all_displayBlockTarget[j].dataset.displayDependency.split(",");
    //   };
    //   if (all_displayBlockTarget[j].dataset.displayPrefix) {
    //     all_displayPrefix = all_displayBlockTarget[j].dataset.displayPrefix.split(",");
    //   };
    //   if (all_displayBlockTarget[j].dataset.displaySuffix) {
    //     all_displaySuffix = all_displayBlockTarget[j].dataset.displaySuffix.split(",");
    //   };
    //   if (all_displayBlockTarget[j].dataset.displayValueType) {
    //     all_displayValueType = all_displayBlockTarget[j].dataset.displayValueType.split(",");
    //   };
    //   if (all_displayBlockTarget[j].dataset.displayScale) {
    //     all_displayScale = all_displayBlockTarget[j].dataset.displayScale.split(",");
    //   };
    //   if (all_displayBlockTarget[j].dataset.displayPosition) {
    //     all_displayPosition = all_displayBlockTarget[j].dataset.displayPosition.split(",");
    //   };
    //   if (all_displayBlockTarget[j].dataset.displayColor) {
    //     all_displayColor = all_displayBlockTarget[j].dataset.displayColor.split(",");
    //   };
    //   if (all_displayBlockTarget[j].dataset.displaySpellLevel) {
    //     all_displaySpellLevel = all_displayBlockTarget[j].dataset.displaySpellLevel.split(",");
    //   };
    //
    //   // get an array of nodes using the array of paths
    //   if (displayType == "stat") {
    //     all_node = _get_all_stat(all_displayPath);
    //   } else if (displayType == "modifier") {
    //     all_node = _get_all_modifier(all_displayPath, all_displayValueType);
    //   } else if (displayType == "image") {
    //     all_node = _get_all_image(all_displayPath, all_displayScale, all_displayPosition, all_displayColor);
    //   } else if (displayType == "text-snippet") {
    //     all_node = _get_all_textSnippet(all_displayPath, all_displayPrefix, all_displaySuffix, all_displayDependency, all_displayValueType);
    //   } else if (displayType == "text-block") {
    //     all_node = _get_all_textBlock(all_displayPath);
    //   } else if (displayType == "list") {
    //     all_node = _get_all_list(all_displayPath, all_displayPrefix, all_displaySuffix, all_displayValueType);
    //   } else if (displayType == "clone") {
    //     all_node = _get_all_clone(all_displayPath);
    //   } else if (displayType == "skill") {
    //     all_node = _get_all_skill(all_displayPath, all_displayPrefix);
    //   } else if (displayType == "spell") {
    //     all_node = _get_all_spell(all_displayPath, all_displaySpellLevel);
    //   } else if (displayType == "pill") {
    //     all_node = _get_all_pill(all_displayPath);
    //   };
    //
    //   // loop over each node in array and append to target
    //   all_node.forEach(function(arrayItem) {
    //     if (arrayItem != false) {
    //       // append to target
    //       target.appendChild(arrayItem);
    //     } else {
    //       // or increment the "no data found at path" count
    //       dataNotFoundAtPath++;
    //     };
    //   });
    //
    //   totalNodeLength = totalNodeLength + all_node.length;
    // };
    // // if the "no data found at path" count == total "path count" this display blocks target is empty so add a data vale to reflect this
    // if (totalNodeLength > dataNotFoundAtPath) {
    //   all_displayBlock[i].dataset.displayContent = true;
    // } else {
    //   all_displayBlock[i].dataset.displayContent = false;
    // };
  };

  function _____render_displayBlock(section) {
    // find all display blocks
    var all_displayBlock;
    if (section) {
      all_displayBlock = section.querySelectorAll(".js-display-block");
    } else {
      all_displayBlock = helper.eA(".js-display-block");
    };
    // loop all display blocks
    for (var i = 0; i < all_displayBlock.length; i++) {
      // find all targets in this display blocks
      var all_displayBlockTarget = all_displayBlock[i].querySelectorAll(".js-display-block-target");
      // start a "no data found at path" count
      var dataNotFoundAtPath = 0;
      var totalNodeLength = 0;
      var all_node = [];

      // loop over each target in this display blocks
      for (var j = 0; j < all_displayBlockTarget.length; j++) {

        // get all data from display blocks target
        var target = all_displayBlockTarget[j];
        // var display = helper.getClosest(all_displayBlockTarget[j], ".js-display");
        var displayType = all_displayBlockTarget[j].dataset.displayType;
        var all_displayPath;
        var all_displayDependency = false;
        var all_displayPrefix = false;
        var all_displaySuffix = false;
        var all_displayValueType = false;
        var all_displayScale = false;
        var all_displayPosition = false;
        var all_displayColor = false;
        var all_displaySpellLevel = false;

        if (all_displayBlockTarget[j].dataset.displayPath) {
          all_displayPath = all_displayBlockTarget[j].dataset.displayPath.split(",");
        };
        if (all_displayBlockTarget[j].dataset.displayDependency) {
          all_displayDependency = all_displayBlockTarget[j].dataset.displayDependency.split(",");
        };
        if (all_displayBlockTarget[j].dataset.displayPrefix) {
          all_displayPrefix = all_displayBlockTarget[j].dataset.displayPrefix.split(",");
        };
        if (all_displayBlockTarget[j].dataset.displaySuffix) {
          all_displaySuffix = all_displayBlockTarget[j].dataset.displaySuffix.split(",");
        };
        if (all_displayBlockTarget[j].dataset.displayValueType) {
          all_displayValueType = all_displayBlockTarget[j].dataset.displayValueType.split(",");
        };
        if (all_displayBlockTarget[j].dataset.displayScale) {
          all_displayScale = all_displayBlockTarget[j].dataset.displayScale.split(",");
        };
        if (all_displayBlockTarget[j].dataset.displayPosition) {
          all_displayPosition = all_displayBlockTarget[j].dataset.displayPosition.split(",");
        };
        if (all_displayBlockTarget[j].dataset.displayColor) {
          all_displayColor = all_displayBlockTarget[j].dataset.displayColor.split(",");
        };
        if (all_displayBlockTarget[j].dataset.displaySpellLevel) {
          all_displaySpellLevel = all_displayBlockTarget[j].dataset.displaySpellLevel.split(",");
        };

        // get an array of nodes using the array of paths
        if (displayType == "stat") {
          all_node = _get_all_stat(all_displayPath);
        } else if (displayType == "modifier") {
          all_node = _get_all_modifier(all_displayPath, all_displayValueType);
        } else if (displayType == "image") {
          all_node = _get_all_image(all_displayPath, all_displayScale, all_displayPosition, all_displayColor);
        } else if (displayType == "text-snippet") {
          all_node = _get_all_textSnippet(all_displayPath, all_displayPrefix, all_displaySuffix, all_displayDependency, all_displayValueType);
        } else if (displayType == "text-block") {
          all_node = _get_all_textBlock(all_displayPath);
        } else if (displayType == "list") {
          all_node = _get_all_list(all_displayPath, all_displayPrefix, all_displaySuffix, all_displayValueType);
        } else if (displayType == "clone") {
          all_node = _get_all_clone(all_displayPath);
        } else if (displayType == "skill") {
          all_node = _get_all_skill(all_displayPath, all_displayPrefix);
        } else if (displayType == "spell") {
          all_node = _get_all_spell(all_displayPath, all_displaySpellLevel);
        } else if (displayType == "pill") {
          all_node = _get_all_pill(all_displayPath);
        };

        // loop over each node in array and append to target
        all_node.forEach(function(arrayItem) {
          if (arrayItem != false) {
            // append to target
            target.appendChild(arrayItem);
          } else {
            // or increment the "no data found at path" count
            dataNotFoundAtPath++;
          };
        });

        totalNodeLength = totalNodeLength + all_node.length;
      };
      // if the "no data found at path" count == total "path count" this display blocks target is empty so add a data vale to reflect this
      if (totalNodeLength > dataNotFoundAtPath) {
        all_displayBlock[i].dataset.displayContent = true;
      } else {
        all_displayBlock[i].dataset.displayContent = false;
      };

    };

    _render_all_placeholderDisplay();
  };

  function ____render(section) {
    _render_displayBlock(section);
    _render_all_placeholderDisplay(section);
  };

  // exposed methods
  return {
    toggle: toggle,
    bind: bind,
    update: update,
    render: render,
    clear: clear,
    state: state
  };

})();
