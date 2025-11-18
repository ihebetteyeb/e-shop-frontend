export class CountryService {
  async getCountries() {
    const res = await fetch("countries.json");
    const d = await res.json();
    return d.data;
  }
}
