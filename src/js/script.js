$(window).load(function() {
	loadContacts();
});

var contacts;

function loadContacts() {
	$.ajax({
		method: 'GET',
		url: './json/contacts.json'
	}).then(function(data) {
		contacts = data.map(function(iContact) {
			return new Contact(iContact);
		});
		console.debug(contacts);
	});
}

