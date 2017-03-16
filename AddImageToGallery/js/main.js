function InitGallery () {
    this.DOMElements = null;
    this.quantityOfClicks = 0;
    var that = this;
  
    this.makeNewArray = function  () {
        return data.map(function(item) {
            return {
                name: that.capitalizeWord(item.name),
                url: that.correctLink(item.url),
                description: that.cutString(item.description),
                date: that.getDate(item.date),
                params: that.getParamsValues(item.params) 
            }     
        });   
    };

    this.capitalizeWord = function (word) {
        return word[0].toUpperCase() + word.substring(1).toLowerCase();
    };

    this.correctLink = function (url) {
        return (url.indexOf("http") == 0) ? url : 'http://' + url;
    };

    this.cutString = function (string) {
        return (string.length > 15) ? string.substr(0, 15) + ' ...' : string;
    };

    this.getDate = function (date) {
        var tmpDate = new Date(date);
        return tmpDate.getFullYear() + '/' +
                (tmpDate.getMonth() + 1) + '/' +
                tmpDate.getDate() + ' ' +
                tmpDate.getHours() + ':' +
                tmpDate.getMinutes();        
    };

    this.getParamsValues = function (obj) {
        return obj.status + '=>' + obj.progress;    
    };

    this.addPicture = function (item) {
        var itemTemplate = `<div class="col-sm-3 col-xs-6">\
                        <img src="${item.url}" alt="${item.name}" class="img-thumbnail">\
                        <div class="info-wrapper">\
                            <div class="text-muted">${item.name}</div>\
                            <div class="text-muted">${item.description}</div>\
                            <div class="text-muted">${item.params}</div>\
                            <div class="text-muted">${item.date}</div>\
                        </div>\
                        </div>`;
        this.DOMElements.result.innerHTML += itemTemplate;
    };

    this.printQuantity = function () {
        this.DOMElements.count.innerHTML = this.quantityOfClicks;   
    };

    this.isNewImageAvailable = function (length) {
        return this.quantityOfClicks <= length;   
    };

    this.showWarningMsg = function (text) {
        alert(text);
    };

    this.setDomElems = function (data) {	
		this.DOMElements = data;
	};

    this.initListener = function () {
        this.DOMElements.newPicture.addEventListener('click', this.getFormData.bind(this));
    };

    this.getFormData = function (event) {
        var newArray = this.makeNewArray();
        var length = newArray.length;
        this.quantityOfClicks += 1;  
        
        if ( this.isNewImageAvailable(length) ) {
            var item = newArray[this.quantityOfClicks - 1];
            this.addPicture(item);
            this.printQuantity();
        } else {
            this.showWarningMsg('Картинки закончились');
        }
    };
}

var initGallery = new InitGallery();

initGallery.setDomElems({
    newPicture: document.getElementById('add'),
    result: document.getElementById('result'),
    count: document.getElementById('count')
});
initGallery.initListener();































