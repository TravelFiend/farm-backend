const Barn = require('./Barn');

describe('Barn model', () => {
  let barn;
  beforeEach(() => {
    barn = new Barn({});
  });

  it('should require a barnType', () => {
    const { errors } = barn.validateSync();
    expect(errors.barnType.message).toEqual('Path `barnType` is required.');
  });

  it('should require a max size', () => {
    const { errors } = barn.validateSync();
    expect(errors.maxSize.message).toEqual('Path `maxSize` is required.');
  });
});
