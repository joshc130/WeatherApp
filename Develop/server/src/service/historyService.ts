import { promises as fs } from 'fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the City class with name and id properties
class City {
  id: string;
  name: string;
  
  constructor(name: string, id?: string) {
    this.name = name;
    this.id = id || randomUUID();
  }
}

// Complete the HistoryService class
class HistoryService {
  private filePath: string;

  constructor() {
    this.filePath = path.join(__dirname, 'searchHistory.json');
  }

  // Read method that reads from the searchHistory.json file
  private async read(): Promise<City[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data) as City[];
    } catch (error: any) {
      // If file does not exist, return an empty array
      if (error.code === 'ENOENT') {
        return [];
      }
      throw error;
    }
  }

  // Write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]): Promise<void> {
    await fs.writeFile(this.filePath, JSON.stringify(cities, null, 2));
  }

  // getCities method: reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities(): Promise<City[]> {
    return await this.read();
  }

  // addCity method: adds a city to the searchHistory.json file
  async addCity(cityName: string): Promise<City> {
    const cities = await this.read();
    const newCity = new City(cityName);
    cities.push(newCity);
    await this.write(cities);
    return newCity;
  }

  // BONUS: removeCity method: removes a city from the searchHistory.json file by id
  async deleteCity(id: string): Promise<boolean> {
    const cities = await this.read();
    const initialLength = cities.length;
    const updatedCities = cities.filter(city => city.id !== id);
    
    if (updatedCities.length === initialLength) {
      // No city found with the given id
      return false;
    }
    
    await this.write(updatedCities);
    return true;
  }
}

export default new HistoryService();
