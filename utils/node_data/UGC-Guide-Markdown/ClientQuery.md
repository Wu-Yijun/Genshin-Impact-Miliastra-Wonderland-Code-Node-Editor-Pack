## I. List Related

### **1. Get Corresponding Value From List**

**Node Functions**

Returns the value at the specified ID in the List. IDs start at 0

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | ID | Integer |  |
| Input Parameter | Data List | Generic |  |
| Output Parameter | Result | Generic |  |

### **2. Get List Length**

**Node Functions**

Returns the length of the list (number of elements)

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Input List | Generic |  |
| Output Parameter | Length | Integer |  |

### **3. Get Maximum Value From List**

**Node Functions**

Applies only to Floating Point Number or Integer lists; returns the maximum value

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | List | Generic |  |
| Output Parameter | Maximum Value | Generic |  |

### **4. Get Minimum Value From List**

**Node Functions**

Applies only to Floating Point Number or Integer lists; returns the minimum value

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | List | Generic |  |
| Output Parameter | Minimum Value | Generic |  |

### **5. Get Ray Filter Type List**

**Node Functions**

Assembles the required Ray Filter types into a List. Available filters include Hurtbox, Scene, and Object Self-Collision

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------------|-------------|
| Output Parameter | List | Complete list |  |

### **6. Get Entity Type List**

**Node Functions**

Assembles the required Entity types into a List. Types include Stages, Objects, Players, Characters, and Creations

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------------|-------------|
| Output Parameter | List | Complete list |  |

### **7. List Includes This Value**

**Node Functions**

Returns whether the list contains the specified value

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Value | Generic |  |
| Input Parameter | List | Generic |  |
| Output Parameter | Result | Boolean |  |

## II. Custom Variables

### **1. Get Custom Variable**

**Node Functions**

Returns the value of the specified Custom Variable from the Target Entity

If the variable does not exist, returns the type's default value

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Target Entity | Entity |  |
| Input Parameter | Variable Name | String |  |
| Output Parameter | Variable Value | Generic |  |

## III. Preset Status

### **1. Get Preset Status**

**Node Functions**

Returns the Preset Status value of the specified Entity. Returns 0 if the Entity does not have the specified Preset Status

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|---------------------|---------|-------------|
| Input Parameter | Entity | Entity |  |
| Input Parameter | Preset Status Index | Integer |  |
| Output Parameter | Preset Status Value | Integer |  |

## IV. Entity Related

### **1. Query If Entity Is on the Field**

**Node Functions**

Searches whether the specified Entity is present

Note that Character Entities are still considered present even when Downed

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Target Entity | Entity |  |
| Output Parameter | On the Field | Boolean |  |

### **2. Get Unit Attack Target**

**Node Functions**

Returns the Target Entity that the Unit Entity is currently attacking

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------------|--------|-------------|
| Input Parameter | Unit Entity | Entity |  |
| Output Parameter | Attack Target Entity | Entity |  |

### **3. Get Target Attachment Point Location**

**Node Functions**

Returns the Attachment Point Location corresponding to the specified Attachment Point Name on the Target Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|---------------------------|-----------|-------------|
| Input Parameter | Target Entity | Entity |  |
| Input Parameter | Attachment Point Name | String |  |
| Output Parameter | Attachment Point Location | 3D Vector |  |

### **4. Get Target Attachment Point Rotation**

**Node Functions**

Returns the Attachment Point Rotation corresponding to the specified Attachment Point Name on the Target Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|---------------------------|-----------|-------------|
| Input Parameter | Target Entity | Entity |  |
| Input Parameter | Attachment Point Name | String |  |
| Output Parameter | Attachment Point Rotation | 3D Vector |  |

### **5. Get Target Entity**

**Node Functions**

Returns the Target Entity. The meaning of this output varies depending on the functional module that references the Filter Node Graph

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|--------|-------------|
| Output Parameter | Target Entity | Entity |  |

### **6. Get Entity's Type**

**Node Functions**

Returns the type of the specified Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|-------------|-------------|
| Input Parameter | Target Entity | Entity |  |
| Output Parameter | Entity Type | Enumeration |  |

### **7. Get Entity Location**

**Node Functions**

Returns the Location of the specified Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|-----------|-------------|
| Input Parameter | Entity | Entity |  |
| Output Parameter | Location | 3D Vector |  |

### **8. Get Entity Rotation**

**Node Functions**

Returns the Rotation of the specified Entity in Euler Angles

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|-----------|-------------|
| Input Parameter | Entity | Entity |  |
| Output Parameter | Rotate | 3D Vector |  |

### **9. Get Self Entity**

**Node Functions**

Returns the Entity associated with this Node Graph

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|--------|-------------|
| Output Parameter | Self Entity | Entity |  |

### **10. Filter Entity List Within Square Range**

**Node Functions**

Filters Entities within a square range according to specified rules and a maximum count, and returns a list of Entities that meet the conditions

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|-------------------------|------------------------|--------------------------------------------------------|
| Input Parameter | Width | Floating Point Numbers |  |
| Input Parameter | Height | Floating Point Numbers |  |
| Input Parameter | Length | Floating Point Numbers |  |
| Input Parameter | Central Location | 3D Vector |  |
| Input Parameter | Maximum Filter Quantity | Integer |  |
| Input Parameter | Filter Rules | Enumeration | Options: Default, Random, or Nearest-to-Farthest order |
| Output Parameter | Filter Results | Entity List |  |

### **11. Filter Entity List Within Spherical Range**

**Node Functions**

Filters Entities within a spherical range according to specific rules and a maximum count, and returns a list of Entities that meet the conditions

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|-------------------------|------------------------|--------------------------------------------------------|
| Input Parameter | Radius | Floating Point Numbers |  |
| Input Parameter | Central Location | 3D Vector |  |
| Input Parameter | Maximum Filter Quantity | Integer |  |
| Input Parameter | Filter Rules | Enumeration | Options: Default, Random, or Nearest-to-Farthest order |
| Output Parameter | Filter Results | Entity List |  |

### **12. Query Entity by GUID**

**Node Functions**

Searches for an Entity by GUID

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|--------|-------------|
| Input Parameter | GUID | GUID |  |
| Output Parameter | Entity | Entity |  |

## V. Faction Related

### **1. Query Entity Faction**

**Node Functions**

Searches Target Entity's Faction

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Target Entity | Entity |  |
| Output Parameter | Faction | Faction |  |

### **2. Query If Faction Is Hostile**

**Node Functions**

Searches whether Faction 1 and Faction 2 are hostile

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Faction 1 | Faction |  |
| Input Parameter | Faction 2 | Faction |  |
| Output Parameter | Hostile | Boolean |  |

## VI. Player and Character Related

### **1. Query If Self Is in Combat**

**Node Functions**

Searches whether the Entity associated with this Node Graph has entered battle

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Output Parameter | In Combat | Boolean |  |

### **2. Get Current Character**

**Node Functions**

Returns the Character Entity currently controlled by this Player's client

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|------------------|--------|-------------|
| Output Parameter | Character Entity | Entity |  |

### **3. Get Player Entity to Which the Character Belongs**

**Node Functions**

Returns the Player Entity that owns the Character Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|--------------------------|--------|-------------|
| Input Parameter | Character Entity | Entity |  |
| Output Parameter | Affiliated Player Entity | Entity |  |

### **4. Get List of Player Entities on the Field**

**Node Functions**

Returns a list of all Player Entities present in the scene

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|--------------------|-------------|-------------|
| Output Parameter | Player Entity List | Entity List |  |

### **5. Get Character Entity of Specified Player**

**Node Functions**

Returns the Character Entity of the specified Player Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|------------------|--------|-------------|
| Input Parameter | Player Entity | Entity |  |
| Output Parameter | Character Entity | Entity |  |

### **6. Query GUID by Entity**

**Node Functions**

Searches for the GUID of the specified Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|--------|-------------|
| Input Parameter | Entity | Entity |  |
| Output Parameter | GUID | GUID |  |

### **7. Get Player Client Input Device Type**

**Node Functions**

Returns the Player's local input device type, as determined by the Interface mapping method

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|-------------------|-------------|-----------------------------------------------|
| Output Parameter | Input Device Type | Enumeration | Includes keyboard/mouse, gamepad, touchscreen |

## VII. Unit Tags

### **1. Get Entity List by Unit Tag**

**Node Functions**

Returns a list of all Entities in the scene that carry this Unit Tag

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|-------------|-------------|
| Input Parameter | Unit Tag Index | Integer |  |
| Output Parameter | Entity List | Entity List |  |

### **2. Get Entity's Unit Tag List**

**Node Functions**

Returns a list of all Unit Tags carried by the Target Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|--------------|-------------|
| Input Parameter | Target Entity | Entity |  |
| Output Parameter | List | Integer List |  |

## VIII. General

### **1. Get Local Variable**

**Node Functions**

Returns the value of a specific local variable

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Variable Name | String |  |
| Output Parameter | Variable Value | Generic |  |

## IX. Custom Aggro

### **1. Query if Specified Entity is in Combat**

**Node Functions**

Searches whether the specified Entity has entered battle

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Target Entity | Entity |  |
| Output Parameter | In Combat | Boolean |  |

### **2. Get the Aggro List of the Specified Entity**

**Node Functions**

Get Specific Entity's Aggro List

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|------------------|-------------|-------------|
| Input Parameter | Specified Entity | Entity |  |
| Output Parameter | Aggro List | Entity List |  |

### **3. Get the Aggro Target of the Specified Entity**

**Node Functions**

Get Aggro Target of Specific Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|------------------|--------|-------------|
| Input Parameter | Specified Entity | Entity |  |
| Output Parameter | Aggro Target | Entity |  |

## X. Triggers

### **1. Get All Entities Within the Collision Trigger**

**Node Functions**

Returns all Entities within the Collision Trigger corresponding to a specific ID in the Collision Trigger Component on the Target Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|-------------|-------------|
| Input Parameter | Target Entity | Entity |  |
| Input Parameter | Trigger ID | Integer |  |
| Output Parameter | Entity List | Entity List |  |

## XI. Ray

### **1. Get Ray Detection Result**

**Node Functions**

Returns the first Target or On-Hit Location that meets the Filter criteria, ordered from nearest to farthest along the ray

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------------------|------------------------|-----------------------------------------------------|
| Input Parameter | Detection Initiator Entity | Entity |  |
| Input Parameter | Launch Location | 3D Vector |  |
| Input Parameter | Launch Direction | 3D Vector |  |
| Input Parameter | Max Ray Length | Floating Point Numbers |  |
| Input Parameter | Faction Filter | Enumeration |  |
| Input Parameter | Entity Type Filter | Enumeration | Includes Stage, Object, Player, Character, Creation |
| Input Parameter | Hit Layer Filter | Enumeration | Options: Hurtbox, Scene, and Object Self-Collision |
| Output Parameter | On-Hit Location | 3D Vector |  |
| Output Parameter | On-Hit Entity | Entity |  |

## XII. Scanning

### **1.** Get All Valid Entities That Are Scannable by Scan Component

**Node Functions**

Returns all Units carrying a Scan Component whose Filter returns True, regardless of the Unit's scannable status

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|-------------|-------------|
| Output Parameter | Object List | Entity List |  |

### **2.** Get Entity Currently Scanned by Scan Component

**Node Functions**

Returns Entities currently detected by the Scan Component; these are Entities in the Active State

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------------|-----------|-------------|
| Output Parameter | Corresponding Entity | Entity |  |
| Output Parameter | Scan Tag Config ID | Config ID |  |

### **3.** Get Entity's Current Active Scan Tags

**Node Functions**

Returns the Target Entity's Current Active Scan Tags

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|--------------------|-----------|-------------|
| Input Parameter | Target Entity | Entity |  |
| Output Parameter | Scan Tag Config ID | Config ID |  |

### **4. Get Entity's Scan Status**

**Node Functions**

Get Entity Scan Status

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|-------------|-------------------------------------------------------------------------|
| Input Parameter | Target Entity | Entity |  |
| Output Parameter | Scan Status | Enumeration | Options: Invisible, Current Scan Target, Candidate Target, Not Eligible |