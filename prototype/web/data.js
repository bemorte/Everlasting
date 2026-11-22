// Everlasting prototype: content and tuning. Numbers from prototype/tuning.json and docs 02, 04, 07.
const T = {
  handSize: 8, maxPlay: 5, hands: 4, discards: 3,
  targets: [[300,450,600],[800,1200,1600],[2000,3000,4000],[5000,7500,10000],[11000,16500,22000],[20000,30000,40000],[35000,52500,70000],[50000,75000,100000]],
  eraNames: ['The Revelation','The Kingdom','The Faith Crisis'],
  eraReward: [3,4,5], startLight: 4,
  collapseStart: 20,
  dialPerCard: {
    command: {agency:-2, progress:-1, collapse:-1},
    punish:  {joy:-2, truth:1, collapse:-2},
    inspire: {progress:2, joy:1, agency:1},
    reveal:  {truth:2, redemption:2, agency:-2},
  },
  season: 11, // seconds per season at normal speed; a year is four seasons
};
const SUITS = ['command','punish','inspire','reveal'];
const SUITNAME = {command:'Command', punish:'Punish', inspire:'Inspire', reveal:'Reveal'};
const SUITCOL = {command:'#e0a23a', punish:'#c8364c', inspire:'#2fa57a', reveal:'#3f6be0'};
const DIALS = ['truth','joy','progress','redemption','agency'];
const DIALNAME = {truth:'Truth', joy:'Joy', progress:'Progress', redemption:'Redemption', agency:'Agency', collapse:'Collapse'};
const COURT = {11:{punish:'The Herald',command:'The Caller',inspire:'The Novice',reveal:'The Shell Caller'},
               12:{inspire:'The Elder',command:'The Scholar',reveal:'The Veiled',punish:'The Sage'},
               13:{reveal:'The Sovereign',command:'The Anointed',punish:'The Shepherd',inspire:'The Sun Keeper'}};

// Hands: poker names; base Witness x Glory; per-level gain when a Key is used.
const HANDS = {
  'High Card':[5,1,10,1], 'Pair':[10,2,15,1], 'Two Pair':[20,2,20,1], 'Three of a Kind':[30,3,20,2],
  'Straight':[30,4,30,3], 'Flush':[35,4,15,2], 'Full House':[40,4,25,2], 'Four Suits':[45,5,30,3],
  'Four of a Kind':[60,7,30,3], 'Straight Flush':[100,8,40,4],
  'Five of a Kind':[120,12,35,3], 'Flush House':[140,14,40,4], 'Flush Five':[160,16,50,3],
};
const SECRET = ['Five of a Kind','Flush House','Flush Five'];
// The Keys: one set of god frameworks, matched to each hand by its count of gods (doc 04).
const KEYS = {
  'High Card':['The One God','Monotheism'], 'Pair':['Light and Darkness','Dualism'], 'Two Pair':['Sky Father, Earth Mother','Divine couples'],
  'Three of a Kind':['Three in One','Trinity'], 'Straight':['King of the Gods','Ranked pantheon'], 'Flush':['All the Gods','Polytheism'],
  'Full House':['The Assembly of the Gods','Divine council'], 'Four of a Kind':['The Four Elements','Elemental religion'],
  'Four Suits':['Many Names, One God','Syncretism'], 'Straight Flush':['Becoming Divine','Theosis'],
  'Five of a Kind':['God Is All','Pantheism'], 'Flush House':['The Most High','Henotheism'], 'Flush Five':['Countless Gods','Plurality of gods'],
};

// Godhood Powers (jokers). Effects are applied in score() in game.js by id.
const POWERS = {
  still:    {name:'Still Small Voice', cost:6, text:'Inspire cards give <b>+3 Glory</b> if no Reveal card is played.', flavor:'It never raised its voice. We leaned in.', suit:'inspire'},
  pillar:   {name:'Pillar of Fire', cost:7, text:'Reveal cards give <b>\u00d71.5 Glory</b>. Each one also costs 1 Agency.', flavor:'We walked toward it all night.', suit:'reveal'},
  lawgiver: {name:'Lawgiver', cost:6, text:'Each Command card left in your hand: <b>+20 Witness</b>, 2 Agency.', flavor:'Written once, kept forever.', suit:'command'},
  refiner:  {name:"Refiner's Fire", cost:5, text:'Punish cards give <b>+2 Glory</b> and raise Truth by 2.', flavor:'What burned away was never ours.', suit:'punish'},
  gardener: {name:'Patient Gardener', cost:9, rare:true, text:'<b>+1 Glory</b> per season spent in the last Watch (up to +10).', flavor:'Nothing here was hurried.'},
  temple:   {name:'Temple Builder', cost:6, text:'<b>+5 Witness</b> to every hand for each temple your people have built.', flavor:'Stone remembers.'},
  school:   {name:'School of the Prophets', cost:5, text:'Insight left over from the Watch also turns into <b>Light</b>.', flavor:'We wrote it down so the children could argue with it.'},
  mansions: {name:'Many Mansions', cost:9, rare:true, text:'<b>+1 Power slot</b>.', flavor:'There is room.'},
  bread:    {name:'Bread of Heaven', cost:6, text:'While Joy is below 0, Inspire cards give <b>\u00d72 Glory</b>.', flavor:'In the lean year, it came anyway.', suit:'inspire'},
  shadow:   {name:'The Shadow', cost:10, rare:true, text:'<b>\u00d73 Glory</b> on every hand. Each hand played costs 3 Joy.', flavor:'It asked so little at first.'},
  harvest:  {name:'The Long Harvest', cost:6, text:'<b>+2 Glory</b> for each Watch kept this run.', flavor:'Every season added to the last.'},
  fisher:   {name:'Fisher of the Deep', cost:7, text:'While Redemption is 20 or more, Reveal and Inspire cards give <b>+10 Witness</b>.', flavor:'He came back up out of the water.'},
  wayfinder:{name:'The Wayfinder', cost:6, text:'Straights give <b>\u00d72 Glory</b>.', flavor:'One star, then the next.'},
  lamp:     {name:'The Kept Flame', cost:6, text:'Flushes give <b>+40 Witness</b> and raise Truth by 2.', flavor:'We trimmed it every night.'},
  accord:   {name:'The Accord', cost:7, text:'Four Suits gives <b>\u00d72 Glory</b>.', flavor:'Four tribes, one table.'},
};
const TABLETS = {
  command:{name:'Tablet of Command', text:'Turn up to 3 selected cards into <b>Command</b>.', n:3},
  punish: {name:'Tablet of Punish', text:'Turn up to 3 selected cards into <b>Punish</b>.', n:3},
  inspire:{name:'Tablet of Inspire', text:'Turn up to 3 selected cards into <b>Inspire</b>.', n:3},
  reveal: {name:'Tablet of Reveal', text:'Turn up to 3 selected cards into <b>Reveal</b>.', n:3},
  ash:    {name:'Tablet of Ash', text:'Remove up to 2 selected cards from your deck for good.', n:2},
  rise:   {name:'Tablet of Rising', text:'Raise the rank of up to 2 selected cards by one.', n:2},
  twin:   {name:'Tablet of the Twin', text:'Copy 1 selected card into your deck.', n:1},
};
const MANTLES = {
  patience:{name:'Mantle of Patience', cost:10, text:'<b>+1 discard</b> every Era.'},
  endurance:{name:'Mantle of Endurance', cost:10, text:'<b>+1 hand</b> every Era.'},
  plenty:{name:'Mantle of Plenty', cost:10, text:'<b>+1 hand size</b>.'},
};
const DECKS = {
  even:  {name:'The Even Deck', text:'All four suits, thirteen each. A god who keeps every door open.', suits:{command:13,punish:13,inspire:13,reveal:13}},
  law:   {name:'The Lawgiver\u2019s Deck', text:'Command twice over, no Punish. Starts with the Lawgiver.', suits:{command:26,inspire:13,reveal:13}, power:'lawgiver'},
  hidden:{name:'The Hidden God\u2019s Deck', text:'Inspire twice over, no Reveal. Starts with the Still Small Voice.', suits:{command:13,punish:13,inspire:26}, power:'still'},
};

// Trials: the boss rule of each Faith Crisis.
const TRIALS = {
  cold:   {name:'The Long Cold', text:'Hand size is one smaller.', handSize:-1},
  thorns: {name:'The Thorns', text:'Every hand has 1 less Glory.', glory:-1},
  tower:  {name:'The Tower', text:'Only hands of five cards score.', five:true},
  flood:  {name:'The Flood', text:'No discards.', discards:-9},
  famine: {name:'The Famine', text:'Only three hands.', hands:-1},
  scatter:{name:'The Scattering', text:'Flushes score nothing.', noFlush:true},
  iron:   {name:'The Iron Yoke', text:'Command cards are silent: no Witness, no effect.', debuff:'command'},
  wrath:  {name:'The Wrath', text:'Punish cards are silent.', debuff:'punish'},
  doubt:  {name:'The Doubters', text:'Inspire cards are silent.', debuff:'inspire'},
  silence:{name:'The Silence', text:'Reveal cards are silent.', debuff:'reveal'},
};

// The eight slots. Option keys -> board render number (world.js era id) and slot-lean rule.
const DISP = {
  waking:   {name:'The Waking', board:10, trial:'cold', blurb:'Caves, mammoths, the first fire. People climb out of the ground into a cold world.'},
  dawn:     {name:'Dawn', board:1, trial:'thorns', blurb:'The first family, a garden edge and a stone altar.'},
  walking:  {name:'The Walking City', board:2, trial:'tower', blurb:'A city that grows together until it is of one heart.'},
  waters:   {name:'The Waters', board:3, trial:'flood', blurb:'The rains do not stop. Some build, most laugh.'},
  covenant: {name:'The Covenant', board:4, trial:'famine', blurb:'Tents, wells and a promise counted in stars.'},
  isles:    {name:'The Far Isles', board:11, trial:'scatter', blurb:'Voyagers spread across the islands of the sea.'},
  law:      {name:'The Law', board:5, trial:'iron', blurb:'Mud-brick cities, a mountain, and words cut in stone.'},
  lotus:    {name:'The Lotus Kingdoms', board:12, trial:'wrath', blurb:'River kingdoms of carved stone and still water.'},
  vermilion:{name:'The Vermilion Gate', board:13, trial:'doubt', blurb:'Castle towns and red gates in the mountain mist.'},
  meridian: {name:'The Meridian', board:6, trial:'silence', blurb:'Roads, aqueducts, and a teacher in a far province.'},
  marble:   {name:'The Marble Cities', board:14, trial:'thorns', blurb:'Columns, theatres and an argument that never ends.'},
  otherfold:{name:'The Other Fold', board:7, trial:'scatter', blurb:'A branch carried over the sea, grown in a new land.'},
  apostasy: {name:'The Great Apostasy', board:9, trial:'silence', blurb:'The long dark. The lamp is kept by very few.'},
  keptlamp: {name:'The Kept Lamp', board:15, trial:'cold', blurb:'Libraries, domes and stars measured by hand.'},
  rebirth:  {name:'The Rebirth', board:16, trial:'tower', blurb:'Workshops, domes and painted ceilings.'},
  gathering:{name:'The Gathering', board:17, trial:'flood', blurb:'Frontier towns, wagons and a people on the move.'},
  fulness:  {name:'The Fulness', board:8, trial:'famine', blurb:'Cities of glass and steel, and every voice at once.'},
  thousand: {name:'The Thousand Years', board:18, trial:'thorns', blurb:'Timber, trams, sun and wind. A world that works.'},
  hollow:   {name:'The Hollow Years', board:19, trial:'iron', blurb:'The same science, turned on the people.'},
};
// Lean scores: dials are -100..100, collapse 0..100, cur = currencies gathered this Dispensation.
const SLOTS = [
  {name:'Before the Dawn', opts:['waking']},
  {name:'Dawn', opts:['dawn']},
  {name:'The Wandering', opts:['walking','waters','covenant','isles'], lean:{
    walking:  [(d,c)=>d.joy+c.harmony*.6, 'Harmony and Joy lead'],
    waters:   [(d,c)=>d.collapse*1.2-d.truth, 'Collapse is high and Truth is low'],
    covenant: [(d,c)=>d.truth+c.devotion*.6, 'Truth and Devotion lead'],
    isles:    [(d,c)=>d.agency+d.progress, 'Agency and Progress lead']}},
  {name:'The Law', opts:['law','lotus','vermilion'], lean:{
    law:      [(d,c)=>d.truth-d.agency*.5, 'Truth leads while Agency is strained'],
    lotus:    [(d,c)=>d.joy+d.redemption, 'Joy and Redemption lead'],
    vermilion:[(d,c)=>d.progress+c.harmony*.6-d.agency*.5, 'Progress and Harmony lead while Agency is low']}},
  {name:'The Meridian', opts:['meridian','marble'], lean:{
    meridian: [(d,c)=>d.redemption*1.5, 'Redemption leads'],
    marble:   [(d,c)=>d.agency+c.insight*.6, 'Agency and Insight lead']}},
  {name:'The Long Night', opts:['otherfold','apostasy','keptlamp'], lean:{
    otherfold:[(d,c)=>d.truth*.6+c.devotion*.4-c.towns*3, 'Truth is held by a few'],
    apostasy: [(d,c)=>-d.truth*1.4, 'Truth is low'],
    keptlamp: [(d,c)=>d.progress+c.insight*.6-Math.abs(d.truth)*.5, 'Progress and Insight lead while Truth is middling']}},
  {name:'The Awakening', opts:['rebirth','gathering'], lean:{
    rebirth:  [(d,c)=>d.progress+d.joy, 'Progress and Joy lead'],
    gathering:[(d,c)=>d.truth+d.agency, 'Truth and Agency lead']}},
  {name:'The Fulness', opts:['fulness','thousand','hollow'], lean:{
    fulness:  [(d,c)=>20, 'the default path'],
    thousand: [(d,c)=>Math.min(d.truth,d.joy,d.progress,d.redemption,d.agency)*2-d.collapse+20, 'every dial is high and Collapse is low'],
    hollow:   [(d,c)=>Math.max(d.progress-(d.joy+d.agency)/2, d.collapse-40), 'Progress outran Joy and Agency, or Collapse is high']}},
];

// The Watch: four kinds of place the people travel to (doc 07 decisions 17 to 19).
const PLACES = {
  temple:{name:'Temple', cur:'devotion', icon:'i_devotion', card:'reveal', kit:0, col:'#e9c868'},
  school:{name:'School', cur:'insight', icon:'i_insight', card:'inspire', kit:2, col:'#dfe3ea'},
  market:{name:'Market', cur:'plenty', icon:'i_plenty', card:null, kit:3, col:'#d6935a'},
  court: {name:'Court', cur:'harmony', icon:'i_harmony', card:'command', kit:5, col:'#86cba0'},
};
const CURNAME = {devotion:'Devotion', insight:'Insight', plenty:'Plenty', harmony:'Harmony'};
const SEASONS = ['Spring','Early Summer','Late Summer','Autumn','Winter'];
// Society tree, Plague Inc style. Bought with Watch currencies; lasts the whole run.
const TRAITS = [
  {id:'writing', name:'Writing', cost:{insight:8}, text:'School trips pay double Insight. Progress +5.', fx:{progress:5}},
  {id:'astronomy', name:'Astronomy', cost:{insight:16}, need:'writing', text:'Truth +6, Progress +4.', fx:{truth:6,progress:4}},
  {id:'law', name:'Law', cost:{harmony:8}, text:'Towns hold 2 more waiting travellers before unrest. Agency 4, Collapse 5.', fx:{agency:-4,collapse:-5}},
  {id:'councils', name:'Councils', cost:{harmony:16}, need:'law', text:'Agency +8. Court trips also calm Collapse.', fx:{agency:8}},
  {id:'charity', name:'Charity', cost:{plenty:8}, text:'Joy +6. Waiting travellers slowly go home.', fx:{joy:6}},
  {id:'roads', name:'Trade Roads', cost:{plenty:16}, need:'charity', text:'Believers walk 40% faster.', fx:{}},
  {id:'pilgrimage', name:'Pilgrimage', cost:{devotion:8}, text:'+2 believers who walk your paths.', fx:{}},
  {id:'missions', name:'Missionaries', cost:{devotion:16}, need:'pilgrimage', text:'New towns appear sooner. Redemption +5.', fx:{redemption:5}},
];
const VOICE = {
  wait:['"We have waited since morning. Does anyone come this way?"','"The road ends at the river and so do we."','"My mother says to be patient. My mother is tired."'],
  ink:['"Something is wrong in {t}. People stopped praying."','"They say the dark started at the well."','"Nobody walks to {t} anymore."'],
  deliver:['"I made it to the {p}. My feet hurt and I do not care."','"At the {p} they had room for me."','"We carried bread to the {p} and came back singing."'],
  prayer:['"If you are there, the rain would be nice."','"Make my son kind. I will handle the rest."','"Just a sign. A small one."','"Thank you for the harvest. Also, more harvest."'],
  build:['"They raised a {p} in {t}! The whole town came."','"Stone on stone, until it stood."'],
  idle:['"If the river is yours, why does it take our children?"','"Grandfather says the stars are lamps. Grandmother says they are holes."','"I think someone is watching. In a nice way."','"We named the hill after you. We hope that is all right."'],
};
const NAMEBITS = [['Ar','Bel','Cor','Dun','El','Fen','Gal','Hes','Ir','Ka','Lor','Mir','Nef','Or','Pel','Ser','Tal','Ul','Ven','Zar','Ash','Bry','Cal','Dor'],['a','e','i','o','u','ae','ia'],['n','th','ros','m','l','dor','vin','sa','ra','nel','mos','rith']];
const ROLES = ['potter','herder','weaver','midwife','well-digger','fisher','stone-cutter','scribe','miller','child','widow','trader','healer','singer','builder','soldier'];
// The people name their god themselves (memory: names are not fixed by us). Stand-in for the model: pick from what they saw.
const GODNAMES = {
  command:['the High King','the One Who Sets the Bounds','the Lawgiver on the Mountain','the Great Judge of the Gate'],
  punish:['the Fire Above','the One Who Weighs','the Storm Father','the Refiner'],
  inspire:['the Quiet One','the Giver of Rain','the Friend in the Field','the One Who Whispers'],
  reveal:['the Voice in the Light','the Face Above the Clouds','the One Who Came Down','the Bright Watcher'],
};
