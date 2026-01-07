## I. General

### 1. **Query Game Mode and Player Number**

**Node Functions**

Searches the theoretical number of players entering the match, including players via Matchmaking or Room creation, and the method of entry

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|-------------|----------------------------------------------------|
| Output Parameter | Player Count | Integer |  |
| Output Parameter | Gameplay Mode | Enumeration | Includes Playtest, Room Play, and Matchmaking Play |

### **2. Get Local Variable**

**Node Functions**

Retrieves a Local Variable and optionally sets its [Initial Value]

After setting the [Initial Value], the [Value] output parameter will be equal to the input [Initial Value]

When the output [Local Variable] is connected to the [Set Local Variable] Execution Node's input [Local Variable], the input [Value] of [Set Local Variable] overwrites this Search Node's output [Value]. The next time you use [Get Local Variable], the output [Value] is the overwritten value

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|----------------|-------------------------------------------------------------------------------------------------------------|
| Input Parameter | Initial Value | Generic | Allows you to set the default initial value for local variables |
| Output Parameter | Local Variable | Local Variable | Container for data storage |
| Output Parameter | Value | Generic | When not Overwritten, this value equals the Initial Value; after it is Overwritten, it equals the new value |

## II. Math

### **1. Query Server Time Zone**

**Node Functions**

Searches the Server's timezone

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Output Parameter | Time Zone | Integer |  |

### **2. Query Timestamp (UTC+0)**

**Node Functions**

Searches the current timestamp

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Output Parameter | Timestamp | Integer |  |

### **3. Get Random Floating Point Number**

**Node Functions**

Returns a random Floating Point Number that is ≥ the lower limit and ≤ the upper limit. The range is inclusive

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|------------------------|-------------|
| Input Parameter | Lower Limit | Floating Point Numbers |  |
| Input Parameter | Upper Limit | Floating Point Numbers |  |
| Output Parameter | Result | Floating Point Numbers |  |

### **4. Get Random Integer**

**Node Functions**

Returns a random Integer that is ≥ the lower limit and ≤ the upper limit. The range is inclusive

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Lower Limit | Integer |  |
| Input Parameter | Upper Limit | Integer |  |
| Output Parameter | Result | Integer |  |

### **5. Weighted Random**

**Node Functions**

Takes a list of weights and randomly selects an ID based on the weight distribution

For example, with a weight list {10, 20, 66, 4}, this node outputs 0, 1, 2, or 3 with probabilities 10%, 20%, 66%, and 4% respectively

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|--------------|-------------|
| Input Parameter | Weight List | Integer List |  |
| Output Parameter | Weight ID | Integer |  |

### **6. 3D Vector: Backward**

**Node Functions**

Return (0,0,-1)

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|-----------|-------------|
| Output Parameter | (0,0,-1) | 3D Vector |  |

### **7. 3D Vector: Zero Vector**

**Node Functions**

Return (0,0,0)

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|-----------|-------------|
| Output Parameter | (0,0,0) | 3D Vector |  |

### **8. 3D Vector: Forward**

**Node Functions**

Return (0,0,1)

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|-----------|-------------|
| Output Parameter | (0,0,1) | 3D Vector |  |

### **9. 3D Vector: Up**

**Node Functions**

Return (0,1,0)

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|-----------|-------------|
| Output Parameter | (0,1,0) | 3D Vector |  |

### **10. 3D Vector: Down**

**Node Functions**

Return (0,-1,0)

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|-----------|-------------|
| Output Parameter | (0,-1,0) | 3D Vector |  |

### **11. 3D Vector: Right**

**Node Functions**

Return (1,0,0)

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|-----------|-------------|
| Output Parameter | (1,0,0) | 3D Vector |  |

### **12. 3D Vector: Left**

**Node Functions**

Return (-1,0,0)

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|-----------|-------------|
| Output Parameter | (-1,0,0) | 3D Vector |  |

### **13. Pi (π)**

**Node Functions**

Returns the approximate value of π (≈ 3.142)

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|------------------------|-------------|
| Output Parameter | Pi (π) | Floating Point Numbers |  |

## III. List Related

### **1. Search List and Return Value ID**

**Node Functions**

Find the specified value in the list and return a list of IDs where it appears

For example, if the target list is {1,2,3,2,1} and the value is 1, the returned ID list is {0,4}, meaning 1 appears at IDs 0 and 4 in the target list

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|--------------|------------------------------------|
| Input Parameter | Target List | Generic |  |
| Input Parameter | Value | Generic |  |
| Output Parameter | ID List | Integer List | Returns an empty list if not found |

### **2. Get Corresponding Value From List**

**Node Functions**

Returns the value at the specified ID in the list (0-based)

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | List | Generic |  |
| Input Parameter | ID | Integer |  |
| Output Parameter | Value | Generic |  |

### **3. Get List Length**

**Node Functions**

Returns the length of the list (number of elements)

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | List | Generic |  |
| Output Parameter | Length | Integer |  |

### **4. Get Maximum Value from List**

**Node Functions**

Applies only to Floating Point Number or Integer lists; returns the maximum value

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | List | Generic |  |
| Output Parameter | Maximum Value | Generic |  |

### **5. Get Minimum Value From List**

**Node Functions**

Applies only to Floating Point Number or Integer lists; returns the minimum value

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | List | Generic |  |
| Output Parameter | Minimum Value | Generic |  |

### **6. List Includes This Value**

**Node Functions**

Returns whether the list contains the specified value

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | List | Generic |  |
| Input Parameter | Value | Generic |  |
| Output Parameter | Include | Boolean |  |

## IV. Custom Variables

### **1. Query Custom Variable Snapshot**

**Node Functions**

Searches the value of the specified Variable Name from the Custom Variable Component snapshot

Only available for the [On Entity Destroyed] event

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|------------------------------------|--------------------------|-------------|
| Input Parameter | Custom Variable Component Snapshot | Custom Variable Snapshot |  |
| Input Parameter | Variable Name | String |  |
| Output Parameter | Variable Value | Generic |  |

### **2. Get Node Graph Variable**

**Node Functions**

Returns the value of the specified Node Graph Variable from the current Node Graph

If the variable does not exist, returns the type's default value

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Variable Name | String |  |
| Output Parameter | Variable Value | Generic |  |

### **3. Get Custom Variable**

**Node Functions**

Returns the value of the specified Custom Variable from the Target Entity

If the variable does not exist, returns the type's default value

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Target Entity | Entity |  |
| Input Parameter | Variable Name | String |  |
| Output Parameter | Variable Value | Generic |  |

## V. Preset Status

### **1. Get Preset Status**

**Node Functions**

Returns the value of the specified Preset Status for the Target Entity. Returns 0 if the Entity does not have that Preset Status

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|---------------------|---------|-------------|
| Input Parameter | Target Entity | Entity |  |
| Input Parameter | Preset Status Index | Integer |  |
| Output Parameter | Preset Status Value | Integer |  |

## VI. Entity Related

### **1. Query Character's Current Movement SPD**

**Node Functions**

Can only be searched when the Character has the [Monitor Movement Speed] Unit Status effect

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|------------------|------------------------|-------------|
| Input Parameter | Character Entity | Entity |  |
| Output Parameter | Current Speed | Floating Point Numbers |  |
| Output Parameter | Velocity Vector | 3D Vector |  |

### **2. Query If Entity Is on the Field**

**Node Functions**

Searches whether the specified Entity is present

Note that Character Entities are still considered present even when Downed

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Target Entity | Entity |  |
| Output Parameter | On the Field | Boolean |  |

### **3. Get All Entities on the Field**

**Node Functions**

Returns all Entities currently present in the scene. The number of Entities in this List may be large

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|-------------|-------------|
| Output Parameter | Entity List | Entity List |  |

### **4. Get Specified Type of Entities on the Field**

**Node Functions**

Returns all Entities of the specified type currently in the scene. The number of Entities in this list may be large

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|-------------|-----------------------------------------------------|
| Input Parameter | Entity Type | Enumeration | Includes Stage, Object, Player, Character, Creation |
| Output Parameter | Entity List | Entity List |  |

### **5. Get Entities With Specified Prefab on the Field**

**Node Functions**

Returns all Entities currently in the scene that were created by the specified Prefab ID

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|-------------|-------------|
| Input Parameter | Prefab ID | Prefab ID |  |
| Output Parameter | Entity List | Entity List |  |

### **6. Get Character Attribute**

**Node Functions**

Returns the Base Attributes of the Character Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|---------------------------|------------------------|-------------|
| Input Parameter | Target Entity | Entity |  |
| Output Parameter | Level | Integer |  |
| Output Parameter | Current HP | Floating Point Numbers |  |
| Output Parameter | Max HP | Floating Point Numbers |  |
| Output Parameter | Current ATK | Floating Point Numbers |  |
| Output Parameter | Base ATK | Floating Point Numbers |  |
| Output Parameter | Current DEF | Floating Point Numbers |  |
| Output Parameter | Base DEF | Floating Point Numbers |  |
| Output Parameter | Interrupt Value Threshold | Floating Point Numbers |  |
| Output Parameter | Current Interrupt Value | Floating Point Numbers |  |
| Output Parameter | Current Interrupt Status | Enumeration |  |

### **7. Get Entity Advanced Attribute**

**Node Functions**

Returns the Advanced Attributes of the Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|------------------------|------------------------|-------------|
| Input Parameter | Target Entity | Entity |  |
| Output Parameter | CRIT Rate | Floating Point Numbers |  |
| Output Parameter | CRIT DMG | Floating Point Numbers |  |
| Output Parameter | Healing Bonus | Floating Point Numbers |  |
| Output Parameter | Incoming Healing Bonus | Floating Point Numbers |  |
| Output Parameter | Energy Recharge | Floating Point Numbers |  |
| Output Parameter | CD Reduction | Floating Point Numbers |  |
| Output Parameter | Shield Strength | Floating Point Numbers |  |

### **8. Get Entity Type**

**Node Functions**

Returns the Entity Type of the Target Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|-------------|------------------------------------------------------|
| Input Parameter | Target Entity | Entity |  |
| Output Parameter | Entity Type | Enumeration | Includes Player, Character, Stage, Object, Creation. |

### **9. Get Entity Location and Rotation**

**Node Functions**

Returns the Location and Rotation of the Target Entity

Not applicable to Player Entities or Stage Entities

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|-----------|-------------|
| Input Parameter | Target Entity | Entity |  |
| Output Parameter | Location | 3D Vector |  |
| Output Parameter | Rotate | 3D Vector |  |

### **10. Get Entity Forward Vector**

**Node Functions**

Returns the Forward Vector of the specified Entity (the positive Z-axis direction in the Entity's relative coordinate system)

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|-----------|-------------|
| Input Parameter | Target Entity | Entity |  |
| Output Parameter | Forward Vector | 3D Vector |  |

### **11. Get Entity Upward Vector**

**Node Functions**

Returns the Upward Vector of the specified Entity (the positive Y-axis direction in the Entity's relative coordinate system)

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|-----------|-------------|
| Input Parameter | Target Entity | Entity |  |
| Output Parameter | Upward Vector | 3D Vector |  |

### **12. Get Entity Right Vector**

**Node Functions**

Returns the Right Vector of the specified Entity (the positive X-axis direction in the Entity's relative coordinate system)

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|-----------|-------------|
| Input Parameter | Target Entity | Entity |  |
| Output Parameter | Right Vector | 3D Vector |  |

### **13. Get List of Entities Owned by the Entity**

**Node Functions**

Returns a list of all Entities owned by the Target Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|-------------|-------------|
| Input Parameter | Target Entity | Entity |  |
| Output Parameter | Entity List | Entity List |  |

### **14. Get Entity Elemental Attribute**

**Node Functions**

Returns the Element Attributes of the Target Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|--------------------|------------------------|-------------|
| Input Parameter | Target Entity | Entity |  |
| Output Parameter | Pyro DMG Bonus | Floating Point Numbers |  |
| Output Parameter | Pyro RES | Floating Point Numbers |  |
| Output Parameter | Hydro DMG Bonus | Floating Point Numbers |  |
| Output Parameter | Hydro RES | Floating Point Numbers |  |
| Output Parameter | Dendro DMG Bonus | Floating Point Numbers |  |
| Output Parameter | Dendro RES | Floating Point Numbers |  |
| Output Parameter | Electro DMG Bonus | Floating Point Numbers |  |
| Output Parameter | Electro RES | Floating Point Numbers |  |
| Output Parameter | Anemo DMG Bonus | Floating Point Numbers |  |
| Output Parameter | Anemo RES | Floating Point Numbers |  |
| Output Parameter | Cryo DMG Bonus | Floating Point Numbers |  |
| Output Parameter | Cryo RES | Floating Point Numbers |  |
| Output Parameter | Geo DMG Bonus | Floating Point Numbers |  |
| Output Parameter | Geo RES | Floating Point Numbers |  |
| Output Parameter | Physical DMG Bonus | Floating Point Numbers |  |
| Output Parameter | Physical RES | Floating Point Numbers |  |

### **15. Get Object Attribute**

**Node Functions**

Returns the Base Attributes of the Object

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|------------------------|-------------|
| Input Parameter | Object Entity | Entity |  |
| Output Parameter | Level | Integer |  |
| Output Parameter | Current HP | Floating Point Numbers |  |
| Output Parameter | Max HP | Floating Point Numbers |  |
| Output Parameter | Current ATK | Floating Point Numbers |  |
| Output Parameter | Base ATK | Floating Point Numbers |  |
| Output Parameter | Current DEF | Floating Point Numbers |  |
| Output Parameter | Base DEF | Floating Point Numbers |  |

### **16. Get Owner Entity**

**Node Functions**

Returns the Owner Entity of the specified Target Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|--------|-------------|
| Input Parameter | Target Entity | Entity |  |
| Output Parameter | Owner Entity | Entity |  |

### **17. Get Entity List by Specified Range**

**Node Functions**

Returns a list of Entities within a specified spherical range from the Target Entity List

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|--------------------|------------------------|-------------|
| Input Parameter | Target Entity List | Entity List |  |
| Input Parameter | Center Point | 3D Vector |  |
| Input Parameter | Radius | Floating Point Numbers |  |
| Output Parameter | Result List | Entity List |  |

### **18. Get Entity List by Specified Type**

**Node Functions**

Returns a list of specified Entity types from the Target Entity List

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|--------------------|-------------|------------------------------------------------------|
| Input Parameter | Target Entity List | Entity List |  |
| Input Parameter | Entity Type | Enumeration | Includes Player, Character, Stage, Object, Creation. |
| Output Parameter | Result List | Entity List |  |

### **19. Get Entity List by Specified Prefab ID**

**Node Functions**

Returns a list of Entities created with the specified Prefab ID from the Target Entity List

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|--------------------|-------------|-------------|
| Input Parameter | Target Entity List | Entity List |  |
| Input Parameter | Prefab ID | Prefab ID |  |
| Output Parameter | Result List | Entity List |  |

### **20. Get Entity List by Specified Faction**

**Node Functions**

Returns the list of Entities belonging to a specific Faction from the Target Entity List

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|--------------------|-------------|-------------|
| Input Parameter | Target Entity List | Entity List |  |
| Input Parameter | Faction | Faction |  |
| Output Parameter | Result List | Entity List |  |

### **21. Get Self Entity**

**Node Functions**

Returns the Entity associated with this Node Graph

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|--------|-------------|
| Output Parameter | Self Entity | Entity |  |

### **22. Query GUID by Entity**

**Node Functions**

Searches for the GUID of the specified Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|--------|-------------|
| Input Parameter | Entity | Entity |  |
| Output Parameter | GUID | GUID |  |

### **23. Query Entity by GUID**

**Node Functions**

Searches for an Entity by GUID

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|--------|-------------|
| Input Parameter | GUID | GUID |  |
| Output Parameter | Entity | Entity |  |

## VII. Stage Related

### **1. Query Current Environment Time**

**Node Functions**

Searches the current Environment Time, in the range [0, 24)

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|--------------------------|------------------------|-----------------------------|
| Output Parameter | Current Environment Time | Floating Point Numbers | The value range is [0, 24) |
| Output Parameter | Current Loop Day | Integer | Number of Loop Days elapsed |

### **2. Query Game Time Elapsed**

**Node Functions**

Searches how long the game has been running, in seconds

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|-------------------|---------|-------------|
| Output Parameter | Game Time Elapsed | Integer |  |

## VIII. Faction Related

### **1. Query Entity Faction**

**Node Functions**

Searches the Faction of the specified Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Target Entity | Entity |  |
| Output Parameter | Faction | Faction |  |

### **2. Query If Faction Is Hostile**

**Node Functions**

Searches whether two Factions are hostile to each other

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Faction 1 | Faction |  |
| Input Parameter | Faction 2 | Faction |  |
| Output Parameter | Hostile | Boolean |  |

## IX. Player and Character Related

### **1. Query If All Player Characters Are Down**

**Node Functions**

Check if all of the player's characters are downed

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Player Entity | Entity |  |
| Output Parameter | Result | Boolean |  |

### **2. Get Player GUID by Player ID**

**Node Functions**

Returns the Player GUID based on Player ID, where the ID indicates which Player they are

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Player ID | Integer |  |
| Output Parameter | Player GUID | GUID |  |

### **3. Get Player ID by Player GUID**

**Node Functions**

Returns the Player ID based on Player GUID, where the ID indicates which Player they are

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Player GUID | GUID |  |
| Output Parameter | Player ID | Integer |  |

### **4. Get Player Client Input Device Type**

**Node Functions**

Returns the Player's local input device type, as determined by the Interface mapping method

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|-------------------|-------------|-----------------------------------------------|
| Input Parameter | Player Entity | Entity |  |
| Output Parameter | Input Device Type | Enumeration | Includes keyboard/mouse, gamepad, touchscreen |

### **5.** Get Player Entity to Which the Character Belongs

**Node Functions**

Returns the Player Entity that owns the Character Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|--------------------------|--------|-------------|
| Input Parameter | Character Entity | Entity |  |
| Output Parameter | Affiliated Player Entity | Entity |  |

### **6. Get Player Revive Time**

**Node Functions**

Returns the revive duration of the specified Player Entity, in seconds

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Player Entity | Entity |  |
| Output Parameter | Duration | Integer |  |

### **7. Get Player Nickname**

**Node Functions**

Returns the Player's nickname

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|-----------------|--------|-------------|
| Input Parameter | Player Entity | Entity |  |
| Output Parameter | Player Nickname | String |  |

### **8. Get Player Remaining Revives**

**Node Functions**

Returns the remaining number of revives for the specified Player Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|-----------------|---------|-------------|
| Input Parameter | Player Entity | Entity |  |
| Output Parameter | Remaining Times | Integer |  |

### **9. Get List of Player Entities on the Field**

**Node Functions**

Returns a list of all Player Entities present in the scene

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|--------------------|-------------|-------------|
| Output Parameter | Player Entity List | Entity List |  |

### **10. Get All Character Entities of Specified Player**

**Node Functions**

Returns a list of all Character Entities for the specified Player Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|-----------------------|-------------|-------------|
| Input Parameter | Player Entity | Entity |  |
| Output Parameter | Character Entity List | Entity List |  |

## X. Follow Motion Device

### **1. Get Follow Motion Device Target**

**Node Functions**

Returns the Target of the Follow Motion Device, including the Target Entity and its GUID

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------------|--------|-------------|
| Input Parameter | Target Entity | Entity |  |
| Output Parameter | Follow Target Entity | Entity |  |
| Output Parameter | Follow Target GUID | GUID |  |

## XI. Global Timer

### **1. Get Current Global Timer Time**

**Node Functions**

Returns the current time of the specified Global Timer on the Target Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|------------------------|-------------|
| Input Parameter | Target Entity | Entity |  |
| Input Parameter | Timer Name | String |  |
| Output Parameter | Current Time | Floating Point Numbers |  |

## XII. UI Control Groups

### **1. Get Player's Current UI Layout**

**Node Functions**

Returns the ID of the currently active Interface Layout on the specified Player Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Player Entity | Entity |  |
| Output Parameter | Layout Index | Integer |  |

## XIII. Creation

### **1. Get Creation's Current Target**

**Node Functions**

The Target Entity varies with the Creation's current behavior

For example, when a Creation is attacking, its Target is the specified enemy Entity

For example, when a Creation is healing allies, its Target is the specified allied Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|-----------------|--------|--------------------------------------------------------------|
| Input Parameter | Creation Entity | Entity | Runtime Creation Entity |
| Output Parameter | Target Entity | Entity | Current intelligently selected Target Entity of the Creation |

### **2. Get Aggro List of Creation in Default Mode**

**Node Functions**

Returns the Aggro List in Classic Mode. This Node only outputs a valid list when the Aggro Configuration is set to [Default Type]

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|-----------------|-------------|----------------------------------------------------------------------|
| Input Parameter | Creation Entity | Entity | Runtime Creation Entity |
| Output Parameter | Aggro List | Entity List | Unordered list of Entities this Creation currently has Aggro against |

### **3. Get Creation Attribute**

**Node Functions**

Returns the Attributes of the specified Creation

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|---------------------------|------------------------|-------------|
| Input Parameter | Creation Entity | Entity |  |
| Output Parameter | Level | Integer |  |
| Output Parameter | Current HP | Floating Point Numbers |  |
| Output Parameter | Max HP | Floating Point Numbers |  |
| Output Parameter | Current ATK | Floating Point Numbers |  |
| Output Parameter | Base ATK | Floating Point Numbers |  |
| Output Parameter | Interrupt Value Threshold | Floating Point Numbers |  |
| Output Parameter | Current Interrupt Value | Floating Point Numbers |  |
| Output Parameter | Current Interrupt Status | Enumeration |  |

## XIV. Class

### **1. Query Player Class Level**

**Node Functions**

Searches the Player's Level of the specified Class

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|-----------------|-----------|-------------|
| Input Parameter | Player Entity | Entity |  |
| Input Parameter | Class Config ID | Config ID |  |
| Output Parameter | Level | Integer |  |

### **2. Query Player Class**

**Node Functions**

Searches the Player's current Class; outputs the Config ID of that Class

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|-----------------|-----------|-------------|
| Input Parameter | Player Entity | Entity |  |
| Output Parameter | Class Config ID | Config ID |  |

## XV. Skills

### **1. Query Character Skill**

**Node Functions**

Searches the Skill in the specified slot of a Character; outputs that Skill's Config ID

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------------|-------------|-------------|
| Input Parameter | Character Entity | Entity |  |
| Input Parameter | Character Skill Slot | Enumeration |  |
| Output Parameter | Skill Config ID | Config ID |  |

## XVI. Unit Status


### 1. List of Slot IDs Querying Unit Status

**Node Functions**

Searches the list of all Slot IDs for the Unit Status with the specified Config ID on the Target Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|-----------------------|--------------|-------------|
| Input Parameter | Query Target Entity | Entity |  |
| Input Parameter | Unit Status Config ID | Config ID |  |
| Output Parameter | Slot ID List | Integer List |  |

### **2. Query If Entity Has Unit Status**

**Node Functions**

Searches whether the specified Entity has a Unit Status with the given Config ID

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|-----------------------|-----------|-------------|
| Input Parameter | Target Entity | Entity |  |
| Input Parameter | Unit Status Config ID | Config ID |  |
| Output Parameter | Has | Boolean |  |

### **3. Query Unit Status Stacks by Slot ID**

**Node Functions**

Searches the Stack Count of the specified Unit Status on the Target Entity's designated Slot

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|-----------------------|-----------|-------------|
| Input Parameter | Query Target Entity | Entity |  |
| Input Parameter | Unit Status Config ID | Config ID |  |
| Input Parameter | Slot ID | Integer |  |
| Output Parameter | Stacks | Integer |  |

### **4. Query Unit Status Applier by Slot ID**

**Node Functions**

Searches the Applier of the specified Unit Status on the Target Entity's designated Slot

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|-----------------------|-----------|-------------|
| Input Parameter | Query Target Entity | Entity |  |
| Input Parameter | Unit Status Config ID | Config ID |  |
| Input Parameter | Slot ID | Integer |  |
| Output Parameter | Applier Entity | Entity |  |

## XVII. Unit Tags

### **1. Get Entity List by Unit Tag**

**Node Functions**

Returns a list of all Entities in the scene that carry this Unit Tag

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|-------------|-------------|
| Input Parameter | Unit Tag Index | Integer |  |
| Output Parameter | Entity List | Entity List |  |

### **2. Get Entity Unit Tag List**

**Node Functions**

Returns a list of all Unit Tags carried by the Target Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|--------------|-------------|
| Input Parameter | Target Entity | Entity |  |
| Output Parameter | Unit Tag List | Integer List |  |

## XVIII. Custom Aggro

### **1. Query Global Aggro Transfer Multiplier**

**Node Functions**

Searches the Global Aggro Transfer Multiplier; it can be configured in [Stage Settings]

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------------------------|------------------------|-------------|
| Output Parameter | Global Aggro Transfer Multiplier | Floating Point Numbers |  |

### **2. Query the Aggro Multiplier of the Specified Entity**

**Node Functions**

Query Aggro Multiplier of Specific Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|------------------|--------|-------------|
| Input Parameter | Query Target | Entity |  |
| Output Parameter | Aggro Multiplier | Floating Point Numbers |  |

### **3. Query the Aggro Value of the Specified Entity**

**Node Functions**

Searches the Aggro Value of the Target Entity on its Aggro Owners

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Query Target | Entity |  |
| Input Parameter | Aggro Owner | Entity |  |
| Output Parameter | Aggro Value | Integer |  |

### **4. Query if Specified Entity Is in Combat**

**Node Functions**

Searches whether the specified Entity has entered battle

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------------|-------------|
| Input Parameter | Query Target | Entity |  |
| Output Parameter | In Combat | Boolean |  |

### **5.** Get List of Owners Who Have the Target in Their Aggro List

**Node Functions**

Searches which Entities' Aggro Lists include the specified Target Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|------------------|-------------|-------------|
| Input Parameter | Query Target | Entity |  |
| Output Parameter | Aggro Owner List | Entity List |  |

### **6.** Get List of Owners That Have the Target As Their Aggro Target

**Node Functions**

Searches which Entities have the Target Entity as their Aggro Target

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|------------------|-------------|-------------|
| Input Parameter | Target Entity | Entity |  |
| Output Parameter | Aggro Owner List | Entity List |  |

### **7. Get the Aggro List of the Specified Entity**

**Node Functions**

Get Specific Entity's Aggro List

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|-------------|-------------|
| Input Parameter | Target Entity | Entity |  |
| Output Parameter | Aggro List | Entity List |  |

### **8. Get the Aggro Target of the Specified Entity**

**Node Functions**

Get Aggro Target of Specific Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|--------|-------------|
| Input Parameter | Aggro Owner | Entity |  |
| Output Parameter | Aggro Target | Entity |  |

## XIX. Global Path

### **1. Get Specified Waypoint Info**

**Node Functions**

Searches the specified Waypoint information for the given Path

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------------|-----------|-------------|
| Input Parameter | Path Index | Integer |  |
| Input Parameter | Path Waypoint ID | Integer |  |
| Output Parameter | Waypoint Location | 3D Vector |  |
| Output Parameter | Waypoint Orientation | 3D Vector |  |

## XX. Preset Points

### **1. Get Preset Point List by Unit Tag**

**Node Functions**

Searches all Preset Points that carry the Unit Tag by its ID; outputs each Preset Point's ID

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|------------------|--------------|-------------|
| Input Parameter | Unit Tag ID | Integer |  |
| Output Parameter | Point Index List | Integer List |  |

### **2. Query Preset Point Position Rotation**

**Node Functions**

Searches the Location and Rotation of the specified Preset Point

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|-----------|-------------|
| Input Parameter | Point Index | Integer |  |
| Output Parameter | Location | 3D Vector |  |
| Output Parameter | Rotate | 3D Vector |  |

## XXI. Stage Settlement

### **1. Get Player Settlement Success Status**

**Node Functions**

Get Player Settlement Success Status

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|-------------------|-------------|-----------------------------------------|
| Input Parameter | Player Entity | Entity |  |
| Output Parameter | Settlement Status | Enumeration | Includes: Undetermined, Victory, Defeat |

### **2. Get Player Settlement Ranking Valu**e

**Node Functions**

Returns the Settlement ranking value for the specified Player Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Player Entity | Entity |  |
| Output Parameter | Ranking Value | Integer |  |

### **3. Get Faction Settlement Success Status**

**Node Functions**

Get Faction Settlement Success Status

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|-------------------|-------------|-----------------------------------------|
| Input Parameter | Faction | Faction |  |
| Output Parameter | Settlement Status | Enumeration | Includes: Undetermined, Victory, Defeat |

### **4. Get Faction Settlement** Ranking Value

**Node Functions**

Returns the Settlement ranking value for the specified Faction

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Faction | Faction |  |
| Output Parameter | Ranking Value | Integer |  |

## XXII. Dictionary

### **1. Query If Dictionary Contains Specific Key**

**Node Functions**

Searches whether the specified Dictionary contains the specified Key

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Dictionary | Generic |  |
| Input Parameter | Key | Generic |  |
| Output Parameter | Include | Boolean |  |

### **2. Query If Dictionary Contains Specific Value**

**Node Functions**

Searches whether the specified Dictionary contains the specified Value

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Dictionary | Generic |  |
| Input Parameter | Value | Generic |  |
| Output Parameter | Include | Boolean |  |

### **3. Query Dictionary's Length**

**Node Functions**

Searches the number of Key-Value Pairs in the Dictionary

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Dictionary | Generic |  |
| Output Parameter | Length | Integer |  |

### **4. Query Dictionary Value by Key**

**Node Functions**

Searches the corresponding Value in the Dictionary by Key. If the Key does not exist, returns the type's default value

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Dictionary | Generic |  |
| Input Parameter | Key | Generic |  |
| Output Parameter | Value | Generic |  |

### **5. Get List of Keys from Dictionary**

**Node Functions**

Returns a list of all Keys in the Dictionary. Because Key-Value Pairs are unordered, the Keys may not be returned in insertion order

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Dictionary | Generic |  |
| Output Parameter | Key List | Generic |  |

### **6. Get List of Values from Dictionary**

**Node Functions**

Returns a list of all Values in the Dictionary. Because Key-Value Pairs are unordered, the Values may not be returned in insertion order

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Dictionary | Generic |  |
| Output Parameter | Value List | Generic |  |

## XXIII. Shop

### **1. Query Inventory Shop Item Sales Info**

**Node Functions**

Searches sale information for a specified Item in the Inventory Shop

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|--------------------------|------------|-------------|
| Input Parameter | Shop Owner Entity | Entity |  |
| Input Parameter | Shop ID | Integer |  |
| Input Parameter | Item Config ID | Config ID |  |
| Output Parameter | Sell Currency Dictionary | Dictionary |  |
| Output Parameter | Sort Priority | Integer |  |
| Output Parameter | Can Be Sold | Boolean |  |

### **2. Query Inventory Shop Item Sales List**

**Node Functions**

Search the inventory shop's sales list

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|---------------------|----------------|-------------|
| Input Parameter | Shop Owner Entity | Entity |  |
| Input Parameter | Shop ID | Integer |  |
| Output Parameter | Item Config ID List | Config ID List |  |

### **3. Query Shop Purchase Item List**

**Node Functions**

Search the shop's purchase list

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|---------------------|----------------|-------------|
| Input Parameter | Shop Owner Entity | Entity |  |
| Input Parameter | Shop ID | Integer |  |
| Output Parameter | Item Config ID List | Config ID List |  |

### **4. Query Shop Item Purchase Info**

**Node Functions**

Searches purchase information for a specified Item in the Shop

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|------------------------------|------------|-------------|
| Input Parameter | Shop Owner Entity | Entity |  |
| Input Parameter | Shop ID | Integer |  |
| Input Parameter | Item Config ID | Config ID |  |
| Output Parameter | Purchase Currency Dictionary | Dictionary |  |
| Output Parameter | Purchasable | Boolean |  |

### **5. Query Custom Shop Item Sales List**

**Node Functions**

Searches the Custom Shop sale list; the output parameter is a list of Item IDs

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|-------------------|--------------|-------------|
| Input Parameter | Shop Owner Entity | Entity |  |
| Input Parameter | Shop ID | Integer |  |
| Output Parameter | Shop Item ID List | Integer List |  |

### **6. Query Custom Shop Item Sales Info**

**Node Functions**

Searches sale information for a specified Item in the Custom Shop

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|--------------------------|------------|-------------|
| Input Parameter | Shop Owner Entity | Entity |  |
| Input Parameter | Shop ID | Integer |  |
| Input Parameter | Shop Item ID | Integer |  |
| Output Parameter | Item Config ID | Config ID |  |
| Output Parameter | Sell Currency Dictionary | Dictionary |  |
| Output Parameter | Affiliated Tab ID | Integer |  |
| Output Parameter | Limit Purchase | Boolean |  |
| Output Parameter | Purchase Limit | Integer |  |
| Output Parameter | Sort Priority | Integer |  |
| Output Parameter | Can Be Sold | Boolean |  |

## XXIV. Equipment

### **1. Query Equipment Tag List**

**Node Functions**

Searches the list of all Tags on this Equipment instance

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|-----------------|----------------|-------------|
| Input Parameter | Equipment Index | Integer |  |
| Output Parameter | Tag List | Config ID List |  |

### **2. Query Equipment Config ID by Equipment ID**

**Node Functions**

Searches the Equipment Config ID by Equipment ID. The Equipment Instance ID can be obtained in the [Equipment Initialization] event

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|---------------------|-----------|-------------|
| Input Parameter | Equipment Index | Integer |  |
| Output Parameter | Equipment Config ID | Config ID |  |

### **3. Get Equipment Affix List**

**Node Functions**

Returns a list of all Affixes on this Equipment instance

When Equipment is initialized, Affix values are randomized, so the Equipment Affixes on the Equipment instance also generate corresponding instances. Therefore, the data type is Integer rather than Config ID

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------------|--------------|-------------|
| Input Parameter | Equipment Index | Integer |  |
| Output Parameter | Equipment Affix List | Integer List |  |

### **4. Get Equipment Affix Config ID**

**Node Functions**

Returns the Config ID of an Equipment Affix by its ID on the Equipment instance

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|-----------------|-----------|-------------|
| Input Parameter | Equipment Index | Integer |  |
| Input Parameter | Affix ID | Integer |  |
| Output Parameter | Affix Config ID | Config ID |  |

### **5. Get Equipment Affix Value**

**Node Functions**

Returns the value of the Affix at the specified ID on the Equipment instance

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|-----------------|------------------------|-------------|
| Input Parameter | Equipment Index | Integer |  |
| Input Parameter | Affix ID | Integer |  |
| Output Parameter | Affix Value | Floating Point Numbers |  |

## XXV. Items

### **1. Get Inventory Item Quantity**

**Node Functions**

Returns the quantity of the Item with the specified Config ID in the Inventory

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|------------------------|-----------|-------------|
| Input Parameter | Inventory Owner Entity | Entity |  |
| Input Parameter | Item Config ID | Config ID |  |
| Output Parameter | Item Quantity | Integer |  |

### **2. Get Inventory Currency Quantity**

**Node Functions**

Returns the amount of Currency with the specified Config ID in the Inventory

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|------------------------|-----------|-------------|
| Input Parameter | Inventory Owner Entity | Entity |  |
| Input Parameter | Currency Config ID | Config ID |  |
| Output Parameter | Resource Quantity | Integer |  |

### **3. Get Inventory Capacity**

**Node Functions**

Get Inventory Capacity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|------------------------|---------|-------------|
| Input Parameter | Inventory Owner Entity | Entity |  |
| Output Parameter | Inventory Capacity | Integer |  |

### **4. Get All Currency From Inventory**

**Node Functions**

Returns all Currencies in the Inventory, including types and corresponding amounts

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|------------------------|------------|-------------|
| Input Parameter | Inventory Owner Entity | Entity |  |
| Output Parameter | Currency Dictionary | Dictionary |  |

### **5. Get all basic items from Inventory**

**Node Functions**

Returns all Basic Items in the Inventory, including Item types and their quantities

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|------------------------|------------|-------------|
| Input Parameter | Inventory Owner Entity | Entity |  |
| Output Parameter | Basic Item Dictionary | Dictionary |  |

### **6. Get all equipment from Inventory**

**Node Functions**

Returns all Equipment in the Inventory; the output parameter is a list of all Equipment IDs

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|------------------------|--------------|-------------|
| Input Parameter | Inventory Owner Entity | Entity |  |
| Output Parameter | Equipment Index List | Integer List |  |

### **7. Get Loot Component Item Quantity**

**Node Functions**

Returns the quantity of Items with the specified Config ID from the Loot Component on the Loot Prefab

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|-----------|-------------|
| Input Parameter | Loot Entity | Entity |  |
| Input Parameter | Item Config ID | Config ID |  |
| Output Parameter | Item Quantity | Integer |  |

### **8. Get Loot Component Currency Quantity**

**Node Functions**

Returns the amount of Currency with the specified Config ID from the Loot Component on the Loot Prefab

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|--------------------|-----------|-------------|
| Input Parameter | Loot Entity | Entity |  |
| Input Parameter | Currency Config ID | Config ID |  |
| Output Parameter | Currency Amount | Integer |  |

### **9. Get All Equipment from Loot Component**

**Node Functions**

Returns all Equipment from the Loot Component on the Loot Prefab

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------------|--------------|-------------|
| Input Parameter | Loot Entity | Entity |  |
| Output Parameter | Equipment Index List | Integer List |  |

### **10.** Get All Items from Loot Component

**Node Functions**

Returns all Items from the Loot Component on the Loot Prefab

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|-----------------|------------|-------------|
| Input Parameter | Dropper Entity | Entity |  |
| Output Parameter | Item Dictionary | Dictionary |  |

### **11.** Get All Currency from Loot Component

**Node Functions**

Returns all Currencies from the Loot Component on the Loot Prefab

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|---------------------|------------|-------------|
| Input Parameter | Dropper Entity | Entity |  |
| Output Parameter | Currency Dictionary | Dictionary |  |

## XXVI. Collision Trigger

### **1. Get All Entities Within the Collision Trigger**

**Node Functions**

Returns all Entities within the Collision Trigger corresponding to a specific ID in the Collision Trigger Component on the Target Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|-------------|-------------|
| Input Parameter | Target Entity | Entity |  |
| Input Parameter | Trigger ID | Integer |  |
| Output Parameter | Entity List | Entity List |  |

## XXVII. Mini-Map Marker Component

### **1. Query Specified Mini-Map Marker Information**

**Node Functions**

Searches the information of the Mini-map Marker with the specified ID in the Mini-map Marker Component on the Target Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|--------------------------------------|-------------|-----------------------------------------------------|
| Input Parameter | Target Entity | Entity | Runtime Entity |
| Input Parameter | Mini-Map Marker ID | Integer | The Mini-map Marker ID to search |
| Output Parameter | Activation Staet | Boolean | The active state of the searched Mini-map Marker |
| Output Parameter | List of Players With Visible Markers | Entity List | Returns the list of Players who can see this Marker |
| Output Parameter | List of Players Tracking Markers | Entity List | Returns the list of Players tracking this Marker |

### **2. Get Entity's Mini-Map Marker Status**

**Node Functions**

Searches the configuration and activation status of the Entity's current Mini-map Marker

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------------------------|--------------|---------------------------------------------------------------|
| Input Parameter | Target Entity | Entity | Runtime Entity |
| Output Parameter | Full Mini-Map Marker ID List | Integer List | Complete list of Mini-map Marker IDs for this Entity |
| Output Parameter | Active Mini-Map Marker ID List | Integer List | Complete list of active Mini-map Marker IDs for this Entity |
| Output Parameter | Inactive Mini-Map Marker ID List | Integer List | Complete list of inactive Mini-map Marker IDs for this Entity |

## XXVIII. Creature Patrol

### **1. Get Current Creation's Patrol Template**

**Node Functions**

Returns the Patrol Template information of the specified Creation Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|-----------------------|---------|---------------------------------------------------------------------------|
| Input Parameter | Creation Entity | Entity | Runtime Creation Entity |
| Output Parameter | Patrol Template ID | Integer | The Patrol Template ID currently active on this Creation |
| Output Parameter | Path Index | Integer | The Path ID referenced by the Creation's currently active Patrol Template |
| Output Parameter | Target Waypoint Index | Integer | The Waypoint ID the Creation will move to next |

## XXIX. Achievements

### **1. Query If Achievement Is Completed**

**Node Functions**

Searches whether the Achievement corresponding to a specific ID on the Target Entity is complete

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Target Entity | Entity |  |
| Input Parameter | Achievement ID | Integer |  |
| Output Parameter | Completed | Boolean |  |

## XXX. Scan Tags

### **1. Get the Currently Active Scan Tag Config ID**

**Node Functions**

Returns the Configuration ID of the currently active Scan Tags on the Target Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|--------------------|-----------|-------------|
| Input Parameter | Target Entity | Entity |  |
| Output Parameter | Scan Tag Config ID | Config ID |  |

## XXXI. Rank Tier

### **1. Get Player Rank Score Change**

**Node Functions**

Returns the Rank change score for the Player Entity under different Settlement states

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|-------------------|-------------|-------------|
| Input Parameter | Player Entity | Entity |  |
| Input Parameter | Settlement Status | Enumeration |  |
| Output Parameter | Score | Integer |  |

### **2. Get Player Ranking Info**

**Node Functions**

Returns the Player's Rank-related information

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------------------|---------|-------------|
| Input Parameter | Player Entity | Entity |  |
| Output Parameter | Player Rank Total Score | Integer |  |
| Output Parameter | Player Win Streak | Integer |  |
| Output Parameter | Player Lose Streak | Integer |  |
| Output Parameter | Player Consecutive Escapes | Integer |  |

### **3. Get Player Escape Validity**

**Node Functions**

Get Player Escape Permission

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Player Entity | Entity |  |
| Output Parameter | Valid | Boolean |  |

## XXXII. Entity Layout Group

### **1. Get Currently Active Entity Deployment Groups**

**Node Functions**

Searches the list of Entity Layout Groups currently active in the Stage

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|------------------------------------|--------------|-------------|
| Output Parameter | Entity Deployment Group Index List | Integer List |  |

## XXXII. Wonderland Gift Box Related

### **1. Query Corresponding Gift Box Quantity**

**Node Functions**

Searches the quantity of the specified Gift Box on the Player Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Output Parameter | Player Entity | Entity |  |
| Output Parameter | Gift Box Index | Integer |  |
| Input Parameter | Quantity | Integer |  |

### **2. Query Corresponding Gift Box Consumption**

**Node Functions**

Searches the consumed quantity of the specified Gift Box on the Player Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Output Parameter | Player Entity | Entity |  |
| Output Parameter | Gift Box Index | Integer |  |
| Input Parameter | Quantity | Integer |  |