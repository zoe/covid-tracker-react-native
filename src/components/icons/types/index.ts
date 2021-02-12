// Todo: write node script to generate this list from selection.json

export type TIconName =
  | '404'
  | 'age'
  | 'apple-info'
  | 'apple'
  | 'arrow_back_ios'
  | 'arrow_forward_ios'
  | 'asian'
  | 'bagel'
  | 'bed-off'
  | 'bed'
  | 'big-arrow-down'
  | 'big-arrow-left'
  | 'big-arrow-right'
  | 'big-arrow-up'
  | 'bin'
  | 'binder'
  | 'blog'
  | 'blood-fat'
  | 'blood-hemoblobin'
  | 'blood-sugar'
  | 'blood'
  | 'bmi'
  | 'bold-arrow-up'
  | 'booze'
  | 'box'
  | 'bread--jam'
  | 'bread-no'
  | 'breakfast-centre'
  | 'breakfast-low'
  | 'breakfast-photo'
  | 'BS-1-gap'
  | 'BS-2-gaps-high'
  | 'BS-2-gaps-low'
  | 'BS-no-gap'
  | 'burger'
  | 'buy'
  | 'calculator-1'
  | 'calculator'
  | 'calendar-add'
  | 'calendar-apple-left'
  | 'calendar-mango'
  | 'calendar-tick'
  | 'calendar'
  | 'call'
  | 'camera-add'
  | 'camera'
  | 'carbs-cross'
  | 'carbs-off'
  | 'carbs-tick'
  | 'carbs'
  | 'carousel'
  | 'chat-feedback'
  | 'chat-medical'
  | 'chat-question'
  | 'chat'
  | 'close-large'
  | 'close-small'
  | 'coffee'
  | 'combine'
  | 'compass'
  | 'connection'
  | 'cooking-instructions-add'
  | 'cooking-instructions'
  | 'cooking-photo-angle'
  | 'cooking-photo-straight-add'
  | 'cooking-photo-straight'
  | 'cooking'
  | 'copy'
  | 'crackers'
  | 'crisps'
  | 'cuisine'
  | 'cycle'
  | 'danger'
  | 'dessert'
  | 'diary'
  | 'dietary-inflammation-1'
  | 'dietary-inflammation-2'
  | 'dietary-inflammation-3'
  | 'dinner-centre'
  | 'dinner-low'
  | 'dna'
  | 'docs'
  | 'edit-left-sharp'
  | 'edit-left'
  | 'edit-right-sharp'
  | 'edit-right'
  | 'email'
  | 'equal-1'
  | 'equal-2'
  | 'error_outline'
  | 'facebook-outline'
  | 'fat-off'
  | 'fat'
  | 'fibre-cross'
  | 'fibre-tick'
  | 'fibre'
  | 'file-folder'
  | 'finger-prick'
  | 'flexible-work'
  | 'fortified-wine'
  | 'framework'
  | 'french'
  | 'get-fit-noom'
  | 'glass-food-add'
  | 'glass-food'
  | 'glass-water'
  | 'goal'
  | 'graph-1'
  | 'graph-2'
  | 'graph-3'
  | 'gut-close'
  | 'gut-off'
  | 'gut-plus'
  | 'gut-tick'
  | 'gut'
  | 'health-insurance'
  | 'heart-off'
  | 'heart-risk'
  | 'heart'
  | 'hemoblobin'
  | 'holiday'
  | 'icecream-1'
  | 'icecream-2'
  | 'indian'
  | 'inflammation'
  | 'info'
  | 'instagram-outline'
  | 'italian'
  | 'jam-no'
  | 'laptop'
  | 'life-insurance'
  | 'life'
  | 'link-s'
  | 'link'
  | 'linkedin-outline'
  | 'location'
  | 'lock-1'
  | 'lock-2'
  | 'log-out'
  | 'long-term-health'
  | 'loose-weight-1'
  | 'lose-weight-2'
  | 'lunch-centre-plus'
  | 'lunch-center'
  | 'lunch-low'
  | 'lunch-tick'
  | 'mango'
  | 'maximize'
  | 'meat'
  | 'mediterranean'
  | 'menu-dots-bottom'
  | 'menu-dots-centre-h'
  | 'menu-dots-centre-v'
  | 'menu-dots-right-v'
  | 'menu-left-aligned'
  | 'menu-left-F'
  | 'menu-right-aligned'
  | 'microbes'
  | 'microscope'
  | 'muffin'
  | 'mute'
  | 'noodles'
  | 'nose-swab-test'
  | 'other-test'
  | 'pause'
  | 'pending'
  | 'people'
  | 'pescatarian'
  | 'phone'
  | 'photo-add'
  | 'photo-edit'
  | 'photo'
  | 'photos'
  | 'pie'
  | 'pinch'
  | 'pint'
  | 'pizza'
  | 'plan-large'
  | 'plan'
  | 'plates'
  | 'play'
  | 'plus'
  | 'polyphenols'
  | 'poop'
  | 'popcorn'
  | 'pretzel-1'
  | 'pretzel'
  | 'print'
  | 'processed-none'
  | 'processed'
  | 'profile-1'
  | 'profile-2'
  | 'profile-info'
  | 'protein'
  | 'question-mark'
  | 'quote'
  | 'ratio'
  | 'recommendation'
  | 'remove'
  | 'remove1'
  | 'reply'
  | 'report'
  | 'retrain'
  | 'run-chunky'
  | 'run'
  | 'salt'
  | 'scan'
  | 'search'
  | 'settings'
  | 'share'
  | 'shot'
  | 'show-off'
  | 'show-on'
  | 'sleep'
  | 'snacks-centre'
  | 'snacks-low'
  | 'sort-cards'
  | 'sort-list'
  | 'spanish'
  | 'spit-test'
  | 'splash'
  | 'star'
  | 'sugar-1'
  | 'sugar-2'
  | 'survey'
  | 'swap'
  | 'sweet'
  | 'syringe'
  | 'taco'
  | 'test-blood'
  | 'test-gut'
  | 'test-muffins'
  | 'test'
  | 'thrive'
  | 'tick-double'
  | 'tick'
  | 'tier1'
  | 'tier2'
  | 'tier3'
  | 'time'
  | 'twitter-outline'
  | 'uni-1'
  | 'uni-2'
  | 'unmute'
  | 'vegan'
  | 'vegetarian'
  | 'video'
  | 'weight'
  | 'whatsapp-outline'
  | 'wine-bottle'
  | 'wine-large'
  | 'wine-medium'
  | 'yoga';
