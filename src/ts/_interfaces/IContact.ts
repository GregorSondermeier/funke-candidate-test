namespace gs {
	export namespace contact {
		export interface IContact {
			firstName: string,
			lastName: string,
			phone: string,
			gender: 'MALE' | 'FEMALE',
			city: string,
			district: string
		}
	}
}