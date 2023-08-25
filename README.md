# gwta

Just a "quick" warm-up exercise 😀

## Map

![](map.svg)

## Design Questions

### Does the player know where they are on the map or does the map know where players are?

- players don't block each other
- map already has a lot to track (although players will have to as well)

### Actions

Some actions are easier to implement than others. I'll try to sum them up here.

#### Moving trains

Similar to map, should be easy to do.

#### Buying cows

Requires hand cards and possible coins as well.
After that it's easy.
Reseed during Buenos Aires events.

#### Building buildings

Very easy, the actions are the only hard thing, but that's not part of the task for building.

#### Help a farmer

Easy in itself, but need to think about how to validate things properly.

#### Discarding for coin

Easy, but requires cows.

#### Hiring a worker

Easy, except for the actions when hiring, those require other things to be implemented. Maybe split the task up.

#### Draw bonus cards

Drawing is easy, but implementing them should be done here as well.
