var formValidator = (function(){
	
	var DOMElements = null,
		count = 0;

    function showElem (link) {
		link.classList.remove('invisible'); 
        link.style.display = 'block';
    }
    
    function hideElem (link) {
        link.style.display = 'none';
    }
	
	// Для UserName. Буквы, цифры, от 3 до 16 символов
	function validateName (name) {
		var pattern = /^[a-zа-яё0-9]{3,16}$/i;
		return pattern.test(name);
	}

	// Для Email. Символы@Символы.Символы
	function validateEmail (email) {
		var pattern = /.+@.+\..+/i;       
		return pattern.test(email);
	
	}

	// Для пароля. Буквы, цифры, от 6 до 18 символов
    function validatePassword (password) {
  		var pattern = /^[a-zа-яё0-9]{6,18}$/i;  
		return pattern.test(password);
	}

	function addNewTableLine() {
		var row = `<tr>
					<td>${count}</td>
					<td>${DOMElements.name.value}</td>
					<td>${DOMElements.email.value}</td>
					<td>${maskPassword()}</td>
				  </tr>`;	
		DOMElements.tableContent.innerHTML += row;
	}
	
	function maskPassword () {
		var maskedPassword = DOMElements.password.value.replace(/./g,'*');
		return maskedPassword;
	}

    function reset () {
		showElem(DOMElements.form);
		showElem(DOMElements.formHeading);
		hideElem(DOMElements.tableHeading);
		hideElem(DOMElements.table);
		hideElem(DOMElements.resetBtn);
		hideElem(DOMElements.success);
		DOMElements.name.value = '';
		DOMElements.email.value = '';
		DOMElements.password.value = '';
    }
        	
	function validate () {
		if (validateName(DOMElements.name.value) && validateEmail(DOMElements.email.value) && validatePassword(DOMElements.password.value) ) {			
            count++;
			addNewTableLine();
            hideElem(DOMElements.error);
			hideElem(DOMElements.form);
			hideElem(DOMElements.formHeading);
			showElem(DOMElements.success);
			showElem(DOMElements.tableHeading);
			showElem(DOMElements.table);
			showElem(DOMElements.resetBtn);	
		} else {
			showElem(DOMElements.error);
            hideElem(DOMElements.success);
		}
	}

	function initListeners() {
		DOMElements.submitBtn.addEventListener('click', validate);
		DOMElements.resetBtn.addEventListener('click', reset);
	}
	
	return {
		setFormData : function(data){	
			DOMElements = data;
		},
		initValidator: function(){
			initListeners();
		}
	}
	
}())

formValidator.setFormData({
	name: document.querySelector('#inputName'),
	email: document.querySelector('#inputEmail'),
	password: document.querySelector('#inputPassword'),
	tableContent: document.querySelector('#table-content'),
	submitBtn: document.querySelector('#submit'),
	resetBtn: document.querySelector('#reset'),
    success: document.querySelector('#success-message'),
    error: document.querySelector('#error-message'),
    form: document.querySelector('#form'),
    table: document.querySelector('#table'),
	tableHeading: document.querySelector('#table-heading'),
	formHeading: document.querySelector('#form-heading')
})
formValidator.initValidator();




