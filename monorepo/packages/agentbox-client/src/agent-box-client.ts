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

export class AgentBoxClient {
  http: HttpService

  constructor(private readonly config: AgentBoxConfig) {
    //this.logger.log(`Using AgentBox baseUrl: ${this.options.baseUrl}`);

    this.http = new HttpService(this.config.baseUrl)
  }

  getOptions(searchParams?: SearchParams): HttpRequestOptions {
    return {
      headers: {
        'X-Client-ID': this.config.clientId,
        'X-API-Key': this.config.apiKey,
      },
      searchParams: { ...searchParams, version: AGENT_BOX_API_VERSION },
    }
  }

  async getStaffs(searchParams = getStaffsSearchParams()) {
    const options = this.getOptions(searchParams)
    //this.logger.log(`getStaffs options: ${JSON.stringify(options)}`);

    const { data } = await this.http.getJson<AgentBoxGetStaffs>(
      this.http.urlFromPath('staff'),
      AgentBoxGetStaffs,
      options,
    )

    return data?.response?.staffMembers ?? []
  }

  async getInspections(searchParams = getInspectionsSearchParams()) {
    const options = this.getOptions(searchParams)
    //this.logger.log(`getInspections options: ${JSON.stringify(options)}`);

    const { data } = await this.http.getJson<AgentBoxGetInspections>(
      this.http.urlFromPath('inspections'),
      AgentBoxGetInspections,
      options,
    )

    return data?.response?.inspections ?? []
  }

  async getListings(searchParams = getListingsSearchParams()) {
    const options = this.getOptions(searchParams)
    //this.logger.log(`getListings options: ${JSON.stringify(options)}`);

    const { data } = await this.http.getJson<AgentBoxGetListings>(
      this.http.urlFromPath('listings'),
      AgentBoxGetListings,
      options,
    )

    return data?.response?.listings ?? []
  }

  async getListingLinks(searchParams = getListingLinksSearchParams()) {
    const options = this.getOptions(searchParams)
    //this.logger.log(`getListingLinks options: ${JSON.stringify(options)}`);

    const { data } = await this.http.getJson<AgentBoxGetListingLinks>(
      this.http.urlFromPath('listing-links'),
      AgentBoxGetListingLinks,
      options,
    )

    return data?.response?.listingLinks ?? []
  }

  async getListingLinksForListingId(listingId: string) {
    const searchParams = getListingLinksSearchParams({ listingId })
    return await this.getListingLinks(searchParams)
  }

  async createListingLink(json: AgentBoxCreateListingLink) {
    const options = this.getOptions()
    const { data } = await this.http.postJson(
      this.http.urlFromPath('listing-links'),
      json,
      AgentBoxCreateListingLinkResponse,
      options,
    )

    return data?.response
  }

  async updateListingLink(
    json: AgentBoxUpdateListingLink,
    listingLinkId: string,
  ) {
    const options = this.getOptions()
    const { data } = await this.http.putJson(
      this.http.urlFromPath(`listing-links/${listingLinkId}`),
      json,
      AgentBoxUpdateListingLinkResponse,
      options,
    )

    return data?.response
  }

  async deleteListingLink(listingLinkId: string) {
    const options = this.getOptions()
    const { data } = await this.http.deleteJson(
      this.http.urlFromPath(`listing-links/${listingLinkId}`),
      AgentBoxDeleteListingLinkResponse,
      options,
    )

    return data?.response
  }

  async getNotes(searchParams = getNotesSearchParams()) {
    const options = this.getOptions(searchParams)
    //this.logger.log(`getNotes options: ${JSON.stringify(options)}`);

    const { data } = await this.http.getJson<AgentBoxGetNotes>(
      this.http.urlFromPath(`notes`),
      AgentBoxGetNotes,
      options,
    )

    return data?.response?.notes ?? []
  }

  async getNotesForListingId(listingId: string) {
    const searchParams = getNotesSearchParams({ listingId })
    return await this.getNotes(searchParams)
  }

  async createNote(json: AgentBoxCreateNote) {
    const options = this.getOptions()

    const { data } = await this.http.postJson(
      this.http.urlFromPath(`notes`),
      json,
      AgentBoxCreateNoteResponse,
      options,
    )

    return data?.response
  }

  async deleteNote(noteId: string) {
    const options = this.getOptions()
    const { data } = await this.http.deleteJson(
      this.http.urlFromPath(`notes/${noteId}`),
      AgentBoxDeleteNoteResponse,
      options,
    )

    return data?.response
  }
}
