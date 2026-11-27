/* ============================================================
   CONTENT: fruit-bearers, weapons, styles, starting paths,
   hidden mission seeds, and the Air-Air Fruit showcase.
   ============================================================ */

/* ---- fruit-bearers: every starter fruit you don't pick is eaten by its bearer ---- */
const BEARERS = [
  { fruit: "kuki", id: "skye", name: "Skye", epithet: "Puff", role: "mail courier kid", location: "frostvale",
    desc: "A breathless fourteen-year-old who runs mail across Frostvale's frozen bay faster than anyone.", goal: "See the world from higher than anyone has.", secret: "She has been running supplies for the Revolutionaries without knowing it.", join: "Take her somewhere she's never been." },
  { fruit: "hibi", id: "dax", name: "Dax", epithet: "Fault", role: "dock brawler", location: "dunmore",
    desc: "A huge, quiet bruiser who breaks legs for a gambling boss and hates every second of it.", goal: "Pay off his mother's debt.", secret: "He warns his targets the night before.", join: "Free his mother from the debt." },
  { fruit: "koku", id: "tess", name: "Tess", epithet: "Granny", role: "fortune teller", location: "fogtown",
    desc: "An old woman with a young woman's laugh who tells fortunes for coins.", goal: "Win back the years she lost.", secret: "She is only nineteen. Saving children with her power aged her.", join: "Find a way to return stolen time." },
  { fruit: "tenbin", id: "owen", name: "Owen", epithet: "the Fair Judge", role: "former Marine judge", location: "rivetport",
    desc: "A grey, stern man who settles shipyard disputes for free.", goal: "Put Captain-level corruption on trial, all the way up.", secret: "He sentenced innocent people at Justice Isle and kept copies of the orders.", join: "Show him you fight for real justice." },
  { fruit: "fuin", id: "pip", name: "Pip", epithet: "Lucky", role: "street kid charm-seller", location: "loguetown",
    desc: "A tiny, fast-talking kid who sells lucky paper charms.", goal: "See the Grand Line.", secret: "Pip sealed a Marine officer's pistol into a charm, and the officer wants it back.", join: "Protect Pip from the gang that runs the market." },
  { fruit: "chi", id: "ruby", name: "Doctor Ruby", epithet: "Red Coat", role: "prison medic", location: "impel_down",
    desc: "A cold, brilliant doctor who treats prisoners nobody else will.", goal: "Get as many prisoners out alive as she can.", secret: "She fakes deaths and smuggles prisoners out in body bags.", join: "Break Impel Down open with her." },
  { fruit: "nami", id: "kai", name: "Kai", epithet: "Wave Rider", role: "surfer and fisherman", location: "crane_town",
    desc: "A loud, sunburned surfer who challenges everyone to wave races.", goal: "Ride the biggest wave in the world.", secret: "He is the runaway son of a noble family.", join: "Beat him in a wave race." },
  { fruit: "hari", id: "brisk", name: "Old Brisk", epithet: "Pins", role: "Marine uniform tailor", location: "marineford",
    desc: "A tiny, sharp-tongued old tailor who has stitched every Admiral's coat.", goal: "Get his apprentices out of Marineford.", secret: "He leaks Marine plans to the Revolutionaries in coat linings.", join: "Protect his apprentices." },
  { fruit: "uzu", id: "mara", name: "Captain Mara", epithet: "Whirlpool", role: "smuggler captain", location: "dunmore",
    desc: "A smirking smuggler who never pays a toll and always pays her crew.", goal: "Break the gambling bosses' hold on Dunmore.", secret: "She owes Sly Dutch one favor, not yet called in.", join: "Win her respect in a deal or a duel." },
  { fruit: "sumi", id: "leo", name: "Leo", epithet: "Inky", role: "painter and navigator", location: "bubble_grove",
    desc: "A jittery painter-navigator with ink up to his elbows and a joke for everything.", goal: "Sail every sea in the world.", secret: "He sneaks slaves out of the auction house at night.", join: "Promise him a voyage to the New World." },
  { fruit: "doro", id: "mags", name: "Mags", epithet: "Mudlark", role: "harbor thief", location: "fogtown",
    desc: "A grinning thief who sinks into the mud to escape.", goal: "Find a crew that won't sell her out.", secret: "Her last crew sold her to slavers. They still hunt her.", join: "Stand by her when her old crew comes." },
  { fruit: "kessho", id: "cal", name: "Cal", epithet: "Prism", role: "glassblower", location: "westwind",
    desc: "A gentle glassblower who makes lenses for the scholars of Westwind.", goal: "Protect the library tree.", secret: "He knows about the coming Buster Call.", join: "Help him save Westwind." },
  { fruit: "bara", id: "bram", name: "Bram", epithet: "Pieces", role: "casino knife-juggler", location: "sundial",
    desc: "A showman who juggles his own hands for tips at the Sundial casino.", goal: "Leave the casino with his debts cleared.", secret: "He knows where Dutch keeps his secret vault.", join: "Get him out of Dutch's contract." },
  { fruit: "hana", id: "lily", name: "Lily", epithet: "Bloom", role: "scholar's apprentice", location: "westwind",
    desc: "A quiet martial artist who sprouts extra hands to fight with eight arms at once.", goal: "Become strong enough to protect Westwind.", secret: "Professor Lin trained her in secret.", join: "Prove you will protect the truth." },
  { fruit: "bomu", id: "joe", name: "Boomer Joe", epithet: "", role: "demolition worker", location: "rivetport",
    desc: "A cheerful demolition worker who sneezes explosions.", goal: "Build something instead of blowing it up.", secret: "He blew up a Marine ship by accident and has a secret bounty.", join: "Give him a ship to build, not destroy." },
  { fruit: "supa", id: "spike", name: "Spike", epithet: "Razor", role: "bounty hunter", location: "fogtown",
    desc: "A grim bounty hunter whose arms turn into blades.", goal: "Earn enough to buy his village back.", secret: "He has never actually killed a target.", join: "Show him a better way to save his village." },
  { fruit: "sube", id: "sasha", name: "Sasha", epithet: "Silk", role: "dancer and pickpocket", location: "bubble_grove",
    desc: "A dancer that nothing can hold, who picks pockets during her shows.", goal: "Buy her sister out of the human auction.", secret: "Her sister is already sold to Saint Corvus.", join: "Help free her sister." },
  { fruit: "bane", id: "hopper", name: "Hopper", epithet: "Bounce", role: "mailman", location: "loguetown",
    desc: "A hyper mailman who bounces over rooftops.", goal: "Reach the New World and meet the Old Fox.", secret: "He is the Old Fox's son, and the Old Fox doesn't know he exists.", join: "Promise to take him to the New World." },
  { fruit: "bari", id: "wally", name: "Wally", epithet: "the Wall", role: "ex-bodyguard", location: "sundial",
    desc: "A huge, gentle ex-bodyguard who crosses his fingers to make walls.", goal: "Protect someone worth protecting.", secret: "He was fired for refusing to hurt a child.", join: "Give him someone worth protecting." },
  { fruit: "moku", id: "sam", name: "Smokey Sam", epithet: "", role: "Marine deserter", location: "crane_town",
    desc: "A lazy ex-Marine sergeant who drinks and smokes in the Crane Town bar.", goal: "Hide from his old unit.", secret: "He deserted after refusing to burn a village.", join: "Prove the Marines are wrong about you." }
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
  { id: "saltsteel", name: "Saltsteel blade", kind: "sword", grade: "Fine", desc: "Forged in an East Blue salt-smithy; never rusts in seawater." },
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

/* ---- named blades hidden in the world (the GM knows where they are) ---- */
const NAMED_WEAPONS = [
  { id: "sea_splitter", name: "Sea Splitter", kind: "sword", grade: "Legendary", location: "laugh_tale", holder: "none", desc: "A katana said to have belonged to the Pirate King's first mate. Nobody knows where it went." },
  { id: "gull_king", name: "Gull King", kind: "sword", grade: "Grade Blade", location: "gullport", holder: "captain_hale", desc: "A sabre Captain Hale took from Gullport's town hall. The town wants it back." },
  { id: "red_wind", name: "Red Wind", kind: "sword", grade: "Grade Blade", location: "loguetown", holder: "ben_cole", desc: "Redcap's curved sword that whistles when swung." },
  { id: "mirage_saber", name: "Mirage Saber", kind: "sword", grade: "Grade Blade", location: "sundial", holder: "none", desc: "A scimitar up for auction at the Sundial casino." },
  { id: "foxfire", name: "Foxfire", kind: "sword", grade: "Legendary", location: "foxhollow", holder: "old_fox", desc: "The Old Fox's giant naginata-blade." },
  { id: "black_justice", name: "Black Justice", kind: "sword", grade: "Grade Blade", location: "marineford", holder: "admiral_kane", desc: "A Marine officer's sword never once sheathed clean." },
  { id: "silver_verdict", name: "Silver Verdict", kind: "gun", grade: "Grade Blade", location: "loguetown", holder: "vice_admiral_june", desc: "Vice Admiral June's engraved rifle." },
  { id: "wreck_cleaver", name: "Wreck Cleaver", kind: "sword", grade: "Grade Blade", location: "rivetport", holder: "none", desc: "A giant blade forged from a ship's keel, hanging in a shipyard as decoration." }
];

/* ---- starting paths with consequences ---- */
const STARTS = [
  { id: "stolen", req: "fruit", title: "Stole it from Captain Hale",
    text: "You broke into the Marine outpost's strongbox and ate what was inside. You barely escaped.",
    cons: "Hale hates you. Marines suspicious. Start hurt, ฿3,000,000 bounty. Bounty Day comes a day early.",
    effects: { player: { hp: -20, bounty: 3000000 }, npcs: [{ id: "captain_hale", disposition: -40, note: "Hunting the thief who robbed his strongbox." }], factions: [{ id: "marines", attitude: -15 }], events: [{ id: "bounty_day", action: "accelerate", day: 2 }] },
    hook: "The player stole and ate a Devil Fruit from Captain Hale's strongbox last night and barely escaped, wounded. Marines are searching Gullport house to house." },
  { id: "credit", req: "fruit", title: "Bought it on credit from a casino broker",
    text: "A smiling broker from Sly Dutch's casino sold you the fruit for a signature. You should have read the fine print.",
    cons: "No money. You owe ฿50,000,000 to a Warlord's casino. A debt collector arrives on Day 6.",
    effects: { player: { berries: -3000, add_items: ["Sundial casino brand burned on your wrist (฿50,000,000 owed)"] }, factions: [{ id: "warlords", attitude: -10, note: "The player owes Sly Dutch's casino 50 million." }],
      new_events: [{ id: "debt_collector", day: 6, title: "The debt collector arrives", desc: "A Sundial casino collector (or Scar Nell on contract) comes to Gullport to take payment in berries, service, or blood.", public: false }] },
    hook: "The player bought their Devil Fruit on credit from Sly Dutch's casino and owes 50,000,000 berries. A collector is coming." },
  { id: "washed", req: "fruit", title: "Found it in a pirate wreck",
    text: "A wrecked pirate ship drifted into the bay. In the captain's cabin was a chest with a strange fruit. You ate it.",
    cons: "The fruit belonged to Captain Rook's crew. A Rook Pirates search party is coming.",
    effects: { factions: [{ id: "rook_pirates", attitude: -15, note: "One of their fruits was eaten by a kid in Gullport." }],
      new_events: [{ id: "rook_search", day: 5, title: "Rook Pirates search Gullport", desc: "A Rook Pirates search party lands in Gullport looking for whoever ate their captain's fruit.", public: false }] },
    hook: "The player ate a Devil Fruit from the wreck of a Rook Pirates ship. The Emperor Captain Rook's men want it back, even if they have to cut it out." },
  { id: "childhood", req: "fruit", title: "Ate it as a child",
    text: "You ate it at age six, thinking it was a weird melon. Gullport grew up with your power.",
    cons: "The town trusts you. Hale watches you closely. You start with real control.",
    effects: { player: { mastery: 10 }, npcs: [{ id: "gus", disposition: 10 }, { id: "captain_hale", disposition: -10, note: "Keeps a file on the town's fruit user." }] },
    hook: "The player has had their Devil Fruit since childhood. All of Gullport knows. Captain Hale sees them as a threat or a tool." },
  { id: "skyfall", req: "kuki", title: "Fell from the sky",
    text: "You were a balloon courier until a Marine patrol shot you down. You ate the Air fruit from the cargo as you fell, and your first breath of power broke your fall into Gullport's bay.",
    cons: "Air mastery starts higher. You grabbed a Government treasure chest from the wreck, and a Cipher Pol agent is coming for it.",
    effects: { player: { mastery: 10, hp: -10, add_items: ["Locked Government treasure chest from the crashed balloon"] }, factions: [{ id: "marines", attitude: -10 }, { id: "cipher_pol", attitude: -15, note: "Wants the letter back." }],
      new_events: [{ id: "cp_agent_arrives", day: 4, title: "A Cipher Pol agent comes to Gullport", desc: "Agent Grey (or one of his agents) arrives quietly to take back the treasure chest and silence whoever has it.", public: false }] },
    hook: "The player was a balloon courier shot down by a Marine patrol. While falling they ate the Air-Air Fruit (Kuki Kuki no Mi) from the cargo and caught themselves on a cushion of their own breath. They grabbed a locked Government treasure chest from the wreck. Cipher Pol is coming." },
  { id: "apprentice", req: "nofruit", title: "Haki apprentice to Old Gus",
    text: "Gus has been beating Haki into you since you could walk, without explaining how an old fisherman knows it.",
    cons: "Start with real Observation and Armament Haki. Gus trusts you deeply.",
    effects: { player: { observation: 8, armament: 4 }, npcs: [{ id: "gus", disposition: 20, note: "Trained the player in Haki for years." }] },
    hook: "The player is Old Gus's secret Haki apprentice, with basic Observation and Armament Haki that no fisher kid should know." },
  { id: "deserter", req: "nofruit", title: "Marine cadet who walked away",
    text: "You were a Marine cadet until you refused an order to burn a fishing village. You came home with nothing but your training.",
    cons: "Marines hostile, ฿1,000,000 bounty for desertion. Lieutenant Pike knows who you are.",
    effects: { player: { bounty: 1000000, armament: 3, add_items: ["Torn Marine cadet coat"] }, factions: [{ id: "marines", attitude: -20 }, { id: "revolutionary_army", attitude: 10 }], npcs: [{ id: "lt_pike", disposition: 15, note: "Recognizes the player as the cadet who refused the order." }] },
    hook: "The player is a Marine cadet who deserted after refusing to burn a village. There's a small bounty for desertion. Lieutenant Pike in Gullport recognizes them." },
  { id: "partner", req: "nofruit", title: "Mia's partner",
    text: "You and Mia have spent two years building a ship out of wreck timber. It almost floats.",
    cons: "Start with a small boat and Mia on your crew. Hale wants the boat as 'payment'.",
    effects: { player: { ship: "The Gull's Luck: a patched one-mast sloop (barely seaworthy)", add_crew: [{ name: "Mia Hart", role: "Shipwright", npc_id: "mia" }] }, npcs: [{ id: "mia", disposition: 30 }, { id: "captain_hale", note: "Plans to take the kids' boat as Bounty Day payment." }] },
    hook: "The player and Mia Hart have built a small sloop together; Mia is already their crewmate. Captain Hale plans to seize it on Bounty Day." },
  { id: "framed", req: "any", title: "Framed",
    text: "Someone sank a Marine supply boat last night, and the wanted posters already have your face on them.",
    cons: "฿15,000,000 bounty for a crime you didn't commit. Marines hostile. Bounty hunters come early.",
    effects: { player: { bounty: 15000000 }, factions: [{ id: "marines", attitude: -20 }, { id: "revolutionary_army", attitude: 10 }], events: [{ id: "hunter_season", action: "accelerate", day: 5 }] },
    hook: "The player has been framed for sinking a Marine supply boat (Revolutionaries really did it). A 15,000,000 wanted poster with their face went up this morning." }
];

/* ---- hidden mission seeds (never shown to the player) ---- */
const SEEDS = [
  // main beats (big adventures, not paperwork)
  { id: "m_gus_enemy", kind: "main", where: "gullport", npc: "gus", text: "An old enemy of Gus's, a scarred New World pirate, sails into Gullport looking for revenge." },
  { id: "m_slave_ship", kind: "main", where: "gullport", npc: "captain_hale", text: "A slaver ship arrives to collect the Gullport families Hale sold. Stop it at sea or in port." },
  { id: "m_hale_fight", kind: "main", where: "gullport", npc: "captain_hale", text: "Captain Hale finally stops smiling and fights with his Salt-Salt Fruit." },
  { id: "m_pike_defect", kind: "main", where: "gullport", npc: "lt_pike", text: "Lieutenant Pike turns on Hale if someone gives him the courage." },
  { id: "m_redcap_rival", kind: "main", where: "any", npc: "ben_cole", text: "Redcap Cole races the player to every island and keeps picking fights." },
  { id: "m_loguetown_gate", kind: "main", where: "loguetown", npc: "vice_admiral_june", text: "Vice Admiral June blockades Loguetown to stop rookies from leaving for the Grand Line." },
  { id: "m_reverse_climb", kind: "main", where: "reverse_mountain", text: "Climbing Reverse Mountain in a storm, with a Marine ship chasing." },
  { id: "m_auction_brawl", kind: "main", where: "sundial", npc: "sly_dutch", text: "The Sundial auction turns into a brawl over a Devil Fruit." },
  { id: "m_dutch_weapon", kind: "main", where: "sundial", npc: "sly_dutch", text: "Sly Dutch is digging up an ancient weapon under the desert. Beating him could end the Warlord system." },
  { id: "m_westwind_defense", kind: "main", where: "westwind", npc: "professor_lin", text: "The Buster Call fleet is coming for Westwind. Fight it, or get the people out." },
  { id: "m_justice_raid", kind: "main", where: "justice_isle", text: "Raid Justice Isle to free prisoners before they're shipped to Impel Down. The Op-Op Fruit is in its vault." },
  { id: "m_corvus_punch", kind: "main", where: "bubble_grove", npc: "saint_corvus", text: "Saint Corvus shoots someone at the auction. Punching a Celestial Dragon brings an Admiral." },
  { id: "m_vera_freedom", kind: "main", where: "bubble_grove", npc: "lady_vera", text: "Lady Vera plans to blow up the human auction house and needs fighters." },
  { id: "m_blackwater_tournament", kind: "main", where: "blackwater", text: "Blackwater's pirate tournament: the winner gets a ship and a crew of rookies." },
  { id: "m_skyreach_war", kind: "main", where: "skyreach", text: "A cloud war on Skyreach between sky warriors and an invading god-king." },
  { id: "m_marineford_raid", kind: "main", where: "marineford", npc: "fleet_admiral_stone", text: "A friend is captured and taken to Marineford for public execution." },
  { id: "m_impel_break", kind: "main", where: "impel_down", npc: "warden_mort", text: "Break into Impel Down. Beating Warden Mort breaks his curses, including the one killing the Old Fox." },
  { id: "m_fishman_passage", kind: "main", where: "fishman_island", npc: "jet", text: "Pirates are bullying Fish-Man Island, the only way to the New World." },
  { id: "m_mae_party", kind: "main", where: "honeycomb", npc: "big_mae", text: "Big Mae invites the player to fight in her colosseum. Winning earns her treasure fleet; losing means joining her family." },
  { id: "m_jack_ope", kind: "main", where: "anvil_rock", npc: "iron_jack", text: "Iron Jack will start a war for the Op-Op Fruit." },
  { id: "m_rook_betrayal", kind: "main", where: "rookery", npc: "captain_rook", text: "Captain Rook sells out rival pirates to Cipher Pol, and the player could be next." },
  { id: "m_fox_successor", kind: "main", where: "foxhollow", npc: "old_fox", text: "The dying Old Fox tests young pirates to find a worthy successor." },
  { id: "m_redfang_war", kind: "main", where: "redfang_bay", text: "Two Emperor fleets clash at Redfang Bay. Pick a side, loot the wrecks, or stop the war." },
  { id: "m_revolution_call", kind: "main", where: "any", npc: "nora", text: "The Revolutionary Army invites the player once they openly fight the Government." },
  { id: "m_admiral_hunt", kind: "main", where: "any", npc: "admiral_ray", text: "Admiral Ray comes to see the player personally once their bounty passes 100M." },
  { id: "m_laugh_tale", kind: "main", where: "laugh_tale", text: "The final island. The One Piece is here." },
  // side adventures
  { id: "s_gullport_bandits", kind: "side", where: "gullport", text: "Bandits from Kettle Rock raid Gullport's fishing boats." },
  { id: "s_mia_wood", kind: "side", where: "gullport", npc: "mia", text: "Mia needs iron-hard timber from Ironpine to finish her ship." },
  { id: "s_levy_widow", kind: "side", where: "gullport", text: "A widow can't pay on Bounty Day and her son is about to be taken." },
  { id: "s_crane_bar", kind: "side", where: "crane_town", text: "A bar fight with a rookie crew turns into a bet over a ship." },
  { id: "s_crane_shipwright", kind: "side", where: "crane_town", text: "The shipyard builds a ship for anyone who beats its foreman at arm-wrestling." },
  { id: "s_loguetown_execution", kind: "side", where: "loguetown", text: "A pirate is about to be executed on the Pirate King's platform. His crew plans a hopeless rescue." },
  { id: "s_saltreef_wrecks", kind: "side", where: "saltreef", text: "A wreck on Saltreef still holds a pirate captain's treasure, guarded by a giant crab." },
  { id: "s_millhaven_raid", kind: "side", where: "millhaven", text: "A pirate crew is coming to burn Millhaven's harvest. The farmers ask for help." },
  { id: "s_kettle_king", kind: "side", where: "kettle_rock", text: "The bandit king of Kettle Rock challenges anyone to a duel for his toll rights." },
  { id: "s_frost_doctor", kind: "side", where: "frostvale", npc: "patch", text: "Frostvale's old doctor is dying, and his dog Patch is trying to save him." },
  { id: "s_ironpine_war", kind: "side", where: "ironpine", text: "Ironpine's king offers a fortune to whoever ends the forest war, by any means." },
  { id: "s_dunmore_cards", kind: "side", where: "dunmore", text: "A card shark bets a Log Pose to the New World on one hand." },
  { id: "s_coral_dive", kind: "side", where: "coral_crown", text: "Low tide uncovers the sunken city for six hours. Rival treasure hunters race in." },
  { id: "s_thornwood_families", kind: "side", where: "thornwood", text: "Three mafia families each try to hire the player to wipe out the others." },
  { id: "s_fogtown_party", kind: "side", where: "fogtown", text: "Fogtown throws the player a welcome party. Everyone there is a bounty hunter." },
  { id: "s_reverse_whale", kind: "side", where: "reverse_mountain", text: "A giant whale keeps ramming the Red Line at Twin Cape, waiting for a crew that never came back." },
  { id: "s_hollow_beast", kind: "side", where: "hollow_peak", text: "A giant beast is wrecking Hollow Peak's only village. Something drove it mad." },
  { id: "s_bazaar_ship", kind: "side", where: "tidepool_bazaar", text: "The best ship in the bazaar is up for sale, and three crews want it." },
  { id: "s_glass_worms", kind: "side", where: "glass_desert", text: "Sandworms swallowed a treasure caravan in the Glass Desert. The loot is still inside one." },
  { id: "s_sundial_rebels", kind: "side", where: "sundial", text: "Sundial's rebels plan to storm the casino, not knowing Dutch set a trap." },
  { id: "s_rivet_race", kind: "side", where: "rivetport", text: "A canal boat race through Rivetport with a ship as the prize." },
  { id: "s_bubble_coating", kind: "side", where: "bubble_grove", text: "The best ship-coater is drunk, broke and in trouble with slavers." },
  { id: "s_marine_cadet", kind: "side", where: "marineford", text: "A cadet is about to be executed for refusing an order; his squad plans a rescue." },
  { id: "s_fishman_bullies", kind: "side", where: "fishman_island", text: "A pirate crew is shaking down a fish-man café." },
  { id: "s_stormhold_sail", kind: "side", where: "stormhold", text: "Stormhold's sailors race through the lightning for glory. Losers get struck." },
  { id: "s_bone_egg", kind: "side", where: "bone_isle", text: "Someone stole a Sea King egg from Bone Isle. Its mother is destroying ships to find it." },
  { id: "s_anvil_prison", kind: "side", where: "anvil_rock", text: "Iron Jack's forges run on prisoners. One of them used to be a famous fighter." },
  { id: "s_rook_poison", kind: "side", where: "rookery", text: "A village on Rook's island is dying from a poisoned well." },
  { id: "s_any_rival", kind: "side", where: "any", text: "A rookie crew with a grudge (invent them, scaled to the region) challenges the player in public." },
  { id: "s_any_stowaway", kind: "side", where: "any", text: "A stowaway is found aboard, and someone dangerous is chasing them." },
  { id: "s_any_storm", kind: "side", where: "any", text: "A freak storm strands the player on an unknown island with an unlikely enemy." },
  { id: "s_any_merchant", kind: "side", where: "any", text: "A traveling merchant sells weapons, a cursed item, or a fruit rumor. Some of it is real." },
  { id: "s_any_ghostship", kind: "side", where: "any", text: "A ghost ship appears in the fog with a skeleton crew that wants a fight." },
  { id: "s_any_hunter", kind: "side", where: "any", text: "A bounty hunter (invent one, scaled to the region) comes for the player's head." },
  { id: "s_any_marines", kind: "side", where: "any", text: "A Marine patrol (scaled to the region) spots the player's ship." },
  { id: "s_any_festival", kind: "side", where: "any", text: "A local festival, fighting tournament or eating contest with a hidden danger." },
  { id: "s_any_treasure", kind: "side", where: "any", text: "A buried treasure rumor on this island. Others are already digging." },
  { id: "s_any_seaking", kind: "side", where: "any", text: "A Sea King blocks the route, and something about it is strange." },
  { id: "s_any_bearer", kind: "side", where: "any", text: "A Devil Fruit user from the recruitable list crosses the player's path in an interesting situation." }
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


/* ---- Air-Air Fruit showcase: mastery path and ready-made moves ---- */

// ready-made Air move ideas (the player can add these as techniques)
const AIR_MOVES = [
  { name: "Breath Bullet", desc: "Spit a compressed pellet of air that hits like a musket ball." },
  { name: "Sky Step Rush", desc: "Chain air-steps to dash through the air and strike from above." },
  { name: "Vacuum Fist", desc: "A punch wrapped in a vacuum that steals the target's breath and silences their shout." },
  { name: "Pressure Cannon", desc: "Release a full lungful of compressed air as a cannon blast." },
  { name: "Gale Wall", desc: "An invisible dome of hardened air that blocks attacks for a moment." },
  { name: "Eardrum Pop", desc: "A sharp pressure snap beside an enemy's ears that leaves them dizzy and deaf." },
  { name: "Updraft Launch", desc: "Blast air under yourself or an ally to launch skyward." },
  { name: "Air Lance", desc: "Compress air into a needle-thin spear that pierces armor." },
  { name: "Cushion Breath", desc: "Catch a falling ally (or yourself) on a pillow of soft air." },
  { name: "Lung Thief", desc: "Pull the air out of an enemy's lungs from a distance." },
  { name: "Whisper Wind", desc: "Carry your voice, or someone else's, along a thread of air to a far-off ear." },
  { name: "Tempest Palm", desc: "Spin compressed air into a small cyclone fired from the palm." }
];


/* ============================================================
   POWER SCALE, FRUIT MASTERY WEBS, HAKI TREES
   ============================================================ */
const SCALES = [
  { at: 0, name: "Person", desc: "can take down a few fighters" },
  { at: 15, name: "Crowd", desc: "can scatter a whole platoon" },
  { at: 30, name: "Ship", desc: "can sink or wreck a warship" },
  { at: 45, name: "Town", desc: "can level a district or a fleet line" },
  { at: 60, name: "Small island", desc: "can split cliffs and wipe out a small island's defenses" },
  { at: 75, name: "Large island", desc: "can reshape terrain and break a fortress" },
  { at: 90, name: "Sea", desc: "Emperor- and Admiral-tier disasters" }
];
const WEB_STEPS = [0, 15, 30, 45, 60, 75, 90, 100];
function scaleFor(v) { return [...SCALES].reverse().find((s) => v >= s.at) || SCALES[0]; }

// [name, desc] for each step: Person, Crowd, Ship, Town, Small island, Large island, Sea, Awakening
const FRUIT_WEBS = {
  kuki: [["Breath Shaping", "Harden a breath into air bullets and palm shields. Drops a few fighters."], ["Sky Step", "Run up the sky on hardened air and fire pressure blasts that bowl over a platoon."], ["Pressure Cannon", "A lungful of compressed air that blows a warship's mast off and caves in its hull."], ["Vacuum Dome", "Empty the air over a town district: fires die, people drop gasping, sound vanishes."], ["Pressure Front", "Drop the air pressure over a whole small island: storms form, defenders collapse."], ["Sky Fortress", "Harden the sky into walls and stairs big enough to break a fortress or hold up a cliff."], ["Atmosphere Crush", "Crush the air over an entire sea area into a hurricane fist."], ["AWAKENING: Sky Dominion", "The air of a whole island is yours to shape without touch or breath."]],
  hibi: [["Crack Palm", "Shatter weapons and bones with a touch."], ["Fault Line", "Crack the ground under a platoon and swallow them."], ["Hull Splitter", "Crack a warship from keel to deck in one strike."], ["Shatter Quake", "Crack the streets of a whole district into rubble."], ["Island Fracture", "Split a small island's cliffs and break its harbor in two."], ["Mountain Breaker", "Crack a mountain open and topple a fortress."], ["Sea Crack", "Crack the surface of the sea itself into tidal shockwaves."], ["AWAKENING: World Fault", "Everything around you can crack at will, even the air in the distance."]],
  koku: [["Frozen Second", "Freeze one enemy for an instant on touch."], ["Stolen Moment", "Freeze a whole group for a heartbeat."], ["Ship Stall", "Freeze a warship's crew mid-broadside."], ["Town Pause", "Stop a district's fight for three full seconds."], ["Island Stillness", "Freeze the defenders of a small island in place."], ["Rewind Fortress", "Rewind a fortress's walls three seconds after they're built, or broken."], ["Sea of Stopped Time", "Freeze the waves of a whole sea area."], ["AWAKENING: Hour Thief", "Steal whole minutes from the world around you."]],
  tenbin: [["Even Scales", "Swap weight or speed between two things you touch."], ["Crowd Balance", "Share one fighter's wounds across a whole crowd."], ["Ship Swap", "Swap the momentum of two warships to send them crashing."], ["Town Equalizer", "Balance the heat of a burning district with the cold sea."], ["Island Scales", "Swap the weight of a small island's fort with a feather."], ["Fortress Exchange", "Trade a fortress's strength with its weakest wall."], ["Ocean Balance", "Balance a sea's storm with its calm."], ["AWAKENING: Perfect Equality", "Everything within an island balances to your will."]],
  fuin: [["Paper Seal", "Seal a weapon or a punch into a charm."], ["Crowd Seal", "Seal a whole volley of bullets and fire it back."], ["Cannon Charm", "Seal a warship's full broadside and release it later."], ["Town Talisman", "Seal a district-sized explosion into one sheet."], ["Island Ward", "Seal a small island inside a paper barrier."], ["Fortress Scroll", "Seal an entire fortress away and release it somewhere else."], ["Sea Seal", "Seal a tidal wave or a hurricane."], ["AWAKENING: Living Paper", "Paper anywhere on the island obeys you."]],
  chi: [["Blood Whip", "Lash enemies with whips of your own blood."], ["Crimson Rain", "Rain blood needles across a whole crowd."], ["Blood Anchor", "Bind a warship with ropes of hardened blood."], ["Heartbeat Hold", "Feel and slow every heartbeat in a district."], ["Red Tide", "Turn the sea around a small island red and drain its defenders."], ["Blood Fortress", "Raise walls of crystallized blood around a fortress."], ["Sea of Crimson", "Command the blood of everything in a sea area."], ["AWAKENING: Life Weaver", "Heal or stop any living thing on the island."]],
  nami: [["Pulse Punch", "A punch that sends a wave through the target's body."], ["Ground Ripple", "Ripple the ground into a wave that throws a platoon."], ["Hull Wave", "Send a wave through a warship that shakes it apart."], ["Stone Tsunami", "Turn a district's streets into a tidal wave of stone."], ["Island Tremor", "Send waves through a small island until its cliffs fall."], ["Mountain Wave", "Ripple a mountain like water and break a fortress."], ["Great Tsunami", "Raise a tsunami across a whole sea."], ["AWAKENING: Wave World", "Anything on the island moves like water when you say so."]],
  hari: [["Needle Shot", "Fire needles from your skin."], ["Needle Storm", "A storm of needles that pins down a platoon."], ["Hull Piercer", "A spear-needle that pins a warship to the reef."], ["Iron Rain", "Rain needles over a whole district."], ["Island Thorns", "Grow needles from the ground across a small island."], ["Fortress Spike", "Drive a needle the size of a tower through a fortress."], ["Sea Barbs", "Fill a sea area with floating needle mines."], ["AWAKENING: Iron Garden", "Every metal on the island becomes needles at your call."]],
  uzu: [["Spin Kick", "A whirlpool kick that spins enemies off their feet."], ["Vortex Trap", "Trap a whole crowd in a ground whirlpool."], ["Ship Drain", "Open a whirlpool that drags a warship under."], ["Town Cyclone", "Spin a cyclone through a district."], ["Island Maelstrom", "Ring a small island with whirlpools no ship can cross."], ["Fortress Twister", "Twist a fortress off its foundations."], ["Sea Maelstrom", "Turn a whole sea area into one giant whirlpool."], ["AWAKENING: Eye of the Storm", "The whole island spins around you."]],
  sumi: [["Ink Splash", "Blind fighters and slip through attacks as ink."], ["Ink Beasts", "Draw ink beasts that fight a platoon."], ["Black Tide", "Flood a warship's deck with ink that hardens like tar."], ["Ink Town", "Paint a district into a maze of ink walls."], ["Island Blackout", "Cover a small island in ink-darkness."], ["Ink Titan", "Draw a giant that can break a fortress."], ["Ink Sea", "Turn a sea area into ink that drowns ships."], ["AWAKENING: Living Canvas", "Everything on the island can be painted into something new."]],
  doro: [["Mud Grip", "Sink enemies' feet into mud and slip through blows."], ["Swamp Field", "Turn the ground under a platoon into a swallowing swamp."], ["Deck Swallow", "Swallow a warship's deck in a mud swamp."], ["Mudslide Town", "Send a mudslide through a district."], ["Island Bog", "Turn a small island's fields and harbor into one bog."], ["Mud Colossus", "Raise a mud giant that can break a fortress."], ["Sea of Mud", "Turn the seabed of a sea area into a mud trap that grounds fleets."], ["AWAKENING: Living Earth", "The whole island's soil becomes mud at your will."]],
  kessho: [["Crystal Armor", "Diamond-hard skin and crystal blades."], ["Prism Burst", "Bend sunlight into lasers that cut through a crowd."], ["Crystal Spear", "A spear of crystal that splits a warship."], ["Crystal City", "Encase a whole district in crystal."], ["Prism Sun", "Focus sunlight over a small island into a burning beam."], ["Diamond Fortress", "Build or shatter a fortress of crystal."], ["Crystal Sea", "Crystallize the sea's surface across a sea area."], ["AWAKENING: Crystal World", "Everything on the island can turn to crystal."]],
  bara: [["Split Body", "Split your body to dodge cuts and attack from all sides."], ["Scatter Storm", "Pieces of you fight a whole crowd at once."], ["Ship Swarm", "Fly your pieces across a warship's whole deck."], ["Town Hunt", "Hunt through a district in a hundred pieces."], ["Island Spread", "Spread your pieces across a small island."], ["Fortress Breach", "Slip through every crack in a fortress at once."], ["Sea Scatter", "Spread across a sea area to strike a whole fleet."], ["AWAKENING: Split World", "Split other things too: ships, walls, ground."]],
  hana: [["Extra Arms", "Sprout arms to grab and pin fighters."], ["Hundred Hands", "A hundred arms seize a whole crowd."], ["Giant Arms", "Sprout giant arms that crush a warship."], ["Town Garden", "Sprout eyes and ears across a district."], ["Island Bloom", "Sprout arms across a small island to hold its defenders."], ["Titan Hands", "Giant hands that tear a fortress apart."], ["Sea Bloom", "Sprout limbs across a sea area's ships."], ["AWAKENING: Flowering Island", "Sprout anything, anywhere on the island."]],
  bomu: [["Blast Touch", "Explode on contact."], ["Chain Bombs", "Chain explosions through a crowd."], ["Hull Bomb", "One blast that sinks a warship."], ["Town Blaster", "Blow up a whole street block."], ["Island Blast", "Blast the cliffs of a small island into the sea."], ["Fortress Burst", "A blast that levels a fortress."], ["Sea Explosion", "Explode the sea itself across a sea area."], ["AWAKENING: Blast Land", "Anything on the island can explode at your word."]],
  supa: [["Blade Arms", "Turn your arms into swords."], ["Blade Spin", "Spin into a storm of blades through a crowd."], ["Steel Wheel", "Cut a warship in half rolling as a blade wheel."], ["Razor Rain", "Rain blades over a whole district."], ["Island Edge", "Carve a line through a small island's cliffs."], ["Fortress Cleaver", "Cut a fortress in two."], ["Sea Slash", "Slash a sea area open."], ["AWAKENING: Blade World", "Every surface on the island grows blades."]],
  sube: [["Slip Skin", "Blades and bullets slide right off you."], ["Slip Rush", "Slide through a whole crowd untouched."], ["Ship Slide", "Make a warship's deck so slippery its crew can't stand."], ["Slick Town", "Make a district's streets frictionless."], ["Island Slip", "Make a small island's defenders lose their footing."], ["Fortress Slide", "Make a fortress slide off its foundations."], ["Sea Glide", "Make a sea area so slick that fleets lose control."], ["AWAKENING: Frictionless World", "Nothing on the island can hold on unless you allow it."]],
  bane: [["Spring Leap", "Huge jumps and ricochet punches."], ["Pinball Rush", "Bounce through a whole crowd."], ["Ship Jump", "Leap from ship to ship and spring-kick a mast down."], ["Town Bounce", "Rebound across a district in seconds."], ["Island Spring", "Launch yourself across a small island."], ["Fortress Ram", "A spring-loaded ram that breaks a fortress gate and wall."], ["Sea Leap", "Jump across a whole sea area."], ["AWAKENING: Spring World", "Turn anything on the island into a spring."]],
  bari: [["Finger Barrier", "Make a barrier no blade can cut."], ["Crowd Wall", "Wall off a whole crowd."], ["Ship Shield", "Shield a ship from a full broadside."], ["Town Dome", "Cover a district in a barrier dome."], ["Island Dome", "Cover a small island in one barrier."], ["Fortress Crusher", "Squeeze a fortress between barriers."], ["Sea Wall", "Wall off a sea area from a tsunami."], ["AWAKENING: Absolute Barrier", "Barriers anywhere on the island, any shape."]],
  moku: [["Smoke Body", "Become smoke and slip through attacks."], ["Smoke Ropes", "Bind a whole crowd in smoke ropes."], ["Smoke Fleet", "Smother a warship's crew and blind its cannons."], ["Town Fog", "Bury a district in choking smoke."], ["Island Haze", "Cover a small island in smoke you control."], ["Smoke Titan", "Smoke fists that crush a fortress."], ["Sea Smog", "Blind a whole sea area for a fleet battle."], ["AWAKENING: Breath of Smoke", "Any smoke or fog on the island obeys you."]]
};
// every fruit has a web; non-starter fruits get one built from the scale
function webFor(fruitId) {
  const hand = FRUIT_WEBS[fruitId];
  if (hand) return WEB_STEPS.map((at, i) => ({ at, name: hand[i][0], desc: hand[i][1] }));
  const f = WORLD_SEED.fruits.find((x) => x.id === fruitId); const nm = f ? f.eng.replace(" Fruit", "") : "Fruit";
  return WEB_STEPS.map((at, i) => i < 7 ? { at, name: `${nm}: ${SCALES[i].name} scale`, desc: `Use the ${nm} power at ${SCALES[i].name.toLowerCase()} scale: ${SCALES[i].desc}.` } : { at, name: `AWAKENING: ${nm}`, desc: "The power spreads into your surroundings across a whole island." });
}
const AIR_PATH = webFor("kuki"); // kept for older code paths

const HAKI_TREES = {
  observation: [[0, "Danger Sense", "Feel an attack coming a moment early."], [15, "Read Intent", "Dodge one attacker by reading their intent."], [30, "Crowd Reading", "Sense everyone on a ship and where they'll strike."], [45, "Wide Sense", "Sense the presences across a whole town."], [60, "Island Sense", "Feel every presence on a small island."], [75, "Glimpse of the Future", "See a few seconds ahead in a fight."], [90, "Deep Future Sight", "See far enough ahead to make whole armies miss."], [100, "Voice of Everything", "Hear the will of people, beasts and the sea itself."]],
  armament: [[0, "Hardened Fist", "Harden your fists to hit like iron."], [15, "Coated Weapon", "Coat your weapon so it won't break and cuts deeper."], [30, "Full-Body Armor", "Harden your whole body against cannon fire."], [45, "Logia Breaker", "Reliably hit Logia bodies."], [60, "Emission", "Strike at a short distance without touching."], [75, "Inner Destruction", "Damage the enemy from inside, past armor and Haki."], [90, "Permanent Black Blade", "Your weapon's Haki stays forged in for good."], [100, "Fortress Body", "Your Haki can't be broken by anything short of an Emperor."]],
  conqueror: [[0, "Awakening Burst", "Knock out the weak-willed nearby."], [20, "Controlled Pressure", "Choose exactly who falls."], [40, "Beast Tamer", "Sea Kings and beasts back down."], [60, "Crowd King", "Drop a whole port's worth of fighters at once."], [80, "Conqueror's Coating", "Put Conqueror's Haki into your attacks."], [100, "Clash of Kings", "Stand as an equal against Emperors."]]
};
