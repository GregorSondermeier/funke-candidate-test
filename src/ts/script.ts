import * as $ from "jquery";
import {Contact} from './_models/Contact';

$(() => {
	loadContacts();
	registerFilterHandlers();
});

let contacts: Array<Contact>;

let searchcriteria: gs.contact.IContactSearchcriteria = {
	gender: null,
	availableDistricts: [],
	district: null
};

function loadContacts(): void {
	$.ajax({
		method: 'GET',
		url: './json/contacts.json'
	}).then((data: Array<gs.contact.IContact>) => {
		contacts = data.map((contact: gs.contact.IContact) => new Contact(contact));
		sanitizeDiscrictOptions(contacts);

		let filteredContacts = filterContacts(contacts, searchcriteria);

		addToTable('MATCHING', filteredContacts.matching);
		addToTable('REMAINING', filteredContacts.remaining);
	});
}

function filterContacts(contacts: Array<Contact>, searchcriteria: gs.contact.IContactSearchcriteria): {matching: Array<Contact>, remaining: Array<Contact>} {

	let matchingContacts: Array<Contact> = [],
		remainingContacts: Array<Contact> = [];

	contacts.forEach((contact: Contact) => {
		if (!searchcriteria.gender || searchcriteria.gender == contact.gender) {
			matchingContacts.push(contact);
		} else {
			remainingContacts.push(contact);
		}
	});

	return {
		matching: matchingContacts,
		remaining: remainingContacts
	};
}

function addToTable(type: 'MATCHING' | 'REMAINING', contacts: Array<Contact>) {
	let tbodyElem: JQuery;

	if (type === 'MATCHING') {
		tbodyElem = $('.gs-matching-results > table > tbody');
	} else if (type === 'REMAINING') {
		tbodyElem = $('.gs-remaining-results > table > tbody');
	}

	tbodyElem.empty();

	contacts.forEach((contact: Contact) => {
		tbodyElem.append(
			`<tr>
				<td>${[contact.firstName, contact.lastName].join(' ')}</td>
				<td><a href="tel:${contact.phone}">${contact.phone}</a></td>
				<td>${contact.city}</td>
				<td>${contact.district}</td>
			</tr>`
		);
	});
}

function registerFilterHandlers() {
	$('.gs-filter-gender > select').change((event) => {
		searchcriteria.gender = <gs.contact.Gender>$(event.target).val() || null;

		let filteredContacts = filterContacts(contacts, searchcriteria);

		addToTable('MATCHING', filteredContacts.matching);
		addToTable('REMAINING', filteredContacts.remaining);
	});
}

function sanitizeDiscrictOptions(contacts: Array<Contact>) {
	let districts: Array<string> = contacts
		.reduce((districts: Array<string>, contact: Contact) => {
			districts.push(contact.district);
			return districts;
		}, [])
		.filter((district: string, index: number, availableDisctricts: Array<string>) => {
			return availableDisctricts.indexOf(district) === index
		})
		.sort((d1: string, d2: string) => {
			if (d1.toLowerCase() < d2.toLowerCase()) {
				return -1;
			} else  if (d1.toLowerCase() > d2.toLowerCase()) {
				return 1;
			} else {
				return 0;
			}
		});

	let selectElem: JQuery = $('.gs-filter-discrict > select');

	districts.forEach((district: string) => {
		let option: HTMLOptionElement = document.createElement('option');
		option.text = district;
		option.value = district;
		selectElem.append(option);
	});

}