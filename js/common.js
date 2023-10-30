(function(){

	const date_form = document.querySelector('#date_form');
	const birthday_start = document.querySelector('#birthday_start');
	const birthday_end = document.querySelector('#birthday_end');
	const users = document.querySelector('.users');
	const url = 'https://fakerapi.it/api/v1/persons';
	const datepicker_first = new Datepicker(birthday_start, {format: 'dd.mm.yyyy'}); 
	const datepicker_second = new Datepicker(birthday_end, {format: 'dd.mm.yyyy'}); 

	date_form.addEventListener('submit', function(e) {
		e.preventDefault();
		if (!birthday_start.value || !birthday_end.value) {
			alert('fields must be not empty');
		} else if (birthday_start.value > birthday_end.value) {
			alert('first date must be the same or earlier then second date');
		} else {
			sendParams(url + '?_birthday_start=' + birthday_start.value + '&_birthday_end=' + birthday_end.value);
		}
	});

	function sendParams(parameters) {
		fetch(parameters, {
			method: 'GET',
		})
		.then((response) => {
			return response.json();
		})
		.then((info) => {
			users.textContent = '';
			info.data.map((item) => {
				const user_card = `<div class="user__card">
					<h3 class="user__name">${item.firstname} ${item.lastname}</h3>
					<div class="user__info user__info--email">${item.email}</div>
					<div class="user__info user__info--phone">${item.phone}</div>
					<div class="user__info user__info--birthday">${item.birthday}</div>
					<div class="user__info user__info--gender user__info--${item.gender}">${item.gender}</div>
					<div class="user__info user__info--website">${item.website}</div>
				</div>`;
				users.insertAdjacentHTML('beforeend', user_card);
			});
			
		})
		.catch((error) => {
			alert(error);
		});
	}

})();