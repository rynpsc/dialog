var e={label:"Dialog",description:"",alert:!1,openClass:"is-open"},t=["[contenteditable]",'[tabindex]:not([tabindex^="-"])',"a[href]","area[href]","button:not([disabled])","embed","iframe","input:not([disabled])","object","select:not([disabled])","textarea:not([disabled])"];function n(e){return[].concat(e.querySelectorAll(t)).filter(function(e){return n=!((t=e).offsetWidth||t.offsetHeight||t.getClientRects().length),i="hidden"===window.getComputedStyle(t).visibility,!(n||i);var t,n,i})}function i(e){e&&e.focus&&e.focus()}function a(e){var t=n(e);t.length&&i(t[0])}function o(t,o,d){var r={main:document.getElementById(o),dialog:document.getElementById(t)};if(!r.dialog)throw new Error('No element with the id "'+t+'"');if(!r.main)throw new Error('No element with the id "'+o+'"');var l=Object.assign({},e,d),c=function(e,t){var o=!1,d=void 0;function r(t){var n=!e.contains(document.activeElement);t.preventDefault(),t.stopImmediatePropagation(),n&&o&&a(e)}function l(t){"Tab"===t.key&&function(e,t){var a=document.activeElement,o=n(e),d=o[0],r=o[o.length-1];t.shiftKey&&a===d&&(i(r),t.preventDefault()),t.shiftKey||a!==r||(i(d),t.preventDefault())}(e,t)}return{activate:function(){o||(o=!0,d=document.activeElement,t&&e.contains(t)?i(t):a(e),document.addEventListener("focus",r,!0),document.addEventListener("keydown",l,!0))},deactivate:function(){o&&(o=!1,i(d),d=void 0,document.removeEventListener("focus",r,!0),document.removeEventListener("keydown",l,!0))}}}(r.dialog,l.focus),s=!1,u=!1;function f(e){"Escape"===e.key&&b()}function m(){!s&&u&&v("open")&&(s=!0,r.main.setAttribute("aria-hidden",!0),r.dialog.setAttribute("aria-hidden",!1),r.dialog.classList.add(l.openClass),document.addEventListener("keydown",f,!0),c.activate())}function b(){s&&u&&v("close")&&(c.deactivate(),s=!1,r.main.setAttribute("aria-hidden",!1),r.dialog.setAttribute("aria-hidden",!0),document.removeEventListener("keydown",f,!0),r.dialog.classList.remove(l.openClass))}function v(e){var t=new CustomEvent(e,{bubbles:!0,cancelable:!0});return r.dialog.dispatchEvent(t)}return{elements:r,create:function(){var e=l.alert?"alertdialog":"dialog",t=document.getElementById(l.label)?"labeledby":"label";if(r.main.setAttribute("aria-hidden",!1),r.dialog.setAttribute("role",e),r.dialog.setAttribute("aria-modal",!0),r.dialog.setAttribute("aria-"+t,l.label),r.dialog.setAttribute("aria-hidden",!0),document.getElementById(l.description))r.dialog.setAttribute("aria-describedby",l.description);else if(l.description)throw new Error('Invalid element: No element with the id "'+l.description+'"');r.main.contains(r.dialog)&&document.body.appendChild(r.dialog),u=!0,v("create")},destroy:function(){b(),u=!1,["aria-describedby","aria-label","aria-labeledby","aria-modal","role"].forEach(function(e){return r.dialog.removeAttribute(e)}),v("destroy")},open:m,close:b,toggle:function(e){void 0===e&&(e=!s),e?m():b()},isOpen:s,on:function(e,t){r.dialog.addEventListener(e,t)},off:function(e,t){r.dialog.removeEventListener(e,t)}}}export{o as dialog};
//# sourceMappingURL=dialog.mjs.map