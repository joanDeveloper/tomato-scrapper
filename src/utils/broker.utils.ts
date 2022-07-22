import { ServiceBroker } from 'moleculer'
import brokerConfig from '../config/moleculer.config'
import path from 'path'
const broker = new ServiceBroker(brokerConfig)

export const Broker = {
    get: async () => {
        await Broker.init()
        return broker;
    },
    init: async () => {
        Broker.load()
        await Broker.start()
    },
    load: () => {
        broker.logger.info("🚀 loading services ...")
        const pathServices = path.join(__dirname, "../services")
        broker.loadServices(pathServices, `*.service.${process.env.APP === "prod" ? "js" : "ts"}`)
    },
    start: async () => {
        broker.logger.info("🚀 starting broker ...")
        await broker.start()
        broker.repl()
    }
}