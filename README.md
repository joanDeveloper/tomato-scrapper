# tomato-scrapper
This is a [Moleculer](https://moleculer.services/)-based microservices project. Generated with the [Moleculer CLI](https://moleculer.services/docs/0.14/moleculer-cli.html).

## Services
- **api**: API Gateway services
- **greeter**: Sample service with `hello` and `welcome` actions.

## NPM scripts

- `npm run dev`: Start development mode (load all services locally with hot-reload & REPL)
- `npm run start`: Start production mode (set `SERVICES` env variable to load certain services)
- `npm run cli`: Start a CLI and connect to production. Don't forget to set production namespace with `--ns` argument in script
- `npm run ci`: Run continuous test mode with watching
- `npm test`: Run tests & generate coverage report


## ESTRUCUTURA

1. tomato_scrapper
```
{
    goto: "https://www.google.es",
    exec: [{
        method: "waitForSelector"
        params: ".gb_Id",
        item: "ean",
        loop: {
            exec: false,

        }
        checkIf: {
            exec: false,
        }
    }]
}

```

call tomato_scrapper.run '{"scrapper": { "goto": "https://www.octoparse.es/blog/las-20-mejores-herramientas-de-web-scraping", "exec": [{"method": "waitForSelector","params": ".content h3 span a","fieldOutput": "title","loop": { "exec": true}, "checkIf": { "exec": false}}]}}'