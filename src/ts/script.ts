import * as $ from "jquery";
import {Contact} from './_models/Contact';

//////////////////////////////////////////////////////
//					  variables						//
//////////////////////////////////////////////////////
let allContacts: Array<Contact>,
	matchingContacts: Array<Contact>,
	remainingContacts: Array<Contact>;

let searchcriteria: gs.contact.IContactSearchcriteria = {
	gender: null,
	district: null
};

//////////////////////////////////////////////////////
//					  bootstrap						//
//////////////////////////////////////////////////////
$(() => {
	loadContacts().then((data: Array<gs.contact.IContact>) => {
		allContacts = data.map((contact: gs.contact.IContact) => new Contact(contact));
		sanitizeDiscrictOptions(allContacts);

		filterContacts(allContacts, searchcriteria);
		updateView();
	});
	registerFilterHandlers();
});

//////////////////////////////////////////////////////
//					  api calls						//
//////////////////////////////////////////////////////
function loadContacts(): JQueryXHR {
	return $.ajax({
		method: 'GET',
		url: './json/contacts.json'
	});
}

//////////////////////////////////////////////////////
//					business logic					//
//////////////////////////////////////////////////////
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

function filterContacts(contacts: Array<Contact>, searchcriteria: gs.contact.IContactSearchcriteria): void {

	matchingContacts = [];
	remainingContacts = [];

	contacts.forEach((contact: Contact) => {
		if (
			(!searchcriteria.gender || searchcriteria.gender == contact.gender) &&
			(!searchcriteria.district || searchcriteria.district == contact.district)
		) {
			matchingContacts.push(contact);
		} else {
			remainingContacts.push(contact);
		}
	});
}

//////////////////////////////////////////////////////
//						  dom						//
//////////////////////////////////////////////////////
function registerFilterHandlers() {
	$('.gs-filter-gender > select').change((event) => {
		searchcriteria.gender = <gs.contact.Gender>$(event.target).val() || null;

		filterContacts(allContacts, searchcriteria);
		updateView();
	});
	$('.gs-filter-discrict > select').change((event) => {
		searchcriteria.district = <string>$(event.target).val() || null;

		filterContacts(allContacts, searchcriteria);
		updateView();
	});
}

function updateView() {
	addToTable('MATCHING', matchingContacts);
	addToTable('REMAINING', remainingContacts);
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

function foo(bar: string) {
	console.debug(bar);
}