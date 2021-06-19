import { stringify } from '../../index';

describe('stringify:', function () {
  describe('when passed an empty string', function() {
    it('then returns the correct value', function() {
      expect(stringify({})).toEqual('');
    });
  });

  describe('when passed an empty sort', function() {
    it('then returns the correct value', function() {
      expect(stringify({ sort: [] })).toEqual('');
    });
  });

  describe('when passed an sort with a single field', function() {
    it('then returns the correct value', function() {
      expect(stringify({ sort: ['foo'] })).toEqual('sort=foo');
    });
  });

  describe('when passed an sort with multiple fields', function() {
    it('then returns the correct value', function() {
      expect(stringify({ sort: ['foo', 'bar'] })).toEqual('sort=foo,bar');
    });
  });

  describe('when passed an sort with descending fields', function() {
    it('then returns the correct value', function() {
      expect(stringify({ sort: ['-foo'] })).toEqual('sort=-foo');
      expect(stringify({ sort: ['-foo', 'bar'] })).toEqual('sort=-foo,bar');
      expect(stringify({ sort: ['foo', '-bar'] })).toEqual('sort=foo,-bar');
      expect(stringify({ sort: ['-foo', '-bar'] })).toEqual('sort=-foo,-bar');
    });
  });

  describe('when passed an empty include', function() {
    it('then returns the correct value', function() {
      expect(stringify({ include: [] })).toEqual('');
    });
  });

  describe('when passed an include with a single field', function() {
    it('then returns the correct value', function() {
      expect(stringify({ include: ['foo'] })).toEqual('include=foo');
    });
  });

  describe('when passed an include with multiple fields', function() {
    it('then returns the correct value', function() {
      expect(stringify({ include: ['foo', 'baz'] })).toEqual('include=foo,baz');
    });
  });

  describe('when passed an include with nested fields', function() {
    it('then returns the correct value', function() {
      expect(stringify({ include: ['foo.bar'] })).toEqual('include=foo.bar');
      expect(stringify({ include: ['foo.bar', 'baz'] })).toEqual('include=foo.bar,baz');
      expect(stringify({ include: ['foo', 'bar.baz'] })).toEqual('include=foo,bar.baz');
    });
  });

  describe('when passed an empty fields', function() {
    it('then returns an empty array', function() {
      expect(stringify({ fields: { foo: [] } })).toEqual('fields[foo]=');
    });
  });

  describe('when passed an fields with a single value', function() {
    it('then returns an array containing the field', function() {
      expect(stringify({ fields: { foo: ['bar'] } })).toEqual('fields[foo]=bar');
    });
  });

  describe('when passed an fields with multiple fields', function() {
    it('then return the correct value', function() {
      expect(stringify({ fields: { foo: ['bar'], baz: ['barp'] } })).toEqual('fields[foo]=bar&fields[baz]=barp');
    });
  });

  describe('when passed an fields with nested fields', function() {
    it('then returns an array of values with the correct fields order', function() {
      expect(stringify({ fields: { foo: ['bar', 'zoop'], baz: ['barp'] } })).toEqual('fields[foo]=bar,zoop&fields[baz]=barp');
    });
  });

  describe('when passed an empty filter', function() {
    it('then returns the correct value', function() {
      expect(stringify({ filter: '' })).toEqual('filter=');
      expect(stringify({ filter: [] }, { filter: { forceFormat: 'array' } })).toEqual('');
    });
  });

  describe('when passed a filter with a single field', function() {
    it('then returns the correct value', function() {
      expect(stringify({ filter: { foo: 'bar' } })).toEqual('filter[foo]=bar');
    });
  });

  describe('when passed a filter with multiple fields', function() {
    it('then returns the correct value', function() {
      expect(stringify({ filter: { foo: 'bar', bar: 'baz' } })).toEqual('filter[foo]=bar&filter[bar]=baz');
    });
  });

  describe('when passed a filter with comma separated value', function() {
    it('then returns the correct value', function() {
      expect(stringify({ filter: { foo: 'bar,baz' } })).toEqual('filter[foo]=bar,baz');

      expect(stringify({ filter: { foo: ['bar', 'baz'] } }, { filter: { arrayFormat: 'comma' } })).toEqual('filter[foo]=bar,baz');
    });
  });

  describe('when passed an empty page', function() {
    it('then returns the correct value', function() {
      expect(stringify({ page: '' })).toEqual('page=');
      expect(stringify({ page: {} }, { page: { forceFormat: 'object' } })).toEqual('');
    });
  });

  describe('when passed a page integer', function() {
    it('then returns the correct value', function() {
      expect(stringify({ page: '1' })).toEqual('page=1');
    });
  });

  describe('when passed a page object', function() {
    it('then returns the correct value', function() {
      expect(stringify({ page: { number: '1', size: '30' } })).toEqual('page[number]=1&page[size]=30');
    });
  });
});
