export class Contact implements gs.contact.IContact {
	firstName: string;
	lastName: string;
	phone: string;
	gender: gs.contact.Gender;
	city: string;
	district: string;

	constructor(contact: gs.contact.IContact) {
		this.firstName = contact.firstName;
		this.lastName = contact.lastName;
		this.phone = contact.phone;
		this.gender = contact.gender;
		this.city = contact.city;
		this.district = contact.district;
	}
}