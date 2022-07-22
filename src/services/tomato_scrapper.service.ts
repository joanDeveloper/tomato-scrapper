"use strict";

import {Service, ServiceBroker, Context} from "moleculer";

export default class TomatoScrapperService extends Service {

	public constructor(public broker: ServiceBroker) {
		super(broker);
		this.parseServiceSchema({
			name: "tomato_scrapper",
			actions:{
				/**
				 * Say a 'Hello' action.
				 *
				 */
				hello: {
					params: {
						algo: { type: "string", optional: false }
					},
					async handler() {
						return "hola mundo"
					},
				}
			},
		});
	}

}
