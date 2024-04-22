import express, { Application, Request, Response } from "express";
import axios, { AxiosResponse } from "axios";
import cors from 'cors';

const app: Application = express();
app.use(cors());
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Home route
app.get("/", (req: Request, res: Response) => res.send("LINE MAN Wongnai Frontend Assignment"));

// Get all restaurant IDs
app.get("/api/restaurants", async (req: Request, res: Response) => {
  try {
    // Fetch the restaurant details for the two known restaurant IDs
    const restaurant1Response: AxiosResponse = await axios.get("https://us-central1-wongnai-frontend-assignment.cloudfunctions.net/api/restaurants/567051.json");
    const restaurant2Response: AxiosResponse = await axios.get("https://us-central1-wongnai-frontend-assignment.cloudfunctions.net/api/restaurants/227018.json");

    // Extract the restaurant IDs, cast them as number if it is a srting and return 
    const restaurantIds = [restaurant1Response.data.id, restaurant2Response.data.id].map((id: string | number) => Number(id));

    res.status(200).json({ restaurantIds });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Get a specific restaurant
app.get("/api/restaurants/:restaurantId", async (req: Request, res: Response) => {
  const { restaurantId } = req.params;
  try {
    const response: AxiosResponse = await axios.get(`https://us-central1-wongnai-frontend-assignment.cloudfunctions.net/api/restaurants/${restaurantId}.json`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Get short menu for a restaurant
app.get("/api/restaurants/:restaurantId/menus/:menuName/short", async (req: Request, res: Response) => {
  const { restaurantId, menuName } = req.params;
  try {
    const response: AxiosResponse = await axios.get(`https://us-central1-wongnai-frontend-assignment.cloudfunctions.net/api/restaurants/${restaurantId}/menus/${menuName}/short.json`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Get full menu for a restaurant
app.get("/api/restaurants/:restaurantId/menus/:menuName/full", async (req: Request, res: Response) => {
  const { restaurantId, menuName } = req.params;
  try {
    const response: AxiosResponse = await axios.get(`https://us-central1-wongnai-frontend-assignment.cloudfunctions.net/api/restaurants/${restaurantId}/menus/${menuName}/full.json`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

try {
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error) {
  console.error(`Error occurred: ${(error as Error).message}`);
}

export default app; // Export the app instance