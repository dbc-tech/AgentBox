import nock from 'nock'
import { inspectionsResponse } from '../tests/testdata/agent-box-api/inspections'
import {
  createListingLinkResponse,
  deleteListingLinkResponse,
  getListingLinksResponse,
  updateListingLinkResponse,
} from '../tests/testdata/agent-box-api/listing-links'
import { listingsResponse } from '../tests/testdata/agent-box-api/listings'
import {
  createNoteResponse,
  deleteNoteResponse,
  getNotesResponse,
} from '../tests/testdata/agent-box-api/notes'
import { staffsResponse } from '../tests/testdata/agent-box-api/staffs'
import { AgentBoxClient } from './agent-box-client'
import { AgentBoxListingLinkType } from './constants'
import { AgentBoxCreateListingLink } from './dtos/agent-box-create-listing-link.dto'
import { AgentBoxCreateNote } from './dtos/agent-box-create-note.dto'
import { AgentBoxUpdateListingLink } from './dtos/agent-box-update-listing-link.dto'

const RUN_WITH_MOCKS = true

const baseUrl = 'https://api.agentboxcrm.com.au/'
const apiKey = 'e51e-7679-22cf-ee91-9f94-9cbe-9966-1e45-234b-f051'
const clientId = 'aHR0cHM6Ly9kYmNzYW5kYm94LmFnZW50Ym94Y3JtLmNvbS5hdS9hZG1pbi8'

const mockGetResponse = (path: string, response: Record<string, any>) => {
  nock(baseUrl)
    .filteringPath(() => path)
    .get(path)
    .matchHeader('X-Client-ID', clientId)
    .matchHeader('X-API-Key', apiKey)
    .reply(200, response)
}

const mockPutResponse = (
  path: string,
  body: Record<string, any>,
  response: Record<string, any>,
) => {
  nock(baseUrl)
    .filteringPath(() => path)
    .put(path, body)
    .matchHeader('X-Client-ID', clientId)
    .matchHeader('X-API-Key', apiKey)
    .reply(200, response)
}

const mockPostResponse = (
  path: string,
  body: Record<string, any>,
  response: Record<string, any>,
) => {
  nock(baseUrl)
    .filteringPath(() => path)
    .post(path, body)
    .matchHeader('X-Client-ID', clientId)
    .matchHeader('X-API-Key', apiKey)
    .reply(201, response)
}

const mockDeleteResponse = (path: string, response: Record<string, any>) => {
  nock(baseUrl)
    .filteringPath(() => path)
    .delete(path)
    .matchHeader('X-Client-ID', clientId)
    .matchHeader('X-API-Key', apiKey)
    .reply(200, response)
}

const getDependencies = async () => {
  const service = new AgentBoxClient({
    baseUrl,
    clientId,
    apiKey,
  })

  return { service }
}

describe('AgentBoxClient', () => {
  afterAll(() => nock.restore())

  describe('.getStaffs', () => {
    it('should return an array of agents', async () => {
      if (RUN_WITH_MOCKS) mockGetResponse('/staff', staffsResponse)
      const { service } = await getDependencies()

      const staffs = await service.getStaffs()
      expect(staffs).toBeDefined()

      if (!RUN_WITH_MOCKS) return

      expect(staffs).toHaveLength(3)
    })
  })

  describe('.getInspections', () => {
    it('should return an array of prospective buyers', async () => {
      if (RUN_WITH_MOCKS) mockGetResponse('/inspections', inspectionsResponse)
      const { service } = await getDependencies()

      const inspections = await service.getInspections()
      expect(inspections).toBeDefined()

      if (!RUN_WITH_MOCKS) return

      expect(inspections).toHaveLength(1)
    })
  })

  describe('.getListings', () => {
    it('should return an array of listings', async () => {
      if (RUN_WITH_MOCKS) mockGetResponse('/listings', listingsResponse)
      const { service } = await getDependencies()

      const listings = await service.getListings()
      expect(listings).toBeDefined()

      if (!RUN_WITH_MOCKS) return

      expect(listings).toHaveLength(2)
    })
  })

  describe('.getListingLinksForListingId', () => {
    it('should return an array of listing-links for the provided listingId', async () => {
      const listingId = '1P0005'

      if (RUN_WITH_MOCKS)
        mockGetResponse('/listing-links', getListingLinksResponse)

      const { service } = await getDependencies()

      const listingLinks = await service.getListingLinksForListingId(listingId)

      expect(listingLinks).toBeDefined()

      if (!RUN_WITH_MOCKS) return

      expect(listingLinks).toHaveLength(4)
    })
  })

  describe('.updateListingLink', () => {
    it('should send an update listing link request', async () => {
      const listingLinkId = '2'
      const update: AgentBoxUpdateListingLink = {
        listingLink: {
          title: 'OfferToOwn Dash Link',
        },
      }

      if (RUN_WITH_MOCKS)
        mockPutResponse('/listing-links', update, updateListingLinkResponse)

      const { service } = await getDependencies()

      const response = await service.updateListingLink(update, listingLinkId)

      expect(response).toBeDefined()
      expect(response).toMatchObject(updateListingLinkResponse.response)
    })
  })

  describe('.createListingLink', () => {
    it('should send a create listing link request', async () => {
      const listingId = '1P0005'

      const create: AgentBoxCreateListingLink = {
        listingLink: {
          type: AgentBoxListingLinkType.GeneralExternalLink,
          title: 'OfferToOwn Main Link',
          url: 'https://www.offertoown.com.au/',
          attachedListing: {
            id: listingId,
          },
        },
      }

      if (RUN_WITH_MOCKS)
        mockPostResponse('/listing-links', create, createListingLinkResponse)

      const { service } = await getDependencies()

      const response = await service.createListingLink(create)

      expect(response).toBeDefined()
      expect(response).toMatchObject(createListingLinkResponse.response)
    })
  })

  describe('.deleteListingLink', () => {
    it('should send a delete listing link request', async () => {
      const listingLinkId = deleteListingLinkResponse.response.id

      if (RUN_WITH_MOCKS)
        mockDeleteResponse('/listing-links', deleteListingLinkResponse)

      const { service } = await getDependencies()

      const response = await service.deleteListingLink(listingLinkId)

      expect(response).toBeDefined()
      expect(response).toMatchObject(deleteListingLinkResponse.response)
    })
  })

  describe('.getNotesForListingId', () => {
    it('should return an array of notes for the provided listingId', async () => {
      const listingId = '1P0005'

      if (RUN_WITH_MOCKS) mockGetResponse('/notes', getNotesResponse)

      const { service } = await getDependencies()

      const notes = await service.getNotesForListingId(listingId)

      expect(notes).toBeDefined()
      expect(notes).toMatchObject(getNotesResponse.response.notes)
    })
  })

  describe('.createNote', () => {
    it('should send a create note request', async () => {
      const listingId = '1P0005'

      const create: AgentBoxCreateNote = {
        note: {
          headline: 'Offer to Own',
          description: 'https://uat.offer2own.co/lvwCX',
          isPublic: true,
          attachedListings: [{ id: listingId }],
        },
      }

      if (RUN_WITH_MOCKS) mockPostResponse('/notes', create, createNoteResponse)

      const { service } = await getDependencies()

      const response = await service.createNote(create)

      expect(response).toBeDefined()
      expect(response).toMatchObject(createNoteResponse.response)
    })
  })

  describe('.deleteNote', () => {
    it('should send a delete note request', async () => {
      const noteId = deleteListingLinkResponse.response.id

      if (RUN_WITH_MOCKS) mockDeleteResponse('/notes', deleteNoteResponse)

      const { service } = await getDependencies()

      const response = await service.deleteNote(noteId)

      expect(response).toBeDefined()
      expect(response).toMatchObject(deleteNoteResponse.response)
    })
  })
})
