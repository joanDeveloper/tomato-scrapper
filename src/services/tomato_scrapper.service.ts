"use strict";

import { Service, ServiceBroker, Context } from "moleculer";
import Puppeteer from "./mixins/puppeteer.mixin";

export default class TomatoScrapperService extends Service {
	public constructor(public broker: ServiceBroker) {
		super(broker);
		this.parseServiceSchema({
			name: "tomato_scrapper",
			mixins: [new Puppeteer(broker).schema],
			actions: {
				run: {
					params: {
						scrapper: {
							type: "object",
							optional: false,
							props: {
								goto: { type: "string", optional: false },
								exec: {
									type: "array",
									optional: false,
									items: 'object',
									props: {
										method: { type: "string", optional: false },
										params: { type: "string", optional: false },
										fieldOutput: { type: "string", optional: false },
										loop: {
											type: "object",
											optional: false,
											props: {
												exec: { type: "boolean", optional: false },
											}
										},
										checkIf: {
											type: "string",
											optional: false,
											props: {
												exec: { type: "boolean", optional: false },
											}
										},
									}
								}
							}
						}
					},
					async handler(ctx) {
						const { scrapper } = ctx.params
						const { goto, exec } = scrapper
						console.log("hola", scrapper);
						const page = await this.init()
						await page.goto(goto)

						var resultScrapped:any = [], item: any = {}
						for (let index = 0; index < exec.length; index++) {
							const element = exec[index];
							if (element.loop.exec) {
								console.log("YUJU", element);
								const result = await page.evaluate((element:any) => {
									const itemsIterator = document.querySelectorAll('.content h3 span a');
									var arrayLoop: any = [];
									itemsIterator.forEach((itemIterator, i) => {
										arrayLoop.push({ [element.fieldOutput]: itemIterator.textContent })
									});
									return arrayLoop; // return value to "out site", assign `hotelJson` to `result`
								},element);

								console.log("result", result);

							}

							// const responseSelector = await page[element.method](element.params)
							// var text = await page.evaluate((document: any) => document.textContent, responseSelector)
							// console.log("TEXT", text);
							// item[element.fieldOutput] = text;


						}
						await page.close()
						// resultScrapped.push(item)
						// console.log("resultScrapped", resultScrapped);

						return resultScrapped
					},
				}
			},
		});
	}

}
