export const getNotesResponse = {
  response: {
    items: '1',
    current: '1',
    last: 'INF',
    notes: [
      {
        id: '82',
        isPublic: true,
        category: 'General Note',
        headline: 'System | Agent Dashboard',
        description: 'https://example.com/abc',
        date: '2022-02-03T15:04:52+11:00',
        firstCreated: '2022-02-03T15:04:52+11:00',
        lastModified: '2022-02-03T15:04:52+11:00',
        links: {
          self: 'https://api.agentboxcrm.com.au/notes/82?version=2',
        },
        attachedListings: [
          {
            id: '1P0005',
          },
        ],
      },
    ],
  },
}

export const getNotesNoNotesResponse = {
  response: {
    items: '0',
    current: '1',
    last: 'NAN',
    notes: [],
  },
}

export const createNoteResponse = {
  response: {
    status: 'success',
    note: {
      id: '221',
      links: {
        self: 'https://api.agentboxcrm.com.au/notes/221?version=2',
      },
    },
  },
}

export const deleteNoteResponse = {
  response: {
    id: '222',
    status: 'Success',
  },
}
