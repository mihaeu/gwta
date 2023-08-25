# gwta

Just a "quick" warm-up exercise 😀

## Ideas

### basic movement (always max) and map

Is the map a graph?
Is the map complete from the start with most locations empty or are locations added and removed as the game progresses?

![](map.svg)

#### Movement Options

- from the current node
  - do I have more moves available
  - for each next node
    - is the node empty
      - yes: add it to the options
      - no: recurse over node children

### buenos aires map seeding

- seed map with farmers
- fill foresight spaces
- fill job market

### game end conditions

- job market full
