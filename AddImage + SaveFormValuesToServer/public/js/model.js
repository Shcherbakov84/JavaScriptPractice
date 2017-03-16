(function(){
    var quantityOfClicks = 0;
    var arrayFromServer;
    var DOMElements = {
            newPicture: document.querySelector('#add'),
            result: document.querySelector('#result'),
            count: document.querySelector('#count'),
            url: document.querySelector('#input-url'),
            name: document.querySelector('#input-name'),
            description: document.querySelector('#input-description'),
            date: document.querySelector('#input-date'), 
            resetBtn: document.querySelector('#reset'),
            success: document.querySelector('#success-message'),
            error: document.querySelector('#error-message'),
            form: document.querySelector('#form'),
            formHeading: document.querySelector('#form-heading'),
            openForm: document.querySelector('#open-form'),
            saveBtn: document.querySelector('#save-btn')
    };
    var objForServer = {};
    
    // --------------------------------------Requests to server--------------------------------------------------------
    var itemsModel = function() {
        function testApi() {
            $.get("/testApi", function( data ) {
                console.log("API is working...");
                console.log(data);
            })
        }
        
        function getDataPromice() {
            return $.get("data/list.json", function( data ) {
                return data;
            })            
        }
        
        function getData() {
            $.get("data/list.json", function( data ) {
                console.log("Default load");
                console.log(data);
                arrayFromServer = data;
            })            
        }
        
        function saveData() {
            $.post('/api/save', objForServer )
            console.log("Data successfuly saved: " + objForServer);

        }
        
        return {
            testApi: testApi,
            getData : getData,
            saveData: saveData,
            getDataPromice: getDataPromice
        }
    }
    
    var model = itemsModel();
    model.testApi();
    model.getData();

    console.log(arrayFromServer);  
                                    
    
    model.getDataPromice().then(function(data){
        console.log("Promise load");
        console.log(data);
    });

    // --------------------------------------Gallery--------------------------------------------------------
      
    function makeNewArray () {
        return arrayFromServer.map(function(item) {
            return {
                name : capitalizeWord(item.name),
                url : correctLink(item.url),
                description : cutString(item.description),
                date : getDate(item.date),
                params : getParamsValues(item.params) 
            }     
        });   
    }

    function capitalizeWord (word) {
        return word[0].toUpperCase() + word.substring(1).toLowerCase();
    }

    function correctLink (url) {
        return (url.indexOf("http") == 0) ? url : 'http://' + url;
    }

    function cutString (string) {
        return (string.length > 15) ? string.substr(0, 15) + ' ...' : string;
    }

    function getDate (date) {
        var tmpDate = new Date(date);
        return tmpDate.getFullYear() + '/' +
                (tmpDate.getMonth() + 1) + '/' +
                tmpDate.getDate() + ' ' +
                tmpDate.getHours() + ':' +
                tmpDate.getMinutes();        
    }

    function getParamsValues (obj) {
        return obj.status + '=>' + obj.progress;    
    }

    function addPicture (item) {
        var itemTemplate = `<div class="col-sm-3 col-xs-6">\
                        <img src="${item.url}" alt="${item.name}" class="img-thumbnail">\
                        <div class="info-wrapper">\
                            <div class="text-muted">${item.name}</div>\
                            <div class="text-muted">${item.description}</div>\
                            <div class="text-muted">${item.params}</div>\
                            <div class="text-muted">${item.date}</div>\
                        </div>\
                        </div>`;
        DOMElements.result.innerHTML += itemTemplate;
    }   

    function printQuantity() {
        DOMElements.count.innerHTML = quantityOfClicks;   
    }

    function isNewImageAvailable(length) {
        return quantityOfClicks <= length;   
    }

    function showWarningMsg(text) {
        alert(text);
    }

    // --------------------------------------Run gallery--------------------------------------------------------

    function initGallery (event) {
        var newArray = makeNewArray();
        var length = newArray.length;
        quantityOfClicks += 1;  
        
        if ( isNewImageAvailable(length) ) {
            var item = newArray[quantityOfClicks - 1];
            addPicture(item);
            printQuantity();
        } else {
            showWarningMsg('Картинки закончились');
        }
    }

    // --------------------------------------Run form--------------------------------------------------------
    var formValidator = (function() {

        function showHideElem (link) {
            link.classList.toggle('invis');
        }

        function showElem (link) {
		    link.classList.remove('invis'); 
            link.style.display = 'block';
        }

        function hideElem (link) {
            link.style.display = 'none';
        }
        
        function reset () {
            DOMElements.url.value = '';
            DOMElements.name.value = '';
            DOMElements.description.value = '';
            DOMElements.date.value = '';
        }
        
        function setObjForServer () {
            objForServer.url = DOMElements.url.value;
            objForServer.name = DOMElements.name.value;
            objForServer.description = DOMElements.description.value;
            objForServer.date = DOMElements.date.value;
        }

        function validateForm () {
            if (DOMElements.url.value && DOMElements.name.value && DOMElements.description.value && DOMElements.date.value) {
                showElem(DOMElements.success);
                hideElem(DOMElements.error);
                setObjForServer();
                model.saveData();			
                    
            } else {
                showElem(DOMElements.error);
                hideElem(DOMElements.success);
            }
        }

        function initForm () {
            showHideElem(DOMElements.form);
        }
        // --------------------------------------Listeners()--------------------------------------------------------

        DOMElements.newPicture.addEventListener('click', initGallery);
        DOMElements.openForm.addEventListener('click', initForm);
        DOMElements.resetBtn.addEventListener('click', reset);
        DOMElements.saveBtn.addEventListener('click', validateForm);
	
    }());  
}())




