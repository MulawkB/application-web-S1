import { getAll, getById, create, updateById, deleteById } from '../store.js'
import { restoreDb, populateDb } from './utils.js'
import { whispers, inventedId, existingId } from './fixtures.js'

describe('store', () => {
  beforeEach(() => populateDb(whispers))
  afterAll(restoreDb)
  describe('getAll', () => {
    it('should return empty array when theres no data', async () => {
      restoreDb()
      const data = await getAll()
      expect(data).toEqual([])
    })
    it('should return an array with one item when theres one item', async () => {
      const data = await getAll()
      expect(data).toEqual(whispers)
    })
  })
  describe('getById', () => {
    it('should return undefined if id does not exist', async () => {
      const item = await getById(inventedId)
      expect(item).toBeUndefined()
    })
    it('should return the item with the given id', async () => {
      const item = await getById(whispers[0].id)
      expect(item).toEqual(whispers[0])
    })
  })
  describe('create', () => {
    it('should create a new item and return it', async () => {
      const newItem = { id: whispers.length + 1, message: 'test 3' }
      console.log(`new Item dans describe create : ${JSON.stringify(newItem)}`)
      const item = await create(newItem.message)
      expect(item).toEqual(newItem)
    })
    it('should add the new item to the db', async () => {
      const newItem = { id: whispers.length + 1, message: 'test 3' }
      const { id } = await create(newItem.message)
      const item = await getById(id)
      expect(item).toEqual(newItem)
    })
  })

  describe('updateById', () => {
    it('should return undefined if it does not exist', async () => {
      const item = await updateById(inventedId)
      expect(item).toBeUndefined()
    })
    it('should not return the updated item', async () => {
      const updatedItem = { id: existingId, message: 'updated' }
      const item = await updateById(updatedItem.id, updatedItem.message)
      expect(item).toBeUndefined()
    })
    it('should update the item in the database', async () => {
      const updatedItem = { id: existingId, message: 'updated' }
      await updateById(updatedItem.id, updatedItem.message)
      const item = await getById(existingId)
      expect(item).toEqual(updatedItem)
    })
  })

  describe('deleteById', () => {
    it('should return undefined if theres no item with the given id', async () => {
      const item = await deleteById(inventedId)
      expect(item).toBeUndefined()
    })

    it('should not return the deleted item', async () => {
      const item = await deleteById(existingId)
      expect(item).toBeUndefined()
    })
    it('should delete the item with the given id', async () => {
      const itembefore = await getAll()
      console.log(`items avant suppression : ${JSON.stringify(itembefore)}`)
      await deleteById(existingId)
      const items = await getAll()
      console.log(`items après suppression : ${JSON.stringify(items)}`)
      const expectedItems = whispers.filter((item) => item.id !== existingId)
      console.log(`expected items : ${JSON.stringify(expectedItems)}`)
      expect(items).toEqual(whispers.filter((item) => item.id !== existingId))
    })
  })
})
