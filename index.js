(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function t(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),Object.defineProperty(t,"prototype",{writable:!1}),t}function n(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var r=t((function e(t,r){var o=this,i=t.data,a=t.currentUserId,u=t.handleCardClick,c=t.handleLikeClick,l=t.handleDeleteClick;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),n(this,"createCard",(function(){o._card=o._getTemplate(),o._cardImage=o._card.querySelector(".place__image"),o._cardImage.src=o._data.link,o._cardImage.alt=o._data.name,o._card.querySelector(".description__title").textContent=o._data.name;var e=o._card.querySelector(".description__like"),t=o._card.querySelector(".description__like-count");return o._data.likes&&o._data.likes.length>0?t.textContent=o._data.likes.length:t.textContent=0,o._data.likes&&o.checkIfLiked()?e.classList.add("description__like_active"):e.classList.remove("description__like_active"),o._card.id=o._data._id,o._setEventListeners(),o._data.owner&&o._data.owner._id!==o._user_id&&o._card.querySelector(".description__delete").classList.add("description__delete_hidden"),o._card})),n(this,"checkIfLiked",(function(){var e=o._data.likes;if(e.length>0)return e.some((function(e){return e._id===o._user_id}))})),n(this,"likeCard",(function(e){var t=o._card.querySelector(".description__like"),n=o._card.querySelector(".description__like-count");t.classList.toggle("description__like_active"),n.textContent=e.likes.length})),n(this,"removeCard",(function(){o._card.remove(),o._card=null})),n(this,"_getTemplate",(function(){return document.querySelector(o._cardSelector).content.querySelector(".place").cloneNode(!0)})),n(this,"__handleLikeClick",(function(){var e=o._card.querySelector(".description__like"),t=o._card.id;e.addEventListener("click",(function(){o._handleLikeClick(t)}))})),n(this,"__handleDeleteClick",(function(){o._card.querySelector(".description__delete").addEventListener("click",(function(){o._popupDelete.dataset.id=o._card.id,o._handleDeleteClick()}))})),n(this,"__handleSetImage",(function(){o._cardImage.addEventListener("click",(function(){o._handleCardClick(o._data.name,o._data.link)}))})),n(this,"_setEventListeners",(function(){o.__handleLikeClick(),o.__handleDeleteClick(),o.__handleSetImage()})),this._data=i,this._handleCardClick=u,this._handleLikeClick=c,this._handleDeleteClick=l,this._cardSelector=r,this._popupDelete=document.querySelector(".popup_place-delete"),this._user_id=a}));function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function i(e,t,n){return t&&o(e.prototype,t),n&&o(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var u=i((function e(t,n){var r=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),a(this,"_showInputError",(function(e,t){var n=r._formElement.querySelector(".".concat(e.id,"-error"));e.classList.add(r._config.inputErrorClass),n.classList.add(r._config.errorClass),n.textContent=t})),a(this,"_hideInputError",(function(e){var t=r._formElement.querySelector(".".concat(e.id,"-error"));e.classList.remove(r._config.inputErrorClass),t.classList.remove(r._config.errorClass),t.textContent=""})),a(this,"_checkInputValidity",(function(e){e.validity.valid?r._hideInputError(e):r._showInputError(e,e.validationMessage)})),a(this,"_hasInvalidInput",(function(){return r._inputList.some((function(e){return!e.validity.valid}))})),a(this,"_setEventListeners",(function(){r._inputList.forEach((function(e){e.addEventListener("input",(function(){r._checkInputValidity(e),r.toggleButtonState()}))})),r.toggleButtonState()})),a(this,"toggleButtonState",(function(){r._hasInvalidInput(r._inputList)?(r._submitButton.classList.add(r._config.inactiveButtonClass),r._submitButton.disabled=!0):(r._submitButton.classList.remove(r._config.inactiveButtonClass),r._submitButton.disabled=!1)})),a(this,"enableValidation",(function(){r._formElement.addEventListener("submit",(function(e){e.preventDefault()})),r._setEventListeners()})),this._config=t,this._formElement=n,this._inputList=Array.from(this._formElement.querySelectorAll(this._config.inputSelector)),this._submitButton=this._formElement.querySelector(this._config.submitButtonSelector)}));function c(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var s=function(){function e(t){var n=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),l(this,"_handleClickClose",(function(){n._popup.addEventListener("mousedown",(function(e){(e.target.classList.contains("popup_opened")||e.target.classList.contains("popup__close-button"))&&n.close()}))})),l(this,"_handleEscClose",(function(e){"Escape"===e.key&&n.close()})),this._popup=document.querySelector(t)}var t,n;return t=e,(n=[{key:"open",value:function(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"setEventListeners",value:function(){this._handleClickClose()}}])&&c(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function f(e){return f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},f(e)}function p(e,t){return p=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},p(e,t)}function d(e,t){if(t&&("object"===f(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return h(e)}function h(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _(){return _="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=y(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},_.apply(this,arguments)}function y(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=b(e)););return e}function b(e){return b=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},b(e)}var m=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&p(e,t)}(i,e);var t,n,r,o=(n=i,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=b(n);if(r){var o=b(this).constructor;e=Reflect.construct(t,arguments,o)}else e=t.apply(this,arguments);return d(this,e)});function i(e){var t,n,r,a,u;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i),u=function(e){var r=e.name,o=e.link;n._pictureBig.src=o,n._pictureBig.alt=r,n._pictureTitle.textContent=r,_((t=h(n),b(i.prototype)),"open",t).call(t)},(a="open")in(r=h(n=o.call(this,e)))?Object.defineProperty(r,a,{value:u,enumerable:!0,configurable:!0,writable:!0}):r.open=u,n._pictureBig=document.querySelector(".popup__big-picture"),n._pictureTitle=document.querySelector(".popup__picture-title"),n}return t=i,Object.defineProperty(t,"prototype",{writable:!1}),t}(s);function v(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function g(e,t,n){return t&&v(e.prototype,t),n&&v(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function w(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var k=g((function e(t,n){var r=this,o=t.items,i=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),w(this,"_clear",(function(){r._container.innerHTML=""})),w(this,"addItem",(function(e){r._container.prepend(e)})),w(this,"renderItems",(function(){r._clear(),r._renderedItems.reverse().forEach((function(e){r.addItem(r._renderer(e))}))})),this._renderedItems=o,this._renderer=i,this._container=document.querySelector(n)}));function S(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function E(e,t,n){return t&&S(e.prototype,t),n&&S(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function O(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var C=E((function e(t,n,r){var o=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),O(this,"getUserInfo",(function(){return{profileFormName:o._nameElement.textContent,profileFormProfession:o._aboutElement.textContent}})),O(this,"setUserInfo",(function(e){o._nameElement.textContent=e.name,o._aboutElement.textContent=e.about,o._avatarElement.alt=e.name})),O(this,"setUserAvatar",(function(e){o._avatarElement.src=e.avatar,o._avatarElement.id=e._id})),this._nameElement=document.querySelector(t),this._aboutElement=document.querySelector(n),this._avatarElement=document.querySelector(r)}));function j(e){return j="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},j(e)}function P(e,t){return P=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},P(e,t)}function L(e,t){if(t&&("object"===j(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return I(e)}function I(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function R(){return R="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=q(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},R.apply(this,arguments)}function q(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=D(e)););return e}function D(e){return D=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},D(e)}function T(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var U=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&P(e,t)}(i,e);var t,n,r,o=(n=i,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=D(n);if(r){var o=D(this).constructor;e=Reflect.construct(t,arguments,o)}else e=t.apply(this,arguments);return L(this,e)});function i(e){var t,n,r,a=e.popupSelector,u=e.handleFormSubmit;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i),T(I(r=o.call(this,a)),"_getInputValues",(function(){return r._formValues={},r._inputs.forEach((function(e){return r._formValues[e.name]=e.value})),r._formValues})),T(I(r),"close",(function(){R((t=I(r),D(i.prototype)),"close",t).call(t),r._form.reset()})),T(I(r),"setEventListeners",(function(){R((n=I(r),D(i.prototype)),"setEventListeners",n).call(n),r._form.addEventListener("submit",(function(e){e.preventDefault(),r._handleFormSubmit(r._getInputValues()),r._form.reset()}))})),r._handleFormSubmit=u,r._form=r._popup.querySelector(".popup__form"),r._inputs=r._form.querySelectorAll(".popup__form-input"),r}return t=i,Object.defineProperty(t,"prototype",{writable:!1}),t}(s);function B(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var x=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.headers={authorization:"0ed12c18-e80a-434a-9e00-41eb70564c88","Content-Type":"application/json"},this._baseUrl=t}var t,n;return t=e,(n=[{key:"getAppInfo",value:function(){return Promise.all([this.getUserData(),this.getInitialCards()])}},{key:"getInitialCards",value:function(){var e=this;return this.url=this._baseUrl+"cards",fetch(this.url,{headers:this.headers}).then((function(t){return e._getResponseData(t)}))}},{key:"getUserData",value:function(){var e=this;return this.url=this._baseUrl+"users/me",fetch(this.url,{headers:this.headers}).then((function(t){return e._getResponseData(t)}))}},{key:"setUserData",value:function(e){var t=this;return this.url=this._baseUrl+"users/me",fetch(this.url,{method:"PATCH",headers:this.headers,body:JSON.stringify({name:e.name,about:e.about})}).then((function(e){return t._getResponseData(e)}))}},{key:"addCard",value:function(e){var t=this;return this.url=this._baseUrl+"cards",fetch(this.url,{method:"POST",headers:this.headers,body:JSON.stringify({name:e.name,link:e.link})}).then((function(e){return t._getResponseData(e)}))}},{key:"deleteCard",value:function(e){var t=this;return this.url=this._baseUrl+"cards/"+e,fetch(this.url,{method:"DELETE",headers:this.headers}).then((function(e){return t._getResponseData(e)}))}},{key:"setlike",value:function(e){var t=this;return this.url=this._baseUrl+"cards/"+e+"/likes",fetch(this.url,{method:"PUT",headers:this.headers}).then((function(e){return t._getResponseData(e)}))}},{key:"unsetlike",value:function(e){var t=this;return this.url=this._baseUrl+"cards/"+e+"/likes",fetch(this.url,{method:"DELETE",headers:this.headers}).then((function(e){return t._getResponseData(e)}))}},{key:"setAvatar",value:function(e){var t=this;return this.url=this._baseUrl+"users/me/avatar",fetch(this.url,{method:"PATCH",headers:this.headers,body:JSON.stringify({avatar:e.link})}).then((function(e){return t._getResponseData(e)}))}},{key:"_getResponseData",value:function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}}])&&B(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function A(e){return A="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},A(e)}function F(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function V(e,t){return V=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},V(e,t)}function N(e,t){if(t&&("object"===A(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return H(e)}function H(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function J(){return J="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=M(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},J.apply(this,arguments)}function M(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=z(e)););return e}function z(e){return z=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},z(e)}function $(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var G=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&V(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=z(r);if(o){var n=z(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return N(this,e)});function a(e){var t,n,r=e.popupSelector,o=e.handleFormSubmit;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),$(H(n=i.call(this,r)),"getCardId",(function(){return n._popup.dataset.id})),$(H(n),"setEventListeners",(function(){J((t=H(n),z(a.prototype)),"setEventListeners",t).call(t),n._form.addEventListener("submit",(function(e){console.log(H(n)),e.preventDefault(),n._handleFormSubmit(n.card)}))})),n._handleFormSubmit=o,n._form=n._popup.querySelector(".popup__form"),n}return t=a,(n=[{key:"setSubmitHandler",value:function(e){this.card=e}}])&&F(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(s);function K(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var Q=document.querySelector(".info__redact-button"),W=document.querySelector(".profile__add-place-button"),X=document.forms.profileForm,Y=X.querySelector(".popup__form-name"),Z=X.querySelector(".popup__form-additional"),ee=document.forms.placeForm,te=document.forms.avatarChangeForm,ne=document.querySelector(".profile__avatar-button"),re=new m(".popup_picture");re.setEventListeners();var oe={inputSelector:".popup__form-input",submitButtonSelector:".popup__form-submit-btn",inactiveButtonClass:"popup__form-submit-btn_disabled",inputErrorClass:"popup__form-input_error",errorClass:"popup__form-input-error_visible"},ie=new x("https://mesto.nomoreparties.co/v1/cohort-42/"),ae=new G({popupSelector:".popup_place-delete",handleFormSubmit:function(e){var t=ae.getCardId();ie.deleteCard(t).then((function(){e.removeCard(),ae.close()}))}});function ue(e,t){var n=new r({data:e,currentUserId:t,handleCardClick:function(){re.open(e)},handleLikeClick:function(e){n.checkIfLiked()?ie.unsetlike(e).then((function(e){console.log("Снимаем лайк",e.likes.length),n.likeCard(e)})):ie.setlike(e).then((function(e){console.log("Ставим лайк",e.likes.length),n.likeCard(e)}))},handleDeleteClick:function(){ae.setSubmitHandler(n),ae.open()}},"#place-template");return n.createCard()}function ce(e,t){document.querySelector(e).querySelector(".popup__form-submit-btn").textContent=t}ae.setEventListeners(),ie.getAppInfo().then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i=[],a=!0,u=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(e){u=!0,o=e}finally{try{a||null==n.return||n.return()}finally{if(u)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return K(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?K(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],i=r[1],a=new k({items:i,renderer:function(e){return ue(e,o._id)}},".places");a.renderItems();var u=new U({popupSelector:".popup_place",handleFormSubmit:function(e){ce(".popup_place","Сохранение..."),ie.addCard(e).then((function(){a.addItem(ue(e,o._id)),u.close(),le.toggleButtonState()})).finally((function(){ce(".popup_place","Сохранить")}))}});u.setEventListeners(),W.addEventListener("click",(function(){u.open()}));var c=new C(".info__title",".info__subtitle",".profile__avatar-img");c.setUserInfo(o),c.setUserAvatar(o);var l=new U({popupSelector:".popup_profile",handleFormSubmit:function(e){ce(".popup_profile","Сохранение..."),ie.setUserData(e).then((function(){c.setUserInfo(e),l.close()})).finally((function(){ce(".popup_profile","Сохранить")}))}});l.setEventListeners(),Q.addEventListener("click",(function(){var e=c.getUserInfo();Y.value=e.profileFormName,Z.value=e.profileFormProfession,l.open()}));var s=new U({popupSelector:".popup_avatar-change",handleFormSubmit:function(e){ce(".popup_avatar-change","Сохранение..."),ie.setAvatar(e).then((function(e){c.setUserAvatar(e),s.close()})).catch((function(e){console.log(e)})).finally((function(){ce(".popup_avatar-change","Сохранить")}))}});s.setEventListeners(),ne.addEventListener("click",(function(){s.open()}))})),new u(oe,X).enableValidation();var le=new u(oe,ee);le.enableValidation(),new u(oe,te).enableValidation()})();