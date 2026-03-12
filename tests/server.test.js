import supertest from 'supertest'
import { app } from '../server'
import { restoreDb, populateDb } from './utils.js'
import { whispers, inventedId, existingId } from './fixtures.js'
import { getById } from '../store.js'
describe ('Server', () => {
    beforeEach(() => populateDb(whispers))
    afterAll(restoreDb)
    describe('GET /api/v1/whisper', () => {
        it.todo('should return an empty array when theres no data')
        it.todo('should return all the whispers')
    })
    describe('GET /api/v1/whisper/:id', () => {
        it.todo('should return 404 when the whisper does not exist')
        it.todo('should return all the whispers')
    })
    describe('POST /api/v1/whisper', () => {
        it.todo('Should return a 400 when the body is empty')
        it.todo('Should return a 400 when the body is invalid')
        it.todo('Should return a 201 when the whisper is created')
    })
    describe('PUT /api/v1/whisper/:id', () => {
        it.todo('Should return a 400 when the body is empty')
        it.todo('Should return a 400 when the body is invalid')
        it.todo('Should return a 404 when the whisper does not exist')
        it.todo('Should return a 200 when the whisper is updated')
    })
    describe('DELETE /api/v1/whisper/:id', () => {
        it.todo('Should return a 404 when the whisper does not exist')
        it.todo('Should return a 200 when the whisper is deleted')
    })
})