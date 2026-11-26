/* ============================================================
   EXPANSION CONTENT: fruits, fruit-bearers, weapons, styles,
   starting paths, threat tiers, hidden mission seeds.
   ============================================================ */

/* ---- 13 new fruits (brings the world to 30) ---- */
WORLD_SEED.fruits.push(
  { id: "kuki", name: "Kuki Kuki no Mi", eng: "Air-Air Fruit", type: "Paramecia", holder: "none", location: "frostmark", known: false, starter: true, color: "#bfe6ff",
    power: "Shape the air you touch or breathe out: air-steps to run on the sky, pressure cannons, vacuum fists that suck the breath from lungs, invisible air shields, and pops that burst eardrums.",
    limit: "No body transformation. Needs breath or touch to shape air; a seastone gag or a sealed room shuts it down.", cost: "Your pressure bursts ping Iron Tide barometer-snails. Patrols can track big uses." },
  { id: "doro", name: "Doro Doro no Mi", eng: "Mud-Mud Fruit", type: "Logia", holder: "none", location: "galeharrow", known: false, starter: true, color: "#8a6a3f",
    power: "Become and control mud: swamp traps that swallow enemies, mud golems, mud-slide travel, and a body that absorbs blows like a bog.",
    limit: "Sun and fire bake the mud brittle. Dried out, it cracks and hurts.", cost: "You leave a muddy trail anywhere you rest. You are easy to track." },
  { id: "kessho", name: "Kesshō Kesshō no Mi", eng: "Crystal-Crystal Fruit", type: "Logia", holder: "none", location: "hundred_bells", known: false, starter: true, color: "#9fe8ff",
    power: "Become living crystal: diamond-hard armor, crystal spears, and prisms that bend sunlight into cutting lasers.",
    limit: "Sound and vibration shatter crystal. Bells, shouts, and drums hurt.", cost: "Loud noises make you flinch. Monks of Hundred Bells see you as an omen." },
  { id: "chi", name: "Chi Chi no Mi", eng: "Blood-Blood Fruit", type: "Paramecia", holder: "none", location: "undertow", known: false, starter: true, color: "#c0303a",
    power: "Control your own blood and any blood you touch: blood whips, instant clotting, blood-armor, and a blood-sense that feels every heartbeat nearby.",
    limit: "Every technique costs your own blood. Push too far and you faint.", cost: "Start with 10 less max HP." },
  { id: "nami", name: "Nami Nami no Mi", eng: "Wave-Wave Fruit", type: "Paramecia", holder: "none", location: "moonmaw", known: false, starter: true, color: "#3fa0e0",
    power: "Send waves through anything: ripple the ground into tidal waves of stone, shake bodies from inside, ride wave-pulses across the air.",
    limit: "A wave that hits something denser than its medium rebounds into you.", cost: "Your heartbeat sends faint ripples through water. Sea Kings notice you." },
  { id: "inu_fenrir", name: "Inu Inu no Mi, Model: Fenrir", eng: "Dog-Dog Fruit, Model: Fenrir", type: "Mythical Zoan", holder: "none", location: "emberwake", known: false, starter: true, color: "#9aa4b8",
    power: "Become the world-devouring wolf: huge strength, a howl that shakes Haki, and jaws that bite through Logia bodies as if they were solid.",
    limit: "When badly hurt, the wolf's rage takes over and you can't tell friend from foe.", cost: "The rage is already in you. Losing your temper risks a partial transformation." },
  { id: "kagero", name: "Kagerō Kagerō no Mi", eng: "Mirage-Mirage Fruit", type: "Logia", holder: "none", location: "galeharrow", known: false, starter: true, color: "#ffb36b",
    power: "Become heat-haze: mirage doubles, false landscapes, a shimmering body attacks pass through, and burning heat-shimmer blades.",
    limit: "Rain and cold break the illusion. Observation Haki sees through mirages.", cost: "Your body runs hot. Cold seas sap your strength." },
  { id: "hari", name: "Hari Hari no Mi", eng: "Needle-Needle Fruit", type: "Paramecia", holder: "none", location: "ironhold", known: false, starter: true, color: "#c9c9d6",
    power: "Grow and launch needles from anywhere on your body: needle storms, needle armor, and stitching wounds shut in seconds.",
    limit: "Each volley draws on your body's iron. Too many leave you pale and weak.", cost: "Needles sometimes poke through your skin when you're scared." },
  { id: "uzu", name: "Uzu Uzu no Mi", eng: "Whirlpool-Whirlpool Fruit", type: "Paramecia", holder: "none", location: "corsairs_rest", known: false, starter: true, color: "#2fc4c4",
    power: "Create whirlpools in water, air, or the ground: drag ships under, spin tornado-kicks, and twist enemies into vortex prisons.",
    limit: "You get dizzy; big whirlpools leave you vomiting and dazed.", cost: "Seasickness. Every voyage starts rough for you." },
  { id: "kumo_jorogumo", name: "Kumo Kumo no Mi, Model: Jorōgumo", eng: "Spider-Spider Fruit, Model: Jorōgumo", type: "Mythical Zoan", holder: "none", location: "sunken_reach", known: false, starter: true, color: "#ff6a3d",
    power: "Become the spider-yokai: six extra limbs, burning fire-silk webs, wall-walking, and a beguiling voice that confuses the weak-willed.",
    limit: "The fire-silk is hard to control. It burns allies and ships if you panic.", cost: "People who see your hybrid form panic. Villages may drive you out." },
  { id: "tora_byakko", name: "Tora Tora no Mi, Model: Byakko", eng: "Tiger-Tiger Fruit, Model: Byakko", type: "Mythical Zoan", holder: "none", location: "hundred_bells", known: false, starter: true, color: "#f2f2f2",
    power: "Become the white tiger of the west: a roar that becomes cutting wind, claws of metal-hard Haki affinity, and blinding speed.",
    limit: "Panics in tight enclosed spaces. Hates water more than other users.", cost: "Hundred Bells monks consider Byakko holy. They want it back." },
  { id: "hoshi", name: "Hoshi Hoshi no Mi", eng: "Star-Star Fruit", type: "Logia", holder: "none", location: "aurelion (Gilded Vault)", known: false, color: "#fff2a8",
    power: "Become starlight: blinding speed of light-motion, star-fire, and at full mastery calling meteors from the sky.",
    limit: "Legendary. Draining beyond belief; the previous user burned out in a year." },
  { id: "shika_kirin", name: "Shika Shika no Mi, Model: Kirin", eng: "Deer-Deer Fruit, Model: Kirin", type: "Mythical Zoan", holder: "none", location: "hundred_bells (Cloud Shrine)", known: false, color: "#a8ffcf",
    power: "Become the Kirin: walk on clouds, judge the guilty with lightning, and sense lies.",
    limit: "Cannot strike someone it judges innocent." }
);
// the Archelon becomes a starter fruit too, and the auction now sells something else
(() => {
  const k = WORLD_SEED.fruits.find((f) => f.id === "kame_archelon");
  k.starter = true; k.limit = "Slow on land, and the shell makes you a target for collectors."; k.cost = "Collectors from the Cinder Exchange want your shell.";
  const a = WORLD_SEED.events.find((e) => e.id === "cinder_auction");
  a.desc = "The Cinder Exchange auctions an Echo Stone, a Grade Blade, and 'living lots' at Galeharrow.";
  a.effects = { threads: [{ id: "hollow_crown", stage: 1 }] };
})();
// costs for the original starters
Object.assign(WORLD_SEED.fruits.find((f) => f.id === "hibi"), { cost: "Hairline cracks run up your arms after every big move.", color: "#d9d2c0" });
Object.assign(WORLD_SEED.fruits.find((f) => f.id === "sumi"), { cost: "Your fingertips are permanently ink-black. Easy to identify.", color: "#30304a" });
Object.assign(WORLD_SEED.fruits.find((f) => f.id === "koku"), { cost: "You already lost a year of your life eating it. A grey streak marks your hair.", color: "#e6a93d" });
Object.assign(WORLD_SEED.fruits.find((f) => f.id === "tenbin"), { cost: "Every unfair trade you witness makes your head throb.", color: "#e0c46a" });
Object.assign(WORLD_SEED.fruits.find((f) => f.id === "fuin"), { cost: "You must carry paper everywhere. Rain is your enemy.", color: "#f0e6c8" });
Object.assign(WORLD_SEED.fruits.find((f) => f.id === "neko_bakeneko"), { cost: "Salt circles and shrine wards burn you. Superstitious villagers fear you.", color: "#7a5cff" });
Object.assign(WORLD_SEED.fruits.find((f) => f.id === "kame_archelon"), { color: "#4f9a6a" });

/* ---- fruit-bearers: if you don't pick a starter fruit, its bearer ate it ---- */
const BEARERS = [
  { fruit: "hibi", id: "dax_hollin", name: "Dax Hollin", epithet: "Faultline", role: "dockside brawler", location: "corsairs_rest",
    desc: "A huge, quiet bruiser who works the gambling barges as a debt-breaker and hates every second of it.", goal: "Pay off his mother's debt to the Cinder Exchange.", secret: "He breaks legs for the house but secretly warns marks the night before.", join: "Free his mother from the barge debt." },
  { fruit: "sumi", id: "lio_penwright", name: "Lio Penwright", epithet: "the Inkblot", role: "forger and artist", location: "galeharrow",
    desc: "A jittery genius forger with ink up to the elbows and a joke for every occasion.", goal: "Draw the first true map of the Wound.", secret: "He forges Concord pardons for refugees and is one mistake from the gallows.", join: "Promise him a voyage through the Wound." },
  { fruit: "koku", id: "mother_sable", name: "Mother Sable", epithet: "the Borrowed Years", role: "fortune teller", location: "moonmaw",
    desc: "An old woman with a young woman's laugh who reads tides for coins.", goal: "Win back the years she lost.", secret: "She is only nineteen. Using her powers to save the cult's children aged her.", join: "Find a way to return stolen time." },
  { fruit: "tenbin", id: "orrin_vale", name: "Judge Orrin Vale", epithet: "the Last Fair Scale", role: "disgraced Concord magistrate", location: "lanterngate",
    desc: "A grey, stern man in a threadbare robe who settles refugee disputes for free.", goal: "Put Ysolde on trial for the Refugee Purge.", secret: "He signed the Purge order before he understood it. He has the original document.", join: "Show him real proof you fight for justice." },
  { fruit: "fuin", id: "pip_talisman", name: "Pip", epithet: "Talisman", role: "street kid paper-seller", location: "corsairs_rest",
    desc: "A tiny, fast-talking kid who sells lucky paper charms and seals stolen goods into them.", goal: "See a sky island before growing up.", secret: "Pip has sealed a stolen Echo Stone fragment inside a charm and doesn't know what it is.", join: "Protect Pip from the barge bosses." },
  { fruit: "neko_bakeneko", id: "shiori_kurobane", name: "Shiori Kurobane", epithet: "Two-Tail", role: "ghost-cat thief", location: "frostmark",
    desc: "A lazy, smug cat-burglar who steals only from the rich and naps on rooftops.", goal: "Rob the Gilded Vault of Aurelion.", secret: "She already stole a vault key once and lost it in a card game.", join: "Offer her a shot at Aurelion's vault." },
  { fruit: "kuki", id: "aiko_nakaze", name: "Aiko Nakaze", epithet: "Pressure Drop", role: "sky-courier kid", location: "frostmark",
    desc: "A breathless fourteen-year-old courier who runs letters across the sky on air-steps.", goal: "Fly over the Red Line on her own breath.", secret: "She carries Unchained Dawn messages without knowing what they say.", join: "Take her somewhere higher than she's ever been." },
  { fruit: "doro", id: "mags_mudlark", name: "Mags", epithet: "the Mudlark", role: "harbor thief", location: "galeharrow",
    desc: "A grinning harbor thief who sinks into the mud to escape and smells faintly of swamp.", goal: "Find a crew that won't sell her out.", secret: "Her last crew sold her to the Cinder Exchange. She escaped and they still hunt her.", join: "Stand by her when her old crew comes calling." },
  { fruit: "kessho", id: "brother_calix", name: "Brother Calix", epithet: "the Prism Monk", role: "crystal-carver monk", location: "hundred_bells",
    desc: "A gentle monk who carves prayer crystals and talks to light.", goal: "Stop the war between the Storm Thrones.", secret: "He knows Jun Kagari started the provocations.", join: "Help him expose the war's lie." },
  { fruit: "chi", id: "vesper_lune", name: "Doctor Vesper Lune", epithet: "the Red Surgeon", role: "Undertow prison medic", location: "undertow",
    desc: "A cold, brilliant surgeon in a blood-red coat who treats prisoners nobody else will.", goal: "Empty the Undertow, one 'dead' prisoner at a time.", secret: "She fakes prisoners' deaths and smuggles them out in body bags.", join: "Break the Undertow open with her." },
  { fruit: "nami", id: "kai_ressac", name: "Kai Ressac", epithet: "Tidebreaker", role: "surfer-pirate", location: "moonmaw",
    desc: "A loud, sunburned surfer-pirate who challenges everyone to wave races.", goal: "Ride the current through the Wound.", secret: "He is the runaway heir of a Concord noble house.", join: "Beat him in a wave race, or save his board." },
  { fruit: "inu_fenrir", id: "varga_holt", name: "Varga Holt", epithet: "the Chained Wolf", role: "Cinder Exchange pit fighter", location: "emberwake",
    desc: "A chained, silent fighter who has never lost a pit match.", goal: "Freedom. Then revenge on whoever sold him.", secret: "Old Ash keeps him in seastone chains between fights.", join: "Break his chains." },
  { fruit: "kagero", id: "selene_ashar", name: "Selene Ashar", epithet: "the Mirage Dancer", role: "stage performer", location: "galeharrow",
    desc: "A dazzling dancer whose shows end with the whole audience seeing different stories.", goal: "Be free of every master she's ever had.", secret: "She is an Unchained Dawn spy reporting to the Cartographer.", join: "Help the Dawn, or protect her cover." },
  { fruit: "hari", id: "tailor_brisk", name: "Old Brisk", epithet: "Pincushion", role: "Iron Tide uniform tailor", location: "ironhold",
    desc: "A tiny, sharp-tongued old tailor who has stitched every Admiral's coat.", goal: "Get his apprentices out of Ironhold alive.", secret: "He sews Tidewall blueprints into coat linings and leaks them to the Dawn.", join: "Protect his apprentices." },
  { fruit: "uzu", id: "mara_gyre", name: "Captain Mara Gyre", epithet: "Maelstrom", role: "smuggler captain", location: "corsairs_rest",
    desc: "A smirking smuggler captain who never pays a toll and always pays her crew.", goal: "Break the Cinder Exchange's grip on the South Blue.", secret: "She owes Old Ash a single favor, and he hasn't called it in yet.", join: "Win her respect in a deal or a duel." },
  { fruit: "kumo_jorogumo", id: "itzel_silkfire", name: "Itzel", epithet: "Silkfire", role: "exile weaver", location: "sunken_reach",
    desc: "A soft-spoken exile who weaves burning silk lanterns at the edge of the Matriarch's domain.", goal: "Revenge on Warden Grail, who cursed her sister.", secret: "She knows a secret tunnel into the Undertow.", join: "Promise to help her reach Grail." },
  { fruit: "tora_byakko", id: "hakuen", name: "Hakuen", epithet: "White Roar", role: "Hundred Bells sky monk", location: "hundred_bells",
    desc: "A proud young monk who believes he is the Abbot's chosen successor.", goal: "Prove himself to the Thunder Abbot.", secret: "He doubts the war and hates himself for it.", join: "Defeat him honorably, then show him a better cause." },
  { fruit: "kame_archelon", id: "moe_turtleback", name: "Big Moe", epithet: "Turtleback", role: "auction-house porter", location: "galeharrow",
    desc: "A huge, gentle porter who carries auction lots and apologizes to furniture.", goal: "See the bottom of the ocean.", secret: "He ate the Archelon fruit by accident while guarding it. The Cinder Exchange wants it back from his corpse.", join: "Protect him from the Exchange's collectors." }
];

/* ---- weapons ---- */
const WEAPONS = [
  // 20 sword types (starting grade)
  { id: "katana", name: "Katana", kind: "sword", grade: "Fine", desc: "Curved, single-edged, fast draw." },
  { id: "nodachi", name: "Nodachi", kind: "sword", grade: "Common", desc: "Huge field sword, long reach, slow." },
  { id: "wakizashi_pair", name: "Wakizashi pair", kind: "sword", grade: "Common", desc: "Two short blades for close fighting." },
  { id: "cutlass", name: "Cutlass", kind: "sword", grade: "Common", desc: "A sailor's hacking blade. Good in cramped decks." },
  { id: "sabre", name: "Cavalry sabre", kind: "sword", grade: "Fine", desc: "Curved slashing blade with a knuckle guard." },
  { id: "rapier", name: "Rapier", kind: "sword", grade: "Fine", desc: "Thin, precise thrusting sword." },
  { id: "broadsword", name: "Broadsword", kind: "sword", grade: "Common", desc: "Wide double edge, reliable." },
  { id: "zweihander", name: "Zweihänder", kind: "sword", grade: "Common", desc: "Two-handed greatsword that clears decks." },
  { id: "falchion", name: "Falchion", kind: "sword", grade: "Common", desc: "Heavy-tipped chopper." },
  { id: "scimitar", name: "Scimitar", kind: "sword", grade: "Fine", desc: "Deep curve, flowing cuts." },
  { id: "claymore", name: "Claymore", kind: "sword", grade: "Common", desc: "Northern two-hander with a cross guard." },
  { id: "jian", name: "Jian", kind: "sword", grade: "Fine", desc: "Straight, balanced double-edge for elegant styles." },
  { id: "dao", name: "Dao", kind: "sword", grade: "Common", desc: "Single-edged broad saber." },
  { id: "chain_sword", name: "Chain-sword", kind: "sword", grade: "Fine", desc: "Segmented blade that unfurls on a chain." },
  { id: "whip_sword", name: "Whip-sword", kind: "sword", grade: "Fine", desc: "Flexible steel ribbon blade. Hard to master." },
  { id: "seaking_tooth", name: "Sea King tooth blade", kind: "sword", grade: "Fine", desc: "A serrated fang ground into a sword." },
  { id: "hook_swords", name: "Twin hook swords", kind: "sword", grade: "Common", desc: "Hooked blades that lock together." },
  { id: "cane_sword", name: "Cane sword", kind: "sword", grade: "Fine", desc: "A gentleman's walking stick hiding a blade." },
  { id: "cleaver_blade", name: "Giant cleaver-blade", kind: "sword", grade: "Common", desc: "A butcher's cleaver the size of a door." },
  { id: "saltsteel", name: "Saltsteel blade", kind: "sword", grade: "Fine", desc: "Forged on Brinemoor; never rusts in seawater." },
  // 8 guns
  { id: "flintlock_pair", name: "Flintlock pair", kind: "gun", grade: "Common", desc: "Two single-shot pistols. Reload drills matter." },
  { id: "long_rifle", name: "Long rifle", kind: "gun", grade: "Fine", desc: "Accurate at a mast's length and beyond." },
  { id: "blunderbuss", name: "Blunderbuss", kind: "gun", grade: "Common", desc: "Short-range scattershot cannon." },
  { id: "harpoon_gun", name: "Harpoon gun", kind: "gun", grade: "Common", desc: "Spring-fired harpoon on a line." },
  { id: "revolver", name: "Six-shot revolver", kind: "gun", grade: "Fine", desc: "Rare rotating-cylinder pistol." },
  { id: "hand_cannon", name: "Hand-cannon", kind: "gun", grade: "Common", desc: "Shoulder-fired mini cannon. Huge recoil." },
  { id: "dial_pistol", name: "Dial-pistol", kind: "gun", grade: "Fine", desc: "Sky-tech pistol that fires stored wind or flame." },
  { id: "bone_crossbow", name: "Sea King bone crossbow-gun", kind: "gun", grade: "Fine", desc: "Silent repeating bolts from bone limbs." },
  // 6 other weapons
  { id: "gauntlets", name: "Iron gauntlets", kind: "other", grade: "Common", desc: "Spiked knuckles for brawlers." },
  { id: "staff", name: "Ironwood staff", kind: "other", grade: "Common", desc: "Long reach, sweeping strikes." },
  { id: "kusarigama", name: "Kusarigama", kind: "other", grade: "Fine", desc: "Sickle on a weighted chain." },
  { id: "war_fans", name: "Steel war fans", kind: "other", grade: "Fine", desc: "Bladed fans for dancers and tricksters." },
  { id: "anchor_chain", name: "Anchor-chain", kind: "other", grade: "Common", desc: "A small anchor swung on chain." },
  { id: "boarding_axe", name: "Boarding axe", kind: "other", grade: "Common", desc: "Hooks rails, splits doors and skulls." }
];
// named blades hidden in the world (the GM knows where they are)
const NAMED_WEAPONS = [
  { id: "tidecutter", name: "Tidecutter", kind: "sword", grade: "Legendary", location: "the_wound", holder: "none", desc: "A katana said to have cut the first ship through the Wound. Lies in the wreck of a Mariejois palace." },
  { id: "lanterns_vow", name: "Lantern's Vow", kind: "sword", grade: "Grade Blade", location: "lanterngate", holder: "mireille_osei", desc: "A Marine officer's sabre that burns blue with its wielder's Haki." },
  { id: "bell_breaker", name: "Bell-Breaker", kind: "sword", grade: "Grade Blade", location: "hundred_bells", holder: "jun_kagari", desc: "A black nodachi that cuts without sound." },
  { id: "cinderfang", name: "Cinderfang", kind: "sword", grade: "Grade Blade", location: "galeharrow", holder: "none", desc: "A smoldering scimitar up for auction at the Cinder Auction." },
  { id: "gravemoon", name: "Gravemoon", kind: "sword", grade: "Legendary", location: "moonmaw", holder: "none", desc: "A pale crescent blade sealed in the drowned shrine, said to cut eclipses." },
  { id: "judgment_rifle", name: "Verdict", kind: "gun", grade: "Grade Blade", location: "ironhold", holder: "tamsin_vey", desc: "Admiral Vey's frost-engraved long rifle." },
  { id: "salt_kings_saber", name: "Salt King's Saber", kind: "sword", grade: "Grade Blade", location: "brinemoor", holder: "rook_danvers", desc: "A saltsteel saber Danvers took from Saltcradle's founder. The village wants it back." },
  { id: "starless", name: "Starless", kind: "sword", grade: "Legendary", location: "aurelion", holder: "ysolde", desc: "A blade of black meteor iron mounted above the Regent's throne." }
];

/* ---- fighting styles (replaces the original short list) ---- */
STYLES.length = 0;
STYLES.push(
  { name: "Twin-blade Dance", note: "Two swords, constant motion. Great offense, weak to heavy single blows." },
  { name: "One-blade Iai Draw", note: "Sheathed-draw strikes faster than the eye. Devastating first hit, struggles in long brawls." },
  { name: "Gunslinger 'Powder Waltz'", note: "Pistols and footwork. Deadly at range, vulnerable when reloading." },
  { name: "Gun-kata", note: "Pistol in one hand, blade in the other. Versatile, master of none." },
  { name: "Marine Six-Form", note: "Deserter martial art: iron body, air-kicks, flash-steps. Disciplined, predictable." },
  { name: "Fish-folk Sea Karate", note: "Strikes that move the water in the body. Brutal in the sea, decent on land." },
  { name: "Sky-monk Staff", note: "Staff spins that ride the wind. Great reach and defense." },
  { name: "Chef's Kick Art", note: "Hands never fight, legs do everything. Fast, but a hand injury doesn't stop you." },
  { name: "Bare-fist Brawler", note: "Toughness and raw punches. Simple, hard to knock down." },
  { name: "Sniper's Patience", note: "Long-range precision. Weak up close." },
  { name: "Trickster", note: "Traps, lies, and dirty tricks. Wins fights before they start." },
  { name: "Greatsword Breaker", note: "One huge blade, armor-crushing swings. Slow recovery." },
  { name: "Chain Dancer", note: "Chains and kusarigama, whirling control. Hard to approach." },
  { name: "Harpoon Hunter", note: "Sea-beast hunting techniques. Great vs giants." },
  { name: "Fan & Veil", note: "War fans and misdirection, deflecting blows. Elegant, low raw power." },
  { name: "Scholar's Hidden Blade", note: "Analysis first, one precise cut. Weak in a chaotic melee." }
);

/* ---- starting paths with consequences ---- */
const STARTS = [
  { id: "stolen", req: "fruit", title: "Stole it from Danvers' strongbox",
    text: "You broke into the garrison strongbox and ate what was inside before you were caught. You barely escaped.",
    cons: "Danvers hates you. Iron Tide suspicious. Start hurt, ฿3,000,000 bounty. Tithe Day comes a day early.",
    effects: { player: { hp: -20, bounty: 3000000 }, npcs: [{ id: "rook_danvers", disposition: -40, note: "Hunting the thief who stole from his strongbox." }], factions: [{ id: "iron_tide", attitude: -15 }], events: [{ id: "tithe_day", action: "accelerate", day: 2 }] },
    hook: "The player stole and ate a Devil Fruit from Danvers' garrison strongbox last night and barely escaped wounded; soldiers are searching Saltcradle door to door." },
  { id: "credit", req: "fruit", title: "Bought it on credit from the Cinder Exchange",
    text: "A smiling broker sold you the fruit for a signature. The fine print is in ash-ink.",
    cons: "Berries wiped out. You owe ฿50,000,000. A debt collector arrives on Day 6.",
    effects: { player: { berries: -3000, add_items: ["Cinder Exchange debt marker: ฿50,000,000 owed"] }, factions: [{ id: "cinder_exchange", attitude: -10, note: "The player owes them 50 million." }],
      new_events: [{ id: "debt_collector", day: 6, title: "The debt collector arrives", desc: "A Cinder Exchange collector (or Nessa Thorne on contract) comes to Brinemoor to take payment in berries, service, or flesh.", public: false }] },
    hook: "The player bought their Devil Fruit on credit from a Cinder Exchange broker and owes 50,000,000 berries. Repayment is due soon." },
  { id: "shrine", req: "fruit", title: "Found it in a Moonmaw shrine chest",
    text: "A shrine chest washed up on Brinemoor's shore. You ate the fruit inside. Now strangers in tide-robes watch you.",
    cons: "The Tide-Cult has marked you as their eclipse sacrifice. Kaeli has heard of you.",
    effects: { npcs: [{ id: "kaeli_moss", note: "Heard a fruit from the drowned shrine was eaten by someone in Brinemoor." }],
      events: [{ id: "blood_eclipse", action: "alter", desc: "The drowned shrine opens for one night. The Tide-Cult intends to sacrifice the player, who ate a fruit from their shrine." }],
      new_events: [{ id: "cult_hunters", day: 5, title: "Tide-Cult hunters reach Brinemoor", desc: "Two masked tide-priests come to take the player to Moonmaw alive.", public: false }] },
    hook: "The player ate a Devil Fruit from a shrine chest that drifted from Moonmaw. The Tide-Cult has marked them as the sacrifice for the coming blood eclipse; masked watchers have been seen." },
  { id: "childhood", req: "fruit", title: "Ate it as a child",
    text: "You ate it at age six, thinking it was a weird melon. Saltcradle grew up with your power.",
    cons: "The village trusts you. Danvers watches you closely. You start with real control.",
    effects: { player: { mastery: 10 }, npcs: [{ id: "old_pell", disposition: 10 }, { id: "rook_danvers", disposition: -10, note: "Keeps a file on the village's fruit user." }] },
    hook: "The player has had their Devil Fruit since childhood. All of Saltcradle knows; Danvers keeps a close eye on them as a 'potential asset or threat'." },
  { id: "apprentice", req: "nofruit", title: "Haki apprentice to Old Pell",
    text: "Pell has been beating Haki into you since you could walk, without ever explaining why he knows it.",
    cons: "Start with real Observation and Armament Haki. Pell trusts you deeply.",
    effects: { player: { observation: 8, armament: 4 }, npcs: [{ id: "old_pell", disposition: 20, note: "Trained the player in Haki for years." }] },
    hook: "The player is Old Pell's secret Haki apprentice. They have basic Observation and Armament Haki, which no salt-raker should know." },
  { id: "runaway", req: "nofruit", title: "Blue Oath runaway",
    text: "You were a cabin hand on a Blue Oath ship that the Iron Tide sank. You washed up on Brinemoor with a coded letter.",
    cons: "Blue Oath trusts you, Iron Tide wants you. ฿1,000,000 bounty. You know where Lanterngate's hideout is.",
    effects: { player: { bounty: 1000000, add_items: ["Waterlogged coded letter addressed to 'Lantern'"] }, factions: [{ id: "blue_oath", attitude: 25 }, { id: "iron_tide", attitude: -20 }], npcs: [{ id: "mireille_osei", disposition: 15, note: "Expecting a letter from a missing ship." }] },
    hook: "The player is a Blue Oath runaway, the only survivor of a sunk ship, carrying a coded letter for Mireille 'Lantern' Osei. The Iron Tide wants them." },
  { id: "partner", req: "nofruit", title: "Suri's partner",
    text: "You and Suri have spent two years building a boat out of salt-iron scraps. It almost floats.",
    cons: "Start with a small boat and Suri on your crew. Danvers wants the boat for scrap.",
    effects: { player: { ship: "The Saltcracker: a patched salt-iron dinghy with one sail (barely seaworthy)", add_crew: [{ name: "Suri Quell", role: "Shipwright", npc_id: "suri_quell" }] }, npcs: [{ id: "suri_quell", disposition: 30 }, { id: "rook_danvers", note: "Plans to seize the kids' boat as tithe scrap." }] },
    hook: "The player and Suri Quell have built a small boat together; Suri is already their crewmate. Danvers plans to seize it as tithe." },
  { id: "framed", req: "any", title: "Framed",
    text: "Someone blew up a tithe barge last night and the posters already have your face on them.",
    cons: "฿15,000,000 bounty for a crime you didn't commit. Iron Tide hostile. Bounty hunters come early.",
    effects: { player: { bounty: 15000000 }, factions: [{ id: "iron_tide", attitude: -20 }, { id: "unchained_dawn", attitude: 10 }], events: [{ id: "hunter_season", action: "accelerate", day: 5 }] },
    hook: "The player has been framed for blowing up a Concord tithe barge (the real culprits were Unchained Dawn agents). A 15,000,000 bounty poster with their face went up this morning." }
];

/* ---- threat tiers: power scales with where you are ---- */
const TIERS = { brinemoor: 1, frostmark: 1, corsairs_rest: 1, lanterngate: 2, galeharrow: 2, moonmaw: 2, vellichor: 3, ironhold: 3, undertow: 3, the_wound: 5, emberwake: 4, sunken_reach: 4, hundred_bells: 4, aurelion: 4, nadir: 5 };
for (const i of WORLD_SEED.islands) i.tier = TIERS[i.id] || 2;
const TIER_TEXT = ["", "Blues (weak foes: thugs, petty officers, rookies under ฿10M)", "Early Grand Line (rookies ฿10M–100M, Marine captains, Sea Kings)", "Deep Paradise (Vice Admirals, ฿100M–500M pirates, elite hunters)", "New World (Emperor commanders ฿500M–2B, Admirals, monsters)", "The Wound / endgame (Emperors, Fleet Admiral, ancient weapons)"];
const RANKS = ["Raw", "Honed", "Awakened", "Master", "Legend"];

/* ---- hidden mission seeds (never shown to the player) ---- */
const SEEDS = [
  // main beats
  { id: "m_pell_stone", kind: "main", where: "brinemoor", npc: "old_pell", text: "Old Pell's buried Echo Stone shard starts humming when the player is near; someone else hears it too." },
  { id: "m_danvers_ledger", kind: "main", where: "brinemoor", npc: "rook_danvers", text: "Danvers' secret ledger proves he sells families to the Cinder Exchange. Exposing it could free Brinemoor." },
  { id: "m_refugee_ship", kind: "main", where: "brinemoor", text: "A ship of 'relocated' Saltcradle families is leaving for Galeharrow's living-lot auction." },
  { id: "m_lantern_letter", kind: "main", where: "lanterngate", npc: "mireille_osei", text: "Mireille needs someone the Iron Tide doesn't know to scout Vane's fleet." },
  { id: "m_siege_evac", kind: "main", where: "lanterngate", text: "When the siege comes, ten thousand refugees need a way out through the lantern tunnels." },
  { id: "m_auction_stone", kind: "main", where: "galeharrow", text: "An Echo Stone is lot 47 at the Cinder Auction. Every faction sends a bidder or a thief." },
  { id: "m_cartographer", kind: "main", where: "galeharrow", npc: "ilse_morrow", text: "A quiet mapmaker asks the player to carry a 'blank' chart to Ironhold. It isn't blank." },
  { id: "m_wren_ears", kind: "main", where: "galeharrow", npc: "wren", text: "Wren collapses with a nosebleed near the auction house. She can hear the Echo Stone singing." },
  { id: "m_eclipse", kind: "main", where: "moonmaw", text: "The blood eclipse will open the drowned shrine where the Bakunawa fruit and the blade Gravemoon sleep." },
  { id: "m_vellichor_path", kind: "main", where: "vellichor", npc: "archivist_odo", text: "Only someone who hears an Echo Stone can find Vellichor; Odo waits for a worthy reader." },
  { id: "m_dock_nine", kind: "main", where: "ironhold", npc: "dr_ferro", text: "Dock Nine hides the Tidewall core. Dr. Ferro left a flaw that a brave saboteur could use." },
  { id: "m_vane_doubts", kind: "main", where: "ironhold", npc: "haldor_vane", text: "Vane's locked desk holds the drowning projections; if he sees them made public, he may turn." },
  { id: "m_undertow_break", kind: "main", where: "undertow", npc: "ulric_grail", text: "Breaking Warden Grail breaks every curse he holds, including the one killing the Matriarch." },
  { id: "m_matriarch_cure", kind: "main", where: "sunken_reach", npc: "ondine_mako", text: "The Matriarch will trade an Echo Stone for whoever ends her curse." },
  { id: "m_abbot_daughter", kind: "main", where: "hundred_bells", npc: "sorin_kuge", text: "The Thunder Abbot would stop the war for proof his daughter lives." },
  { id: "m_black_bell", kind: "main", where: "hundred_bells", npc: "jun_kagari", text: "Black Bell's forged attack orders could be exposed to end the Storm War." },
  { id: "m_old_ash_books", kind: "main", where: "emberwake", npc: "gideon_halloway", text: "Old Ash's ledger shows he funds both Tidewall and the Dawn. Whoever steals it controls the war." },
  { id: "m_reverie_crash", kind: "main", where: "aurelion", npc: "ysolde", text: "The Reverie broadcast reaches every Den Den in the world. Hijacking it could tell the truth of the Sundering." },
  { id: "m_regent_secret", kind: "main", where: "aurelion", npc: "ysolde", text: "Proof that the Regent was born a slave is hidden in a fallen Mariejois archive at the bottom of the Wound." },
  { id: "m_wound_dive", kind: "main", where: "the_wound", text: "With three Echo Stones, the Wound's currents can be read; the descent to the fallen Holy Land is possible." },
  { id: "m_crown_truth", kind: "main", where: "nadir", text: "The Hollow Crown is a broadcast engine. Whoever claims it chooses what the whole world hears." },
  { id: "m_tamsin_hunt", kind: "main", where: "any", npc: "tamsin_vey", text: "Admiral Vey adds the player to her notebook once their bounty passes 30M and begins a slow hunt." },
  { id: "m_crowe_rival", kind: "main", where: "any", npc: "bastian_crowe", text: "Grin Crowe races the player for every Echo Stone and keeps showing up at the worst moments." },
  { id: "m_dawn_recruit", kind: "main", where: "any", text: "The Unchained Dawn sends a coded invitation once the player defies the Concord publicly." },
  { id: "m_mireille_sin", kind: "main", where: "any", npc: "mireille_osei", text: "Mireille confesses she gave the order that caused the Sundering, if the player earns her trust." },
  // side seeds
  { id: "s_salt_ghost", kind: "side", where: "brinemoor", text: "Children say a drowned salt-raker walks the evaporation pans at night, crying for his ring." },
  { id: "s_suri_hull", kind: "side", where: "brinemoor", npc: "suri_quell", text: "Suri needs seastone rivets from the garrison armory to finish her hull." },
  { id: "s_tithe_cheat", kind: "side", where: "brinemoor", text: "A widow is short three sacks of salt for Tithe Day and her son is on the list." },
  { id: "s_frost_shipwright", kind: "side", where: "frostmark", text: "The best ice-shipwright in the North Blue will build a hull only for someone who wins her ice-fishing contest." },
  { id: "s_frost_deserters", kind: "side", where: "frostmark", text: "A deserter squad is hunted by its own former officer, who is closing in tonight." },
  { id: "s_lottery_rigged", kind: "side", where: "corsairs_rest", text: "The whirlpool lottery is rigged with a hidden drain-gate. A whole barge-family is about to lose everything." },
  { id: "s_card_shark", kind: "side", where: "corsairs_rest", text: "A legendary card shark challenges anyone to a game for a stolen vault key." },
  { id: "s_lighthouse", kind: "side", where: "lanterngate", text: "The keeper of the last working lantern tower is cursed to never sleep. Something whispers in the lamp." },
  { id: "s_refugee_twins", kind: "side", where: "lanterngate", text: "Twin refugee kids are searching for a mother listed as 'deceased' by the Concord." },
  { id: "s_kite_race", kind: "side", where: "galeharrow", text: "The Galeharrow kite-cargo race pays a fortune and has no rules." },
  { id: "s_seaking_calf", kind: "side", where: "galeharrow", text: "A Sea King calf is being sold in a tank behind the auction house. Its mother is circling the island." },
  { id: "s_forger_trouble", kind: "side", where: "galeharrow", text: "A forger's pardons were discovered; refugees who used them will be arrested at dawn." },
  { id: "s_cookoff", kind: "side", where: "moonmaw", npc: "kaeli_moss", text: "A pirate chef challenges Kaeli to a cook-off; the stakes are her kitchen and the child she hides." },
  { id: "s_moon_pearls", kind: "side", where: "moonmaw", text: "Pearl divers are vanishing near the drowned shrine; the cult blames 'the moon's hunger'." },
  { id: "s_wave_race", kind: "side", where: "moonmaw", text: "A wave-riding race around the crescent islands, where losers lose their boards and their pride." },
  { id: "s_scholar_test", kind: "side", where: "vellichor", text: "The library's riddle-doors test what a visitor is willing to forget." },
  { id: "s_tailor_apprentices", kind: "side", where: "ironhold", text: "Three apprentices in Ironhold's workshops need to vanish before an inspection." },
  { id: "s_marine_cadet", kind: "side", where: "ironhold", text: "A cadet is about to be executed for refusing an order; his squad plans a hopeless rescue." },
  { id: "s_undertow_letter", kind: "side", where: "undertow", text: "A prisoner's last letter needs to reach his daughter in the East Blue." },
  { id: "s_wound_salvage", kind: "side", where: "the_wound", text: "Salvage crews dive palace ruins in the Wound. One found a sealed vault door with a Celestial crest." },
  { id: "s_ash_pit", kind: "side", where: "emberwake", text: "The ash pit fights are rigged; a chained fighter will be 'retired' after tonight." },
  { id: "s_forge_master", kind: "side", where: "emberwake", text: "A blind smith will forge a Grade blade for anyone who brings him a Sea King's tooth." },
  { id: "s_dome_crack", kind: "side", where: "sunken_reach", text: "A glass dome is cracking and the Brood blames surface spies." },
  { id: "s_bell_thief", kind: "side", where: "hundred_bells", text: "Someone stole the smallest bell, and the Abbot's monks are about to execute an innocent novice." },
  { id: "s_cloud_shrine", kind: "side", where: "hundred_bells", text: "The Cloud Shrine opens only for one who has never lied. It holds something holy." },
  { id: "s_gilded_servant", kind: "side", where: "aurelion", text: "A slave-born servant in Aurelion wants to smuggle her brother down to the sea." },
  { id: "s_any_rival", kind: "side", where: "any", text: "A rookie crew with a grudge (invent them) challenges the player publicly." },
  { id: "s_any_stowaway", kind: "side", where: "any", text: "A stowaway is found aboard with a secret that puts the crew in danger." },
  { id: "s_any_storm", kind: "side", where: "any", text: "A freak storm strands the player with an unlikely enemy." },
  { id: "s_any_merchant", kind: "side", where: "any", text: "A traveling merchant sells a map, a cursed item, or a fruit rumor. Some of it is real." },
  { id: "s_any_ghostship", kind: "side", where: "any", text: "A ghost ship appears only in fog, with a crew still fighting a battle from the Sundering." },
  { id: "s_any_hunter", kind: "side", where: "any", text: "A bounty hunter (invent one, scaled to the region) comes for the player's head." },
  { id: "s_any_festival", kind: "side", where: "any", text: "A local festival, tournament, or feast with a hidden danger." },
  { id: "s_any_old_friend", kind: "side", where: "any", text: "Someone from the player's origin turns up, needing help or wanting payback." },
  { id: "s_any_seaking", kind: "side", where: "any", text: "A Sea King blocks the route and something about it is strange (injured, tamed, carrying a rider)." },
  { id: "s_any_bearer", kind: "side", where: "any", text: "A Devil Fruit user from the bearer list crosses the player's path in an interesting situation." }
];
