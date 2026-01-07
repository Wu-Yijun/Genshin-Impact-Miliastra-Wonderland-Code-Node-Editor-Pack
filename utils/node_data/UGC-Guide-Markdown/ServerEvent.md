## I. Custom Variables

### **1. When Node Graph Variable Changes**

**Node Functions**

This event is triggered when a Node Graph Variable in the current Node Graph changes

The previous and current values are Generic. Determine the Generic type to correctly receive events for Node Graph Variables of the corresponding type

Vessel-type Node Graph Variables do not provide before-value and after-value Output Parameters

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|---------------------|---------|----------------------------------------------------|
| Output Parameter | Event Source Entity | Entity | The Entity associated with this Node Graph |
| Output Parameter | Event Source GUID | GUID | GUID of the Entity associated with this Node Graph |
| Output Parameter | Variable Name | String | Name of the Variable that was changed |
| Output Parameter | Pre-Change Value | Generic | The Variable's value before the change |
| Output Parameter | Post-Change Value | Generic | The Variable's value after the change |

### **2. When Custom Variable Changes**

**Node Functions**

This event is triggered when the Custom Variable of the Entity associated with the current Node Graph changes

The previous and current values are Generic. Determine the Generic type before you can correctly receive events for Custom Variables of the corresponding type

Vessel-type Custom Variables do not provide before-value and after-value Output Parameters

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|---------------------|---------|----------------------------------------------------|
| Output Parameter | Event Source Entity | Entity | The Entity associated with this Node Graph |
| Output Parameter | Event Source GUID | GUID | GUID of the Entity associated with this Node Graph |
| Output Parameter | Variable Name | String | Name of the Variable that was changed |
| Output Parameter | Pre-Change Value | Generic | The Variable's value before the change |
| Output Parameter | Post-Change Value | Generic | The Variable's value after the change |

## II. Preset Status

### **1. When Preset Status Changes**

**Node Functions**

This event is triggered when the Preset Status of the Entity associated with the Node Graph changes

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|---------------------|---------|-------------|
| Output Parameter | Event Source Entity | Entity |  |
| Output Parameter | Event Source GUID | GUID |  |
| Output Parameter | Preset Status ID | Integer |  |
| Output Parameter | Pre-Change Value | Integer |  |
| Output Parameter | Post-Change Value | Integer |  |

## III. Entity Related

### **1.** When Character Movement SPD Meets Condition

**Node Functions**

Adds the Unit Status effect [Monitor Movement Speed] to the Character Entity. This event is triggered when the conditions are met

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|-----------------------------|------------------------|-------------|
| Output Parameter | Event Source Entity | Entity |  |
| Output Parameter | Event Source GUID | GUID |  |
| Output Parameter | Unit Status Config ID | Config ID |  |
| Output Parameter | Condition: Comparison Type | Enumeration |  |
| Output Parameter | Condition: Comparison Value | Floating Point Numbers |  |
| Output Parameter | Current Movement SPD | Floating Point Numbers |  |

### **2. When Entity Is Created**

**Node Functions**

This event is triggered when an Entity is created

All types of Entities can trigger this event. Stage Entities, Character Entities, and Player Entities trigger this event when entering a Stage

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|---------------------|--------|-------------|
| Output Parameter | Event Source Entity | Entity |  |
| Output Parameter | Event Source GUID | GUID |  |

### **3. When Entity Is Destroyed**

**Node Functions**

This event triggers when objects and creations within the stage are destroyed. This event can only trigger on stage entities.

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|------------------------------------|--------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Output Parameter | Event Source Entity | Entity | Destroyed Entity |
| Output Parameter | Event Source GUID | GUID |  |
| Output Parameter | Location | 3D Vector |  |
| Output Parameter | Orientation | 3D Vector |  |
| Output Parameter | Entity Type | Enumeration |  |
| Output Parameter | Faction | Faction |  |
| Output Parameter | Damage Source | Entity |  |
| Output Parameter | Owner Entity | Entity |  |
| Output Parameter | Custom Variable Component Snapshot | Custom Variable Snapshot | On destroy, captures a snapshot of the Custom Variable component on this Entity. Use the Search Custom Variable Snapshot node to retrieve its Custom Variable values |

### **4. When Entity Is Removed/Destroyed**

**Node Functions**

This event is triggered when any Entity in the Stage is removed or destroyed, and it can only be triggered on Stage Entities

This event is triggered upon Entity destruction or removal. Therefore, when an Entity is destroyed, it triggers both the [On Entity Destroyed] and [On Entity Removed/Destroyed] events in sequence

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|-------------------|------|-------------|
| Output Parameter | Event Source GUID | GUID |  |

## IV. Faction Related

### **1. When Entity Faction Changes**

**Node Functions**

This event is triggered when an Entity's Faction changes

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|---------------------|---------|-------------|
| Output Parameter | Event Source Entity | Entity |  |
| Output Parameter | Event Source GUID | GUID |  |
| Output Parameter | Pre-Change Faction | Faction |  |
| Output Parameter | Post-Change Faction | Faction |  |

## V. Player and Character Related

### **1. When the Character Is Down**

**Node Functions**

When a Character is Downed, the Node Graph on the Character Entity can trigger this event

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|------------------|-------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Output Parameter | Character Entity | Entity |  |
| Output Parameter | Reason | Enumeration | Node Graph caused: the Character was Downed by the Destroy Entity node in the Node Graph

Normal Down: the Character was Downed because HP reached 0

Abnormal Down: the character was downed due to drowning, falling into an abyss, etc. |
| Output Parameter | Knockdown Entity | Entity |  |

### **2. When Character Revives**

**Node Functions**

When a Character is Revived, the Node Graph on the Character Entity can trigger this event

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|------------------|--------|-------------|
| Output Parameter | Character Entity | Entity |  |

### **3. When Player Teleport Completes**

**Node Functions**

This event is triggered on the Player Entity's Node Graph when the Player completes teleportation

This event is also triggered when a Player enters a Stage for the first time

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|--------|-------------|
| Output Parameter | Player Entity | Entity |  |
| Output Parameter | Player GUID | GUID |  |

### **4. When All Player's Characters Are Down**

**Node Functions**

This event is triggered on the Player Entity's Node Graph when all of the Player's Character Entities are Downed

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|-------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Output Parameter | Player Entity | Entity |  |
| Output Parameter | Reason | Enumeration | Node Graph caused: the Character was Downed by the Destroy Entity node in the Node Graph

Normal Down: the Character was Downed because HP reached 0

Abnormal Down: the character was downed due to drowning, falling into an abyss, etc. |

### **5. When All Player's Characters Are Revived**

**Node Functions**

This event is triggered on the Player Entity's Node Graph when all of the Player's Characters are Revived

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|--------|-------------|
| Output Parameter | Player Entity | Entity |  |

### **6. When Player Is Abnormally Downed and Revives**

**Node Functions**

This event is triggered on the Player Entity when a Character is Downed and then Revived due to drowning, falling into an abyss, or similar reasons

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|--------|-------------|
| Output Parameter | Player Entity | Entity |  |

## VI. Collision Triggers

### **1. When Entering Collision Trigger**

**Node Functions**

The "Collision Trigger Source" range of a runtime entity A enters the "Collision Trigger" range of another runtime entity B

Node graph events will be sent to the entity B configured with "Collision Trigger"

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------------|---------|---------------------------------------------------------------------------------|
| Output Parameter | Entering Entity | Entity | Entity A (referenced above) |
| Output Parameter | Entering Entity GUID | GUID |  |
| Output Parameter | Trigger Entity | Entity | Entity B (mentioned above) |
| Output Parameter | Trigger Entity GUID | GUID |  |
| Output Parameter | Trigger ID | Integer | The trigger with the corresponding ID in Entity B's Collision Trigger Component |

### **2. When Exiting Collision Trigger**

**Node Functions**

When the "Collision Trigger Source" range of active Entity A leaves the "Collision Trigger" range of active Entity B

Node graph events will be sent to the entity B configured with "Collision Trigger"

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|---------------------|---------|-----------------------------|
| Output Parameter | Exiting Entity | Entity | Entity A (referenced above) |
| Output Parameter | Exiting Entity GUID | GUID |  |
| Output Parameter | Trigger Entity | Entity | Entity B (mentioned above) |
| Output Parameter | Trigger Entity GUID | GUID |  |
| Output Parameter | Trigger ID | Integer |  |

## VII. Combat

### **1. When HP Is Recovered**

**Node Functions**

This event is triggered when an Entity's HP is restored

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|---------------------|------------------------|--------------------------------------------------------------------------------------------|
| Output Parameter | Event Source Entity | Entity |  |
| Output Parameter | Event Source GUID | GUID |  |
| Output Parameter | Healer Entity | Entity |  |
| Output Parameter | Recovery Amount | Floating Point Numbers | Actual healing amount. If the Entity had not lost any HP prior to healing, the amount is 0 |
| Output Parameter | Recover Tag List | String List |  |

### **2. When Initiating HP Recovery**

**Node Functions**

This event is triggered on the initiating Entity when an Entity restores HP to other Entities

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|-----------------------|------------------------|---------------------------------------------------------------------------------------------------|
| Output Parameter | Event Source Entity | Entity |  |
| Output Parameter | Event Source GUID | GUID |  |
| Output Parameter | Recover Target Entity | Entity |  |
| Output Parameter | Recovery Amount | Floating Point Numbers | Actual healing amount. If the Target Entity had not lost any HP prior to healing, the amount is 0 |
| Output Parameter | Recover Tag List | String List |  |

### **3. When Attack Hits**

**Node Functions**

This event is triggered when an Entity's attack hits other Entities

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|--------------------------|------------------------|------------------------------------------------------------------------------------------------|
| Output Parameter | Event Source Entity | Entity |  |
| Output Parameter | Event Source GUID | GUID |  |
| Output Parameter | Hit Target Entity | Entity |  |
| Output Parameter | Damage | Floating Point Numbers | Actual damage dealt. If no damage is dealt due to Invincible or other reasons, the amount is 0 |
| Output Parameter | Attack Tag List | String List |  |
| Output Parameter | Elemental Type | Enumeration |  |
| Output Parameter | Elemental Attack Potency | Floating Point Numbers | Elemental Gauge in the Attack |

### **4. When Attacked**

**Node Functions**

This event is triggered when the Entity is attacked

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|--------------------------|------------------------|------------------------------------------------------------------------------------------------|
| Output Parameter | Event Source Entity | Entity |  |
| Output Parameter | Event Source GUID | GUID |  |
| Output Parameter | Attacker Entity | Entity |  |
| Output Parameter | Damage | Floating Point Numbers | Actual damage dealt. If no damage is dealt due to Invincible or other reasons, the amount is 0 |
| Output Parameter | Attack Tag List | String List |  |
| Output Parameter | Elemental Type | Enumeration |  |
| Output Parameter | Elemental Attack Potency | Floating Point Numbers | Elemental Gauge in the Attack |

### **5. When Entering an Interruptible State**

**Node Functions**

This event is triggered when an Entity is attacked and enters the Vulnerable Status

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|---------------------|--------|-------------|
| Output Parameter | Event Source Entity | Entity |  |
| Output Parameter | Event Source GUID | GUID |  |
| Output Parameter | Attacker | Entity |  |

## VIII. Motion Device

### **1. When Basic Motion Device Stops**

**Node Functions**

This event is sent to the Component Owner when a Basic Motion Device on the Basic Motion Device Component completes its movement or is disabled

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|---------------------|--------|-----------------|
| Output Parameter | Event Source Entity | Entity | Component Owner |
| Output Parameter | Event Source GUID | GUID |  |
| Output Parameter | Motion Device Name | String |  |

### **2. When Path Reaches Waypoint**

**Node Functions**

When the Pathing Motion Device reaches a Waypoint, it sends this event to the Owner of the Basic Motion Device Component. This event is triggered only if "Send Event on Waypoint Arrival" is enabled in the Waypoint settings

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|---------------------|---------|-----------------|
| Output Parameter | Event Source Entity | Entity | Component Owner |
| Output Parameter | Event Source GUID | GUID |  |
| Output Parameter | Motion Device Name | String |  |
| Output Parameter | Path Point ID | Integer |  |

## IX. Hit Detection

### **1. When On-Hit Detection Is Triggered**

**Node Functions**

This event is triggered when the On-Hit Detection Component's Owner hits other Entities or the Scene

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|---------------------|-----------|-----------------------------------------------------------------------------------------------------------------------------------|
| Output Parameter | Event Source Entity | Entity |  |
| Output Parameter | Event Source GUID | GUID |  |
| Output Parameter | On-Hit Hurtbox | Boolean | If set to False: The environment was hit

If set to True: An Entity was hit. Retrieve values from the Hit Entity output parameter |
| Output Parameter | On-Hit Entity | Entity | Hit Entity is only valid when a Hurtbox is hit |
| Output Parameter | On-Hit Location | 3D Vector |  |

## X. Timer

### **1. When Timer Is Triggered**

**Node Functions**

This event is triggered when the Timer reaches the specified time node

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|---------------------|---------|-------------|
| Output Parameter | Event Source Entity | Entity |  |
| Output Parameter | Event Source GUID | GUID |  |
| Output Parameter | Timer Name | String |  |
| Output Parameter | Timer Sequence ID | Integer |  |
| Output Parameter | Number of Loops | Integer |  |

## XI. Global Timer

### **1. When Global Timer Is Triggered**

**Node Functions**

This event is triggered when the Global Countdown Timer reaches zero

The Global Stopwatch Timer does not trigger this event

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|---------------------|--------|-------------|
| Output Parameter | Event Source Entity | Entity |  |
| Output Parameter | Event Source GUID | GUID |  |
| Output Parameter | Timer Name | String |  |

## XII. UI Control Groups

### **1. When UI Control Group Is Triggered**

**Node Functions**

Only UI Controls of the Interactive Button and Item Display types trigger this event

The Node Graph event "UI Control Group Triggered" is sent during Stage runtime when a UI Control Group created through an Interactive Button or an Item Display UI Control is interacted with. This event can only be received by the Node Graph of the _Player_ who triggered the interaction

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------------------------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Output Parameter | Event Source Entity | Entity |  |
| Output Parameter | Event Source GUID | GUID |  |
| Output Parameter | UI Control Group Composite Index | Integer | If the UI control that triggered this event forms a multi-control UI group with other controls, this output parameter returns the corresponding group value |
| Output Parameter | UI Control Group Index | Integer | If the triggering UI control is a single-control UI group, this value represents the ID of that UI control group

If the triggering UI control is part of a multi-control UI group, this value represents the ID of the control within that group |

## XIII. Unit Status

### **1. When Unit Status Changes**

**Node Functions**

This event is triggered when the Stack Count of a Unit Status changes

This event is triggered when Unit Status effects are applied or removed

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|---------------------------|------------------------|-----------------------------------------|
| Output Parameter | Event Source Entity | Entity |  |
| Output Parameter | Event Source GUID | GUID |  |
| Output Parameter | Unit Status Config ID | Config ID |  |
| Output Parameter | Applier Entity | Entity |  |
| Output Parameter | Infinite Duration | Boolean |  |
| Output Parameter | Remaining Status Duration | Floating Point Numbers |  |
| Output Parameter | Remaining Status Stacks | Integer | Edited Stack Count |
| Output Parameter | Original Status Stacks | Integer | Previous Stack Count |
| Output Parameter | Slot ID | Integer | ID of the Unit Status slot that changed |

### **2. When Unit Status Ends**

**Node Functions**

This event is triggered when a Unit Status is removed for any reason or when its Runtime Duration expires

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|---------------------------|------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Output Parameter | Event Source Entity | Entity |  |
| Output Parameter | Event Source GUID | GUID |  |
| Output Parameter | Unit Status Config ID | Config ID |  |
| Output Parameter | Applier Entity | Entity |  |
| Output Parameter | Infinite Duration | Boolean |  |
| Output Parameter | Remaining Status Duration | Floating Point Numbers |  |
| Output Parameter | Remaining Status Stacks | Integer |  |
| Output Parameter | Remover Entity | Entity |  |
| Output Parameter | Removal Reason | Enumeration | Status Replacement: The Unit Status was removed because it was replaced by another status

Duration Exceeded: The Unit Status exceeded its runtime duration

Dispelled: The Unit Status was removed directly

Status Expired: The Unit Status became invalid due to other reasons

Class Changed: The Unit Status was removed due to a class change |
| Output Parameter | Slot ID | Integer | ID of the Unit Status slot that changed |

### **3. When Elemental Reaction Event Occurs**

**Node Functions**

Adds the Unit Status effect [Monitor Elemental Reaction] to the Entity. This event is triggered when the conditions are met

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|-------------------------|-------------|-------------|
| Output Parameter | Event Source Entity | Entity |  |
| Output Parameter | Event Source GUID | GUID |  |
| Output Parameter | Elemental Reaction Type | Enumeration |  |
| Output Parameter | Triggerer Entity | Entity |  |
| Output Parameter | Triggerer Entity GUID | GUID |  |

### **4. When Shield Is Attacked**

**Node Functions**

Adds the Unit Status effect [Add Shield] to the Entity. This event is triggered when the Shield takes damage

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|------------------------------------------------|------------------------|-------------|
| Output Parameter | Event Source Entity | Entity |  |
| Output Parameter | Event Source GUID | GUID |  |
| Output Parameter | Attacker Entity | Entity |  |
| Output Parameter | Attacker GUID | GUID |  |
| Output Parameter | Unit Status Config ID | Config ID |  |
| Output Parameter | Pre-Attack Layers | Integer |  |
| Output Parameter | Post-Attack Layers | Integer |  |
| Output Parameter | Shield Value of this Unit Status Before Attack | Floating Point Numbers |  |
| Output Parameter | Shield Value of this Unit Status After Attack | Floating Point Numbers |  |

## XIV. Tabs

### **1. When Tab Is Selected**

**Node Functions**

When the active tab is selected, it will send an event to the node graph

The Entity Node Graph configured by the Tab Component will receive this event

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|---------------------|---------|-----------------------------------------------------------------------------|
| Output Parameter | Event Source Entity | Entity | Entity with the tab component mounted |
| Output Parameter | Event Source GUID | GUID | GUID of the Entity with the tab component mounted; outputs 0 if none exists |
| Output Parameter | Tab ID | Integer | The tab ID |
| Output Parameter | Selector Entity | Entity | Character Entity that triggers the tab |

## XV. Creations

### **1. When Creation Enters Combat**

**Node Functions**

Only effective in Classic Aggro Mode

This event is triggered when a Creation enters battle

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|---------------------|--------|-------------|
| Output Parameter | Event Source Entity | Entity |  |
| Output Parameter | Event Source GUID | GUID |  |

### **2. When Creation Leaves Combat**

**Node Functions**

Only effective in Classic Aggro Mode

This event is triggered when a Creation leaves battle

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|---------------------|--------|-------------|
| Output Parameter | Event Source Entity | Entity |  |
| Output Parameter | Event Source GUID | GUID |  |

## XVI. Classes

### **1. When Player Class Level Changes**

**Node Functions**

This event is triggered when a Player's Class Level changes and is sent to the corresponding Player. It can be received in that Class's Node Graph

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|---------------------|---------|----------------------|
| Output Parameter | Event Source Entity | Entity | Active Player Entity |
| Output Parameter | Event Source GUID | GUID |  |
| Output Parameter | Pre-Change Level | Integer |  |
| Output Parameter | Post-Change Level | Integer |  |

### **2. When Player Class Changes**

**Node Functions**

This event is triggered when a Player's Class changes and is sent to the corresponding Player. It can be received in the Node Graph of the new Class

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------------------------|-----------|-------------|
| Output Parameter | Event Source Entity | Entity |  |
| Output Parameter | Event Source GUID | GUID |  |
| Output Parameter | Pre-Modification Class Config ID | Config ID |  |
| Output Parameter | Post-Modification Config ID | Config ID |  |

### **3. When Player Class Is Removed**

**Node Functions**

This event is triggered when a Player's Class is removed and sent to the corresponding Player. It can be received in the Node Graph of the previous Class

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------------------------|-----------|-------------|
| Output Parameter | Event Source Entity | Entity |  |
| Output Parameter | Event Source GUID | GUID |  |
| Output Parameter | Pre-Modification Class Config ID | Config ID |  |
| Output Parameter | Post-Modification Config ID | Config ID |  |

## XVII. Skills

### **1. When Skill Node Is Called**

**Node Functions**

This event is triggered by the [Notify Server Node Graph] Node in the Skill Node Graph. Up to three strings can be passed in

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|--------|-------------|
| Output Parameter | Caller Entity | Entity |  |
| Output Parameter | Caller GUID | GUID |  |
| Output Parameter | Parameter 1 | String |  |
| Output Parameter | Parameter 2 | String |  |
| Output Parameter | Parameter 3 | String |  |

## XVIII. Custom Aggro

### **1. When Aggro Target Changes**

**Node Functions**

Available only in Custom Aggro Mode

This event is triggered when the Aggro Target changes

This event can also be triggered when entering or leaving battle

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|--------------------------|--------|-------------|
| Output Parameter | Event Source Entity | Entity |  |
| Output Parameter | Event Source GUID | GUID |  |
| Output Parameter | Pre-Change Aggro Target | Entity |  |
| Output Parameter | Post-Change Aggro Target | Entity |  |

### **2. When Self Enters Combat**

**Node Functions**

Available only in Custom Aggro Mode

This event is triggered when the Entity itself enters battle

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|---------------------|--------|-------------|
| Output Parameter | Event Source Entity | Entity |  |
| Output Parameter | Event Source GUID | GUID |  |

### **3. When Self Leaves Combat**

**Node Functions**

Available only in Custom Aggro Mode

This event is triggered when the Entity itself leaves battle

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|---------------------|--------|-------------|
| Output Parameter | Event Source Entity | Entity |  |
| Output Parameter | Event Source GUID | GUID |  |

## XIX. Signals

### **1. Monitor Signal**

**Node Functions**

Monitors Signal trigger events defined in the Signal Manager

The Signal name to monitor must be selected first

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------------|--------|-------------------------------------------------------------|
| Output Parameter | Event Source Entity | Entity |  |
| Output Parameter | Event Source GUID | GUID |  |
| Output Parameter | Signal Source Entity | Entity | The Entity that sent this signal using the Send Signal node |

## XX. Deck Selector

### **1. When Deck Selector Is Complete**

**Node Functions**

This event is triggered on the Player's Node Graph when the Player completes the Deck Selector, or when it is forcibly closed due to time constraints

The output parameters report the Deck Selector's result and the corresponding reason

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|-----------------------|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Output Parameter | Target Player | Entity | Active Player Entity |
| Output Parameter | Selection Result List | Integer List | When a selection interaction is triggered, valid selection results are returned as this output parameter, and the completion reason isCompleted by Player

When a Full Refresh pop-up selection is triggered, the complete selection result list is returned as this output parameter, and the completion reason isRefresh All

When a Fixed-Quantity Refresh pop-up selection is triggered, valid selection results are returned as this output parameter, and the completion reason is Fixed-Quantity Refresh

When the Deck Selector times out with no interaction, the default selection is returned is returned as this output parameter, and the completion reason is Timeout

When Allow Discard Selection is enabled and the Deck Selector is closed by the player, the default selection is returned as this output parameter, and the completion reason is Closed Manually

When the Deck Selector is closed via the Node Graph, the default selection is returned as this output parameter, and the completion reason isClosed by Node Graph |
| Output Parameter | Completion Reason | Enumeration | Six reason enumerations

Completed by Player, Refresh All, Fixed-Quantity Refresh, Timeout, Closed Manually, Closed by Node Graph |
| Output Parameter | Deck Selector Index | Integer | Referenced Deck Selector ID |

## XXI. Text Bubbles

### **1. When Text Bubble Is Completed**

**Node Functions**

This event can only be mounted by Text Bubble Components and is received by the Entity's Node Graph that completed the dialogue

Completion refers to when the final line of dialogue has finished playing

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|------------------------------|-----------|----------------------------------------------------------------------------------------------------|
| Output Parameter | Bubble Owner Entity | Entity | Runtime Entity with the Text Bubble component mounted |
| Output Parameter | Character Entity | Entity | Target Character of the current Bubble dialogue |
| Output Parameter | Text Bubble Configuration ID | Config ID | Currently active Text Bubble Config ID |
| Output Parameter | Text Bubble Completion Count | Integer | Number of times the currently active Text Bubble has been fully played for this dialogue Character |

## XXII. Shop

### **1. When Selling Inventory Items in the Shop**

**Node Functions**

This event is triggered when Inventory items are sold in the Shop. The Owner of the Shop Component will receive it

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|-------------------|-----------|-------------|
| Output Parameter | Shop Owner | Entity |  |
| Output Parameter | Shop Owner GUID | GUID |  |
| Output Parameter | Buyer Entity | Entity |  |
| Output Parameter | Shop ID | Integer |  |
| Output Parameter | Item Config ID | Config ID |  |
| Output Parameter | Purchase Quantity | Integer |  |

### **2. When Custom Shop Item Is Sold**

**Node Functions**

This event is triggered when Custom items are sold in the Shop. The Owner of the Shop Component will receive it

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|-------------------|---------|-------------|
| Output Parameter | Shop Owner | Entity |  |
| Output Parameter | Shop Owner GUID | GUID |  |
| Output Parameter | Buyer Entity | Entity |  |
| Output Parameter | Shop ID | Integer |  |
| Output Parameter | Shop Item ID | Integer |  |
| Output Parameter | Purchase Quantity | Integer |  |

### **3. When selling items to the shop**

**Node Functions**

This event is triggered when items are purchased by the Shop. The Owner of the Shop Component will receive it

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|--------------------------|------------|-------------|
| Output Parameter | Shop Owner | Entity |  |
| Output Parameter | Shop Owner GUID | GUID |  |
| Output Parameter | Seller Entity | Entity |  |
| Output Parameter | Shop ID | Integer |  |
| Output Parameter | Purchase Item Dictionary | Dictionary |  |

## XXIII. Equipment

### **1. When Equipment Is Equipped**

**Node Functions**

This event is triggered when Equipment is equipped. The Owner of the Equipment will receive it. Configure this in the Item Node Graph

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|-------------------------|---------|-------------|
| Output Parameter | Equipment Holder Entity | Entity |  |
| Output Parameter | Equipment Holder GUID | GUID |  |
| Output Parameter | Equipment Index | Integer |  |

### **2. When Equipment Is Unequipped**

**Node Functions**

This event is triggered when Equipment is unequipped. The Owner of the Equipment will receive it. Configure this in the Item Node Graph

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|------------------------|---------|-------------|
| Output Parameter | Equipment Owner Entity | Entity |  |
| Output Parameter | Equipment Owner GUID | GUID |  |
| Output Parameter | Equipment Index | Integer |  |

### **3. When Equipment Is Initialized**

**Node Functions**

When Equipment is first obtained and enters the Inventory, it is initialized. The event's output parameters return the unique ID of the Equipment instance. Use this ID to edit the Equipment dynamically. The Owner of the Equipment will receive this event. Configure this in the Item Node Graph

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------------|---------|-------------|
| Output Parameter | Equipment Owner | Entity |  |
| Output Parameter | Equipment Owner GUID | GUID |  |
| Output Parameter | Equipment Index | Integer |  |

### **4. When Equipment Affix Value Changes**

**Node Functions**

This event is triggered when Equipment Affix values change. The Owner of the Equipment will receive it. Configure this in the Item Node Graph

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------------|------------------------|-----------------------------------------------------------------|
| Output Parameter | Equipment Owner | Entity |  |
| Output Parameter | Equipment Owner GUID | GUID |  |
| Output Parameter | Equipment Index | Integer |  |
| Output Parameter | Affix ID | Integer | The corresponding ID of this Entry within the Equipment Affixes |
| Output Parameter | Pre-Change Value | Floating Point Numbers |  |
| Output Parameter | Post-Change Value | Floating Point Numbers |  |

## XXIV. Items

### **1. When Item Is Lost From Inventory**

**Node Functions**

This event is triggered when an Item is removed from the Inventory (its quantity becomes 0). The Owner of the Inventory Component will receive it

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|-------------------|-----------|-------------|
| Output Parameter | Item Owner Entity | Entity |  |
| Output Parameter | Item Owner GUID | GUID |  |
| Output Parameter | Item Config ID | Config ID |  |
| Output Parameter | Quantity Lost | Integer |  |

### **2. When the Quantity of Inventory Item Changes**

**Node Functions**

This event is triggered when the quantity of Items in the Inventory changes. The Owner of the Inventory Component will receive it

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------------|-------------|-------------|
| Output Parameter | Item Owner Entity | Entity |  |
| Output Parameter | Item Owner GUID | GUID |  |
| Output Parameter | Item Config ID | Config ID |  |
| Output Parameter | Pre-Change Quantity | Integer |  |
| Output Parameter | Post-Change Quantity | Integer |  |
| Output Parameter | Reason for Change | Enumeration |  |

### **3. When Item Is Added to Inventory**

**Node Functions**

This event is triggered when a new Item is added to the Inventory. The Owner of the Inventory Component will receive it. This event is not triggered by quantity-only changes

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|-------------------|-----------|-------------|
| Output Parameter | Item Owner Entity | Entity |  |
| Output Parameter | Item Owner GUID | GUID |  |
| Output Parameter | Item Config ID | Config ID |  |
| Output Parameter | Quantity Obtained | Integer |  |

### **4. When the Quantity of Inventory Currency Changes**

**Node Functions**

This event is triggered when the amount of Inventory Currency changes. The Owner of the Inventory Component will receive it

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|-----------------------|-----------|-------------|
| Output Parameter | Currency Owner Entity | Entity |  |
| Output Parameter | Currency Owner GUID | GUID |  |
| Output Parameter | Currency Config ID | Config ID |  |
| Output Parameter | Currency Change Value | Integer |  |

### **5. When Items in the Inventory Are Used**

**Node Functions**

This event is triggered when an Item in the Inventory is used. The Owner of the Inventory Component will receive it

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|-------------------|-----------|-------------|
| Output Parameter | Item Owner Entity | Entity |  |
| Output Parameter | Item Owner GUID | GUID |  |
| Output Parameter | Item Config ID | Config ID |  |
| Output Parameter | Amount to Use | Integer |  |

## XXV. Creation Patrol

### **1. When Creation Reaches Patrol Waypoint**

**Node Functions**

When the **Send Node Graph Event on Arrival** option is enabled for a waypoint in the Patrol template, a Node Graph Event is triggered once the specified conditions are met

This Node Graph Event can only be received by the creation's node graph

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|-----------------------------|---------|-------------------------------------------------------------------------------------------|
| Output Parameter | Creation Entity | Entity | Runtime Creation Entity |
| Output Parameter | Creation GUID | GUID | The GUID of the Creation. If it was not an initially placed Creation, the output is empty |
| Output Parameter | Current Patrol Template ID | Integer | The Patrol Template ID currently active on this Creation |
| Output Parameter | Current Path Index | Integer | The Path ID referenced by the Creation's currently active Patrol Template |
| Output Parameter | Current Reached Waypoint ID | Integer | The Waypoint ID the Creation has currently reached |
| Output Parameter | Next Waypoint ID | Integer | The Waypoint ID the Creation will move to next |