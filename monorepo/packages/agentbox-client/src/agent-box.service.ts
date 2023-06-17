import { HttpRequestOptions, HttpService } from '@dbc-tech/http-kit'
import {
  AgentBoxCreateListingLink,
  AgentBoxCreateListingLinkResponse,
} from './dtos/agent-box-create-listing-link.dto'
import {
  AgentBoxCreateNote,
  AgentBoxCreateNoteResponse,
} from './dtos/agent-box-create-note.dto'
import { AgentBoxDeleteListingLinkResponse } from './dtos/agent-box-delete-listing-link.dto'
import { AgentBoxDeleteNoteResponse } from './dtos/agent-box-delete-note.dto'
import { AgentBoxGetInspections } from './dtos/agent-box-get-inspections.dto'
import { AgentBoxGetListingLinks } from './dtos/agent-box-get-listing-links.dto'
import { AgentBoxGetListings } from './dtos/agent-box-get-listings.dto'
import { AgentBoxGetNotes } from './dtos/agent-box-get-notes.dto'
import { AgentBoxGetStaffs } from './dtos/agent-box-get-staffs.dto'
import {
  AgentBoxUpdateListingLink,
  AgentBoxUpdateListingLinkResponse,
} from './dtos/agent-box-update-listing-link.dto'
import { AgentBoxConfig } from './interfaces/agent-box-config'
import { getInspectionsSearchParams } from './search-params/get-inspections-search-params'
import { getListingLinksSearchParams } from './search-params/get-listing-links-search-params'
import { getListingsSearchParams } from './search-params/get-listings-search-params'
import { getNotesSearchParams } from './search-params/get-notes-search-params'
import { getStaffsSearchParams } from './search-params/get-staffs-search-params'
import { SearchParams } from './types/search'

export const AGENT_BOX_API_VERSION = 2

export class AgentBoxService {
  http: HttpService

  constructor(private readonly config: AgentBoxConfig) {
    //this.logger.log(`Using AgentBox baseUrl: ${this.options.baseUrl}`);

    this.http = new HttpService(this.config.baseUrl)
  }

  getOptions(
    apiKey: string,
    clientId: string,
    searchParams?: SearchParams,
  ): HttpRequestOptions {
    return {
      headers: {
        'X-Client-ID': clientId,
        'X-API-Key': apiKey,
      },
      searchParams: { ...searchParams, version: AGENT_BOX_API_VERSION },
    }
  }

  async getStaffs(
    apiKey: string,
    clientId: string,
    searchParams = getStaffsSearchParams(),
  ) {
    const options = this.getOptions(apiKey, clientId, searchParams)
    //this.logger.log(`getStaffs options: ${JSON.stringify(options)}`);

    const { data } = await this.http.getJson<AgentBoxGetStaffs>(
      this.http.urlFromPath('staff'),
      AgentBoxGetStaffs,
      options,
    )

    return data?.response?.staffMembers ?? []
  }

  async getInspections(
    apiKey: string,
    clientId: string,
    searchParams = getInspectionsSearchParams(),
  ) {
    const options = this.getOptions(apiKey, clientId, searchParams)
    //this.logger.log(`getInspections options: ${JSON.stringify(options)}`);

    const { data } = await this.http.getJson<AgentBoxGetInspections>(
      this.http.urlFromPath('inspections'),
      AgentBoxGetInspections,
      options,
    )

    return data?.response?.inspections ?? []
  }

  async getListings(
    apiKey: string,
    clientId: string,
    searchParams = getListingsSearchParams(),
  ) {
    const options = this.getOptions(apiKey, clientId, searchParams)
    //this.logger.log(`getListings options: ${JSON.stringify(options)}`);

    const { data } = await this.http.getJson<AgentBoxGetListings>(
      this.http.urlFromPath('listings'),
      AgentBoxGetListings,
      options,
    )

    return data?.response?.listings ?? []
  }

  async getListingLinks(
    apiKey: string,
    clientId: string,
    searchParams = getListingLinksSearchParams(),
  ) {
    const options = this.getOptions(apiKey, clientId, searchParams)
    //this.logger.log(`getListingLinks options: ${JSON.stringify(options)}`);

    const { data } = await this.http.getJson<AgentBoxGetListingLinks>(
      this.http.urlFromPath('listing-links'),
      AgentBoxGetListingLinks,
      options,
    )

    return data?.response?.listingLinks ?? []
  }

  async getListingLinksForListingId(
    apiKey: string,
    clientId: string,
    listingId: string,
  ) {
    const searchParams = getListingLinksSearchParams({ listingId })
    return await this.getListingLinks(apiKey, clientId, searchParams)
  }

  async createListingLink(
    apiKey: string,
    clientId: string,
    json: AgentBoxCreateListingLink,
  ) {
    const options = this.getOptions(apiKey, clientId)
    const { data } = await this.http.postJson(
      this.http.urlFromPath('listing-links'),
      json,
      AgentBoxCreateListingLinkResponse,
      options,
    )

    return data?.response
  }

  async updateListingLink(
    apiKey: string,
    clientId: string,
    json: AgentBoxUpdateListingLink,
    listingLinkId: string,
  ) {
    const options = this.getOptions(apiKey, clientId)
    const { data } = await this.http.putJson(
      this.http.urlFromPath(`listing-links/${listingLinkId}`),
      json,
      AgentBoxUpdateListingLinkResponse,
      options,
    )

    return data?.response
  }

  async deleteListingLink(
    apiKey: string,
    clientId: string,
    listingLinkId: string,
  ) {
    const options = this.getOptions(apiKey, clientId)
    const { data } = await this.http.deleteJson(
      this.http.urlFromPath(`listing-links/${listingLinkId}`),
      AgentBoxDeleteListingLinkResponse,
      options,
    )

    return data?.response
  }

  async getNotes(
    apiKey: string,
    clientId: string,
    searchParams = getNotesSearchParams(),
  ) {
    const options = this.getOptions(apiKey, clientId, searchParams)
    //this.logger.log(`getNotes options: ${JSON.stringify(options)}`);

    const { data } = await this.http.getJson<AgentBoxGetNotes>(
      this.http.urlFromPath(`notes`),
      AgentBoxGetNotes,
      options,
    )

    return data?.response?.notes ?? []
  }

  async getNotesForListingId(
    apiKey: string,
    clientId: string,
    listingId: string,
  ) {
    const searchParams = getNotesSearchParams({ listingId })
    return await this.getNotes(apiKey, clientId, searchParams)
  }

  async createNote(apiKey: string, clientId: string, json: AgentBoxCreateNote) {
    const options = this.getOptions(apiKey, clientId)

    const { data } = await this.http.postJson(
      this.http.urlFromPath(`notes`),
      json,
      AgentBoxCreateNoteResponse,
      options,
    )

    return data?.response
  }

  async deleteNote(apiKey: string, clientId: string, noteId: string) {
    const options = this.getOptions(apiKey, clientId)
    const { data } = await this.http.deleteJson(
      this.http.urlFromPath(`notes/${noteId}`),
      AgentBoxDeleteNoteResponse,
      options,
    )

    return data?.response
  }
}
