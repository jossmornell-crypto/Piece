# Tides of the Grand Line

A free-text, anime-style pirate adventure set in an **alternate timeline of the One Piece world**. You write anything your character does, and an AI Game Master reacts inside a large pre-built world that remembers and changes with every choice.

## The world

It's the Great Pirate Era, 22 years after the Pirate King's execution. The World Government, the Marines, Cipher Pol, Impel Down, the Seven Warlords, the Four Emperors and the Revolutionary Army all work as you'd expect. Every person in this timeline is new, though: famous characters never existed here.

- 22 islands, from Gullport in the East Blue through Paradise, Marineford and Fish-Man Island to the New World, each with a threat tier (★ to ★★★★★)
- 9 factions with power levels and an attitude toward you
- 47 characters with simple names, each with a goal and a hidden secret. 21 of them are recruitable
- 40 Devil Fruits: 20 original and 20 that already exist in One Piece, held by new owners or unclaimed. You can start with any of 20, including the featured Air-Air Fruit (a Paramecia with a full mastery path)
- 20 sword types, 8 guns, 6 other weapons, 8 named blades hidden in the world, and 16 fighting styles
- 9 starting paths, each with its own consequences
- Your own techniques: start with 3 slots, earn more as your power level grows, and rank each technique from Raw to Legend
- A hidden pool of main missions and side stories that come up naturally, plus endless new sagas
- 10 scheduled world events, from Bounty Day to the Reverie on Day 60. They happen on their own unless your actions change them
- Fight effects: every move in a fight gets an anime callout and its own effect. Ordinary dialogue gets none. All effects can be switched off in settings or with the FX button

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
