import 'mocha';
import sinon from 'sinon';
import chai, { expect } from 'chai';
// eslint-disable-next-line @typescript-eslint/no-var-requires
chai.use(require('sinon-chai'));

import { QueryService } from '../../src/services/QueryService';
import { RedisClient } from '../../src/utils/redisClient';
import { tryAndExpect } from '../../src/utils/tryAndExpect';
import { ForbiddenError } from '../../src/exceptions/ForbiddenError';
import { IUserToken } from '../../src/models/IUserToken';
import { Role } from '../../src/models/Role';
const RedisClientStub = sinon.spy(() => sinon.createStubInstance(RedisClient));

describe('Query Service', () => {
  let queryService: QueryService;
  let _redisClient: RedisClient;
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    _redisClient = RedisClientStub('stub', 0);
    queryService = new QueryService(_redisClient);
  });

  describe('Add Query', () => {
    it('should be failed to add query for unauthorized user', async () => {
      await tryAndExpect(() => queryService.add({ name: 'name', query: 'query' }), ForbiddenError);
    });
    it('should able to add query for authorized user', async () => {
      _redisClient.add = () => Promise.resolve("OK");
      const result = await queryService.add({ name: 'name', query: 'query' }, <IUserToken>{ role: Role.root });
      expect(result).equal("OK");
    });
  });

  describe('Get All', () => {
    it('should be failed to get query for unauthorized user', async () => {
      await tryAndExpect(() => queryService.getAll(), ForbiddenError);
    });
    it('should able to get all queries for authorized user', async () => {
      _redisClient.getAll = () => Promise.resolve([{ key: 'name', value: 'query' }])
      const result = await queryService.getAll(<IUserToken>{ role: Role.root });
      expect(result).length(1);
    });
  });
  
  describe('Get by name', () => {
    it('should be failed to get query for unauthorized user', async () => {
      await tryAndExpect(() => queryService.get('name'), ForbiddenError);
    });
    it('should able to get query by name for authorized user', async () => {
      _redisClient.get = () => Promise.resolve('query')
      const result = await queryService.get('name', <IUserToken>{ role: Role.root });
      expect(result).deep.equal({key: 'name', value: 'query'});
    });
    it('should able to show (no records)for authorized user', async () => {
      _redisClient.get = () => Promise.resolve(null)
      const result = await queryService.get('name', <IUserToken>{ role: Role.root });
      expect(result).deep.equal({message: `No query available for name`});
    });
  });
  
  describe('Delete by name', () => {
    it('should be failed to get query for unauthorized user', async () => {
      await tryAndExpect(() => queryService.delete('name'), ForbiddenError);
    });
    it('should able to delete query by name for authorized user', async () => {
      _redisClient.remove = () => Promise.resolve(1)
      const result = await queryService.delete('name', <IUserToken>{ role: Role.root });
      expect(result).equal(1);
    });
  });
});
