import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// POST Request: Retrieve weather data by city name and save the city to search history
router.post('/', async (req: Request, res: Response) => {
  const { cityName } = req.body;
  if (!cityName) {
    return res.status(400).json({ 
      error: 'City name is required',
      errorCode: 'MISSING_CITY_NAME'
    });
  }

  try {
    const weatherData = await WeatherService.getWeatherForCity(cityName);
    await HistoryService.addCity(cityName);
    return res.status(200).json(weatherData);
  } catch (error) {
    console.error('Error retrieving weather data:', error);
    return res.status(500).json({ 
      error: 'Failed to retrieve weather data',
      errorCode: 'WEATHER_FETCH_ERROR'
    });
  }
});

// GET Request: Retrieve search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    const cities = await HistoryService.getCities();
    return res.status(200).json(cities);
  } catch (error) {
    console.error('Error retrieving search history:', error);
    return res.status(500).json({ 
      error: 'Failed to retrieve search history',
      errorCode: 'HISTORY_FETCH_ERROR'
    });
  }
});

// BONUS: DELETE city from search history by id
router.delete('/history/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      error: 'City ID is required',
      errorCode: 'MISSING_CITY_ID'
    });
  }
  
  try {
    const deletionResult = await HistoryService.deleteCity(id);
    if (!deletionResult) {
      return res.status(404).json({
        error: 'City not found',
        errorCode: 'CITY_NOT_FOUND'
      });
    }
    return res.status(200).json({ 
      message: 'City deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting city from search history:', error);
    return res.status(500).json({
      error: 'Failed to delete city from search history',
      errorCode: 'CITY_DELETE_ERROR'
    });
  }
});

export default router;
