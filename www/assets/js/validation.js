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
				'regexp': /^(?! *$)[a-zA-Z.+ '-]+$/,
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
			}
		};

	form.addEventListener("submit", function(e) {
		// Prevent site reload
		e.preventDefault();
		// Validate defined fields
		for (const fieldName in formFields) {
			validate(formFields[fieldName].input, formFields[fieldName].regexp, formFields[fieldName].errorMessage);
		}
		// If error messages not exist
		if (document.querySelectorAll('[id^="js-error-"]').length === 0) {
			addComment(new FormData(form));
		}
	});

	/**
	 * Validate function
	 * @param  {string} fieldID
	 * @param  {string} regexp
	 * @param  {string} errorMessage
	*/
	function validate(fieldID, regexp, errorMessage) {
		let input = document.getElementById(fieldID),
			hasErrorElement = document.getElementById(`js-error-${input.name}`) || false,
			isValid = regexp.test(input.value);

		if (isValid && hasErrorElement) {
			removeError(input);
		} else if (!isValid && !hasErrorElement) {
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

	/**
	 * Add comment
	 * @param {object} formData
	 */
	function addComment(formData) {
		let commentWrapper = document.getElementById('js-commentsList'),
			commentDom = `
				<div class="comment">
					<div class="comment_image">
						<div class="avatar">${formData.get('userName').charAt(0).toUpperCase()}</div>
					</div>
					<div class="comment_content">
						<div class="comment_info">
							<span class="comment_info-authorName">${formData.get('userName')}</span>
							<span class="comment_info-date">on ${new Date().toLocaleDateString()}</span>
						</div>
						<p class="comment_text">
							${formData.get('userMessage')}
						</p>
					</div>
					<div class="comment_footer">
						<a href="#" class="comment_footer-link">Reply</a> | <a href="#" class="comment_footer-link">Like (0)</a> | <a href="#" class="comment_footer-link">Report</a>
					</div>
				</div>
			`;
		// Append comment into comments list
		commentWrapper.insertAdjacentHTML("afterbegin", commentDom);
		// Reset form
		form.reset();
	}
});
