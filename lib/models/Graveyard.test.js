const Graveyard = require('./Graveyard');

describe('Graveyard model', () => {
  it('should require a farmId', () => {
    const graveyard = new Graveyard({});

    const { errors } = graveyard.validateSync();
    expect(errors.farmId.message).toEqual('Path `farmId` is required.');
  });

  it('should require dead animals', () => {
    const graveyard = new Graveyard({
      farmId: '12345',
      deadAnimals: 'poipoi'
    });

    const { errors } = graveyard.validateSync();
    expect(errors.deadAnimals.message).toEqual('Path `deadAnimals` is required.');
  });
});
