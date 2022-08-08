import { Service, ServiceBroker } from "moleculer";
import puppeteer from "puppeteer";

export default class Puppeteer extends Service {
    public constructor(public broker: ServiceBroker) {
        super(broker);
        this.parseServiceSchema({
            name: "puppeteer",
            methods: {
                async init() {
                    const browser = await puppeteer.launch({
                        headless: true, // si esta en false activa el modo navegador
                        // args: [ '--proxy-server=http://10.10.10.10:8080' ]
                    });
                    
                    return await browser.newPage();
                }
            },
        });
    }
}
