type Client = {
  id: string;
  address: string;
  email: string;
  firstname: string;
  lastname: string;
  notes: string;
  store: Store;
};

type ClientPayloadUpdate = Omit<Client, 'store'> & {
  storeId: string;
};

type ClientPayloadCreate = Omit<ClientPayloadUpdate, 'id'>
