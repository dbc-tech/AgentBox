export const getListingLinksResponse = {
  response: {
    items: '3',
    current: '1',
    last: 'INF',
    listingLinks: [
      {
        id: '1',
        type: 'Property Web Link',
        title: 'Buyer Listing Link',
        url: 'https://example.com/pqoPe',
        order: '1',
      },
      {
        id: '2',
        type: 'General External Link',
        title: 'Dashboard Link',
        url: 'https://example.com/taF21',
        order: '2',
      },
      {
        id: '255',
        type: 'General External Link',
        title: 'Buyer link',
        url: 'https://example.com/lvwCX',
        order: '3',
      },
      {
        id: '431',
        type: 'General External Link',
        title: 'Agent Link',
        url: 'https://example.com/AwpnQ',
        order: '4',
      },
    ],
  },
}

export const getListingLinksNoLinksResponse = {
  response: {
    items: '0',
    current: '1',
    last: 'NAN',
    listingLinks: [],
  },
}

export const updateListingLinkResponse = {
  response: {
    status: 'success',
    listingLink: {
      id: '2',
      links: {
        self: 'https://api.agentboxcrm.com.au/listing-links/2?version=2',
      },
    },
  },
}

export const createListingLinkResponse = {
  response: {
    status: 'success',
    listingLink: {
      id: '412',
      links: {
        self: 'https://api.agentboxcrm.com.au/listing-links/412?version=2',
      },
    },
  },
}

export const deleteListingLinkResponse = {
  response: {
    id: '412',
    status: 'Success',
  },
}
