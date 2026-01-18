import { calculateTotalCost } from './spending';
import { Album, CurrencyConversion } from './interfaces';

describe('calculateTotalCost', () => {
  it('should calculate total cost for albums with valid currencies', () => {
    const albums: Album[] = [
      {
        url: 'https://example.com/album1',
        title: 'Album 1',
        artist: 'Artist 1',
        art: 'https://example.com/art1.jpg',
        cost: '10.00',
        currency: 'USD'
      },
      {
        url: 'https://example.com/album2',
        title: 'Album 2',
        artist: 'Artist 2',
        art: 'https://example.com/art2.jpg',
        cost: '15.50',
        currency: 'GBP'
      }
    ];

    const currencyConversions: CurrencyConversion = {
      'USD': 1.5,
      'GBP': 2.0,
    };

    const result = calculateTotalCost({ albums, currencyConversions });
    expect(result).toBeCloseTo(46.00);
  });

  it('should track missing currencies', () => {
    const albums: Album[] = [
      {
        url: 'https://example.com/album1',
        title: 'Album 1',
        artist: 'Artist 1',
        art: 'https://example.com/art1.jpg',
        cost: '10.00',
        currency: 'USD'
      },
      {
        url: 'https://example.com/album2',
        title: 'Album 2',
        artist: 'Artist 2',
        art: 'https://example.com/art2.jpg',
        cost: '20.00',
        currency: 'EUR' // Missing from conversion table
      }
    ];

    const currencyConversions: CurrencyConversion = {
      'USD': 1.5,
      'AUD': 1.0
    };

    const result = calculateTotalCost({ albums, currencyConversions });

    // Only USD album should be counted: 10.00 * 1.5 = 15.00 AUD
    expect(result).toBeCloseTo(15.00);
  });

  it('should handle empty albums array', () => {
    const albums: Album[] = [];
    const currencyConversions: CurrencyConversion = {
        'AUD': 1.0
    };

    const result = calculateTotalCost({ albums, currencyConversions });

    expect(result).toBeCloseTo(0);
  });
});
