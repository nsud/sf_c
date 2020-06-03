function jQuery (selector, context = document){
	this.elements = Array.from(context.querySelectorAll(selector));
	return this
}

jQuery.prototype.each = function (fn){
	this.elements.forEach((element, index) => fn.call(element, element, index));
	return this;
}

jQuery.prototype.click = function(fn){
	this.each(element => element.addEventListener('click', fn))
	return this
}

jQuery.prototype.hide = function(){
	this.each(element => element.style.display = 'none')
  return this;
}

jQuery.prototype.show = function(){
	this.each(element => element.style.display = '')
  return this;
}

jQuery.prototype.remove = function(){
	this.each(element => element.remove())
  return this;
}

jQuery.prototype.class = function(name){
	this.each(element => element.className = name)
  return this;
}
jQuery.prototype.html = function (name = this.elements["0"].innerHTML){
	this.each(element => element.innerHTML = name);
	return this;
}
jQuery.prototype.text = function (text) {
	this.each(element => element.innerText = text);
	return this;
}

const $ = (e) => new jQuery(e);

$('button').hide().show().click(e => console.log(e)).class('name')
























