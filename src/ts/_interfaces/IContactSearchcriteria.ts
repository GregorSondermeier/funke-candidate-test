namespace gs {
	export namespace contact {
		export interface IContactSearchcriteria {
			gender: gs.contact.Gender,
			availableDistricts: Array<string>,
			district: string
		}
	}
}