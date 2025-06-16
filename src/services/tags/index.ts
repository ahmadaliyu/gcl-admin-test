import axios from 'axios';
import env from '@/config/env';
import { IFetchTagQuery } from '@/types';

class Service {
  fetchTags({ type, search, page, limit }: IFetchTagQuery) {
    return axios.get(env.api.tags, {
      params: {
        ...(type ? { type } : {}),
        ...(search ? { search } : {}),
        ...(page ? { page } : {}),
        ...(limit ? { limit } : {}),
      },
    });
  }

  fetchTagById({ tagId }: { tagId?: string }) {
    return axios.get(env.api.tags + '/' + tagId);
  }
}

const TagsService = new Service();
export default TagsService;
