const Farm = require('./Farm');

describe('Farm model', () => {
  it('should require a farmName field', () => {
    const farm = new Farm({});

    const { errors } = farm.validateSync();
    expect(errors.farmName.message).toEqual('Path `farmName` is required.');
  });
});
