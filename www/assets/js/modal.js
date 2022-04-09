/**
 * This is the basic modal script
 */
 document.addEventListener("DOMContentLoaded", function(){
	const modal = document.getElementById('js-modal'),
		modalCross = document.getElementById('js-modalCross'),
		modalImage = document.getElementById('js-modalImage'),
		modalTrigger = document.querySelectorAll('.js-modalTrigger');

	// Bind open modal event to all images with class js-modalTrigger
	for (let i = 0; i < modalTrigger.length; i++) {
		modalTrigger[i].addEventListener('click', function(e) {
			openModal(e, modalTrigger[i]);
		});
	}
	// Close modal
	modalCross.addEventListener('click', closeModal);

	/**
	 * Show modal
	 * @param {object} e
	 * @param {object} element
	 */
	function openModal(e, element) {
		e.preventDefault();
		modal.classList.add('-show');
		modalImage.src = element.dataset.modalSrc;
	}

	/**
	 * Close modal
	*/
	function closeModal() {
		modal.classList.remove('-show');
	}
 });