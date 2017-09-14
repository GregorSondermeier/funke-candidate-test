namespace gs {
	export namespace contact {
		export interface IContact {
			firstName: string,
			lastName: string,
			phone: string,
			gender: gs.contact.Gender,
			city: string,
			district: string
		}
	}
}