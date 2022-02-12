# Foundry Notes

A place to store general notes about the design and implementation of FoundryVTT itself or the ways that this system is designed in order to cope with those things.

## Separation of data

The main thing that the players will interact with are what Foundry calls "Actors", the characters that populate the game world primarily. There is a collection of classes for handling these things and making them accessible via the UI.

- `Actor` &mdash; Represents an individual character, whether PC, NPC, or some other thing in the game world that moves around
  - Contains a reference to an `ActorSheet` if one is displayed currently in the property `_sheet`
- `ActorData` &mdash; Record containing the information that defines the current state of the Actor both in terms of Foundry's operation and in terms of the game system itself
  - The `ActorData` object also has a property called `data` that is the untyped dumping ground for the information describing the Actor in game system terms (the stuff that would be written down on a paper character sheet)
- `ActorSheet` &mdash; Represents the UI object that displays and edits the information about the `Actor` in the Foundry UI
  - Contains a reference to the Actor it is displaying in the property `actor`
  - In order to get to HERO characteristics from the `HeroSystem6eActorSheet` object, one must reference `this.actor.data.data.characteristics` 🤦‍♂️
