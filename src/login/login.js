document.addEventListener('DOMContentLoaded', () => {

	const $form = $login.querySelector('form');

	formHandler($form, (data) => {
		aes4js.decrypt(data.password, {
			encrypted: encryptedMimeType + localStorage.cryptoStorage,
			iv: JSON.parse(localStorage.iv),
			bin: false,
		})
				.then((decrypted) => {
					localPassword = data.password;
					storage = JSON.parse(decrypted);
					if (storage.entropy) window.location.hash = locationDefault;
					else window.location.hash = 'welcome';
					$form.reset();
					Swal.fire({
						showCloseButton: true,
						icon: 'success',
						title: 'Authorization was successful!',
						showConfirmButton: false,
						cancelButtonText: 'Ok',
						toast: true,
						position: 'top',
						timer: 2000,
						timerProgressBar: true,
					});
				})
				.catch((e) => {
					Swal.fire({
						showCloseButton: true,
						icon: 'error',
						title: e,
						showConfirmButton: false,
						cancelButtonText: 'Ok',
						toast: true,
						position: 'top',
						timer: 2000,
						timerProgressBar: true,
					});
					$login.querySelector('input').focus();
				});
	});

});

window.navigateLogin = () => {
	hide($main, $setPassword);
	show($login);
	setTimeout(() => {
		$login.querySelector('input').focus();
	}, 100);
};
