# Tides of the Sundered Line

A free-text, anime-style pirate adventure set in an **alternate timeline of the One Piece world**. You write anything your character does, and an AI Game Master reacts inside a large pre-built world that remembers and changes with every choice.

## The world

Eighteen years ago, a Void Century weapon cut the Red Line in two where the Holy Land stood. The channel it left is called **the Wound**. The World Government fell and was rebuilt as the **Gilded Concord**, ruling from the flying city of Aurelion. The Marines split into the loyal **Iron Tide** and the outlaw **Blue Oath**. Three new Emperors, the **Storm Thrones**, rule the New World. Somewhere below the Wound lies **the Hollow Crown**.

- 15 islands across the Blues, Paradise, the New World and the sky, each with a threat tier (★ to ★★★★★)
- 8 factions with power levels and an attitude toward you
- 37 original characters, each with a goal and a hidden secret. 18 of them are Devil Fruit users you can recruit
- 30 original Devil Fruits. You can start with any of 18 (including the Air-Air Fruit, a Paramecia). Fruits you don't pick are eaten by characters somewhere in the world
- 20 sword types, 8 guns, 6 other weapons, 8 named legendary or graded blades hidden in the world, and 16 fighting styles
- 8 starting paths, each with its own consequences: stole your fruit, bought it on credit, cult-marked, Haki apprentice, Blue Oath runaway, and more
- Your own techniques: invent anything. Each starts at Raw rank and grows to Legend. You begin with 3 slots and earn more as your power level rises, and the Game Master scales a technique's power to your rank and the threat level of the sea you're in
- A large hidden pool of main missions and side stories. They come up naturally or grow out of your actions, and they're never listed for you. After the big arcs end, new sagas keep forming without end
- 10 scheduled world events, from Tithe Day to Tidewall on Day 60. They happen on their own unless your actions change them

## How the AI changes the world

Each turn, the Game Master gets the full world state, the voyage chronicle and your action. It writes the scene, then sends a structured list of changes: HP, bounty, Haki, items, crew, NPC trust and fate, faction power, island control, story stages, and events cancelled, delayed or created. The game applies these to your save. The chronicle keeps important memories and trims minor ones, so campaigns stay coherent for hours.

## Playing

- **On claude.ai (recommended):** open the published artifact. The Game Master runs on your own Claude account, so no key is needed.
- **Locally:** open `index.html` in a browser, go to *Game Master settings* and paste an Anthropic API key. The key stays in your browser's local storage and is sent only to `api.anthropic.com`.

There are 3 autosaving slots. Menu → *save code* lets you copy your whole voyage and load it anywhere.

## Building

The source lives in `src/`. Run `./build.sh` to produce:

- `game.html`: the page body published as the claude.ai artifact
- `index.html`: a standalone page
