$(window).load(function() {
	loadContacts();
	registerFilters();
});

/**
 * @type {Array<Contact>}
 */
var contacts;

/**
 * @type {{gender: string, district: string}}
 */
var searchcriteria = {
	gender: null,
	availableDistricts: [],
	district: null
};

function loadContacts() {
	$.ajax({
		method: 'GET',
		url: './json/contacts.json'
	}).then(function(data) {
		contacts = data.map(function(iContact) {
			return new Contact(iContact);
		});
		sanitizeDiscrictFilter(contacts);
		filterContacts(contacts);
	});
}

function filterContacts(contacts) {

	var filteredContacts = [],
		remainingContacts = [];

	contacts.forEach(function(contact) {
		console.debug('searchcriteria.gender:', searchcriteria.gender);
		console.debug('contact.gender:', contact.gender);
		if (!searchcriteria.gender || searchcriteria.gender == contact.gender) {
			filteredContacts.push(contact);
		} else {
			remainingContacts.push(contact);
		}
	});

	addToTable('filtered', filteredContacts);
	addToTable('remaining', remainingContacts);
}

function addToTable(type, contacts) {
	var tbodyElem;

	if (type === 'filtered') {
		tbodyElem = $('.gs-filtered-results > table > tbody');
	} else if (type === 'remaining') {
		tbodyElem = $('.gs-remaining-results > table > tbody');
	}

	tbodyElem.empty();

	contacts.forEach(function(contact) {
		tbodyElem.append($(
			'<tr>' +
			'<td>' + [contact.firstName, contact.lastName].join(' ') + '</td>' +
			'<td><a href="tel:' + contact.phone + '">' + contact.phone + '</a></td>' +
			'<td>' + contact.city + '</td>' +
			'<td>' + contact.district + '</td>',
			'</tr>'
		));
	});
}

function registerFilters() {
	$('.gs-filter-gender select').change(function() {
		searchcriteria.gender = $(this).val() || null;
		filterContacts(contacts);
	});
}

function sanitizeDiscrictFilter(contacts) {
	// @stub
	// analyze contacts and build an array of available disctricts, put it into
	// searchcriteria.availableDistricts
	// and sanitize the options
}