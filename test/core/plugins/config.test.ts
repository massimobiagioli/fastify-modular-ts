import { test } from 'tap'
import {build} from "../../../src/app";

test('load test config', async t => {
    process.env.ENV = 'test'

    const app = build({
        logger: false
    })

    t.teardown(() => {
        app.close()
    })

    await app.ready()

    const config = app.config

    t.equal(config.ENV, 'test')
})

test('load dev config', async t => {
    process.env.ENV = 'dev'

    const app = build({
        logger: false
    })

    t.teardown(() => {
        app.close()
    })

    await app.ready()

    const config = app.config

    t.equal(config.ENV, 'dev')
})
