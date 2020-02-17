const Barn = require('./Barn');

describe('Barn model', () => {
  it('should require a farmId', () => {
    const barn = new Barn({});

    const { errors } = barn.validateSync();
    expect(errors.farmId.message).toEqual('Path `farmId` is required.');
  });

  it('should require a barnType', () => {
    const barn = new Barn({});

    const { errors } = barn.validateSync();
    expect(errors.barnType.message).toEqual('Path `barnType` is required.');
  });

  it('should require a max size', () => {
    const barn = new Barn({});

    const { errors } = barn.validateSync();
    expect(errors.maxSize.message).toEqual('Path `maxSize` is required.');
  });
});
