export type DietStudyRequest = {
  id: string;
  version: string; // document/schema version
  patient: string; //	Patient id

  display_name: string;
  start_date: string;

  // About You
  weight_kg: number;
  weight_pounds: number;
  weight_unsure: boolean;
  was_pregnant: boolean;

  hours_of_sleep: number;
  shift_work: boolean;
  food_security: string;
  physical_activity: string;
  alcohol_frequency: string;
  alcohol_units: string;

  // Supplements
  takes_supplements: boolean;
  supplements_fibre: boolean;
  supplements_probiotic: boolean;
  supplements_live_probiotic_fermented: boolean;
  supplements_iron: boolean;
  supplements_calcium: boolean;
  supplements_vitamin_d: boolean;
  supplements_zinc: boolean;
  supplements_vitamin_c: boolean;
  supplements_multivitamin: boolean;
  supplements_omega3: boolean;
  supplements_garlic: boolean;
  supplements_pfnts: boolean;
  supplements_other: boolean;

  // Eating Habits
  first_calories: string;
  last_calories: string;
  eats_breakfast: boolean;
  main_meals: number;
  snacks: number;

  diet_mixed: boolean;
  diet_vegetarian: boolean;
  diet_vegan: boolean;
  diet_pescatarian: boolean;
  diet_low_carb: boolean;
  diet_low_fat: boolean;
  diet_gluten_free: boolean;
  diet_lactose_free: boolean;
  diet_low_calorie: boolean;

  // FFQ
  ffq_fruit: string;
  ffq_fruit_juice: string;
  ffq_salad: string;
  ffq_vegetables: string;
  ffq_chips: string;
  ffq_pulses: string;
  ffq_fibre_rich_breakfast: string;
  ffq_wholemeal_bread: string;
  ffq_cheese_yogurt: string;
  ffq_crisps_snacks: string;
  ffq_sweets: string;
  ffq_ice_cream: string;
  ffq_fizzy_pop: string;
  ffq_red_meat: string;
  ffq_white_meat: string;
  ffq_red_processed_meat: string;
  ffq_white_processed_meat: string;
  ffq_white_fish_battered_breaded: string;
  ffq_white_fish: string;
  ffq_oily_fish: string;
  ffq_eggs: string;
  ffq_fast_food: string;

  portions_of_fruit: number;
  glasses_of_juice: number;
  portions_of_veg: number;

  milk_whole: boolean;
  milk_semi_skimmed: boolean;
  milk_skimmed: boolean;
  milk_rarely_never: boolean;
  milk_plant: boolean;
  milk_other_sweetened: boolean;
  milk_other_unsweetened: boolean;
};
