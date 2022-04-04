/**
 * This is the basic validation script for the contact form.
 * It checks if the input is valid and shows an error message if not.
 * Script need improvement before it can be used in production (with real data)
 */
document.addEventListener("DOMContentLoaded", function(){
	const form = document.getElementById("js-commentForm"),
		formFields = {
			'name': {
				'input': 'js-name',
				'regexp': /^[a-zA-Z]+$/,
				'errorMessage': 'Name must contain only letters'
			},
			'email': {
				'input': 'js-email',
				'regexp': /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
				'errorMessage': 'Email must be valid'
			},
			'comment': {
				'input': 'js-comment',
				'regexp': /^[a-zA-Z0-9\s]+$/,
				'errorMessage': 'Comment must contain only letters and numbers'
			},
			'submit': 'js-submit'
		};

	form.addEventListener("submit", function(e) {
		// Prevent site reload
		e.preventDefault();
		// Validate defined fields
		for (const fieldName in formFields) {
			validate(formFields[fieldName].input, formFields[fieldName].regexp, formFields[fieldName].errorMessage);
		}
	});

	/**
	 * Validate function
	 * @param  {string} fieldID
	 * @param  {string} regexp
	 * @param  {string} errorMessage
	*/
	function validate(fieldID, regexp, errorMessage) {
		const input = document.getElementById(fieldID),
			isValid = input.value.match(regexp);

		if (isValid && document.getElementById(`js-error-'${input.name}`) !== null) {
			removeError(input);
		} else if (!isValid && document.getElementById('js-error-'+input.name) === null) {
			throwError(input, errorMessage);
		} 
	};

	/**
	 * Show error in the form
	 * @param  {object} field
	 * @param  {string} message
	*/
	function throwError(field, message) {
		let errorElement = `<span class="form_error" id="js-error-${field.name}">${message}</span>`;
		field.parentNode.classList.add("-error");
		field.insertAdjacentHTML("afterend", errorElement);
		return;
	}

	/**
	 * Remove error from the form
	 * @param  {object} field
	*/
	function removeError(field) {
		field.parentNode.classList.remove("-error");
		let error = document.getElementById('js-error-'+field.name).remove();
	}
});
