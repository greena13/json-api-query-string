import { parse } from '../../index';

describe('parse:', function () {
  describe('when passed an empty string', function() {
    it('then returns an empty object', function() {
      expect(parse('')).toEqual({});
    });
  });

  describe('when passed an empty sort', function() {
    it('then returns an empty array', function() {
      expect(parse('sort=')).toEqual({ sort: [] });
    });
  });

  describe('when passed an sort with a single field', function() {
    it('then returns an array containing the field', function() {
      expect(parse('sort=foo')).toEqual({ sort: ['foo'] });
    });
  });

  describe('when passed an sort with multiple fields', function() {
    it('then return the correct value', function() {
      expect(parse('sort=foo,bar')).toEqual({ sort: ['foo', 'bar'] });
    });
  });

  describe('when passed an sort with descending fields', function() {
    it('then returns an array of values with the correct sort order', function() {
      expect(parse('sort=-foo')).toEqual({ sort: ['-foo'] });
      expect(parse('sort=-foo,bar')).toEqual({ sort: ['-foo', 'bar'] });
      expect(parse('sort=foo,-bar')).toEqual({ sort: ['foo', '-bar'] });
      expect(parse('sort=-foo,-bar')).toEqual({ sort: ['-foo', '-bar'] });
    });
  });

  describe('when passed an empty include', function() {
    it('then returns an empty array', function() {
      expect(parse('include=')).toEqual({ include: [] });
    });
  });

  describe('when passed an include with a single field', function() {
    it('then returns an array containing the field', function() {
      expect(parse('include=foo')).toEqual({ include: ['foo'] });
    });
  });

  describe('when passed an include with multiple fields', function() {
    it('then return the correct value', function() {
      expect(parse('include=foo,baz')).toEqual({ include: ['foo', 'baz'] });
    });
  });

  describe('when passed an include with nested fields', function() {
    it('then returns an array of values with the correct include order', function() {
      expect(parse('include=foo.bar')).toEqual({ include: ['foo.bar'] });
      expect(parse('include=foo.bar,baz')).toEqual({ include: ['foo.bar', 'baz'] });
      expect(parse('include=foo,bar.baz')).toEqual({ include: ['foo', 'bar.baz'] });
    });
  });

  describe('when passed an empty fields', function() {
    it('then returns an empty array', function() {
      expect(parse('fields[foo]=')).toEqual({ fields: { foo: [] } });
    });
  });

  describe('when passed an fields with a single value', function() {
    it('then returns an array containing the field', function() {
      expect(parse('fields[foo]=bar')).toEqual({ fields: { foo: ['bar'] } });
    });
  });

  describe('when passed an fields with multiple fields', function() {
    it('then return the correct value', function() {
      expect(parse('fields[foo]=bar&fields[baz]=barp')).toEqual({ fields: { foo: ['bar'], baz: ['barp'] } });
    });
  });

  describe('when passed an fields with nested fields', function() {
    it('then returns an array of values with the correct fields order', function() {
      expect(parse('fields[foo]=bar,zoop&fields[baz]=barp')).toEqual({ fields: { foo: ['bar', 'zoop'], baz: ['barp'] } });
    });
  });

  describe('when passed an empty filter', function() {
    it('then returns an empty object', function() {
      expect(parse('filter=')).toEqual({ filter: '' });
      expect(parse('filter=', { filter: { forceFormat: 'array' } })).toEqual({ filter: [] });
    });
  });

  describe('when passed a filter with a single field', function() {
    it('then returns an object containing the key and value', function() {
      expect(parse('filter[foo]=bar')).toEqual({ filter: { foo: 'bar' } });
    });
  });

  describe('when passed a filter with multiple fields', function() {
    it('then returns an object containing the correct values', function() {
      expect(parse('filter[foo]=bar&filter[bar]=baz')).toEqual({ filter: { foo: 'bar', bar: 'baz' } });
    });
  });

  describe('when passed a filter with comma separated value', function() {
    it('then returns an object containing the correct values', function() {
      expect(parse('filter[foo]=bar,baz')).toEqual({ filter: { foo: 'bar,baz' } });

      expect(parse('filter[foo]=bar,baz', { filter: { arrayFormat: 'comma' } })).toEqual({ filter: { foo: ['bar', 'baz'] } });
    });
  });

  describe('when passed an empty page', function() {
    it('then returns an object containing the correct values', function() {
      expect(parse('page=')).toEqual({ page: '' });
      expect(parse('page=', { page: { forceFormat: 'object' } })).toEqual({ page: {} });
    });
  });

  describe('when passed a page integer', function() {
    it('then returns an object containing the correct values', function() {
      expect(parse('page=1')).toEqual({ page: '1' });
    });
  });

  describe('when passed a page object', function() {
    it('then returns an object containing the correct values', function() {
      expect(parse('page[number]=1&page[size]=30')).toEqual({ page: { number: '1', size: '30' } });
    });
  });
});
