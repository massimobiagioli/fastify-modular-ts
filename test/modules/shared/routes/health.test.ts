import { test } from 'tap'
import {build} from "../../../../src/app";
import {HealthResponseType} from "../../../../src/core/models/health";

test('health', async t => {
    const app = build({
        logger: false
    })

    t.teardown(() => {
        app.close()
    })

    const response = await app.inject({
        method: 'GET',
        url: '/health'
    })

    const healthResponse = response.json<HealthResponseType>()

    t.equal(response.statusCode, 200)
    t.equal(healthResponse.status, 'ok')
})
