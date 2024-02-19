// Importing required modules
import axios from "axios";
import { createClient } from '@supabase/supabase-js'

// Setting up environment variables
const { SUPABASE_ENDPOINT, SUPABASE_API_KEY_PRIVATE, CONGRESS_API_KEY, CONGRESS_API_ENDPOINT } : any = process.env ;

// Creating a Supabase client
const supabase = createClient(SUPABASE_ENDPOINT, SUPABASE_API_KEY_PRIVATE);

// Variable Initilization
let timer: any;
let remainingTime = 24;

// Function to get data from the Congress API
export const getData = async (bill_number = 0, bill_type = "H") => {
  try {
    // If bill_number is 0, get all bills
    if (bill_number == 0) {
      const response = await axios.get(`${CONGRESS_API_ENDPOINT}bill?api_key=${CONGRESS_API_KEY}`);
      return response.data.bills;
    }
    // Else, get a specific bill by number and type
    else {
      const response = await axios.get(`${CONGRESS_API_ENDPOINT}bill/118/${bill_type}/${bill_number}?api_key=${CONGRESS_API_KEY}`);
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

// Function to upsert data into a specified table
const upsertData = async (table : any, data : any) => {
  const { error } = await supabase.from(table).upsert(data, { onConflict: 'number' });
  if (error) console.error(`Error occurred during upsert in ${table}:`, error);
};

// Function to fetch data and upsert it into the database
const fetchHandler = async () => {
  // Get the bills data
  const bills = await getData();
  // Loop through the bills
  for (const bill of bills) {
    // Destructure the relevant properties
    const { congress, number, originChamber, originChamberCode, title, type, updateDate, url, latestAction } = bill;
    // Create the data objects for the tables
    const congressData = { congress, number, originChamber, originChamberCode, title, type, url, updateDate };
    const latestActionData = { ...latestAction, number };
    // Upsert the data into the tables
    await Promise.all([upsertData('congress', congressData), upsertData('actions', latestActionData)]);
  }
};

// Function to handle the timer
const handleTimer = () => {
  // If timer is not set, start it
  if (!timer) {
    timer = setInterval(() => {
      // Decrement the remaining time
      remainingTime--;
      // If remaining time is zero, call the fetch handler and reset the timer
      if (remainingTime === 0) {
        fetchHandler();
        console.log('Timer reached zero!');
        remainingTime = 60;
        timer = null;
      }
    }, 600000);
  }
};

// Main handler function
export default async function handler(req : any, res: any) {
  // If the request method is GET, handle it
  if (req.method === "GET") {
    // Get the bill number and type from the query
    const bill_number = req.query.number;
    const bill_type = req.query.type;
    // If bill number is not zero, get the specific bill data and return it
    if (bill_number != 0) {
      const data = await getData(bill_number, bill_type);
      return res.status(200).json(data);
    }
    // Else, handle the timer and get the data from the database and return it
    else {
      handleTimer();
      const { data } = await supabase.from('congress').select('*, actions(number, text)');
      return res.status(200).json(data);
    }
  }
  // Else, return a 405 error
  else {
    return res.status(405).end();
  }
}
