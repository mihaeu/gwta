# gwta

Just a "quick" warm-up exercise 😀

## Map

![](map.svg)

## Design Questions

### Does the player know where they are on the map or does the map know where players are?

- players don't block each other
- map already has a lot to track (although players will have to as well)

## How are building actions handled?

- Nodes have buildings
- my turn
  - I choose a move
  - I choose which option to take if there are multiple
  - I choose which variant of that option I'll take
- but who calculates those options?
  - buildings themselves?
    - they need a lot of information about the game board and the player
  - the engine
    - how does it know what type of action

Example action codes:

- `DiscardCardForGold(type, gold)`
- `HireWorker(modifier)`
- `DrawObjectiveCard()`
- `AuxiliaryAction`
- `DoubleAuxiliaryAction`
- `DiscardTwoEqualCards`
- `MoveTrainByNumberOfMachinists`
- `BuyCows`
- `IncreaseCertificates`
- `HelpUpToThreeFarmers`
- `HelpFarmer`
- `GetOneGrainForEachHiredFarmer`
- `ReturnOneExhaustionCard`
- `GetOneGrainForEachGrainBuilding`
- `MoveUpToXSteps`
- `GetOneExchangeToken`
- `DrawAndDiscardCardsForEachHerder`
- `GainGrain`
- `PlaceATokenOnAHarbor`
- `GetOneCoinForEachGrainBuilding`
- `GetOneCoinForEachHiredFarmer`
- `DiscardAnObjectiveCardForThreeCertificates`
- `GetOneCertificateForTwoHelpedFarmers`
- `GetSixGoldForEachSetOfFourWorkers`
- `ExecuteBuenosAiresStepOne`
- `OneGrainForTwoGoldAndTwoTrainMoves`
- `OneExhaustionCardForEachOpponent`
- `DiscardOneCowTakeOneCowFromTheMarket`

Actions could be combinations over other actions in order to avoid duplication and extra testing effort.

E.g.: `Or(CompoundAction(Discard(HolandoArgentino), GainCoin(2)), HireWorker(0), HireWorker(2))`

Where an action is something that produces options that players can choose from like `Option(): Set<Action>`

So in the previous example this would mean

```bash
# A building
Or # produces CompoundAction, HireWorker, HireWorker
    CompoundAction Discard(HolandoArgentino), GainCoin(2) # produces no sub options because the different options for similar cards are identical
    HireWorker # produces one option for each available & affordable worker
    HireWorker # produces one option for each available & affordable worker

# B building
Or # produces CompoundAction, BuyCows
  CompoundAction Discard(Patagonico), GainCoin(2) # produces no sub options because the different options for similar cards are identical
  BuyCows # produces e.g. with 4 cowboys and a lot of coin and unlimited market (usually this will drastically restrict the options)
    # buy 4x Caracu
    # buy 4x value 3 cards for 5 each
    # buy 4x Franqueiro for 11 each
    # buy 2x value 3 cards for 2 each
    # buy 2x Aberdeen-Angus for 11 each
    # buy 1x Aberdeen-Angus for 6 each
    # buy 1x Franqueiro and 1x Caracu
    # buy 1x Franqueiro and 1x value 3 card
    # buy 1x Franqueiro and draw two more cowboys
    # draw 8 more cowboys
    # draw 6 more cowboys and buy one Caracu
    # draw 6 more cowboys and buy one value 3 card
    # draw 4 more cowboys and buy 2x caracu
    # draw 4 more cowboys and buy 2x value 3 card
    # draw 4 more cowboys and buy 1x Aberdeen-Angus
    # draw 4 more cowboys and buy 1x Franquiero and 1x Caracu
    # draw 2 more cowboys
    # ...

So depending on how many herders one has, what is in the market and how much coin the player has, there can be a lot of options especially since only using some cowboys and not all of them in order to save money for other things is very much valid.
```

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
