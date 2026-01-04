## I. Common Nodes

## 1. Print String

**Node Functions**

Outputs a string to the log, generally used for logic checks and debugging

In the log, this string prints whenever the logic runs successfully, regardless of whether this Node Graph is toggled

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|--------|--------------------------|
| Input Parameter | String | String | The string to be printed |

## **2. Set Local Variable**

**Node Functions**

When connected to the Query Node [Get Local Variable], this overwrites the value of that Local Variable

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|----------------|---------------------------------------------|
| Input Parameter | Local Variable | Local Variable | Container for data storage |
| Input Parameter | Value | Generic | Value used to overwrite this local variable |

## **3. Break Loop**

**Node Functions**

Break out of a Finite Loop. The output pin must connect to the [Break Loop] input parameter of the [Finite Loop] Node

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|----------------|----------------|------|-------------|
|  |  |  |  |

## **4. Finite Loop**

**Node Functions**

From the [Loop Start Value] to the [Loop End Value], the loop iterates, incrementing the Integer by 1 each time. On each iteration, it executes the Nodes connected to [Loop Body]. After a full iteration, it executes the Nodes connected to [Loop Complete].

Use [Break Loop] to end the iteration early. After exiting the loop, the logic connected to the [Loop Complete] node will also be executed.

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|--------------------|---------|----------------------------------------------|
| Input Parameter | Loop Start Value | Integer | Starting integer value for iteration |
| Input Parameter | Loop End Value | Integer | Integer value at which the iteration ends |
| Output Parameter | Current Loop Value | Integer | Integer value of the current execution logic |

## **5. Forwarding Event**

**Node Functions**

Forwards the source event of this Node's Execution Flow to the specified Target Entity. The event with the same name on the Target Entity's Node Graph will be triggered

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|--------|-------------------------------|
| Input Parameter | Target Entity | Entity | Target entity being forwarded |

## II. List Operations

## **1. Insert Value Into List**

**Node Functions**

Insert a value at the specified ID Location in the specified List. The inserted value appears at that ID after insertion

For example: Inserting 5 at ID 2 in the List [1, 2, 3, 4] results in [1, 2, 5, 3, 4] (5 appears at ID 2)

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|--------------|--------------------------------------------|
| Input Parameter | List | Generic List | Reference to the list being inserted |
| Input Parameter | Insert ID | Integer | ID of the inserted value (after insertion) |
| Input Parameter | Insert Value | Generic | Value to be inserted |

## **2. Modify Value in List**

**Node Functions**

Edit the value at the specified ID Location in the specified List

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|--------------|-----------------------|
| Input Parameter | List | Generic List | Edited list reference |
| Input Parameter | ID | Integer | ID of edited value |
| Input Parameter | Value | Generic | Edited Value |

## **3. Remove Value From List**

**Node Functions**

Remove the value at the specified ID Location from the specified List. All subsequent values shift forward by one position

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|--------------|-------------------------------------------|
| Input Parameter | List | Generic List | Reference to the list of values to remove |
| Input Parameter | Remove ID | Integer | ID to remove |

## **4. List Iteration Loop**

**Node Functions**

Iterate through the specified List in sequential order

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|-----------------|--------------|-------------------------|
| Input Parameter | Iteration List | Generic List | List to iterate through |
| Output Parameter | Iteration Value | Generic | Each value in the list |

## **5. List Sorting**

**Node Functions**

Sort the specified List according to the chosen sort method

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|--------------|--------------------------------------------|
| Input Parameter | List | Generic List | Integer List or Floating Point Number List |
| Input Parameter | Sort By | Enumeration | Ascending or Descending |

## **6. Concatenate List**

**Node Functions**

Append the input List to the end of the Target List. For example, Target List [1, 2, 3] with input [4, 5] becomes [1, 2, 3, 4, 5] after execution

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|--------------|------------------------------------------------------------|
| Input Parameter | Target List | Generic List | List being input |
| Input Parameter | Input List | Generic List | The input list will be added to the end of the Target list |

## **7. Clear List**

**Node Functions**

Clear the specified List

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|--------------|--------------------|
| Input Parameter | List | Generic List | List to be cleared |

## III. Custom Variables

## **1. Set Node Graph Variable**

**Node Functions**

Set the value of the specified Node Graph Variable in the current Node Graph

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|---------|-------------------------------------------------------------------------------------------------------------|
| Input Parameter | Variable Name | String | Name of the Node Graph Variable. Must be unique within the same Node Graph |
| Input Parameter | Variable Value | Generic | Value assigned to this variable |
| Input Parameter | Trigger Event | Boolean | Default: True. If set to False, this Node Graph Variable editing will not trigger the Variable Change Event |

## **2. Set Custom Variable**

**Node Functions**

Set the value of the specified Custom Variable on the Target Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|---------|---------------------------------------------------------------------------------------------------------------------|
| Input Parameter | Target Entity | Entity | The variable is mounted on this entity |
| Input Parameter | Variable Name | String | Custom variable name. Must be unique |
| Input Parameter | Variable Value | Generic | Value assigned to this variable |
| Input Parameter | Trigger Event | Boolean | Default: True. When set to False, this custom variable editing will not trigger the On Custom Variable Change event |

## IV. Preset Status

## **1. Set Preset Status**

**Node Functions**

Set the Preset Status of the specified Target Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|---------------------|---------|---------------------------------------------|
| Input Parameter | Target Entity | Entity | Preset Status set for the entity |
| Input Parameter | Preset Status Index | Integer | The unique identifier for the Preset Status |
| Input Parameter | Preset Status Value | Integer | Generally "0" for off, "1" for on |

## V. Entity Related

## **1. Create Entity**

**Node Functions**

Create an Entity by GUID. The Entity must be pre-placed in the Scene

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|---------------------|--------------|--------------------------------------------------------------|
| Input Parameter | Target GUID | GUID | Identifier for this entity |
| Input Parameter | Unit Tag Index List | Integer List | Determines the Unit Tags carried when this entity is created |

## **2. Create Prefab**

**Node Functions**

Create an Entity by Prefab ID

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|---------------------|--------------|-----------------------------------------------------------------|
| Input Parameter | Prefab ID | Prefab ID | Identifier for this Prefab |
| Input Parameter | Location | 3D Vector | Absolute Location |
| Input Parameter | Rotate | 3D Vector | Absolute Rotation |
| Input Parameter | Owner Entity | Entity | Determines whether the created entity belongs to another entity |
| Input Parameter | Overwrite Level | Boolean | When set to False, the [Level] parameter has no effect |
| Input Parameter | Level | Integer | Determines the Level when the entity is created |
| Input Parameter | Unit Tag Index List | Integer List | Determines the Unit Tags carried when this entity is created |
| Output Parameter | Created Entity | Entity | Entities created in this way do not have a GUID |

## 3. Create Prefab Group

**Node Functions**

Create the Entities contained in the Prefab Group by Prefab Group ID

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|---------------------|--------------|------------------------------------------------------------------------|
| Input Parameter | Prefab Group ID | Integer | Identifier for this Prefab Group |
| Input Parameter | Location | 3D Vector | Absolute Location of the Prefab Group center |
| Input Parameter | Rotate | 3D Vector | Absolute Rotation of the Prefab Group center |
| Input Parameter | Owner Entity | Entity | Determines whether the entity belongs to another entity after creation |
| Input Parameter | Level | Integer | Determines the Level when the entity is created |
| Input Parameter | Unit Tag Index List | Integer List | Determines the Unit Tags carried when the entity is created |
| Input Parameter | Overwrite Level | Boolean | When set to False, the [Level] parameter has no effect |
| Output Parameter | Created Entity List | Entity List | Entities created in this way do not have a GUID |

## **4. Activate/Disable Model Display**

**Node Functions**

Edit the Entity's Model Visibility attribute to make its Model visible or hidden

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|---------|---------------------------------------|
| Input Parameter | Target Entity | Entity | The entity to be edited |
| Input Parameter | Activate | Boolean | Set to True to make the model visible |

## **5. Destroy Entity**

**Node Functions**

Destroy the specified Entity with a destruction effect. This can trigger logic that runs only after destruction, such as end-of-lifecycle behaviors for Local Projectiles

The [When Entity Is Destroyed] and [When Entity Is Removed/Destroyed] events can be monitored on Stage Entities

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|--------|----------------------------|
| Input Parameter | Target Entity | Entity | The entity to be destroyed |

## **6. Remove Entity**

**Node Functions**

Remove the specified Entity. Unlike destroying an Entity, this has no destruction effect and does not trigger logic that runs only after destruction

Removing an Entity does not trigger the [On Entity Destroyed] event, but it can trigger the [On Entity Removed/Destroyed] event

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|--------|--------------------------|
| Input Parameter | Target Entity | Entity | The entity to be removed |

## VI. Stage Related

## **1. Settle Stage**

**Node Functions**

Triggers the Stage Settlement process, which executes out-of-stage logic as defined in [Stage Settlement](https://act.mihoyo.com/ys/ugc/tutorial//detail/mhx1du08nhwo)

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|----------------|----------------|------|-------------|
|  |  |  |  |

## **2. Set Current Environment Time**

**Node Functions**

Instantly switch Environment Time to the specified hour. The parameter must be a Floating Point Number between 0 and 24

If the target hour is earlier than the current hour, it is treated as the next day (+1 day)

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|------------------|------------------------|----------------------------------------------------------------------------------------------------------------|
| Input Parameter | Environment Time | Floating Point Numbers | Must be a floating point value between 0–24; this Node will not take effect if the value is outside this range |

## **3. Set Environment Time Passage Speed**

**Node Functions**

Minutes elapsed per second, limited to 0 - 60 (Teyvat speed is 1)

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|--------------------------------|------------------------|---------------------------------------------------------------------------------------|
| Input Parameter | Environment Time Passage Speed | Floating Point Numbers | Clamped to the range 0–60. Values outside this range are automatically set to 0 or 60 |

## VII. Faction Related

## **1. Modify Entity Faction**

**Node Functions**

Edit the Faction of the specified Target Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|---------|--------------------------------------|
| Input Parameter | Target Entity | Entity | Entity whose faction is to be edited |
| Input Parameter | Faction | Faction | Edited Faction |

## VIII. Player and Character Related

## **1. Teleport Player**

**Node Functions**

Teleport the specified Player Entity. A loading interface may appear depending on teleport distance

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|-----------------|-----------|-------------------|
| Input Parameter | Player Entity | Entity | Active Player |
| Input Parameter | Target Location | 3D Vector | Absolute Location |
| Input Parameter | Target Rotation | 3D Vector | Absolute Rotation |

## **2. Revive Character**

**Node Functions**

Revive the specified Character Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|------------------|--------|------------------------------------|
| Input Parameter | Character Entity | Entity | The Character Entity to be revived |

## **3. Revive All Player's Characters**

**Node Functions**

Revive all Character Entities of the specified player. In Beyond Mode, since each player has only one character, this is equivalent to [Revive Character]

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|---------|--------------------------------------------------------|
| Input Parameter | Player Entity | Entity | The Player Entity that owns the Character |
| Input Parameter | Deduct Revives | Boolean | If set to False, the Revive Count will not be deducted |

## **4. Defeat All Player's Characters**

**Node Functions**

Knock down all characters of the specified player, causing the player to enter _When All Player's Characters Are Down_ _state_.

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|--------|-------------------------------------------|
| Input Parameter | Player Entity | Entity | The Player Entity that owns the Character |

## **5. Activate Revive Point**

**Node Functions**

Activate the specified Revive Point ID for the player. When the player later triggers Revive logic, they can revive at this Revive Point

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|-----------------|---------|----------------------------------|
| Input Parameter | Player Entity | Entity | Active Player |
| Input Parameter | Revive Point ID | Integer | Identifier for this Revive Point |

## **6. Set Player Revive Time**

**Node Functions**

Set the duration for the Player's next revive. If the Player is currently reviving, this does not affect the ongoing revive process

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|---------|-----------------|
| Input Parameter | Player Entity | Entity | Active Player |
| Input Parameter | Duration | Integer | Unit in seconds |

## **7. Set Player Remaining Revives**

**Node Functions**

Set the remaining number of revives for the specified Player. When set to 0, the Player cannot revive

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|-----------------|---------|-----------------------------------------------|
| Input Parameter | Player Entity | Entity | Active Player |
| Input Parameter | Remaining Times | Integer | When set to 0, the player will not be revived |

## **8. Modify environment settings**

**Node Functions**

Apply the specified Environment Configuration to the designated player. Takes effect immediately upon execution

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|--------------------------|-------------|--------------------------------------------------------------------------------------------------------|
| Input Parameter | Environment Config Index | Integer | Identifier for this Environment Configuration |
| Input Parameter | Target Player List | Entity List | Applies only to Players in the specified list |
| Input Parameter | Enable Weather Config | Boolean | Set to True to enable |
| Input Parameter | Weather Config Index | Integer | The Weather Configuration matching this ID will take effect. If the ID does not exist, nothing happens |

## **9. Allow/Forbid Player to Revive**

**Node Functions**

Set whether the specified player is allowed to revive

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|---------|-------------------------------------|
| Input Parameter | Player Entity | Entity | Active Player |
| Input Parameter | Allow | Boolean | If set to True, reviving is allowed |

## **10. Deactivate Revive Point**

**Node Functions**

Unregister the specified Revive Point ID for the player. The layer will not revive at this Revive Point next time

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|-----------------|---------|----------------------------------|
| Input Parameter | Player Entity | Entity | Active Player |
| Input Parameter | Revive Point ID | Integer | Identifier for this Revive Point |

## IX. Collision

## **1. Activate/Disable Extra Collision**

**Node Functions**

Edit data in the Entity's Extra Collision Component to enable/disable Extra Collision

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|--------------------|---------|-------------------------------------|
| Input Parameter | Target Entity | Entity | Active Entity |
| Input Parameter | Extra Collision ID | Integer | Identifier for this Extra Collision |
| Input Parameter | Activate | Boolean | Set to True to activate |

## **2. Activate/Disable Extra Collision Climbability**

**Node Functions**

Edit the Climbability of the Entity's Extra Collision Component

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|--------------------|---------|-------------------------------------|
| Input Parameter | Target Entity | Entity | Active Entity |
| Input Parameter | Extra Collision ID | Integer | Identifier for this Extra Collision |
| Input Parameter | Activate | Boolean | Set to True to activate |

## **3. Activate/Disable Native Collision**

**Node Functions**

Edit the Entity's Native Collision

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|---------|-------------------------|
| Input Parameter | Target Entity | Entity | Active Entity |
| Input Parameter | Activate | Boolean | Set to True to activate |

## **4. Activate/Disable Native Collision Climbability**

**Node Functions**

Edit the Climbability of the Entity's Native Collision

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|---------|-------------------------|
| Input Parameter | Target Entity | Entity | Active Entity |
| Input Parameter | Activate | Boolean | Set to True to activate |

## X. Collision Triggers

## **1. Activate/Disable Collision Trigger**

**Node Functions**

Edit the Collision Trigger Component data to Activate/Disable the Trigger at the specified ID

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|---------|---------------------------------------|
| Input Parameter | Target Entity | Entity | Active Entity |
| Input Parameter | Trigger ID | Integer | Identifier for this Collision Trigger |
| Input Parameter | Activate | Boolean | Set to True to activate |

## XI. Combat

## **1. Initiate Attack**

**Node Functions**

Make the specified Entity initiate an attack. The Entity that uses this node must have the corresponding Ability Unit configured.

There are two usage modes:

When the Ability Unit is [Hitbox Attack], it executes a hitbox attack centered on the Target Entity's Location

When the Ability Unit is [Direct Attack], it directly attacks the Target Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|-------------------------------|------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Input Parameter | Target Entity | Entity | Depending on the Ability Unit, this can be treated either as the reference target for the Hitbox Location or as the attack target |
| Input Parameter | Damage Coefficient | Floating Point Numbers | The coefficient applied to the damage dealt by this attack |
| Input Parameter | Damage Increment | Floating Point Numbers | The incremental damage applied by this attack |
| Input Parameter | Location Offset | 3D Vector | When using Hitbox Attack, determines the Hitbox offset  
When using Direct Attack, determines the hit-detection location for the attack and thus where on-hit special effects are created |
| Input Parameter | Rotation Offset | 3D Vector | When using Hitbox Attack, determines the Hitbox rotation  
When using Direct Attack, determines the hit-detection location for the attack and thus the rotation used for on-hit effects |
| Input Parameter | Ability Unit | String | Referenced Ability Unit. Must be configured on the entity associated with this Node Graph |
| Input Parameter | Overwrite Ability Unit Config | Boolean | When set to True, the four parameters — Damage Coefficient, Damage Increment, Location Offset, and Rotation Offset — overwrite parameters of the same name in the Ability Unit. When set to False, the Ability Unit's original configuration is used |
| Input Parameter | Initiator Entity | Entity | Determines the Initiator Entity for this attack. Defaults to the Entity associated with this Node Graph. Affects which attacker is identified in events such as On Hit and When Attacked |

## **2. Recover HP**

**Node Functions**

Restore HP to the specified Target Entity via an Ability Unit

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|-------------------------------|------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Input Parameter | Target Entity | Entity | Target of HP restoration |
| Input Parameter | Recovery Amount | Floating Point Numbers | The amount of HP restored in this healing instance |
| Input Parameter | Ability Unit | String | Referenced Ability Unit. Must be configured on the entity associated with this Node Graph |
| Input Parameter | Overwrite Ability Unit Config | Boolean | When set to True, the Recovery Amount overwrites the parameter of the same name in the Ability Unit. When set to False, the Ability Unit's original configuration is used |
| Input Parameter | Recover Initiator Entity | Entity | Determines the Initiator Entity of this healing action. Defaults to the Entity associated with this Node Graph. Affects healer identification in events such as When HP Is Recovered and When Initiating HP Recovery |

## **3. HP Loss**

**Node Functions**

Directly cause the specified target to lose HP. Losing HP is not an attack, so it does not trigger attack-related events

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|---------------------------------|------------------------|--------------------------------------------------------------------------------------------|
| Input Parameter | Target Entity | Entity | Target that loses HP |
| Input Parameter | HP Loss | Floating Point Numbers | The amount of HP lost in this instance |
| Input Parameter | Lethal | Boolean | If set to False, this HP loss will leave the Target with at least 1 HP remaining |
| Input Parameter | Can be blocked by invincibility | Boolean | If set to True, and the Target is set to Invincible via Unit Status, HP loss has no effect |
| Input Parameter | Can be Blocked by Locked HP? | Boolean | If set to True, and the Target's HP is locked via Unit Status, HP loss has no effect |
| Input Parameter | Damage Pop-Up Type | Enumeration | No Pop-Up

Normal Pop-Up

CRIT Hit Pop-Up |

## **4. Recover HP Directly**

**Node Functions**

Directly restore HP to the specified Target Entity. Unlike [Recover HP], this node does not require an Ability Unit

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|-----------------------------------|------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Input Parameter | Recover Initiator Entity | Entity | The Entity that initiates healing |
| Input Parameter | Recover Target Entity | Entity | The Target Entity to be healed |
| Input Parameter | Recovery Amount | Floating Point Numbers | The amount of HP restored in this healing instance |
| Input Parameter | Ignore Recovery Amount Adjustment | Boolean | If set to True, this healing amount is not affected by the Target's Unit Status effects that adjust healing |
| Input Parameter | Aggro Generation Multiplier | Floating Point Numbers | The Aggro generated by this healing, expressed as a multiplier. Only applicable when using Custom Aggro Mode |
| Input Parameter | Aggro Generation Increment | Floating Point Numbers | The Aggro generated by this healing, expressed as an incremental value. Only applicable when using Custom Aggro Mode |
| Input Parameter | Healing Tag List | String List | The list of tags associated with this healing action. These can be accessed in the When HP Is Recovered and When Initiating HP Recovery events to identify a specific healing action |

## XII. Motion Devices

## **1. Recover Basic Motion Device**

**Node Functions**

Resume a paused Basic Motion Device on the Target Entity. The Target Entity must have the Basic Motion Device Component

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|--------------------|--------|-----------------------------------|
| Input Parameter | Target Entity | Entity | Active Entity |
| Input Parameter | Motion Device Name | String | Identifier for this motion device |

## **2. Activate Fixed-Point Motion Device**

**Node Functions**

Dynamically add a Fixed-Point Basic Motion Device to the Target Entity during Stage runtime

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|--------------------|------------------------|------------------------------------|
| Input Parameter | Target Entity | Entity | Active Entity |
| Input Parameter | Motion Device Name | String | Identifier for this motion device |
| Input Parameter | Movement Mode | Enumeration |  |
| Input Parameter | Movement SPD | Floating Point Numbers |  |
| Input Parameter | Target Location | 3D Vector | Absolute Location |
| Input Parameter | Target Rotation | 3D Vector | Absolute Rotation |
| Input Parameter | Lock Rotation | Boolean |  |
| Input Parameter | Parameter Type | Enumeration | Options: Fixed Speed or Fixed Time |
| Input Parameter | Movement Time | Floating Point Numbers |  |

## **3. Activate Basic Motion Device**

**Node Functions**

Activate a Basic Motion Device configured within the Target Entity's Basic Motion Device Component

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|--------------------|--------|-----------------------------------|
| Input Parameter | Target Entity | Entity | Active Entity |
| Input Parameter | Motion Device Name | String | Identifier for this motion device |

## **4. Add Target-Oriented Rotation-Based Motion Device**

**Node Functions**

Dynamically add a Basic Motion Device with Target-Oriented Rotation to the Target Entity during Stage runtime

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|------------------------|------------------------|----------------------------------------------------------|
| Input Parameter | Target Entity | Entity | Active Entity |
| Input Parameter | Motion Device Name | String | Identifier for this motion device |
| Input Parameter | Motion Device Duration | Floating Point Numbers | The duration for which this motion device remains active |
| Input Parameter | Target Angle | 3D Vector | Absolute Angle |

## **5. Add Uniform Basic Linear Motion Device**

**Node Functions**

Dynamically add a Basic Motion Device with Uniform Linear Motion at runtime

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|------------------------|------------------------|----------------------------------------------------------|
| Input Parameter | Target Entity | Entity | Active Entity |
| Input Parameter | Motion Device Name | String | Identifier for this motion device |
| Input Parameter | Motion Device Duration | Floating Point Numbers | The duration for which this motion device remains active |
| Input Parameter | Velocity Vector | 3D Vector | Determines the magnitude and direction of the velocity |

## **6. Add Uniform Basic Rotation-Based Motion Device**

**Node Functions**

Dynamically add a Basic Motion Device with Uniform Rotation at runtime

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|---------------------------|------------------------|----------------------------------------------------------|
| Input Parameter | Target Entity | Entity | Active Entity |
| Input Parameter | Motion Device Name | String | Identifier for this motion device |
| Input Parameter | Motion Device Duration | Floating Point Numbers | The duration for which this motion device remains active |
| Input Parameter | Angular Velocity (°/s) | Floating Point Numbers | Angular Velocity Magnitude |
| Input Parameter | Rotation Axis Orientation | 3D Vector | Relative Orientation |

## **7. Stop and Delete Basic Motion Device**

**Node Functions**

Stop and delete a running Motion Device

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|-------------------------------|---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Input Parameter | Target Entity | Entity | Active Entity |
| Input Parameter | Motion Device Name | String | Identifier for this motion device |
| Input Parameter | Stop All Basic Motion Devices | Boolean | If set to True, stops all Basic Motion Devices on this Entity. If set to False, stops only the Motion Device whose name matches the specified Motion Device |

## **8. Pause Basic Motion Device**

**Node Functions**

Pause a running Motion Device. The Resume Motion Device node can then be used to resume it

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|--------------------|--------|-----------------------------------|
| Input Parameter | Target Entity | Entity | Active Entity |
| Input Parameter | Motion Device Name | String | Identifier for this motion device |

## XIII. Follow Motion Device

## **1. Activate/Disable Follow Motion Device**

**Node Functions**

Enable/Disable the Follow Motion Device logic on the Target Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|---------|-------------------------|
| Input Parameter | Target Entity | Entity | Active Entity |
| Input Parameter | Activate | Boolean | Set to True to activate |

## **2. Switch Follow Motion Device Target by GUID**

**Node Functions**

Switch the Follow Target of the Follow Motion Device by GUID

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|-------------------------------------|-------------|----------------------------------------------------------------|
| Input Parameter | Target Entity | Entity | Active Entity |
| Input Parameter | Follow Target GUID | GUID | Identifier for the Follow Target |
| Input Parameter | Follow Target Attachment Point Name | String | Name of the Attachment Point to follow |
| Input Parameter | Location Offset | 3D Vector | Location Offset based on the Follow Coordinate System |
| Input Parameter | Rotation Offset | 3D Vector | Rotation Offset based on the Follow Coordinate System |
| Input Parameter | Follow Coordinate System | Enumeration | Options: Relative Coordinate System or World Coordinate System |
| Input Parameter | Follow Type | Enumeration | Options: Completely Follow, Follow Location, Follow Rotation |

## **3. Switch Follow Motion Device Target by Entity**

**Node Functions**

Switch the Follow Target of the Follow Motion Device by Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|-------------------------------------|-------------|----------------------------------------------------------------|
| Input Parameter | Target Entity | Entity | Active Entity |
| Input Parameter | Follow Target Entity | Entity | The Entity that follows the Target |
| Input Parameter | Follow Target Attachment Point Name | String | Name of the Attachment Point to follow |
| Input Parameter | Location Offset | 3D Vector | Location Offset based on the Follow Coordinate System |
| Input Parameter | Rotation Offset | 3D Vector | Rotation Offset based on the Follow Coordinate System |
| Input Parameter | Follow Coordinate System | Enumeration | Options: Relative Coordinate System or World Coordinate System |
| Input Parameter | Follow Type | Enumeration | Options: Completely Follow, Follow Location, Follow Rotation |

## XIV. Projectiles

## **1. Create Projectile**

**Node Functions**

Create a Projectile Entity using the Prefab ID. This function is similar to [Create Prefab], but includes an additional [Track Target] parameter, which sets the tracking target for projectiles of the Tracking type in the Projectile Motion Device Component of the created Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|---------------------|--------------|---------------------------------------------------------------------------------------------------|
| Input Parameter | Prefab ID | Prefab ID | Identifier for this Projectile Prefab |
| Input Parameter | Location | 3D Vector | Absolute Location |
| Input Parameter | Rotate | 3D Vector | Absolute Rotation |
| Input Parameter | Owner Entity | Entity | Determines whether the created entity belongs to another entity |
| Input Parameter | Track Target | Entity | The Tracking Target set by the Tracking Projectile type in the Projectile Motion Device component |
| Input Parameter | Overwrite Level | Boolean | When set to False, the [Level] parameter has no effect |
| Input Parameter | Level | Integer | Determines the Level when the entity is created |
| Input Parameter | Unit Tag Index List | Integer List | Determines the Unit Tags carried when this entity is created |
| Output Parameter | Created Entity | Entity | This Entity inherits the attributes of the Projectile Prefab |

## XV. Special Effects

## **1. Play Timed Effects**

**Node Functions**

Play a Timed Effect relative to the Target Entity. A valid Target Entity and Attachment Point are required

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------------------|------------------------|-------------------------------------------------------------------------------|
| Input Parameter | Special Effects Asset | Config ID | Identifier for this Effect |
| Input Parameter | Target Entity | Entity | If the Entity does not exist, the Effect will not play |
| Input Parameter | Attachment Point Name | String | If the Attachment Point Name does not exist, the Special Effect will not play |
| Input Parameter | Move With the Target | Boolean | If set to True, follows the Target Entity's Motion |
| Input Parameter | Rotate With the Target | Boolean | If set to True, follows the Target Entity's Rotation |
| Input Parameter | Location Offset | 3D Vector | Location Offset relative to the Target Entity's specified Attachment Point |
| Input Parameter | Rotation Offset | 3D Vector | Rotation offset relative to the Target Entity's specified Attachment Point |
| Input Parameter | Zoom Multiplier | Floating Point Numbers | The Zoom Multiplier of this Effect |
| Input Parameter | Play Built-In Sound Effect | Boolean | If set to True, plays the built-in Sound Effect as well |

## **2. Clear Special Effects Based on Special Effect Assets**

**Node Functions**

Clear all Effects on the specified Target Entity that use the given Effect Asset. Applies to Looping Effects only

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|-----------------------|-----------|----------------------------|
| Input Parameter | Target Entity | Entity | Active Entity |
| Input Parameter | Special Effects Asset | Config ID | Identifier for this Effect |

## **3. Mount Looping Special Effect**

**Node Functions**

Mount a Looping Effect relative to the Target Entity. A valid Target Entity and Attachment Point are required

This node returns an Effect Instance ID that can be stored. When using the [Clear Looping Effects] node later, use this Effect Instance ID to clear the specified Looping Effect

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------------------|------------------------|-------------------------------------------------------------------------------|
| Input Parameter | Special Effects Asset | Config ID | Identifier for this Effect |
| Input Parameter | Target Entity | Entity | If the Entity does not exist, the Effect will not play |
| Input Parameter | Attachment Point Name | String | If the Attachment Point Name does not exist, the Special Effect will not play |
| Input Parameter | Move With the Target | Boolean | If set to True, follows the Target Entity's Motion |
| Input Parameter | Rotate With the Target | Boolean | If set to True, follows the Target Entity's Rotation |
| Input Parameter | Location Offset | 3D Vector | Location Offset relative to the Target Entity's specified Attachment Point |
| Input Parameter | Rotation Offset | 3D Vector | Rotation offset relative to the Target Entity's specified Attachment Point |
| Input Parameter | Zoom Multiplier | Floating Point Numbers | The Zoom Multiplier of this Effect |
| Output Parameter | Special Effect Instance ID | Integer | The Instance ID automatically generated when mounting this Effect |

## **4. Clear Looping Special Effect**

**Node Functions**

Clear the specified Looping Effect on the Target Entity by Effect Instance ID. After a successful mount, the [Mount Looping Effect] node generates an Effect Instance ID

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------------------|---------|------------------------------------------------------------------------------|
| Input Parameter | Special Effect Instance ID | Integer | Instance ID automatically generated by the Mount Looping Special Effect node |
| Input Parameter | Target Entity | Entity | Active Entity |

## XVI. Timer

## **1. Resume Timer**

**Node Functions**

Resume a paused Timer on the Target Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|--------|------------------|
| Input Parameter | Target Entity | Entity | Active Entity |
| Input Parameter | Timer Name | String | Timer Identifier |

## **2. Start Timer**

**Node Functions**

Start a Timer on the Target Entity

The Timer is uniquely identified by its name

A Timer consists of a looping or non-looping Timer Sequence. The Timer Sequence is a set of time points in seconds arranged in ascending order; when the Timer reaches these points, it triggers the [On Timer Triggered] event. The maximum length of a Timer Sequence is 100

For example, if you input the Timer Sequence [1, 3, 5, 7], the [On Timer Triggered] event fires at 1s, 3s, 5s, and 7s

When Loop is set to "Yes," the Timer restarts from 0s after reaching the last time point. For [1, 3, 5, 7], it restarts from 0s after reaching 7s

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|----------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| Input Parameter | Target Entity | Entity | Active Entity |
| Input Parameter | Timer Name | String | Timer Identifier |
| Input Parameter | Loop | Boolean | If set to True, the Timer Sequence executes in a loop |
| Input Parameter | Timer Sequence | Floating Point Number List | Provide a list sorted in ascending order. If the list is invalid (not strictly ascending, contains negatives, etc.), the Timer will not run |

## **3. Pause Timer**

**Node Functions**

Pauses the specified Timer on the Target Entity. The [Resume Timer] node can then be used to resume its countdown

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|--------|------------------|
| Input Parameter | Target Entity | Entity | Active Entity |
| Input Parameter | Timer Name | String | Timer Identifier |

## **4. Stop Timer**

**Node Functions**

Completely terminate the specified Timer on the Target Entity; it cannot be resumed

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|--------|------------------|
| Input Parameter | Target Entity | Entity | Active Entity |
| Input Parameter | Timer Name | String | Timer Identifier |

## XVII. Global Timer

## **1. Recover Global Timer**

**Node Functions**

Resume a paused Global Timer on the Target Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|--------|---------------------------------------------------------------------------------------------|
| Input Parameter | Target Entity | Entity | Active Entity |
| Input Parameter | Timer Name | String | Identifier for the Timer. Only Timer Names configured in Timer Management can be referenced |

## **2. Start Global Timer**

**Node Functions**

Start a Global Timer on the Target Entity

The Timer on the Target Entity is uniquely identified by its name

Based on Timer Management settings, Countdown and Stopwatch Timers are created accordingly

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|--------|---------------------------------------------------------------------------------------------|
| Input Parameter | Target Entity | Entity | Active Entity |
| Input Parameter | Timer Name | String | Identifier for the Timer. Only Timer Names configured in Timer Management can be referenced |

## **3. Modify Global Timer**

**Node Functions**

Adjust the time of a running Global Timer via the Node Graph

If the timer is paused first and then modified to reduce the time, the modified time will be at least 0 seconds.

For countdown timers, pausing followed by modifying the time to 0s will trigger the [When the Global Timer Is Triggered] event upon resuming the timer.

If the timer is paused first, then modified to 0s, followed by modifying the time to increase it, and finally resumed, the [When the Global Timer Is Triggered] event will not be triggered.

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Input Parameter | Target Entity | Entity | Active Entity |
| Input Parameter | Timer Name | String | Identifier for the Timer. Only Timer Names configured in Timer Management can be referenced |
| Input Parameter | Change Value | Floating Point Numbers | For a Countdown Timer, a positive value increases the remaining time; a negative value decreases the remaining time

If the timer is set to Stopwatch, a positive value increases the accumulated time, while a negative value decreases it |

## **4. Pause Global Timer**

**Node Functions**

Pause a running Global Timer via the Node Graph

When paused, the UI controls linked to the timer will also pause their display

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|--------|---------------------------------------------------------------------------------------------|
| Input Parameter | Target Entity | Entity | Active Entity |
| Input Parameter | Timer Name | String | Identifier for the Timer. Only Timer Names configured in Timer Management can be referenced |

## **5. Stop Global Timer**

**Node Functions**

Use the node graph to stop running a global timer early

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|--------|---------------------------------------------------------------------------------------------|
| Input Parameter | Target Entity | Entity | Active Entity |
| Input Parameter | Timer Name | String | Identifier for the Timer. Only Timer Names configured in Timer Management can be referenced |

## XVIII. Camera

## **1. Switch Main Camera Template**

**Node Functions**

Switch the Main Camera Template for the target Player List to the specified Template

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------------|-------------|----------------------------|
| Input Parameter | Target Player List | Entity List | Active Player List |
| Input Parameter | Camera Template Name | String | Camera Template Identifier |

## XIX. Character Disruptor Device

## **1. Modifying Character Disruptor Device**

**Node Functions**

Edit the Character Disruptor Device active on the Target Entity by ID; if the ID does not exist, the change has no effect

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|---------|-----------------------------------------------|
| Input Parameter | Target Entity | Entity | Active Entity |
| Input Parameter | Device ID | Integer | Identifier for the Character Disruptor Device |

## XX. Unit Status

## **1. Add Unit Status**

**Node Functions**

Add a specified Stack Count of Unit Status to the Target Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------------------------|-------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Input Parameter | Applier Entity | Entity | Determines the Applier Entity for this action. Defaults to the Entity associated with this Node Graph |
| Input Parameter | Application Target Entity | Entity | The Entity that actually receives this Unit Status |
| Input Parameter | Unit Status Config ID | Config ID | Identifier for this Unit Status |
| Input Parameter | Applied Stacks | Integer | The Stack Count for this Unit Status |
| Input Parameter | Unit Status Parameter Dictionary | Dictionary | Can carry a set of parameters to overwrite parameters defined in the Unit Status. Currently, only parameters within shield templates can be overwritten. |
| Output Parameter | Application Result | Enumeration | Failed, other exceptions

Failed: Yielded to another status. A yielding relationship exists between the Target's current Unit Status and the one being applied

Failed: Maximum coexistence limit reached. The specified Unit Status on the Target Entity has reached its Coexistence Limit

Failed: Unable to add additional stack. Stack addition failed

Success: New status applied. Successfully applied new Unit Status

Success: Slot stacking. Target already has this Unit Status, stacking applied |
| Output Parameter | Slot ID | Integer | If application succeeds, returns the Unit Status Slot ID containing the instance |

## **2. Remove Unit Status**

**Node Functions**

Remove a specified Unit Status from the Target Entity. Either all stacks or a single stack can be removed

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|-----------------------|-------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Input Parameter | Remove Target Entity | Entity | The Entity from which the Unit Status will be removed |
| Input Parameter | Unit Status Config ID | Config ID | Identifier for this Unit Status |
| Input Parameter | Removal Method | Enumeration | All Coexisting Statuses with the Same Name: Removes all statuses applied with this Config ID that share the same name

Status With Fastest Stack Loss: Removes one stack from the status that loses stacks the fastest |
| Input Parameter | Remover Entity | Entity | Determines the Remover Entity for this action. Defaults to the Entity associated with this Node Graph |

## XXI. Tabs

## **1. Activate/Disable Tab**

**Node Functions**

Edit the Tab state by ID in the Target Entity's Tab Component

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|---------|--------------------------------------------------|
| Input Parameter | Target Entity | Entity | Active Entity |
| Input Parameter | Tab ID | Integer | Identifier for the Tab |
| Input Parameter | Activate | Boolean | If set to True, it is active and can be selected |

## XXII. Collision Trigger Source

## **1. Activate/Disable Collision Trigger Source**

**Node Functions**

Edit the state of the Collision Trigger Source Component on the Target Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|---------|-------------------------------------------------------------------------------------------|
| Input Parameter | Target Entity | Entity | Active Entity |
| Input Parameter | Activate | Boolean | If set to True, activates collision with Entities that carry Collision Trigger Components |

## XXIII. Class

## **1. Change Player's Current Class Level**

**Node Functions**

Set the Player's current Class Level. If it exceeds the defined range, the change will not take effect

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|---------|----------------------|
| Input Parameter | Target Player | Entity | Active Player Entity |
| Input Parameter | Level | Integer | Edited Level |

## **2. Change Player Class**

**Node Functions**

Set the Player's current Class to the Class referenced by the Config ID

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|-----------------|-----------|----------------------|
| Input Parameter | Target Player | Entity | Active Player Entity |
| Input Parameter | Class Config ID | Config ID | Class Identifier |

## **3. Increase Player's Current Class EXP**

**Node Functions**

Increase the Player's current Class EXP. Any excess beyond the maximum Level will not take effect

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|---------|-------------------------------|
| Input Parameter | Target Player | Entity | Active Player Entity |
| Input Parameter | EXP | Integer | Amount of EXP to be increased |

## XXIV. UI Control Groups

## **1. Activate UI Control Group in Control Group Library**

**Node Functions**

Activate the UI Control Groups stored as Custom Templates in the UI Control Group Library within the Target Player's Interface Layout

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|------------------------|---------|-------------------------------------|
| Input Parameter | Target Player | Entity | Active Player Entity |
| Input Parameter | UI Control Group Index | Integer | Identifier for the UI Control Group |

## **2. Switch Current Interface Layout**

**Node Functions**

Switch the Target Player's current Interface Layout via Layout ID

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|---------|------------------------------|
| Input Parameter | Target Player | Entity | Active Player Entity |
| Input Parameter | Layout Index | Integer | Identifier for the UI Layout |

## **3.** Modify UI Control Status Within the Interface Layout

**Node Functions**

Edit the state of the UI Control in the Target Player's Interface Layout by its UI Control ID

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|------------------|-------------|----------------------------------------------------------------------------------------------------------------------------|
| Input Parameter | Target Player | Entity | Active Player Entity |
| Input Parameter | UI Control Index | Integer | Identifier for the UI Control |
| Input Parameter | Display Status | Enumeration | Off: Invisible and logic not running

On: Visible and logic running normally

Hidden: Invisible and logic running normally |

## **4.** Remove Interface Control Group From Control Group Library

**Node Functions**

Remove the UI Control Groups activated via [Activate UI Control Group in Control Group Library] from the Target Player's Interface Layout

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|------------------------|---------|-------------------------------------|
| Input Parameter | Target Player | Entity | Active Player Entity |
| Input Parameter | UI Control Group Index | Integer | Identifier for the UI Control Group |

## XXV. Skills

## **1.** Modify Skill CD Percentage Based on Max CD

**Node Functions**

Edit the cooldown percentage of a skill in a Character's Skill Slot based on its maximum cooldown

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|-------------------------|------------------------|------------------------------------------------------------------------------------------------------|
| Input Parameter | Target Entity | Entity | Active Character Entity |
| Input Parameter | Character Skill Slot | Enumeration | The Skill Slot to edited: Normal Attack, Skill 1-E, Skill 2-Q, Skill 3-R, Skill 4-T, or Custom Skill |
| Input Parameter | Cooldown Ratio Modifier | Floating Point Numbers | Actual Cooldown after Editing = Original Cooldown × Cooldown Ratio Edit Value |
| Input Parameter | Limit Maximum CD Time | Boolean | If set to True, the edited Cooldown cannot be less than the specified minimum value |

## **2. Initialize Character Skill**

**Node Functions**

Reset the Target Character's skills to those defined in the Class Template

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------------|-------------|----------------------------------------------------------------------------------------------------------|
| Input Parameter | Target Entity | Entity | Active Character Entity |
| Input Parameter | Character Skill Slot | Enumeration | The Skill Slot to initialize: Normal Attack, Skill 1-E, Skill 2-Q, Skill 3-R, Skill 4-T, or Custom Skill |

## **3. Set Skill Resource Amount**

**Node Functions**

Edit the Character's skill resource amount

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|--------------------------|------------------------|----------------------------------------------|
| Input Parameter | Target Entity | Entity | Active Character Entity |
| Input Parameter | Skill Resource Config ID | Config ID | Skill Resource Identifier |
| Input Parameter | Target Value | Floating Point Numbers | Edited value will be set to this input value |

## **4.** Set Character Skill CD

**Node Functions**

Directly set the cooldown of a specific Skill Slot on the Target Character to a specified value

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|-----------------------|------------------------|------------------------------------------------------------------------------------------------------|
| Input Parameter | Target Entity | Entity | Active Character Entity |
| Input Parameter | Character Skill Slot | Enumeration | The Skill Slot to edited: Normal Attack, Skill 1-E, Skill 2-Q, Skill 3-R, Skill 4-T, or Custom Skill |
| Input Parameter | Remaining CD Time | Floating Point Numbers | Edited Cooldown will be set to this input value |
| Input Parameter | Limit Maximum CD Time | Boolean | If set to True, the edited Cooldown cannot be less than the specified minimum value |

## **5. Add Character Skill**

**Node Functions**

Add a skill to the specified Target Character's Skill Slot

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|-----------------|-------------|--------------------------------------------------------------------------------------------------------|
| Input Parameter | Target Entity | Entity | Active Character Entity |
| Input Parameter | Skill Config ID | Config ID | Skill Identifier |
| Input Parameter | Skill Slot | Enumeration | The Skill Slot to be added: Normal Attack, Skill 1-E, Skill 2-Q, Skill 3-R, Skill 4-T, or Custom Skill |

## **6. Modify Skill Resource Amount**

**Node Functions**

Edit the skill's resource amount by adding the change value to the current value. The change value can be negative

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|--------------------------|------------------------|-------------------------------------------|
| Input Parameter | Target Entity | Entity | Active Character Entity |
| Input Parameter | Skill Resource Config ID | Config ID | Skill Resource Identifier |
| Input Parameter | Change Value | Floating Point Numbers | New Value = Original Value + Change Value |

## **7.** Modify Character Skill CD

**Node Functions**

Edit the cooldown of the specified Skill Slot on the Target Character. The edit value is added to the current cooldown and can be negative

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|-----------------------|------------------------|------------------------------------------------------------------------------------------------------|
| Input Parameter | Target Entity | Entity | Active Character Entity |
| Input Parameter | Character Skill Slot | Enumeration | The Skill Slot to edited: Normal Attack, Skill 1-E, Skill 2-Q, Skill 3-R, Skill 4-T, or Custom Skill |
| Input Parameter | CD Modifier | Floating Point Numbers | New Value = Original Value + Edit Value |
| Input Parameter | Limit Maximum CD Time | Boolean | If set to True, the edited Cooldown cannot be less than the specified minimum value |

## **8. Delete Character Skill by Slot**

**Node Functions**

Delete the skill in the specified slot of the Target Character

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------------|-------------|----------------------------------------------------------------------------------------------------------|
| Input Parameter | Target Entity | Entity | Active Character Entity |
| Input Parameter | Character Skill Slot | Enumeration | The Skill Slot to be deleted: Normal Attack, Skill 1-E, Skill 2-Q, Skill 3-R, Skill 4-T, or Custom Skill |

## **9. Delete Character Skill by ID**

**Node Functions**

Iterate through and delete all skills with the specified Config ID across all of the Character's slots

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|-----------------|-----------|-------------------------|
| Input Parameter | Target Entity | Entity | Active Character Entity |
| Input Parameter | Skill Config ID | Config ID | Skill Identifier |

## XXVI. Sound Effects

## **1. Adjust Player Background Music Volume**

**Node Functions**

Adjust Player Background Music Volume

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|---------|----------------------|
| Input Parameter | Target Entity | Entity | Active Player Entity |
| Input Parameter | Volume | Integer |  |

## **2. Adjust Specified Sound Effect Player**

**Node Functions**

Adjust the volume and playback speed of the Sound Effect Player with the specified ID in the Sound Effect Player Component on the Target Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|------------------------|-------------|
| Input Parameter | Target Entity | Entity |  |
| Input Parameter | SFX Player ID | Integer |  |
| Input Parameter | Volume | Integer |  |
| Input Parameter | Playback Speed | Floating Point Numbers |  |

## **3. Close Specified Sound Effect Player**

**Node Functions**

Disable the Sound Effect Player with the specified ID in the Sound Effect Player Component on the specified Target Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|---------|-------------|
| Input Parameter | Target Entity | Entity |  |
| Input Parameter | SFX Player ID | Integer |  |

## **4. Start/Pause Player Background Music**

**Node Functions**

Edit the background music state for the specified Player

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|---------|----------------------|
| Input Parameter | Target Entity | Entity | Active Player Entity |
| Input Parameter | Recover | Boolean |  |

## **5. Start/Pause Specified Sound Effect Player**

**Node Functions**

Edit the state of the Sound Effect Player with the specified ID in the Sound Effect Player Component on the Target Entity. This node is only active when the sound effect is set to loop playback. It does not take effect for sound effects configured for single-playback.

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|---------|-------------|
| Input Parameter | Target Entity | Entity |  |
| Input Parameter | SFX Player ID | Integer |  |
| Input Parameter | Recover | Boolean |  |

## **6. Add Sound Effect Player**

**Node Functions**

Dynamically add a Sound Effect Player. The Unit must have a Sound Effect Player Component

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|--------------------------|------------------------|-------------|
| Input Parameter | Target Entity | Entity |  |
| Input Parameter | Sound Effect Asset Index | Integer |  |
| Input Parameter | Volume | Integer |  |
| Input Parameter | Playback Speed | Floating Point Numbers |  |
| Input Parameter | Loop Playback | Boolean |  |
| Input Parameter | Loop Interval Time | Floating Point Numbers |  |
| Input Parameter | 3D Sound Effect | Boolean |  |
| Input Parameter | Range Radius | Floating Point Numbers |  |
| Input Parameter | Attenuation Mode | Enumeration |  |
| Input Parameter | Attachment Point Name | String |  |
| Input Parameter | Attachment Point Offset | 3D Vector |  |
| Output Parameter | SFX Player ID | Integer |  |

## **7. Player Plays One-Shot 2D Sound Effect**

**Node Functions**

Player plays a one-shot 2D Sound Effect

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|--------------------------|------------------------|----------------------|
| Input Parameter | Target Entity | Entity | Active Player Entity |
| Input Parameter | Sound Effect Asset Index | Integer |  |
| Input Parameter | Volume | Integer |  |
| Input Parameter | Playback Speed | Floating Point Numbers |  |

## **8. Modify Player Background Music**

**Node Functions**

Edit background music parameters for the Player

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|------------------------|------------------------|----------------------|
| Input Parameter | Target Entity | Entity | Active Player Entity |
| Input Parameter | Background Music Index | Integer |  |
| Input Parameter | Start Time | Floating Point Numbers |  |
| Input Parameter | End Time | Floating Point Numbers |  |
| Input Parameter | Volume | Integer |  |
| Input Parameter | Loop Playback | Boolean |  |
| Input Parameter | Loop Interval | Floating Point Numbers |  |
| Input Parameter | Playback Speed | Floating Point Numbers |  |
| Input Parameter | Enable Fade In/Out | Boolean |  |

## XXVII. Unit Tags

## **1. Clear Unit Tags from Entity**

**Node Functions**

Clear Unit Tags for the specified Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|--------|-------------|
| Input Parameter | Target Entity | Entity |  |

## **2. Add Unit Tag to Entity**

**Node Functions**

Add Unit Tags to the specified Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|---------|-------------|
| Input Parameter | Target Entity | Entity |  |
| Input Parameter | Unit Tag Index | Integer |  |

## **3. Remove Unit Tag from Entity**

**Node Functions**

Remove Unit Tags from the specified Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|---------|-------------|
| Input Parameter | Target Entity | Entity |  |
| Input Parameter | Unit Tag Index | Integer |  |

## XXVIII. Custom Aggro

## **1. Taunt Target**

**Node Functions**

Available only in Custom Aggro Mode

Make the Taunter Entity taunt the specified Target Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|--------|-------------|
| Input Parameter | Taunter Entity | Entity |  |
| Input Parameter | Target Entity | Entity |  |

## **2. Remove Target Entity From Aggro List**

**Node Functions**

Available only in Custom Aggro Mode

Remove the Target Entity from the Aggro Owner's Aggro List; this may cause the target to leave battle

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|--------------------|--------|-------------|
| Input Parameter | Target Entity | Entity |  |
| Input Parameter | Aggro Owner Entity | Entity |  |

## **3. Clear Specified Target's Aggro List**

**Node Functions**

Available only in Custom Aggro Mode

Clear the Aggro Owner's Aggro List. This may cause them to leave battle

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|--------|-------------|
| Input Parameter | Aggro Owner | Entity |  |

## **4. Set the Aggro Value of Specified Entity**

**Node Functions**

Available only in Custom Aggro Mode

Set the Aggro Value of the specified Target Entity on the specified Aggro Owner

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|--------------------|---------|-------------|
| Input Parameter | Target Entity | Entity |  |
| Input Parameter | Aggro Owner Entity | Entity |  |
| Input Parameter | Aggro Value | Integer |  |

## XXIX. Signals

## **1. Send Signal**

**Node Functions**

Send a custom Signal to the global Stage. Before use, select the corresponding Signal name to ensure correct parameter usage

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|----------------|----------------|------|-------------|
|  |  |  |  |

## XXX. Nameplate

## **1. Set Entity Active Nameplate**

**Node Functions**

Set the active Nameplate list for the specified target. Nameplates included in the input list are enabled, while those not included are disabled

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|--------------------------|----------------|-------------|
| Input Parameter | Target Entity | Entity |  |
| Input Parameter | Nameplate Config ID List | Config ID List |  |

## XXXI. Text Bubbles

## **1. Switch Active Text Bubble**

**Node Functions**

In the Target Entity's Text Bubble Component, replace the current active Text Bubble with the one corresponding to the Config ID

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|------------------------------|-----------|-------------|
| Input Parameter | Target Entity | Entity |  |
| Input Parameter | Text Bubble Configuration ID | Config ID |  |

## XXXII. Deck Selector

## **1. Close Deck Selector**

**Node Functions**

Close the currently active Deck Selector for the specified Player

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|---------------------|---------|----------------------|
| Input Parameter | Target Player | Entity | Active Player Entity |
| Input Parameter | Deck Selector Index | Integer |  |

## **2. Invoke Deck Selector**

**Node Functions**

Open the pre-made Deck Selector for the Target Player

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description | Description |
|-----------------|-----------------------------------|------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Input Parameter | Target Player | Entity | Specify the runtime Player to invoke the Deck Selector | Specify the runtime Player to invoke the Deck Selector |
| Input Parameter | Deck Selector ID | Integer | Referenced UI Control Group ID | Referenced UI Control Group ID |
| Input Parameter | Select Duration | Floating Point Numbers | If empty, uses the Deck Selector's default configuration; otherwise, this time value is used as the effective duration

Unit in seconds | If empty, uses the Deck Selector's default configuration; otherwise, this time value is used as the effective duration

Unit in seconds |
| Input Parameter | Select Result Corresponding List | Integer List | One-to-one with display items: the Deck Selector returns the result value corresponding to each display item

Recommended configuration: 1 to X | One-to-one with display items: the Deck Selector returns the result value corresponding to each display item

Recommended configuration: 1 to X |
| Input Parameter | Select Display Corresponding List | Integer List | Deck Library Configuration Reference | Deck Library Configuration Reference |
| Input Parameter | Select Minimum Quantity | Integer | The minimum number of cards that must be selected for a valid interaction | The minimum number of cards that must be selected for a valid interaction |
| Input Parameter | Select Maximum Quantity | Integer | The maximum number of cards that can be selected for a valid interaction | The maximum number of cards that can be selected for a valid interaction |
| Input Parameter | Refresh Mode | Enumeration | No Refresh: The minimum and maximum refresh count parameters are invalid, and the selection interface has no Refresh button
Partial Refresh: Both input parameters (minimum and maximum refresh count) take effect, and the selection screen includes a refresh button
Full Refresh: Both input parameters (minimum and maximum refresh count) are ignored. All results are returned by default, and the selection screen includes a refresh button | |
| Input Parameter | Refresh Minimum Quantity | Integer | The minimum number of cards that must be selected for a valid refresh interaction. | The minimum number of cards that must be selected for a valid refresh interaction. |
| Input Parameter | Refresh Maximum Quantity | Integer | The maximum number of cards that can be selected for a valid refresh interaction | The maximum number of cards that can be selected for a valid refresh interaction |
| Input Parameter | Default Return Selection | Integer List | If the Deck Selector times out, has no interaction, or closes abnormally, force-assign this configured result

The length of this Result List must match the valid card selection count | If the Deck Selector times out, has no interaction, or closes abnormally, force-assign this configured result

The length of this Result List must match the valid card selection count |

## **3. Random Deck Selector Selection List**

**Node Functions**

Randomly sort the input List

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|--------------|-------------|
| Input Parameter | List | Integer List |  |

## XXXIII. Stage Settlement

## **1. Set Player Settlement Success Status**

**Node Functions**

Set Player Settlement Success Status

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|-------------------|-------------|-----------------------------------------|
| Input Parameter | Player Entity | Entity |  |
| Input Parameter | Settlement Status | Enumeration | Three types: Undefined, Victory, Defeat |

## **2. Set Player Settlement Scoreboard Data Display**

**Node Functions**

Set the Player's Scoreboard display data, which is shown on the Scoreboard after Stage Settlement. Since this node involves the display of external functions, [Data Value] and [Data Name] currently support multilingual translation only when manually entering text. If entered via connection input, multilingual translation is not supported.

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|---------|-----------------------------------------------------------------------------|
| Input Parameter | Set Entity | Entity | Active Player Entity |
| Input Parameter | Data Order | Integer | The sort order of this data |
| Input Parameter | Data Name | String | The name of this data |
| Input Parameter | Data Value | Generic | The value of this data. Supports Integer, Floating Point Number, and String |

## **3. Set Player Settlement Ranking Value**

**Node Functions**

Set the Player's ranking value after Settlement, then determine the final ranking order according to [Ranking Value Comparison Order] in [Stage Settings] – [Settlement]

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|---------|-------------|
| Input Parameter | Player Entity | Entity |  |
| Input Parameter | Ranking Value | Integer |  |

## **4. Set Faction Settlement Success Status**

**Node Functions**

Set Faction Settlement Success Status

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|-------------------|-------------|-----------------------------------------|
| Input Parameter | Faction | Faction | Active Faction Entity |
| Input Parameter | Settlement Status | Enumeration | Three types: Undefined, Victory, Defeat |

## **5. Set Faction Settlement Ranking Value**

**Node Functions**

Set the faction's ranking value after Settlement, then determine the final ranking order according to [Ranking Value Comparison Order] in [Stage Settings] – [Settlement]

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|---------|-----------------------|
| Input Parameter | Faction | Faction | Active Faction Entity |
| Input Parameter | Ranking Value | Integer |  |

## XXXIV. Light Source Components

## **1. Toggle Entity Light Source**

**Node Functions**

Adjust the Light Source state at the specified ID in the Light Source Component on the Target Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|-------------------|---------|--------------------------|
| Input Parameter | Target Entity | Entity |  |
| Input Parameter | Light Source ID | Integer |  |
| Input Parameter | Enable or Disable | Boolean | If set to True, turns On |

## XXXV. Dictionary

## **1. Sort Dictionary by Key**

**Node Functions**

Sort and output the specified Dictionary by keys in ascending or descending order

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|-------------|-------------|
| Input Parameter | Dictionary | Generic |  |
| Input Parameter | Sort By | Enumeration |  |
| Output Parameter | Key List | Generic |  |
| Output Parameter | Value List | Generic |  |

## **2. Sort Dictionary by Value**

**Node Functions**

Sort and output the specified Dictionary by values in ascending or descending order

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|-------------|-------------|
| Input Parameter | Dictionary | Generic |  |
| Input Parameter | Sort By | Enumeration |  |
| Output Parameter | Key List | Generic |  |
| Output Parameter | Value List | Generic |  |

## **3. Set or Add Key Value Pairs to Dictionary**

**Node Functions**

Add a Key-Value Pair to the specified Dictionary

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|---------|-------------|
| Input Parameter | Dictionary | Generic |  |
| Input Parameter | Key | Generic |  |
| Input Parameter | Value | Generic |  |

## **4. Clear Dictionary**

**Node Functions**

Clear all Key-Value Pairs from the specified Dictionary

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|---------|-------------|
| Input Parameter | Dictionary | Generic |  |

## **5. Remove Key Value Pairs from Dictionary by Key**

**Node Functions**

Remove Key-Value Pairs from the specified Dictionary by key

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|---------|-------------|
| Input Parameter | Dictionary | Generic |  |
| Input Parameter | Key | Generic |  |

## XXXVI. Structures

## **1. Modify Structure**

**Node Functions**

After selecting a Structure, you can edit each parameter of that Structure

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|----------------|----------------|------|-------------|
|  |  |  |  |

## XXXVII. Shop

## **1.** Remove Item From Inventory Shop Sales List

**Node Functions**

Remove items from the inventory shop's sales list

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|-------------------|-----------|--------------------------------------------------------------------------|
| Input Parameter | Shop Owner Entity | Entity |  |
| Input Parameter | Shop ID | Integer | The Shop ID corresponding to the Shop component on the Shop Owner Entity |
| Input Parameter | Item Config ID | Config ID |  |

## **2. Remove item from purchase list**

**Node Functions**

Remove items from the purchase list

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|---------------------|-----------|--------------------------------------------------------------------------|
| Input Parameter | Shop Owner Entity | Entity |  |
| Input Parameter | Shop ID | Integer | The Shop ID corresponding to the Shop component on the Shop Owner Entity |
| Input Parameter | Shop Item Config ID | Config ID |  |

## **3.** Remove Item From Custom Shop Sales List

**Node Functions**

Remove items from the custom shop's sales list

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|-------------------|---------|--------------------------------------------------------------------------|
| Input Parameter | Shop Owner Entity | Entity |  |
| Input Parameter | Shop ID | Integer | The Shop ID corresponding to the Shop component on the Shop Owner Entity |
| Input Parameter | Shop Item ID | Integer |  |

## **4. Open Shop**

**Node Functions**

Open the Shop from the Player Entity's perspective during gameplay

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|-------------------|---------|--------------------------------------------------------------------------|
| Input Parameter | Player Entity | Entity |  |
| Input Parameter | Shop Owner Entity | Entity | The Shop ID corresponding to the Shop component on the Shop Owner Entity |
| Input Parameter | Shop ID | Integer |  |

## **5. Close Shop**

**Node Functions**

Close all open Shops from the Player Entity's perspective during gameplay

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|--------|-------------|
| Input Parameter | Player Entity | Entity |  |

## **6.** Add New Item to Inventory Shop Sales List

**Node Functions**

Add new items to the inventory shop's sales list

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|--------------------------|------------|--------------------------------------------------------------------------|
| Input Parameter | Shop Owner Entity | Entity |  |
| Input Parameter | Shop ID | Integer | The Shop ID corresponding to the Shop component on the Shop Owner Entity |
| Input Parameter | Shop Item Config ID | Config ID |  |
| Input Parameter | Sell Currency Dictionary | Dictionary |  |
| Input Parameter | Affiliated Tab ID | Integer | 1 Equipment, 2 Consumables, 3 Materials, 4 Valuables |
| Input Parameter | Sort Priority | Integer |  |
| Input Parameter | Can Be Sold | Boolean |  |

## **7. Add Items to the Purchase List**

**Node Functions**

Add New Items to the Item Purchase List

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|------------------------------|------------|--------------------------------------------------------------------------|
| Input Parameter | Shop Owner Entity | Entity |  |
| Input Parameter | Shop ID | Integer | The Shop ID corresponding to the Shop component on the Shop Owner Entity |
| Input Parameter | Shop Item Config ID | Config ID |  |
| Input Parameter | Purchase Currency Dictionary | Dictionary |  |
| Input Parameter | Purchasable | Boolean |  |

## **8.** Add New Item to Custom Shop Sales List

**Node Functions**

Add items to the Custom Shop Sales List. Upon success, an Integer ID is generated in the Output Parameter as the item identifier

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|--------------------------|------------|--------------------------------------------------------------------------|
| Input Parameter | Shop Owner Entity | Entity |  |
| Input Parameter | Shop ID | Integer | The Shop ID corresponding to the Shop component on the Shop Owner Entity |
| Input Parameter | Shop Item Config ID | Config ID |  |
| Input Parameter | Sell Currency Dictionary | Dictionary |  |
| Input Parameter | Affiliated Tab ID | Integer | 1 Equipment, 2 Consumables, 3 Materials, 4 Valuables |
| Input Parameter | Limit Purchase | Boolean |  |
| Input Parameter | Purchase Limit | Integer |  |
| Input Parameter | Sort Priority | Integer |  |
| Input Parameter | Can Be Sold | Boolean |  |
| Output Parameter | Item Index | Integer |  |

## **9.** Modify Inventory Shop Item Sales Info

**Node Functions**

Edit sale info for inventory shop items

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|--------------------------|------------|--------------------------------------------------------------------------|
| Input Parameter | Shop Owner Entity | Entity |  |
| Input Parameter | Shop ID | Integer | The Shop ID corresponding to the Shop component on the Shop Owner Entity |
| Input Parameter | Item Config ID | Config ID |  |
| Input Parameter | Sell Currency Dictionary | Dictionary |  |
| Input Parameter | Affiliated Tab ID | Integer |  |
| Input Parameter | Sort Priority | Integer |  |
| Input Parameter | Can Be Sold | Boolean |  |

## **10.** Modify Item Purchase Info in the Purchase List

**Node Functions**

Edit Item Purchase Information in the Item Purchase List

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|------------------------------|------------|--------------------------------------------------------------------------|
| Input Parameter | Shop Owner Entity | Entity |  |
| Input Parameter | Shop ID | Integer | The Shop ID corresponding to the Shop component on the Shop Owner Entity |
| Input Parameter | Shop Item Config ID | Config ID |  |
| Input Parameter | Purchase Currency Dictionary | Dictionary |  |
| Input Parameter | Purchasable | Boolean |  |

## **11.** Modify Custom Shop Item Sales Info

**Node Functions**

Edit sale info for custom shop items

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|--------------------------|------------|--------------------------------------------------------------------------|
| Input Parameter | Shop Owner Entity | Entity |  |
| Input Parameter | Shop ID | Integer | The Shop ID corresponding to the Shop component on the Shop Owner Entity |
| Input Parameter | Shop Item ID | Integer |  |
| Input Parameter | Item Config ID | Config ID |  |
| Input Parameter | Sell Currency Dictionary | Dictionary |  |
| Input Parameter | Affiliated Tab ID | Integer | 1 Equipment, 2 Consumables, 3 Materials, 4 Valuables |
| Input Parameter | Limit Purchase | Boolean |  |
| Input Parameter | Purchase Limit | Integer |  |
| Input Parameter | Sort Priority | Integer |  |
| Input Parameter | Can Be Sold | Boolean |  |

## XXXVIII. Equipment

## **1. Modify Equipment Affix Value**

**Node Functions**

Edit the value of the specified Affix on the Equipment instance

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|-----------------|------------------------|-----------------------------------------------------------------------------------------|
| Input Parameter | Equipment Index | Integer | Integer ID generated during Equipment Initialization to identify the equipment instance |
| Input Parameter | Affix ID | Integer |  |
| Input Parameter | Affix Value | Floating Point Numbers |  |

## **2. Remove Equipment Affix**

**Node Functions**

Remove the specified Affix from the Equipment instance

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|---------|-----------------------------------------------------------------------------------------|
| Input Parameter | Equipment ID | Integer | Integer ID generated during Equipment Initialization to identify the equipment instance |
| Input Parameter | Affix ID | Integer |  |

## **3. Add Affix to Equipment**

**Node Functions**

Add a preconfigured Affix to the specified Equipment instance, with the option to overwrite the Affix value

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|-----------------------|------------------------|-----------------------------------------------------------------------------------------|
| Input Parameter | Equipment ID | Integer | Integer ID generated during Equipment Initialization to identify the equipment instance |
| Input Parameter | Affix Config ID | Config ID | The Config ID of the preconfigured Affix defined in Equipment Data Management |
| Input Parameter | Overwrite Affix Value | Boolean |  |
| Input Parameter | Affix Value | Floating Point Numbers | Can overwrite the value on a pre-configured Affix |

## **4. Add Affix to Equipment at Specified ID**

**Node Functions**

Add a preconfigured Affix at the specified Affix ID on the Equipment instance, with the option to overwrite the Affix value

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|-----------------------|------------------------|-----------------------------------------------------------------------------------------|
| Input Parameter | Equipment ID | Integer | Integer ID generated during Equipment Initialization to identify the equipment instance |
| Input Parameter | Affix Config ID | Config ID | The Config ID of the preconfigured Affix defined in Equipment Data Management |
| Input Parameter | Insert ID | Integer |  |
| Input Parameter | Overwrite Affix Value | Boolean |  |
| Input Parameter | Affix Value | Floating Point Numbers | Can overwrite the value on a pre-configured Affix |

## XXXIX. Items and Inventory

## **1. Set Inventory** Item Drop Contents

**Node Functions**

Configure the Inventory Item drop data in Dictionary format, and specify the Drop Type

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|------------------------|-------------|----------------------------------------------------------------------------------------|
| Input Parameter | Inventory Owner Entity | Entity |  |
| Input Parameter | Item Drop Dictionary | Dictionary |  |
| Input Parameter | Loot Type | Enumeration | Types: Shared Reward (one share for all), Individualized Reward (one share per person) |

## **2.** Set Inventory Drop Items/Currency Amount

**Node Functions**

Set the type and quantity of Items or Currency for the Inventory drop

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|-------------------------|-------------|----------------------------------------------------------------------------------------|
| Input Parameter | Inventory Owner Entity | Entity |  |
| Input Parameter | Item/Currency Config ID | Config ID |  |
| Input Parameter | Quantity Dropped | Integer |  |
| Input Parameter | Loot Type | Enumeration | Types: Shared Reward (one share for all), Individualized Reward (one share per person) |

## **3. Trigger Loot Drop**

**Node Functions**

Triggers a loot drop for the dropper entity, with configurable loot type.

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|-------------|----------------------------------------------------------------------------------------|
| Input Parameter | Dropper Entity | Entity |  |
| Input Parameter | Loot Type | Enumeration | Types: Shared Reward (one share for all), Individualized Reward (one share per person) |

## **4. Set Loot Drop Content**

**Node Functions**

Configure the Loot drop data in the Loot Component on the Dropper Entity in Dictionary format

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------------|------------|-------------|
| Input Parameter | Dropper Entity | Entity |  |
| Input Parameter | Loot Drop Dictionary | Dictionary |  |

## **5. Modify Inventory Item Quantity**

**Node Functions**

Edit the quantity of the specified Item in the Inventory

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|------------------------|-----------|-------------------------------------------|
| Input Parameter | Inventory Owner Entity | Entity |  |
| Input Parameter | Item Config ID | Config ID |  |
| Input Parameter | Change Value | Integer | New Value = Original Value + Change Value |

## **6. Modify Inventory Currency Quantity**

**Node Functions**

Edit the amount of the specified Currency in the Inventory

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|------------------------|-----------|-------------------------------------------|
| Input Parameter | Inventory Owner Entity | Entity |  |
| Input Parameter | Currency Config ID | Config ID |  |
| Input Parameter | Change Value | Integer | New Value = Original Value + Change Value |

## **7. Modify Loot Item Component Quantity**

**Node Functions**

Edit the quantity of the specified Item in the Loot Component on the Loot Prefab

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|-----------|-------------------------------------------|
| Input Parameter | Loot Entity | Entity |  |
| Input Parameter | Item Config ID | Config ID |  |
| Input Parameter | Change Value | Integer | New Value = Original Value + Change Value |

## **8. Modify Loot Component Currency Amount**

**Node Functions**

Edit the amount of the specified Currency in the Loot Component on the Loot Prefab

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|--------------------|-----------|-------------------------------------------|
| Input Parameter | Loot Entity | Entity |  |
| Input Parameter | Currency Config ID | Config ID |  |
| Input Parameter | Change Value | Integer | New Value = Original Value + Change Value |

## **9. Increase Maximum Inventory Capacity**

**Node Functions**

Increase the maximum Inventory capacity of the specified Inventory Owner

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|------------------------|---------|-------------|
| Input Parameter | Inventory Owner Entity | Entity |  |
| Input Parameter | Increase Capacity | Integer |  |

## XL. Mini-Map Marker Component

## **1.** Modify Player List for Visible Mini-Map Markers

**Node Functions**

The mini-map marker at the specified ID in the Target Entity's Mini-map Marker Component is visible to all Players in the Player List

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|--------------------|-------------|--------------------------------------------------------------------------------------------|
| Input Parameter | Target Entity | Entity | Entity that owns the Mini-map Marker component to be edited |
| Input Parameter | Mini-Map Marker ID | Integer | ID of the specified Mini-map Marker to be edited |
| Input Parameter | Player List | Entity List | The specified Mini-map ID on the Target Entity, visible only to the Player providing input |

## **2. Modify Player Markers on the Mini-Map**

**Node Functions**

When the Player Marker option is selected and a corresponding Player Entity is linked in the Node Graph, the Target Entity's display on the mini-map changes to that Player's avatar

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|-----------------------------|---------|-------------------------------------------------------------|
| Input Parameter | Target Entity | Entity | Entity that owns the Mini-map Marker component to be edited |
| Input Parameter | Mini-Map Marker ID | Integer | ID of the specified Mini-map Marker to be edited |
| Input Parameter | Corresponding Player Entity | Entity | Changes the avatar of the corresponding Player Entity |

## **3.** Modify Mini-Map Marker Activation Status

**Node Functions**

Edit the active state of mini-map markers on the Target Entity in batches using the input list of Mini-map Marker IDs

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|-------------------------|--------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Input Parameter | Target Entity | Entity | Entity that owns the Mini-map Marker component to be edited |
| Input Parameter | Mini-Map Marker ID List | Integer List | List of Mini-map Marker IDs to be set to the specified status

Unconfigured Mini-map Markers will be set to the opposite status |
| Input Parameter | Active | Boolean | If input is True,

the Mini-map Markers corresponding to the specified ID numbers in the input list will be set to Enabled

For IDs not in the input list, the corresponding Mini-map Markers will be set to Disabled |

## **4. Modify Mini-Map Zoom**

**Node Functions**

Edit the map scale of the Target Player's mini-map UI control

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|-----------------|------------------------|-------------|
| Input Parameter | Target Player | Entity |  |
| Input Parameter | Zoom Dimensions | Floating Point Numbers |  |

## **5.** Modify Player List for Tracking Mini-Map Markers

**Node Functions**

Set the mini-map marker at the specified ID on the Target Entity to Tracking Display for the input Player

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|--------------------|-------------|-------------|
| Input Parameter | Target Entity | Entity |  |
| Input Parameter | Mini-Map Marker ID | Integer |  |
| Input Parameter | Player List | Entity List |  |

## XLI. Creation Patrol

## **1. Switch Creation Patrol Template**

**Node Functions**

Immediately switch the patrol template for the Creation and move according to the new template

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|--------------------|---------|-------------|
| Input Parameter | Creation Entity | Entity |  |
| Input Parameter | Patrol Template ID | Integer |  |

## XLII. Leaderboard

## **1. Set Player Leaderboard Score as a Float**

**Node Functions**

Set Player Leaderboard Score (Float)

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|-------------------|------------------------|-----------------------------------------------------------------------------------|
| Input Parameter | Player ID List | Integer List |  |
| Input Parameter | Leaderboard Score | Floating Point Numbers |  |
| Input Parameter | Leaderboard ID | Integer | The ID corresponding to the specified Leaderboard in Peripheral System management |

## **2. Set Player Leaderboard Score as an Integer**

**Node Functions**

Set Player Leaderboard Score (Integer)

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|-------------------|--------------|-----------------------------------------------------------------------------------|
| Input Parameter | Player ID List | Integer List |  |
| Input Parameter | Leaderboard Score | Integer |  |
| Input Parameter | Leaderboard ID | Integer | The ID corresponding to the specified Leaderboard in Peripheral System management |

## XLIII. Achievements

## **1. Change Achievement Progress Tally**

**Node Functions**

Change the progress counter for the specified Achievement ID on the Target Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|-----------------------------|---------|-------------------------------------------|
| Input Parameter | Change Entity | Entity |  |
| Input Parameter | Achievement ID | Integer |  |
| Input Parameter | Progress Tally Change Value | Integer | New Value = Previous Value + Change Value |

## **2. Set Achievement Progress Tally**

**Node Functions**

Set the progress counter for the specified Achievement ID on the Target Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|---------|--------------------------------------------|
| Input Parameter | Set Entity | Entity |  |
| Input Parameter | Achievement ID | Integer |  |
| Input Parameter | Progress Tally | Integer | Sets the Progress Count to the input value |

## XLIV. Scan Tags

## **1. Set Scan Tag Rules**

**Node Functions**

Configure rules for Scan Tags. The scanning logic is executed based on the configured rules

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|-------------|-------------------------------------------------|
| Input Parameter | Target Entity | Entity |  |
| Input Parameter | Rule Type | Enumeration | Options: Prioritize View or Prioritize Distance |

## **2.** Set Scan Component's Active Scan Tag ID

**Node Functions**

Set the Scan Tag with the specified ID in the Target Entity's Scan Tag Component to the active state

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|---------|-------------|
| Input Parameter | Target Entity | Entity |  |
| Input Parameter | Scan Tag ID | Integer |  |

## XLV. Rank

## **1.** Switch the scoring group that affects player's competitive rank

**Node Functions**

Switch the active Scoring Group of the specified Player's Ranking by Scoring Group ID

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|---------|-----------------------------------------------------------------------------------|
| Input Parameter | Player Entity | Entity |  |
| Input Parameter | Score Group ID | Integer | The ID corresponding to the specified Score Group in Peripheral System management |

## **2. Set Player Rank Score Change**

**Node Functions**

Set the Player's rank score change based on the settlement status

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|-------------------|-------------|----------------------------------------------|
| Input Parameter | Player Entity | Entity |  |
| Input Parameter | Settlement Status | Enumeration | Includes: Undefined, Victory, Defeat, Escape |
| Input Parameter | Score Change | Integer |  |

## **3. Set Player Escape Validity**

**Node Functions**

Set whether escaping is permitted for the specified Player

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|---------|-------------|
| Input Parameter | Player Entity | Entity |  |
| Input Parameter | Valid | Boolean |  |

## XLVI. Entity Deployment Group

## **1. Activate/Disable Entity Deployment Group**

**Node Functions**

Edit the Initial Creation Switch state of the Entity Layout Group

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|-------------------------------|---------|------------------------------------------------------------------------------|
| Input Parameter | Entity Deployment Group Index | Integer |  |
| Input Parameter | Activate | Boolean | If set to True, the Entity Layout Group's Initial Creation switch is enabled |

## XLVII. Chat Channel

## **1. Set Chat Channel Switch**

**Node Functions**

Set the Chat Channel switch

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|---------|-------------|
| Input Parameter | Channel Index | Integer |  |
| Input Parameter | Text Switch | Boolean |  |

## **2. Set Player's Current Channel**

**Node Functions**

Set the Player's currently available channels. Channels in the list are available to the Player, and channels not in the list are unavailable

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|--------------------|--------------|-------------|
| Input Parameter | Player GUID | GUID |  |
| Input Parameter | Channel Index List | Integer List |  |

## **3. Modify Player Channel Permission**

**Node Functions**

Edit Player Channel Permissions

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|---------|------------------------------------------------------------------|
| Input Parameter | Player GUID | GUID |  |
| Input Parameter | Channel Index | Integer |  |
| Input Parameter | Join | Boolean | If set to True, the channel is available to the specified Player |

## XLVIII. Wonderland Gift Boxes

## **1. Consume Gift Box**

**Node Functions**

Consume the specified Player's Wonderland Gift Box

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------------|---------|-------------|
| Input Parameter | Player Entity | Entity |  |
| Input Parameter | Gift Box Index | Integer |  |
| Input Parameter | Consumption Quantity | Integer |  |