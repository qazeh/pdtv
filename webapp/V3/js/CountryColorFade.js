var CountryColorFade = function(country, map) {
	this.country = country;
	this.baseColor = "#1C1C34";
	this.fadeColor = "#ffffff";
    this.svg = map.map.svg.selectAll('.' + country);
	
	this.fadeTime = 0;
	this.fadeDuration = 0.2;

	this.hitsReceived = 0;
	this.hitsSent = 0;
};

CountryColorFade.prototype.update = function(timeStep) {
	this.fadeTime -= timeStep;
	
	if(this.fadeTime > 0) {
		this.svg.style({fill: d3.interpolateRgb(this.baseColor, this.fadeColor)(this.fadeTime / this.fadeDuration)});
	} else {
		this.svg.style({fill: this.baseColor});
	}
};

CountryColorFade.prototype.isFading = function() {
	return this.fadeTime > 0;
};

CountryColorFade.prototype.startFade = function(colors){
	this.fadeTime = this.fadeDuration;
	this.updateBaseColor(colors);
};

CountryColorFade.prototype.reset = function(){
	this.hitsReceived = 0;
	this.hitsSent = 0;
	this.updateBaseColor();
	this.svg.style({fill: this.baseColor});
};

CountryColorFade.prototype.addHits = function(from, to){
	this.hitsReceived += from;
	this.hitsSent += to;
};

CountryColorFade.prototype.updateBaseColor = function(colors){
	this.baseColor = colors(this.hitsReceived + this.hitsSent);
};