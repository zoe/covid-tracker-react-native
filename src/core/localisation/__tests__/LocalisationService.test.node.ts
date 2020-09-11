import { getCountryConfig } from '@covid/core/Config';
import { container } from '@covid/provider/services';
import { Services } from '@covid/provider/services.types';

import { ILocalisationService, LocalisationService } from '../LocalisationService';

describe('Checks LocalisationService', () => {
  let localisationService: ILocalisationService;

  beforeAll(() => {
    localisationService = container.get<ILocalisationService>(Services.Localisation);
  });

  it('service should be fetched from container', () => {
    expect(localisationService).toBeDefined();
  });

  it('can initCountryConfig for GB, SE, US', () => {
    localisationService.initCountryConfig('GB');
    expect(LocalisationService.countryConfig).toBe(getCountryConfig('GB'));

    localisationService.initCountryConfig('SE');
    expect(LocalisationService.countryConfig).toBe(getCountryConfig('SE'));

    localisationService.initCountryConfig('US');
    expect(LocalisationService.countryConfig).toBe(getCountryConfig('US'));
  });

  it('should have GB as default contury config if not set & logged in', async () => {
    // Should set user country to GB if it is null.
    localisationService.getUserCountry = jest.fn(async () => {
      return null;
    });
    await localisationService.updateUserCountry(true);
    expect(LocalisationService.userCountry).toBe('GB');
  });
});
