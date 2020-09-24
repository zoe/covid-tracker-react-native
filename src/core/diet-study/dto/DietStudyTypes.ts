export enum FoodSecurityOptions {
  ALWAYS_HAD_ENOUGH = 'always_had_enough',
  ENOUGH_NOT_KINDS_WANTED = 'enough_not_kinds_wanted',
  SOMETIMES_NOT_ENOUGH = 'sometimes_not_enough',
  OFTEN_NOT_ENOUGH = 'often_not_enough',
  PFNTS = 'pfnts',
}

export enum FoodAvailabilityOptions {
  FINANCIAL_LIMITATIONS = 'lof_financial_limitations',
  SHELTER_IN_PLACE_ORDERS = 'lof_shelter_in_place',
  SHORTAGES = 'lof_shortages',
  AVOIDING_GROCERY_STORE = 'lof_anxiety',
  OTHER = 'lof_other',
}

export enum PhysicalActivityOptions {
  LESS_THAN_ONCE_A_MONTH = 'less_than_once_a_month',
  LESS_THAN_ONCE_A_WEEK = 'less_than_once_a_week',
  ONCE_A_WEEK = 'once_a_week',
  TWICE_A_WEEK = 'twice_a_week',
  THREE_TO_FOUR_A_WEEK = 'three_to_four_a_week',
  FIVE_OR_MORE = 'five_or_more_a_week',
  PFNTS = 'pfnts',
}

export enum AlcoholFrequencyOptions {
  NEVER = 'never',
  MONTHLY = 'monthly',
  TWO_TO_FOUR_A_MONTH = 'two_to_four_a_month',
  TWO_TO_THREE_A_WEEK = 'two_to_three_a_week',
  FOUR_OR_MORE_A_WEEK = 'four_or_more_a_week',
  PFNTS = 'pfnts',
}

export enum AlcoholUnitsOptions {
  ONE_TO_TWO = '1-2',
  THREE_TO_FOUR = '3-4',
  FIVE_TO_SIX = '5-6',
  SEVEN_TO_NINE = '7-9',
  TEN_OR_MORE = '10+',
  PFNTS = 'pfnts',
}

export enum FFQOptions {
  FFQ_RARELY_NEVER = 'rarely_never',
  FFQ_LESS_THAN_ONCE_A_WEEK = 'less_than_once_a_week',
  FFQ_ONCE_A_WEEK = 'once_a_week',
  FFQ_TWO_TO_THREE_A_WEEK = 'two_to_three_a_week',
  FFQ_FOUR_TO_SIX_A_WEEK = 'four_to_six_a_week',
  FFQ_ONE_TO_TWO_A_DAY = 'one_to_two_a_day',
  FFQ_THREE_TO_FOUR_A_DAY = 'three_to_four_a_day',
  FFQ_FIVE_OR_MORE_A_DAY = 'five_or_more_a_day',
}
